import { Types } from "mongoose";
import { User } from "~/domain/user.entity";
import { UserSchema } from "./user.model";

export class UserMapper {
    static toData(entity: User): UserSchema {
        return {
            _id: new Types.ObjectId(entity.id),
            name: entity.name,
            email: entity.email,
        };
    }

    static toEntity(data: UserSchema): User {
        return {
            id: data._id.toHexString(),
            email: data.email,
            name: data.name,
        };
    }
}
