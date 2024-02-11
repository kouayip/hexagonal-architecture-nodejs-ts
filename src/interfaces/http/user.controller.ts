import { UserService } from "~/application/user.service";
import { User } from "~/domain/user.entity";
import { Controller, Get, Params } from "@toolibs/http-decorator";

@Controller("/users")
export default class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get("/:id")
    async getUser(@Params("id") id: string): Promise<User | null> {
        return this.userService.getUserById(id);
    }
}
