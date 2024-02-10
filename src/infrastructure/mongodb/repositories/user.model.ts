import {
    prop as Property,
    index,
    getModelForClass,
} from "@typegoose/typegoose";
import { User } from "~/domain/user.entity";
import { Types } from "mongoose";

@index({ email: 1 })
export class UserSchema implements Omit<User, "id"> {
    readonly _id!: Types.ObjectId;

    @Property({ required: true, unique: true })
    email: string;

    @Property({ required: true })
    name: string;
}

export const UserModel = getModelForClass(UserSchema);

export default UserModel;
