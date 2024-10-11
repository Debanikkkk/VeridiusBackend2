import { Body, Controller, Post, Put, Route, Tags } from "tsoa";
import { AppDataSource } from "../data-source";
import { Permission } from "../entity/Permission";
import { ResPermission } from "../models/res/ResPermission";
import { ReqPermission } from "../models/req/ReqPermission";
import { Role } from "../entity/Role";
import { In } from "typeorm";
import { SetPermisisons } from "../models/req/SetPermisisons";
import { GetSetPermisisons } from "../models/res/GetSetPermissions";
// import { In } from "typeorm";
@Tags('Permission')
@Route('role/{roleId}/permission/{permissionId}')
export class PermissionController extends Controller{
    private permissionrepository=AppDataSource.getRepository(Permission)
    private rolerepository=AppDataSource.getRepository(Role)

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