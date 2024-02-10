import UserController from "./user.controller";
import { UserService } from "~/application/user.service";
import {
    UserRepository as UserRepositoryInterface,
    UserRepository,
    UserRepositoryContract,
} from "~/domain/user.repository";
import { User } from "~/domain/user.entity";
import { Container, ContainerModule, injectable } from "inversify";

// Mock de l'implémentation du repository
@injectable()
class MockUserRepository implements UserRepository {
    public static memoryData = [
        {
            id: "123456789012345678901234",
            name: "Mock User",
            email: "mock@example.com",
        },
        {
            id: "678901231234890123454567",
            name: "John Doe",
            email: "john.doe@example.com",
        },
    ];
    async findById(id: string): Promise<User | null> {
        // Simuler la recherche d'un utilisateur par ID
        const user = MockUserRepository.memoryData.find(
            (user) => user.id === id,
        );
        return user || null;
    }

    async findAll(): Promise<User[]> {
        return MockUserRepository.memoryData;
    }
}

describe("UserController", () => {
    let container: Container;
    let userModule: ContainerModule;
    let userController: UserController;

    beforeEach(async () => {
        container = new Container({});

        // Initialisez le UserService avec le mock du repository
        userModule = new ContainerModule((bind) => {
            bind<UserRepositoryInterface>(UserRepositoryContract).to(
                MockUserRepository,
            ); // Lier UserRepository à son implémentation concrète
            bind<UserService>(UserService).toSelf();
            bind<UserController>(UserController).toSelf();
        });

        container.load(userModule);

        userController = container.get(UserController);
    });

    afterEach(() => {
        container.unload(userModule);
        container.unbindAll();
    });

    it("should be defined", () => {
        expect(userController).toBeDefined();
    });

    it("should get all users", async () => {
        const result = await userController.getAllUsers();
        expect(result).toBe(MockUserRepository.memoryData);
    });

    it("should get user by id", async () => {
        const result = await userController.getUser("123456789012345678901234");
        expect(result).toEqual({
            id: "123456789012345678901234",
            name: "Mock User",
            email: "mock@example.com",
        });
    });

    it("should return null when user id is not found", async () => {
        const result = await userController.getUser("8901234567");
        expect(result).toBeDefined();
    });
});
