import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Permission } from '../entity/Permission';
import { ResPermission } from '../models/res/ResPermission';
import { ReqPermission } from '../models/req/ReqPermission';
import { Role } from '../entity/Role';
import { In } from 'typeorm';

import { ResError, ResSuccess } from '../models/res/Responses';
// import { In } from "typeorm";
@Tags('Permission')
@Route('/permission')
export class PermissionController extends Controller {
  private permissionrepository = AppDataSource.getRepository(Permission);
  private rolerepository = AppDataSource.getRepository(Role);

  /**
   * get all permissions
   * @summary get all permissions
   */
  @Get()
  public async getAllPermissions() {
    try {
      const permissions = await this.permissionrepository.find();

      if (!permissions) {
        return Promise.reject(new Error('THERE WAS AN ERROR IN LOADING THE PERMISSIONS'));
      }

      const permissionArr: ResPermission[] = [];

      for (const permission of permissions) {
        if (!permission.type) {
          return Promise.reject(new Error('permission type not found'));
        }
        permissionArr.push({
          description: permission.description,
          id: permission.id,
          name: permission.name,
          type: permission.type,
        });
      }

      return permissionArr;
    } catch (error) {
      console.log('there was an errror in fetching the permissions', error);
      return { error: 'failed to load the permissions' };
    }
  }
  /**
   * delete role
   * @summary delete role
   */
  @Delete('/{permissionId}')
  public async deletePermission(@Path() permissionId: number): Promise<ResSuccess | ResError> {
    try {
      const permissiontodelete = await this.permissionrepository.findOne({
        where: {
          id: permissionId,
        },
      });

      if (!permissiontodelete) {
        return Promise.reject(new Error('THE PERMISSION COULD NOT BE FOUND'));
      }

      await this.permissionrepository.remove(permissiontodelete);

      return { result: 'THE PERMISSION WAS DELETED SUCCESSFULLY' };
    } catch (error) {
      console.log('there was an errror in fetching the ', error);
      return { error: 'failed to load the ' };
    }
  }

  @Post()
  public async savePermission(@Body() request: ReqPermission): Promise<ResPermission | ResError> {
    try {
      const { description, name, role, type } = request;
      let db_role;
      if (role) {
        db_role = await this.rolerepository.find({
          where: {
            id: In(role),
          },
        });
      }
      if (!db_role) {
        return Promise.reject(new Error('ROLE NOT FOUND'));
      }
      console.log({ 'this is the role from the database': db_role });
      if (!db_role) {
        return Promise.reject(new Error('DB ROLE NOT FOUND'));
      }
      const permissionSaver: Permission = {
        name: name,
        description: description,
        role: Promise.resolve(db_role),
      };
      console.log({ 'this is the role permission i got': Promise.resolve(permissionSaver.role) });
      const permissiontosave = Object.assign(new Permission(), permissionSaver);
      const savedPermission = await this.permissionrepository.save(permissiontosave);
      if (!type) {
        return Promise.reject(new Error('PERM TYPE NOT FOUND'));
      }
      const resPermission: ResPermission = {
        description: savedPermission.description,
        id: savedPermission.id,
        name: savedPermission.name,
        roles: [],
        type: type,
      };

      savedPermission.role?.then((r) => {
        resPermission.roles = r.map((d) => {
          return {
            description: d.description,
            id: d.id,
            name: d.name,
          };
        });
      });

      return resPermission;
    } catch (error) {
      console.log('there was an errror in saving the permission', error);
      return { error: 'failed to save the permission' };
    }
  }

  @Get('getUserPerms/{userId}')
  public async getPermissionsOfUser(@Path() userId: number) {
    try {
      const permissions = await this.permissionrepository.find({
        where: {
          role: {
            users: {
              id: userId,
            },
          },
        },
        relations: {
          role: true,
        },
      });

      const permissionArr: ResPermission[] = [];

      for (const permission of permissions) {
        permissionArr.push({
          type: permission.type!,
          description: permission.description,
          id: permission.id,
          name: permission.name,
        });
      }

      return permissionArr;
    } catch (error) {
      console.log('there was an errror in fetching the permissions for the user', userId, error);
      return { error: 'failed to load the permissions for the user' };
    }
  }
}
