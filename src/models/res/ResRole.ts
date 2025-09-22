import {ResPermission} from './ResPermission'
export interface ResRole{
    id?: number,
    name?: string,
    description?: string,
    permissions?:ResPermission
}