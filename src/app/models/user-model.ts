import { RoleModel } from './role-model';
import { Time } from "@angular/common";


export interface UserModel {
    id: any;
    userName: string;
    password: string;
    email: string;
    createdAt: any;
    roles: RoleModel[];
}
