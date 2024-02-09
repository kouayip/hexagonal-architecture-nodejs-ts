import { UserRepository as UserRepositoryInterface } from "~/domain/user.repository";
import { UserEntity } from "~/domain/user.entity";
import { UserMapper } from "~/infrastructure/mongodb/user.mapper";
import UserModel from "./user.model";

export default class UserRepository implements UserRepositoryInterface {
    async findAll(): Promise<UserEntity[]> {
        const users = await UserModel.find().lean().exec();
        return users.map((user) => UserMapper.toEntity(user));
    }

    async findById(id: string): Promise<UserEntity | null> {
        const user = await UserModel.findById(id).exec();
        return UserMapper.toEntity(user);
    }
}
