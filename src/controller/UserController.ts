import { Body, Controller, Get, Path, Post, Put, Query, Route, Tags } from 'tsoa';
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
import { ResError } from '../models/res/Responses';
// import { serviceTicketStatus } from "../entity/ServiceTickets";
@Tags('User')
@Route('/user')
export class UserController extends Controller {
  private userrepository = AppDataSource.getRepository(User);
  private devicerepository = AppDataSource.getRepository(Device);
  private rolerepository = AppDataSource.getRepository(Role);

  @Post()
  public async saveUser(@Body() req: ReqUser): Promise<ResUser | ResError> {
    try {
      const { address, email, password, name, phone_number, role } = req;

      const db_role = await this.rolerepository.findOne({
        where: {
          id: role,
        },
      });
      if (!db_role) {
        return Promise.reject(new Error('PLEASE INSERT ROLE'));
      }
      const userToSave: User = {
        password: password,
        address: address,
        email: email,
        name: name,
        phone_number: phone_number,
        role: Promise.resolve(db_role),
      };

      const userSaver = Object.assign(new User(), userToSave);
      const savedUser = await this.userrepository.save(userSaver);

      const resUser: ResUser = {
        id: savedUser.id,
        address: savedUser.address,
        email: savedUser.email,
        name: savedUser.name,
        phone_number: savedUser.phone_number,
        password: savedUser.password,
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
      console.log('there was an errror in logging in ', error);
      return { error: 'failed to login' };
    }
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

  public async getUsersPagination(page: number, pageSize: number): Promise<{ items: User[]; totalCount: number }> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    // Mock data for illustration purposes
    const allUsers: User[] = await this.userrepository.find();

    const paginatedUsers = allUsers.slice(offset, offset + limit);

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
  public async getUsers(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<PaginatedResponse<User>> {
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
          service_ticket: true,
          device: true,
          role: true,
        },
      })
      .then(
        async (user) => {
          if (!user) {
            return Promise.reject(new Error('THERE WAS A PROBLEM IN FINDING THE USER'));
          }
          const serviceTicket = user.service_ticket;
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
              mac_address: device?.mac_address,
              name: device?.name,
            },
            role: {
              description: role?.description,
              id: role?.id,
              name: role?.name,
            },
            service_ticket: {
              // date: serviceTicket.,
              id: (await serviceTicket)?.id,
              // service_ticket_number,
              // status
              // serviceTicketStatus
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
        service_ticket: true,
      },
    });

    if (!existingUser) {
      return Promise.reject(new Error('THERE WAS A PROBLEM IN FETCHING THIS USER'));
    }

    const { address, device, email, name, password, phone_number, role } = request;

    const db_device = await this.devicerepository.findOne({
      where: {
        id: device,
      },
    });
    if (!db_device) {
      return Promise.reject(new Error('DB DEVICE NOT FOUND'));
    }

    const db_role = await this.rolerepository.findOne({
      where: {
        id: role,
      },
    });
    if (!db_role) {
      return Promise.reject(new Error('DB ROLE NOT FOUND'));
    }
    existingUser.address = address;
    existingUser.device = db_device;
    existingUser.email = email;
    existingUser.name = name;
    existingUser.password = password;
    existingUser.phone_number = phone_number;
    existingUser.role = Promise.resolve(db_role);

    const savedUser = await this.userrepository.save(existingUser);

    const resUser: ResUser = {
      address: savedUser.address,
      device: {
        // dongle: db_device.,
        id: db_device.id,
        mac_address: db_device.mac_address,
        name: db_device.name,
        // user: db_device.user
      },
      email: savedUser.email,
      id: savedUser.id,
      name: savedUser.name,
      password: savedUser.password,
      phone_number: savedUser.phone_number,
      role: {
        description: db_role.description,
        id: db_role.id,
        name: db_role.name,
      },
      // service_ticket: savedUser.service_ticket,
    };
    return resUser;

    // existingUser.service_ticket=service_ticket
  }
}

// export class ItemService {
//   public async getItems(page: number = 1, limit: number = 10): Promise<{ data: Item[], page: number, limit: number, total: number, totalPages: number }> {
//     const itemRepository = getRepository(Item);

//     const [items, total] = await itemRepository.findAndCount({
//       take: limit,
//       skip: (page - 1) * limit,
//     });

//     const totalPages = Math.ceil(total / limit);

//     return {
//       data: items,
//       page,
//       limit,
//       total,
//       totalPages
//     };
//   }
// }
