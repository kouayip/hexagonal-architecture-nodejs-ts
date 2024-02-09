import { UserEntity } from "./user.entity";

export interface UserRepository {
    findAll(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity | null>;
}
