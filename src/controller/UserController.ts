import { Body, Controller, Post, Route, Tags } from "tsoa";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { ResUser } from "../models/res/ResUser";
import { ReqUser } from "../models/req/ReqUser";
import { JWTTokenData } from "../models/TokenModel";
import { envs } from "../utils/envVars";
import * as jwt from 'jsonwebtoken'
// import { JsonWebTokenError } from "jsonwebtoken";
import { ResPermission } from "../models/res/ResPermission";
import { ResUserLogin } from "../models/res/ResUserLogin";
import { ReqUserLogin } from "../models/req/ReqUserLogin";
import { Role } from "../entity/Role";
@Tags('User')
@Route('/user')
export class UserController extends Controller{
    private userrepository=AppDataSource.getRepository(User)

    private rolerepository=AppDataSource.getRepository(Role)
    
    @Post()
    public async saveUser(@Body() req: ReqUser): Promise<ResUser>{
        const {address,email,password,name,phone_number, role}=req

        const db_role=await this.rolerepository.findOne({
          where:{
            id: role
          }
        })
        if(!db_role){
          return Promise.reject(new Error('PLEASE INSERT ROLE'))
        }
        const userToSave: User={
          password: password,
            address: address,
            email: email,        
            name: name,
            phone_number: phone_number,
            role: Promise.resolve(db_role)
        }

        const userSaver=Object.assign(new User(), userToSave)
        const savedUser=await this.userrepository.save(userSaver)

        const resUser: ResUser={
            id: savedUser.id,
            address: savedUser.address,
            email: savedUser.email,
            name: savedUser.name,
            phone_number: savedUser.phone_number,
          password: savedUser.password
        }
        return resUser
    }

    /**
   * user login
   * @summary user login
   */
  @Post('/login')
  public async userLogin(@Body() loginBody: ReqUserLogin): Promise<ResUserLogin> {
    console.log({MESSAGE: 'THIS API WAS FIRED'})
    const { username, password } = loginBody;
console.log('api reached here')
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
console.log('api found everything just check', users)

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
    }));
console.log('here are the permissions', permissions)
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
   
     const jsonWebtoken = jwt.sign(tokenData, envs.JWT_SECRET_KEY, {expiresIn: '7d'});
   
    loginUser.token = jsonWebtoken;
    return loginUser;
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