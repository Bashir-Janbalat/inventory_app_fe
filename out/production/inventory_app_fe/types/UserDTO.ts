import {RoleDTO} from "./RoleDTO.ts";

export interface UserDTO {
    id:number;
    name: string;
    username: string;
    email: string;
    rolesDTO: RoleDTO[];
    active: boolean;
}