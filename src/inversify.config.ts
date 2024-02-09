import { ContainerModule } from "inversify";
import {
    UserRepository as UserRepositoryInterface,
    UserRepositoryContract,
} from "~/domain/user.repository";
import { UserService } from "~/application/user.service";
import InMemoryUserRepository from "~/infrastructure/inmemory/user.repository";

const userModule = new ContainerModule((bind) => {
    bind<UserRepositoryInterface>(UserRepositoryContract).to(
        InMemoryUserRepository,
    ); // Lier UserRepository à son implémentation concrète
    bind<UserService>(UserService).toSelf();
});

export { userModule };
