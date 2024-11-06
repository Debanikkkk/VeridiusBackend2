import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { AppDataSource } from "../data-source";
import { Permission } from "../entity/Permission";
import { ResPermission } from "../models/res/ResPermission";
import { ReqPermission } from "../models/req/ReqPermission";
import { Role } from "../entity/Role";
import { In } from "typeorm";
import { SetPermisisons } from "../models/req/SetPermisisons";
import { GetSetPermisisons } from "../models/res/GetSetPermissions";
import { ResSuccess } from "../models/res/Responses";
// import { In } from "typeorm";
@Tags('Permission')
@Route('role/{roleId}/permission/{permissionId}')
export class PermissionController extends Controller{
    private permissionrepository=AppDataSource.getRepository(Permission)
    private rolerepository=AppDataSource.getRepository(Role)

 /**
     * get all permissions
     * @summary get all permissions
     */
    @Get()
    public async getAllPermissions(){
        const permissions=await this.permissionrepository.find()

        if(!permissions){
            return Promise.reject(new Error('THERE WAS AN ERROR IN LOADING THE PERMISSIONS'))
        }

        const permissionArr: ResPermission[]=[]

        for(const permission of permissions){
            
        permissionArr.push({
            description: permission.description,
            id: permission.id,
            name: permission.name
        })       

        }

        return permissionArr
    }
     /**
     * delete role
     * @summary delete role
     */
    @Delete('/{permissionId}')
    public async deletePermission(@Path() permissionId: number): Promise<ResSuccess>{
        const permissiontodelete=await this.permissionrepository.findOne({
            where:{
                id: permissionId
            }
        })

        if(!permissiontodelete){
            return Promise.reject(new Error('THE PERMISSION COULD NOT BE FOUND'))
        }

        await this.permissionrepository.remove(permissiontodelete)

        return {result: "THE PERMISSION WAS DELETED SUCCESSFULLY"}
    }


    @Post()
    public async savePermission(@Body() request: ReqPermission): Promise<ResPermission>{
        const {description,name,role}=request
       let db_role;
        if(role){
        db_role=await this.rolerepository.find({
            where:{
                id: In(role)
            }
        })
       }
      if(!db_role){
        return Promise.reject(new Error('ROLE NOT FOUND'))
      }
        console.log({'this is the role from the database': db_role})
        if(!db_role){
            Promise.reject(new Error('DB ROLE NOT FOUND'))
        }
        const permissionSaver: Permission={
            name: name,
            description: description,
            role: Promise.resolve(db_role)
        }
        console.log({'this is the role permission i got': Promise.resolve(permissionSaver.role)})
        const permissiontosave=Object.assign(new Permission(), permissionSaver)
        const savedPermission=await this.permissionrepository.save(permissiontosave)

        const resPermission: ResPermission={
            description: savedPermission.description,
            id: savedPermission.id,
            name: savedPermission.name,
            roles: []
        }

        savedPermission.role?.then((r)=>{
            resPermission.roles=r.map((d)=>{
                return {
                    description: d.description,
                    id: d.id,
                    name: d.name
                }
            })
        })

        return resPermission
    }

}