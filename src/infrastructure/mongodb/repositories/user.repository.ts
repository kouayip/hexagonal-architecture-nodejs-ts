import { injectable } from "inversify";

import { UserRepository as UserRepositoryInterface } from "~/domain/user.repository";
import { User } from "~/domain/user.entity";
import { UserMapper } from "./user.mapper";
import UserModel from "./user.model";

@injectable()
export default class UserRepository implements UserRepositoryInterface {
    async findAll(): Promise<User[]> {
        const users = await UserModel.find().lean().exec();
        return users.map((user) => UserMapper.toEntity(user));
    }

    async findById(id: string): Promise<User | null> {
        const user = await UserModel.findById(id).exec();
        return UserMapper.toEntity(user);
    }
}
