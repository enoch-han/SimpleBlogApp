import { GroupModel } from './group-model';
import { GroupRequestModel } from './group-request-model';
import { Time } from '@angular/common';
import { UserModel } from './user-model';
export interface PostModel {
    id: number;
    group: GroupModel;
    user: UserModel;
    message: string;
    createdAt: Date;
}
