import { UserEntity } from "./user.entity";

export interface UserRepository {
    findAll(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity | null>;
}

export abstract class UserRepositoryContract implements UserRepository {
    abstract findAll(): Promise<UserEntity[]>;
    abstract findById(id: string): Promise<UserEntity | null>;
}
