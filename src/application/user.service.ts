import { UserRepositoryContract } from "~/domain/user.repository";
import { UserEntity } from "~/domain/user.entity";
import { injectable } from "inversify";

@injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepositoryContract) {}

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.findAll();
    }

    async getUserById(id: string): Promise<UserEntity | null> {
        return this.userRepository.findById(id);
    }
}
