import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from 'tsoa';
import { Role } from '../entity/Role';
import { AppDataSource } from '../data-source';
import { ReqRole } from '../models/req/ReqRole';
import { ResRole } from '../models/res/ResRole';
import { SetPermisisons } from '../models/req/SetPermisisons';
import { GetSetPermisisons } from '../models/res/GetSetPermissions';
import { In } from 'typeorm';
import { Permission, permType } from '../entity/Permission';
import { ReqRoleBody } from '../models/req/ReqRoleBody';
import { ResError, ResSuccess } from '../models/res/Responses';
@Tags('Role')
@Route('/role')
export class RoleController extends Controller {
  private rolerepository = AppDataSource.getRepository(Role);
  private permissionrepository = AppDataSource.getRepository(Permission);

  @Get('/{roleId}')
  public async getOneRole(@Path() roleId: number): Promise<ResRole | ResError> {
    try {
      const role = await this.rolerepository.findOne({
        where: {
          id: roleId,
        },
      });

      if (!role) {
        return Promise.reject(new Error('ROLE CANNOT BE FOUND'));
      }

      const resRole: ResRole = {
        description: role.description,
        id: role.id,
        name: role.name,
      };

      return resRole;
    } catch (error) {
      console.log('there was an errror in fetching the role', error);
      return { error: 'failed to load the role' };
    }
  }

  /**
   * get all the roles
   * @summary get all the roles
   */
  @Get()
  public async getAllRole(): Promise<ResRole[] | ResError> {
    try {
      const roles = await this.rolerepository.find();

      const roleArr: ResRole[] = [];

      for (const role of roles) {
        roleArr.push({
          description: role.description,
          id: role.id,
          name: role.name,
        });
      }

      return roleArr;
    } catch (error) {
      console.log('there was an errror in fetching the ', error);
      return { error: 'failed to load the ' };
    }
  }

  @Delete('/{roleId}')
  public async deleteRole(@Path() roleId: number): Promise<ResSuccess | ResError> {
    try {
      const roletodelete = await this.rolerepository.findOne({
        where: {
          id: roleId,
        },
      });

      if (!roletodelete) {
        return Promise.reject(new Error('ROLE CANNOT BE FOUND'));
      }

      await this.rolerepository.remove(roletodelete);
      return { result: 'THE ROLE WAS DELETED SUCCESSFULLY' };
    } catch (error) {
      console.log('there was an errror in delete the role', error);
      return { error: 'failed to delete the role ' };
    }
  }
  /**
   * save role
   * @summary save role
   */
  @Post()
  public async saveRole(@Body() request: ReqRole): Promise<ResRole | ResError> {
    try {
      const { name, description } = request;

      const roleToSave: Role = {
        description: description,
        name: name,
      };

      const roleSaver = Object.assign(new Role(), roleToSave);
      const savedRole = await this.rolerepository.save(roleSaver);

      const roleArr: Role[] = [];
      roleArr.push(savedRole);
      const permissionToSaveManage: Permission = {
        name: 'manage' + name,
        description: 'management permissions of ' + name,
        role: Promise.resolve(roleArr),
        type: permType.user,
      };

      const permissionToSaveView: Permission = {
        name: 'view' + name,
        description: 'view related permissions of ' + name,
        role: Promise.resolve(roleArr),
        type: permType.user,
      };
      await this.permissionrepository.save(permissionToSaveManage);
      await this.permissionrepository.save(permissionToSaveView);
      const resRole: ResRole = {
        description,
        id: savedRole.id,
        name: savedRole.name,
      };
      return resRole;
    } catch (error) {
      console.log('there was an errror in saving the role', error);
      return { error: 'failed to save the role' };
    }
  }

  /**
   * allot permissions to a role
   * @summary allot permissions to a role
   */
  @Put('/setPermissions')
  public async givePermissionToRole(@Body() request: SetPermisisons): Promise<GetSetPermisisons | ResError> {
    try {
      const { role, permissions } = request;

      const db_role = await this.rolerepository.findOne({
        where: {
          id: role,
        },
      });
      if (!db_role) {
        return Promise.reject(new Error('ROLE NOT FOUND'));
      }
      let db_permission;
      if (permissions) {
        db_permission = await this.permissionrepository.find({
          where: {
            id: In(permissions),
          },
        });
      }
      if (!db_permission) {
        return Promise.reject(new Error('PERMISSION NOT FOUND'));
      }

      db_role.permissions = Promise.resolve(db_permission);

      const updatedRole = await this.rolerepository.save(db_role);

      const rPerm = updatedRole.permissions;
      const resRole: GetSetPermisisons = {
        role: {
          id: updatedRole.id,
          name: updatedRole.name,
          description: updatedRole.description,
        },
        permissions: (await rPerm)?.map((permission) => ({
          description: permission.description,
          id: permission.id,
          name: permission.name,
          type: permission.type!,
        })),
      };
      return resRole;
    } catch (error) {
      console.log('there was an errror in setting the permissions to the given role ', error);
      return { error: 'failed to set the permissions to the role' };
    }
  }

  /**
   * update role API
   * @summary UPDATE ROLE
   */
  @Put('/{roleId}')
  public async updateRole(@Body() req: ReqRole, @Path() roleId: number): Promise<ResRole> {
    const { description, name } = req;

    const role = await this.rolerepository.findOne({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      return Promise.reject(new Error('ROLE NOT FOUND'));
    }

    (role.description = description), (role.name = name);

    const updatedRole = await this.rolerepository.save(role);

    const resUpdatedRole: ResRole = {
      description: updatedRole.description,
      id: updatedRole.id,
      name: updatedRole.name,
    };
    return resUpdatedRole;
  }

  /**
   * getting permissions from subrole
   *  @summary getting permissions from subrole
   */
  @Post('/{roleId}')
  public async getPermissionsFromRole(@Body() request: ReqRoleBody) {
    try {
      const { id } = request;
      const ogperms = await this.permissionrepository.find({
        where: {
          role: {
            id: id,
          },
        },
      });
      if (!ogperms) {
        return Promise.reject(new Error('OG PERMS NOT FOUND '));
      }

      const permissionsArr: Permission[] = [];

      for (const ogperm of ogperms) {
        permissionsArr.push(ogperm);
      }

      return permissionsArr;
    } catch (error) {
      console.log('there was an errror in fetching the permissions from the role');
      return { error: 'failed to load the permissions from the role' };
    }
  }
}
