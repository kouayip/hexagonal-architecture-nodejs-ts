import { UserRepositoryContract } from "~/domain/user.repository";
import { User } from "~/domain/user.entity";
import { injectable } from "inversify";

@injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepositoryContract) {}

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async getUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }
}
