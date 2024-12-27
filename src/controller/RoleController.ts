import { Body, Controller, Delete, Get, Path, Post, Put, Request, Route, Security, Tags } from 'tsoa';
import { Role } from '../entity/Role';
import { AppDataSource } from '../data-source';
import { ReqRole } from '../models/req/ReqRole';
import { ResRole } from '../models/res/ResRole';
import { SetPermisisons } from '../models/req/SetPermisisons';
import { GetSetPermisisons } from '../models/res/GetSetPermissions';
import { In } from 'typeorm';
import { Permission, permType } from '../entity/Permission';
// import { ReqRoleBody } from '../models/req/ReqRoleBody';
import { ResError, ResSuccess } from '../models/res/Responses';
import { ResPermission } from '../models/res/ResPermission';
import { JWTRequest } from '../models/req/JWTRequest';
import { User } from '../entity/User';
import { ReqPutRoleUnder } from '../models/req/ReqPutRoleUnder';
// import { ResPutRoleUnder } from '../models/res/ResPutRoleUnder';
// import { ResPutRoleUnder } from '../models/res/ResPutRoleUnder';
// import { create } from 'domain';
@Tags('Role')
@Route('/role')
export class RoleController extends Controller {
  private rolerepository = AppDataSource.getRepository(Role);
  private permissionrepository = AppDataSource.getRepository(Permission);
  private userrepository = AppDataSource.getRepository(User);

