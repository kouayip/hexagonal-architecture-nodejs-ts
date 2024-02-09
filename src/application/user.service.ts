import { UserRepository } from "~/domain/user.repository";
import { UserEntity } from "~/domain/user.entity";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.findAll();
    }

    async getUserById(id: string): Promise<UserEntity | null> {
        return this.userRepository.findById(id);
    }
}
