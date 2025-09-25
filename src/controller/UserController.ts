import { Body, Controller, Delete, Get, Path, Post, Put, Query, Request, Route, Security, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { ResUser } from '../models/res/ResUser';
import { ReqUser } from '../models/req/ReqUser';
import { JWTTokenData } from '../models/TokenModel';
import { envs } from '../utils/envVars';
import * as jwt from 'jsonwebtoken';
// import { JsonWebTokenError } from "jsonwebtoken";
import { ResUserLogin } from '../models/res/ResUserLogin';
import { ReqUserLogin } from '../models/req/ReqUserLogin';
import { ResUserUpdate } from '../models/req/ReqUserUpdate';
import { ResError, ResSuccess } from '../models/res/Responses';
import { JWTRequest } from '../models/req/JWTRequest';
import { ReqUsersUnder } from '../models/req/ReqUsersUnder';
import { In } from 'typeorm';
import { ReqUserRoleFind } from '../models/req/ReqUserRoleFind';
import { ReqUserRegister } from '../models/req/RequserRegister';
import { Role } from '../entity/Role';
// import { And } from 'typeorm';
// import { serviceTicketStatus } from "../entity/ServiceTickets";
@Tags('User')
@Route('/user')
export class UserController extends Controller {
  private userrepository = AppDataSource.getRepository(User);
  private rolerepository=AppDataSource.getRepository(Role)
 
 
  @Post('/registerViewer')
 public async saveUser(@Body() req:ReqUser){
  const {address,email,name,password,phone_number}=req
const db_role=await this.rolerepository.findOne({
  where:{
    name:'viewer'
  }
})

if(!db_role){
  return Promise.reject(new Error('role not found'))
}


  const user:User={
    address,
    email,
    // id,
    name,
    password,
    phone_number,
    role: Promise.resolve(db_role),
    status: true
  }

  const userSaver=Object.assign(new User, user)
  const savedUser=await this.userrepository.save(userSaver)

  const resUser:ResUser={
    address: savedUser.address,
    // device,
    email: savedUser.email,
    id: savedUser.id,
    // is_under,
    name: savedUser.name,
    password: savedUser.password,
    phone_number: savedUser.phone_number,
    role: {
      description: (await savedUser.role)?.description,
      id: (await savedUser.role)?.id,
      name: (await savedUser.role)?.name,
      // permissions
    },
    // service_ticket,
    status: savedUser.status
  }
return resUser
 }


 
  @Post('/registerUploader')
 public async saveUserUploader(@Body() req:ReqUser){
  const {address,email,name,password,phone_number}=req
const db_role=await this.rolerepository.findOne({
  where:{
    name:'uploader'
  }
})

if(!db_role){
  return Promise.reject(new Error('role not found'))
}


  const user:User={
    address,
    email,
    // id,
    name,
    password,
    phone_number,
    role: Promise.resolve(db_role),
    status: true
  }

  const userSaver=Object.assign(new User, user)
  const savedUser=await this.userrepository.save(userSaver)

  const resUser:ResUser={
    address: savedUser.address,
    // device,
    email: savedUser.email,
    id: savedUser.id,
    // is_under,
    name: savedUser.name,
    password: savedUser.password,
    phone_number: savedUser.phone_number,
    role: {
      description: (await savedUser.role)?.description,
      id: (await savedUser.role)?.id,
      name: (await savedUser.role)?.name,
      // permissions
    },
    // service_ticket,
    status: savedUser.status
  }
return resUser
 }

  /**
   * user login
   * @summary user login
   */
  @Post('/login')
  public async userLogin(@Body() loginBody: ReqUserLogin): Promise<ResUserLogin | ResError> {
    try {
      console.log({ MESSAGE: 'THIS API WAS FIRED' });
      const { email, password } = loginBody;
      console.log('api reached here');
      const users = await this.userrepository.find({
        where: {
          email: email,
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



      if (!user.role || user.role===null) {
        return Promise.reject(new Error('Role Not found'));
      }
      const perm_result = (await user.role)!.permissions;

      // const permissions: ResPermission[] = (await perm_result)!.map((item) => ({
      //   id: item.id,
      //   perm_name: item.name,
      //   description: item.description,
      //   type: item.type!,
      // }));
      // console.log('here are the permissions', permissions);
      const loginUser: ResUserLogin = {
        //   name: (user.first_name ? user.first_name : '') + ' ' + (user.last_name ? user.last_name : ''),
        email: user.email!,
        role: {
          id: (await user.role).id!,
          role_name: (await user.role).name!,
          role_description: (await user.role).description!,

        },
        // permissions: permissions,
      };

      const tokenData: JWTTokenData = {
        id: user.id!,
        username: user.name!,
        //   pincode: user.pincode,
       role:{
        id: (await user.role).id!,
        permissions:(await user.role).permissions?.toString()!
       }
      //  type: user.role
        
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

    return { result: 'USER DELETED SUCCESSFULLY' };
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
        status: user.status,
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
  }
