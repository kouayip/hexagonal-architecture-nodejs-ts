import { User } from "./user.entity";

export interface UserRepository {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
}

export abstract class UserRepositoryContract implements UserRepository {
    abstract findAll(): Promise<User[]>;
    abstract findById(id: string): Promise<User | null>;
}
