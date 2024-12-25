import { Body, Controller, Delete, Get, Path, Post, Put, Query, Request, Route, Security, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { ResUser } from '../models/res/ResUser';
import { ReqUser } from '../models/req/ReqUser';
import { JWTTokenData } from '../models/TokenModel';
import { envs } from '../utils/envVars';
import * as jwt from 'jsonwebtoken';
// import { JsonWebTokenError } from "jsonwebtoken";
import { ResPermission } from '../models/res/ResPermission';
import { ResUserLogin } from '../models/res/ResUserLogin';
import { ReqUserLogin } from '../models/req/ReqUserLogin';
import { Role } from '../entity/Role';
import { ReqDeviceAssign } from '../models/req/ReqDeviceAssign';
import { Device } from '../entity/Device';
import { PaginatedResponse } from '../models/res/PaginatedResponse';
import { ResUserUpdate } from '../models/req/ReqUserUpdate';
import { ResError, ResSuccess } from '../models/res/Responses';
import { JWTRequest } from '../models/req/JWTRequest';
import { ReqUsersUnder } from '../models/req/ReqUsersUnder';
import { In } from 'typeorm';
import { ReqUserRoleFind } from '../models/req/ReqUserRoleFind';
// import { And } from 'typeorm';
// import { serviceTicketStatus } from "../entity/ServiceTickets";
@Tags('User')
@Route('/user')
export class UserController extends Controller {
  private userrepository = AppDataSource.getRepository(User);
  private devicerepository = AppDataSource.getRepository(Device);
  private rolerepository = AppDataSource.getRepository(Role);

  @Post()
  @Security('Api-Token', [])
  public async saveUser(@Request() request: JWTRequest, @Body() req: ReqUser): Promise<ResUser | ResError> {
    try {
      const { address, email, password, name, phone_number, role } = req;
      if (!role) {
        return { error: 'user cannot be created witout role' };
      }
      const db_role = await this.rolerepository.findOne({
        where: {
          id: role,
        },
      });
      console.log('the saved role is ', db_role);
      if (!db_role) {
        return Promise.reject(new Error('PLEASE INSERT ROLE'));
      }
      const user = await this.userrepository.find({
        where: {
          id: request.user.id,
        },
      });
      if (!user) {
        return Promise.reject(new Error('USER IS NOT FOUND'));
      }
      console.log('this is the user i wanna make the manager', user);
      const userToSave: User = {
        password: password,
        address: address,
        email: email,
        name: name,
        phone_number: phone_number,
        role: Promise.resolve(db_role),
        is_under: Promise.resolve(user),
      };
      console.log('the user to save is', userToSave);

      const userSaver = Object.assign(new User(), userToSave);
      const savedUser = await this.userrepository.save(userSaver);
      const resUser: ResUser = {
        id: savedUser.id,
        address: savedUser.address,
        email: savedUser.email,
        name: savedUser.name,
        phone_number: savedUser.phone_number,
        password: savedUser.password,
        role: {
          description: (await savedUser.role)?.description,
          id: (await savedUser.role)?.id,
          name: (await savedUser.role)?.name,
        },
        is_under: {
          address: user[0].address,
          // device: user[0].device,
          email: user[0].email,
          id: user[0].id,
          // is_under: user[0].is_under,
          name: user[0].name,
          password: user[0].password,
          phone_number: user[0].phone_number,
          // role: user[0].role,
          // service_ticket: user[0].,
        },
      };

      return resUser;
    } catch (error) {
      console.log('there was an errror in saving the user', error);
      return { error: 'failed to save the user' };
    }
  }

  /**
   * user login
   * @summary user login
   */
  @Post('/login')
  public async userLogin(@Body() loginBody: ReqUserLogin): Promise<ResUserLogin | ResError> {
    try {
      console.log({ MESSAGE: 'THIS API WAS FIRED' });
      const { username, password } = loginBody;
      console.log('api reached here');
      const users = await this.userrepository.find({
        where: {
          name: username,
          password: password,
        },
        relations: {
          role: {
            permissions: true,
          },
        },
      });
      console.log('api found everything just check', users);

      if (!users || users.length == 0) {
        return Promise.reject(new Error('Invalid credentials'));
      }
      const user: User = users[0];

      // if (!user.oem) {
      //   return Promise.reject(new Error('OEM Not found'));
      // }

      if (!user.role) {
        return Promise.reject(new Error('Role Not found'));
      }
      const perm_result = (await user.role)!.permissions;

      const permissions: ResPermission[] = (await perm_result)!.map((item) => ({
        id: item.id,
        perm_name: item.name,
        description: item.description,
        type: item.type!,
      }));
      console.log('here are the permissions', permissions);
      const loginUser: ResUserLogin = {
        //   name: (user.first_name ? user.first_name : '') + ' ' + (user.last_name ? user.last_name : ''),
        name: user.name!,
        role: {
          id: (await user.role).id!,
          role_name: (await user.role).name!,
          role_description: (await user.role).description!,
        },
        permissions: permissions,
      };

      const tokenData: JWTTokenData = {
        id: user.id!,
        //   pincode: user.pincode,
        role: {
          id: (await user.role).id!,
          permissions: (await perm_result)!.map<string>((p) => {
            return p.name!;
          }),
        },
      };
      // let jsonWebtoken

      const jsonWebtoken = jwt.sign(tokenData, envs.JWT_SECRET_KEY, { expiresIn: '7d' });

      loginUser.token = jsonWebtoken;
      return loginUser;
    } catch (error) {
      console.log('INVALID CREDENTIALS', error);
      return { error: 'INVALID CREDENTIALS' };
    }
  }
  // eslint-disable-next-line
  private async getUsersRecursively(user: any): Promise<any[]> {
    // Find users directly under the given user
    const usersUnder = await this.userrepository.find({
      where: { is_under: user },
    });

    // If no users are found, terminate recursion for this branch
    if (usersUnder.length === 0) {
      return [];
    }

    // Recursively find users under each of the found users
    const nestedUsers = await Promise.all(usersUnder.map(async (u) => this.getUsersRecursively(u)));

    // Combine the direct users with all nested users
    return [...usersUnder, ...nestedUsers.flat()];
  }
  // eslint-disable-next-line
  private async getUsersRecursivelyUsingRole(user: any, role: any): Promise<any[]> {
    // Find users directly under the given user
    const db_role = await this.rolerepository.findOne({
      where: {
        id: role,
      },
    });
    if (!db_role) {
      return Promise.reject(new Error('THIS ROLE WAS NOT FOUND'));
    }
    const usersUnder = await this.userrepository.find({
      where: { is_under: user, role: db_role },
    });

    // If no users are found, terminate recursion for this branch
    if (usersUnder.length === 0) {
      return [];
    }

    // Recursively find users under each of the found users
    const nestedUsers = await Promise.all(usersUnder.map(async (u) => this.getUsersRecursively(u)));

    // Combine the direct users with all nested users
    return [...usersUnder, ...nestedUsers.flat()];
  }
  @Post('getUsersUnder/{userId}')
  public async getUsersUnder(@Path() userId: number | undefined) {
    if (userId === undefined) {
      return Promise.reject(new Error('userId is required'));
    }

    const goal_user = await this.userrepository.findOne({
      where: { id: userId },
    });

    if (!goal_user) {
      return Promise.reject(new Error('User not found'));
    }
    // eslint-disable-next-line
    const getUsersRecursively = async (user: any): Promise<any[]> => {
      const usersUnder = await this.userrepository.find({
        where: { is_under: user },
      });

      if (usersUnder.length === 0) {
        return [];
      }

      const nestedUsers = await Promise.all(usersUnder.map(async (u) => getUsersRecursively(u)));

      return [...usersUnder, ...nestedUsers.flat()];
    };

    const users_under = await getUsersRecursively(goal_user);
    return users_under;
  }

  // /**
  //  * REAL gets users under a user
  //  *  @summary REAL gets users under a user
  //  */
  // @Post('/{userId}')
  // public async theRealGetUsersUnder(@Path() userId: number | undefined): Promise<User[]> {

  // }

  @Put('putUsersUnder/{userId}')
  public async putUsersUnder(@Path() userId: number, @Body() req: ReqUsersUnder) {
    const { users_under } = req;
    const user = await this.userrepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return Promise.reject(new Error('THIS USER WAS NOT FOUND'));
    }
    if (!users_under) {
      return Promise.reject(new Error('YOU NEED TO GIVE THE USERS FOR THIS TO WORK'));
    }
    const db_users_under = await this.userrepository.find({
      where: {
        id: In(users_under),
      },
    });

    for (const userr of db_users_under) {
      (await userr.is_under)?.push(user);
      await this.userrepository.save(userr);
    }
    return { message: 'THE INSERTION WAS SUCCESFULL' };
  }
  @Delete('/{userId}')
  public async deleteUser(@Path() userId: number): Promise<ResSuccess> {
    const usertodelete = await this.userrepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!usertodelete) {
      return Promise.reject(new Error('USER NOT FOUND'));
    }

    await this.userrepository.remove(usertodelete);

    return { result: 'ROLE DELETED SUCCESSFULLY' };
  }

  @Put('userDeviceAllot/{userId}')
  public async assignUserDevice(@Path() userId: number, @Body() request: ReqDeviceAssign) {
    try {
      const user = await this.userrepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return Promise.reject(new Error('USER NOT FOUND'));
      }
      console.log('user found is ', user);

      const { id } = request;

      const device = await this.devicerepository.findOne({
        where: {
          id: id,
        },
      });

      if (!device) {
        return Promise.reject(new Error('DEVICE NOT FOUND'));
      }

      user.device = device;
      const newUser = await this.userrepository.save(user);
      console.log('THE USER DEVICE IS', user.device);

      return newUser;
    } catch (error) {
      console.log('there was an errror in assigning the device to the user', error);
      return { error: 'failed to assign te device to the user' };
    }
  }

  public async getUsersPagination(page: number, pageSize: number): Promise<{ items: ResUser[]; totalCount: number }> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    // Mock data for illustration purposes
    const allUsers: User[] = await this.userrepository.find({
      relations: {
        role: true,
      },
    });

    const resUser: ResUser[] = [];
    for (const user of allUsers) {
      const role = await user.role;
      resUser.push({
        address: user.address,
        // device: user.,
        email: user.email,
        id: user.id,
        // is_under: user.,
        name: user.name,
        password: user.password,
        phone_number: user.phone_number,
        role: {
          // createdBy: role?.created_by,
          description: role?.description,
          id: role?.id,
          name: role?.name,
          // permissions: role?.
        },
        // service_ticket: user.,
      });
    }
    const paginatedUsers = resUser.slice(offset, offset + limit);

    return {
      items: paginatedUsers,
      totalCount: allUsers.length,
    };

    // Replace with actual DB call, for example with TypeORM or Sequelize
  }
  // SGDct1l
  /**
   * Get all users with pagination
   * @param page The page number (default: 1)
   * @param pageSize The number of users per page (default: 10)
   * @returns A paginated list of users
   */
  @Get('/')
  public async getUsers(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<PaginatedResponse<ResUser>> {
    const users = await this.getUsersPagination(page, pageSize);
    return {
      items: users.items,
      totalCount: users.totalCount,
      page,
      pageSize,
    };
  }

  @Get('/{userId}')
  public async getOneUser(@Path() userId: number) {
    const user = await this.userrepository
      .findOne({
        where: {
          id: userId,
        },
        relations: {
          // service_ticket: true,
          device: true,
          role: true,
        },
      })
      .then(
        async (user) => {
          if (!user) {
            return Promise.reject(new Error('THERE WAS A PROBLEM IN FINDING THE USER'));
          }
          // const serviceTicket = user.service_ticket;
          const device = user.device;
          const role = await this.rolerepository.findOne({
            where: {
              users: {
                id: userId,
              },
            },
          });

          const resUser: ResUser = {
            address: user.address,
            email: user.email,
            id: user.id,
            name: user.name,
            password: user.password,
            phone_number: user.phone_number,
            device: {
              id: device?.id,
              // mac_address: device?.mac_address,
              // name: device?.name,
            },
            role: {
              description: role?.description,
              id: role?.id,
              name: role?.name,
            },
          };
          return resUser;
        },
        () => {
          return { error: 'THERE WAS AN ERROR IN LOADING THE USER' };
        },
      );
    return user;
  }

  @Put('/{userId}')
  public async updateUser(@Path() userId: number, @Body() request: ResUserUpdate): Promise<ResUser> {
    const existingUser = await this.userrepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        device: true,
        role: true,
        // service_ticket: true,
      },
    });

    if (!existingUser) {
      return Promise.reject(new Error('THERE WAS A PROBLEM IN FETCHING THIS USER'));
    }

    const { address, device, email, name, password, phone_number, role } = request;
    let db_device;
    if (device) {
      db_device = await this.devicerepository.findOne({
        where: {
          id: device,
        },
      });
    }

    const db_role = await this.rolerepository.findOne({
      where: {
        id: role,
      },
    });

    existingUser.address = address;
    existingUser.device = db_device;
    existingUser.email = email;
    existingUser.name = name;
    existingUser.password = password;
    existingUser.phone_number = phone_number;
    existingUser.role = Promise.resolve(db_role!);

    const savedUser = await this.userrepository.save(existingUser);

    const resUser: ResUser = {
      address: savedUser.address,
      device: {
        // dongle: db_device.,
        id: db_device?.id,
        // mac_address: db_device?.mac_address,
        // name: db_device?.name,
        // user: db_device.user
      },
      email: savedUser.email,
      id: savedUser.id,
      name: savedUser.name,
      password: savedUser.password,
      phone_number: savedUser.phone_number,
      role: {
        description: db_role?.description,
        id: db_role?.id,
        name: db_role?.name,
      },
      // service_ticket: savedUser.service_ticket,
    };
    return resUser;

    // existingUser.service_ticket=service_ticket
  }

  @Post('/getAllUser')
  public async getAllUsers(): Promise<ResUser[]> {
    const users = await this.userrepository.find({
      relations: {
        role: true,
      },
    });

    if (!users) {
      return Promise.reject(new Error('USER NOT FOUND'));
    }

    const resUser: ResUser[] = [];

    for (const user of users) {
      resUser.push({
        address: user.address,
        // device: user.device,
        email: user.email,
        id: user.id,
        name: user.name,
        password: user.password,
        phone_number: user.phone_number,
        role: {
          description: (await user.role)?.description,
          id: (await user.role)?.id,
          name: (await user.role)?.name,
        },
      });
    }
    return resUser;
  }
  /**
   * get users under from role
   * @summary get users under from role
   */
  @Post('{userId}/getUserFromRole')
  public async getUsersFromRole(@Path() userId: number, @Body() request: ReqUserRoleFind) {
    const { role } = request;
    if (userId === undefined) {
      return Promise.reject(new Error('userId is required'));
    }

    const goal_user = await this.userrepository.findOne({
      where: { id: userId },
    });

    if (!goal_user) {
      return Promise.reject(new Error('User not found'));
    }
    // eslint-disable-next-line
    const getUsersRecursively = async (user: any): Promise<any[]> => {
      const usersUnder = await this.userrepository.find({
        where: { is_under: user },
      });

      if (usersUnder.length === 0) {
        return [];
      }

      const nestedUsers = await Promise.all(usersUnder.map(async (u) => getUsersRecursively(u)));

      return [...usersUnder, ...nestedUsers.flat()];
    };

    const users_under = await this.getUsersRecursivelyUsingRole(goal_user, role);
    return users_under;
  }
}
