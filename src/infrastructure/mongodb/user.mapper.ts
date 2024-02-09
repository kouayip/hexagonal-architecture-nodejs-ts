import { UserEntity } from "~/domain/user.entity";
import { UserSchema } from "~/infrastructure/mongodb/user.model";
import { Types } from "mongoose";

export class UserMapper {
    static toData(entity: UserEntity): UserSchema {
        return {
            _id: new Types.ObjectId(entity.id),
            name: entity.name,
            email: entity.email,
        };
    }

    static toEntity(data: UserSchema): UserEntity {
        return {
            id: data._id.toHexString(),
            email: data.email,
            name: data.name,
        };
    }
}
