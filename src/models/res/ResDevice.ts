import { ResDongle } from "./ResDongle";
import { ResUser } from "./ResUser";

export interface ResDevice{
       id?: number,
       mac_address?: string,
       name?: string,
       user?: ResUser,
       dongle?: ResDongle | null
}