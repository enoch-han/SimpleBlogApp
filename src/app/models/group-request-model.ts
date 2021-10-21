import { UserModel } from './user-model';
import { GroupModel } from './group-model';
export interface GroupRequestModel {
    id: number;
    group: GroupModel;
    user: UserModel;
    approval: boolean;
}
