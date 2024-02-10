import { injectable } from "inversify";

import { UserService } from "~/application/user.service";
import { User } from "~/domain/user.entity";

@injectable()
export default class UserController {
    constructor(private readonly userService: UserService) {}

    //TODO: change go use http methode decorator, use request and return response
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    async getUser(id: string): Promise<User | null> {
        return this.userService.getUserById(id);
    }
}
