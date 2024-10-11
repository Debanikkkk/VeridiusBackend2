import { ResPermission } from "./ResPermission";
import { ResRole } from "./ResRole";

export interface GetSetPermisisons{
    role?: ResRole;
    permissions?: ResPermission[] 
}