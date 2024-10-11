import { Body, Controller, Get, Post, Put, Route, Tags } from "tsoa";
import { Role } from "../entity/Role";
import { AppDataSource } from "../data-source";
import { ReqRole } from "../models/req/ReqRole";
import { ResRole } from "../models/res/ResRole";
import { SetPermisisons } from "../models/req/SetPermisisons";
import { GetSetPermisisons } from "../models/res/GetSetPermissions";
import { In } from "typeorm";
import { Permission } from "../entity/Permission";
import { ResPermission } from "../models/res/ResPermission";
import { ReqRoleSubRole } from "../models/req/ReqRoleSubRole";
import { ResRoleSubRole } from "../models/res/ResRoleSubRole";
import { ReqRoleBody } from "../models/req/ReqRoleBody";
@Tags('Role')
@Route('/role')
export class RoleController extends Controller{
    private rolerepository=AppDataSource.getRepository(Role)
    private permissionrepository=AppDataSource.getRepository(Permission)

    
    @Post()
    public async saveRole(@Body() request: ReqRole): Promise<ResRole>{
            const {name, description}=request;

            const roleToSave: Role={
            description: description,
            name: name,
            }

        
            const roleSaver=Object.assign(new Role(), roleToSave)
            const savedRole=await this.rolerepository.save(roleSaver)

            const roleArr: Role[]=[]
            roleArr.push(savedRole)
            const permissionToSaveManage: Permission={
                name: 'manage'+name,
                description: 'management permissions of '+name,
                role: Promise.resolve(roleArr)
            }

            const permissionToSaveView: Permission={
                name: 'view'+name,
                description: 'view related permissions of '+name,
                role: Promise.resolve(roleArr)
            }
            await this.permissionrepository.save(permissionToSaveManage)
            await this.permissionrepository.save(permissionToSaveView)
            const resRole: ResRole={
                description,
                id: savedRole.id,
                name: savedRole.name
            }
            return resRole
    }   

    

    @Put('/setPermissions')
    public async givePermissionToRole(@Body() request: SetPermisisons): Promise<GetSetPermisisons>{
        const {role, permissions}=request

        const db_role=await this.rolerepository.findOne({
            where:{
                id: role
            }
        })
        if(!db_role){
            return Promise.reject(new Error('ROLE NOT FOUND'))
        }
        let db_permission;
            if(permissions){
                 db_permission=await this.permissionrepository.find({
                    where:{
                        id: In(permissions)
                    }
                })
            }
if(!db_permission){
    return Promise.reject(new Error('PERMISSION NOT FOUND'))

}

db_role.permissions= Promise.resolve(db_permission)
           

            const updatedRole=await this.rolerepository.save(db_role)
        
const rPerm=updatedRole.permissions
            const resRole: GetSetPermisisons={
                role: {
                    id: updatedRole.id,
                    name: updatedRole.name,
                    description: updatedRole.description
                },
                permissions: (await rPerm)?.map((permission=>({
                        description: permission.description,
                        id: permission.id,
                        name: permission.name

                })))
            }
            return resRole

            
    }
    /**
     * setting role subrole 
     * @summary setting role subRole
     */
    @Put('/subRoleSet')
    public async setSubRole(@Body() request: ReqRoleSubRole): Promise<ResRoleSubRole>{
        const {role,subrole}=request

        const db_role=await this.rolerepository.findOne({
            where:{
                id: role,
            }
        })

        if(!db_role){
            return Promise.reject(new Error('ROLE WAS NOT FOUND'))
        }
        let db_sub_roles
        if(subrole){
             db_sub_roles=await this.rolerepository.find({
                where:{
                    id: In(subrole)
                }
            })
        }
        console.log(db_sub_roles)
        if(!db_sub_roles){
            return Promise.reject(new Error('THIS DOES NOT HAVE ANY ROLES'))
        }

        db_role.sub_role=Promise.resolve(db_sub_roles)
        
        const updatedRole=await this.rolerepository.save(db_role)
        console.log('updated role is: ', updatedRole)
        const resRoleSubRole: ResRoleSubRole={
            role: db_role,
            subrole: []
        }
        if(!updatedRole.sub_role){
            return Promise.reject(new Error('NOT FOUND'))
        }
        updatedRole.sub_role.then((subrole)=>{
            resRoleSubRole.subrole=subrole.map((r)=>{
                return {
                    description: r.description,
                    id: r.id,
                    name: r.name
                }
            })
        })
        return resRoleSubRole
    }

    @Post('/getSubRole')
    public async getSubRole(@Body() request: ReqRoleBody): Promise<ResRole[]>{
        const {id}=request

        const roles=await this.rolerepository.find({
            where:{
                id: id
            },
            relations:{
                sub_role: true
            }
        })
        if(!roles){
            return Promise.reject(new Error('ROLE NOT FOUND'))
        }

        const subRoleArr: ResRole[]=[]

        for(const role of roles){
            const subrole=await role.sub_role
            const subroleArr: ResRole[]=[]
            subrole?.forEach((d)=>{
                const resSubRole: ResRole={
                    description: d.description,
                    id: d.id,
                    name: d.name
                }
                subroleArr.push(resSubRole)

            })

            subRoleArr.push({
              
                subRole: subroleArr                
            })

        }

        return subRoleArr
    }
    /**
     * getting permissions from subrole 
     *  @summary getting permissions from subrole 
     */
    @Post('/getPermissionFromRole')
    public async getPermissionsFromRole(@Body() request: ReqRoleBody){
        const {id}=request
        const ogperms=await this.permissionrepository.find({
            where:{
                role:{
                    id: id
                }
            }
        })
        if(!ogperms){
            return Promise.reject(new Error('OG PERMS NOT FOUND '))
        }
        const subRoleInstance=await this.getSubRole(request)
        console.log("this is role", subRoleInstance)
        const roleIdArr: number[]=[]
        if(!subRoleInstance){
            return Promise.reject(new Error('NOT FOUND'))
        }
        for(const subrole of subRoleInstance){
            if(! subrole.subRole){
                return Promise.reject(new Error('SUBROLE SUBROLE NOT FOUND'))
            }
          for(const subrolee of subrole.subRole){

            roleIdArr.push(subrolee.id!)
          }
            // if()
         
        }


        console.log("subroles found", roleIdArr)

        const permissions=await this.permissionrepository.find({
            where:{
                role:{
                    id: In(roleIdArr)
                }
            }
        })

        if(!permissions){
            return Promise.reject(new Error('NOT FOUND'))
        }
        const permissionsArr: Permission[]=[]
        for(const permission of permissions ){
            permissionsArr.push(permission)
        }

        for(const ogperm of ogperms ){
            permissionsArr.push(ogperm)
        }

        return permissionsArr
    }

}