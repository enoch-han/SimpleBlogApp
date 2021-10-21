import { Time } from "@angular/common";
import { GroupRequestModel } from "./group-request-model";
import { PostModel } from "./post-model";
import { UserModel } from "./user-model";

export interface GroupModel {
    id: number;
    name: string;
    admin: UserModel;
    members: UserModel[];
    createdAt: Time;
    posts: PostModel[];
    requests: GroupRequestModel[];
}
