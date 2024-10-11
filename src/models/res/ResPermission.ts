import { ResRole } from "./ResRole";

export interface ResPermission{
    id?: number,
    description?: string,
    
    name?: string,
    roles?: ResRole[]
}
