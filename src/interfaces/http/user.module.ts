import { ContainerModule } from "inversify";

import {
    UserRepository as UserRepositoryInterface,
    UserRepositoryContract,
} from "~/domain/user.repository";
import { UserService } from "~/application/user.service";
import InMemoryUserRepository from "~/infrastructure/inmemory/user.repository";

import UserController from "./user.controller";

export const userModule = new ContainerModule((bind) => {
    bind<UserRepositoryInterface>(UserRepositoryContract)
        .to(InMemoryUserRepository)
        .inSingletonScope();
    bind<UserService>(UserService).toSelf().inSingletonScope();
    bind<UserController>(UserController).toSelf().inSingletonScope();
});
