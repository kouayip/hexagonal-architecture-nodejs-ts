import "reflect-metadata"; // We need this in order to use @Decorators

import { Container } from "inversify";
import { userModule } from "./inversify.config";
import { UserService } from "~/application/user.service";

const container = new Container();

container.load(userModule);

const service = container.get(UserService);

(async () => {
    const res = await service.getAllUsers();

    console.log(res);

    container.unload(userModule);
})();