  @Get('/{roleId}')
  public async getOneRole(@Path() roleId: number): Promise<ResRole | ResError> {
    try {
      const role = await this.rolerepository.findOne({
        where: {
          id: roleId,
        },
        relations: {
          permissions: true,
        },
      });

      if (!role) {
        return Promise.reject(new Error('ROLE CANNOT BE FOUND'));
      }

      const resRole: ResRole = {
        description: role.description,
        id: role.id,
        name: role.name,
        // permissions:{

        // }
      };
      const resPermArr: ResPermission[] = [];
      (await role.permissions)?.map((p) => {
        const resPerm: ResPermission = {
          type: p.type!,
          description: p.description,
          id: p.id,
          name: p.name,
        };
        resPermArr.push(resPerm);
      });

      resRole.permissions = resPermArr;
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
      const roles = await this.rolerepository.find({
        relations: {
          permissions: true,
        },
      });

      if (!roles) {
        return Promise.reject(new Error('ROLES NOT FOUND'));
      }
      const roleArr: ResRole[] = [];
      const resPermArr: ResPermission[] = [];
      for (const role of roles) {
        const permissions = await role.permissions;
        let resPermission: ResPermission;
        if (permissions) {
          permissions.forEach((r) => {
            resPermission = {
              type: r.type!,
              description: r.description,
              id: r.id,
              name: r.name,
            };
            resPermArr.push(resPermission);
          });
        }
        roleArr.push({
          description: role.description,
          id: role.id,
          name: role.name,
          permissions: resPermArr,
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
  @Security('Api-Token', [])
  public async saveRole(@Body() request: ReqRole, @Request() req: JWTRequest): Promise<ResRole | ResError> {
    try {
      const user = await this.userrepository.findOne({
        where: {
          id: req.user.id,
        },
      });
      if (!user) {
        return Promise.reject(new Error('USER NOT FOUND'));
      }
      const { name, description } = request;

      const roleToSave: Role = {
        description,
        name,
        created_by: Promise.resolve(user),
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
      const created_by = savedRole.created_by;
      if (!created_by) {
        return Promise.reject(new Error('CREATED BY USER NOT FOUND'));
      }
      const super_user_role = await this.rolerepository.findOne({
        where: {
          name: 'super_admin',
        },
        relations: {
          // role: {
          permissions: true,
          // },
        },
      });
      const perm_arr: Permission[] = [];
      perm_arr.push(permissionToSaveManage);
      perm_arr.push(permissionToSaveView);
      const admin_perm_arr = perm_arr;
      // const super_user_role = super_user?.role;
      const currPerm = (await super_user_role)?.permissions;
      if (currPerm) {
        // return Promise.reject(new Error('THE CURRNET PERMISSIONS ARE EMPTY'));
        // continue
        console.log('this was empty but okay');
        for (const curr of await currPerm) {
          perm_arr.push(curr);
        }
      }

      const admin_role = await this.rolerepository.findOne({
        where: {
          name: 'admin',
        },
      });
      const created_by_perms = admin_role?.permissions;

      const admin_final_perms: Permission[] = [];
      admin_final_perms.push(...admin_perm_arr);
      if (!created_by_perms) {
        return Promise.reject(new Error('THIS PERMS WAS NOT FOUND'));
      }
      for (const ap of await created_by_perms) {
        admin_final_perms.push(ap);
      }
      const adminRoleTemp = user.role;
      if (!adminRoleTemp) {
        return Promise.reject(new Error('THIS PERMS WAS NOT FOUND'));
      }
      admin_role.permissions = Promise.resolve(admin_final_perms);
      await this.rolerepository.save(admin_role);
      if (!super_user_role) {
        return Promise.reject(new Error('this role was not found'));
      }
      super_user_role.permissions = Promise.resolve(perm_arr);
      await this.rolerepository.save(super_user_role);
      // super_user.role.permissions = currPerm;

      const resRole: ResRole = {
        description,
        id: savedRole.id,
        name: savedRole.name,
        createdBy: {
          address: (await created_by).address,
          // device: (await created_by).device,
          email: (await created_by).email,
          id: (await created_by).id,
          // is_under: (await created_by).,
          name: (await created_by).name,
          password: (await created_by).password,
          phone_number: (await created_by).phone_number,
          // role: (await created_by).,
          // service_ticket: (await created_by).,
        },
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
  @Put('{roleId}/setPermissions')
  public async givePermissionToRole(@Body() request: SetPermisisons, roleId: number): Promise<GetSetPermisisons | ResError> {
    try {
      const { permissions } = request;

      const db_role = await this.rolerepository.findOne({
        where: {
          id: roleId,
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
      createdBy: {
        address: (await updatedRole.created_by)?.address,
        email: (await updatedRole.created_by)?.email,
        id: (await updatedRole.created_by)?.id,
        name: (await updatedRole.created_by)?.name,
        password: (await updatedRole.created_by)?.password,
        phone_number: (await updatedRole.created_by)?.phone_number,
      },
    };
    return resUpdatedRole;
  }

  /**
   * getting permissions from subrole
   *  @summary getting permissions from subrole
   */
  @Post('/{roleId}')
  public async getPermissionsFromRole(@Path() roleId: number) {
    try {
      // const { id } = request;
      const ogperms = await this.permissionrepository.find({
        where: {
          role: {
            id: roleId,
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

  @Put('/putRoleUnder/{role_main_id}')
  public async putRoleUnder(@Body() request: ReqPutRoleUnder, @Path() role_main_id: number) {
    const { role_sub } = request;
    // console.log(role_main);
    const role_main_db = await this.rolerepository.findOne({
      where: {
        id: role_main_id,
      },
    });

    const role_sub_db = await this.rolerepository.findOne({
      where: {
        id: role_sub,
      },
    });

    if (!role_main_db) {
      return Promise.reject(new Error('THIS ROLE MAIN WAS NOT FOUND'));
    }

    if (!role_sub_db) {
      return Promise.reject(new Error('THIS ROLE SUB WAS NOT FOUND'));
    }

    const sub_role_set = role_sub_db.permissions;
    const mainPermArr = role_main_db.permissions;

    const total_perm_arr: Permission[] = [];

    if (!mainPermArr) {
      return Promise.reject(new Error('THESE PERMISSIONS WERE NOT FOUND'));
    }
    for (const mp of await mainPermArr) {
      total_perm_arr.push(mp);
    }

    if (!sub_role_set) {
      return Promise.reject(new Error('THESE PERMISSIONS WERE NOT FOUND'));
    }

    for (const sr of await sub_role_set) {
      total_perm_arr.push(sr);
    }
    // if(total_perm_arr){

    // }
    const viewperm = await this.permissionrepository.findOne({
      where: {
        name: 'view' + role_sub_db.name,
      },
    });
    console.log('this s the view perm', viewperm);
    const manageperm = await this.permissionrepository.findOne({
      where: {
        name: 'manage' + role_sub_db.name,
      },
    });
    console.log('this s the manage perm', manageperm);

    if (manageperm) {
      console.log('this was found');
      total_perm_arr.push(manageperm);
    }

    if (viewperm) {
      console.log('this was found');

      total_perm_arr.push(viewperm);
    }

    role_main_db.permissions = Promise.resolve(total_perm_arr);

    const newRolePermission = await this.rolerepository.save(role_main_db);
    if (!newRolePermission) {
      return Promise.reject(new Error('THESE PERMISSIONS WERE NOT FOUND'));
    }

    return { result: `the role ${role_sub_db.name} has been put under ${role_main_db.name} ` };
  }
}
