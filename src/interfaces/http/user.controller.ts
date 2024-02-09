import { UserService } from "~/application/user.service";
import { UserEntity } from "~/domain/user.entity";

export default class UserController {
    constructor(private readonly userService: UserService) {}

    //TODO: change go use http methode decorator, use request and return response
    async getAllUsers(): Promise<UserEntity[]> {
        return this.userService.getAllUsers();
    }

    async getUser(id: string): Promise<UserEntity | null> {
        return this.userService.getUserById(id);
    }
}
