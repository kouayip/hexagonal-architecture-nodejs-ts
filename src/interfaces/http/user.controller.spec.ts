import UserController from "./user.controller";
import { UserService } from "~/application/user.service";
import { UserRepository } from "~/domain/user.repository";
import { UserEntity } from "~/domain/user.entity";

//
const memoryData = [
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

// Mock de l'implémentation du repository
class MockUserRepository implements UserRepository {
    async findById(id: string): Promise<UserEntity | null> {
        // Simuler la recherche d'un utilisateur par ID
        const user = memoryData.find((user) => user.id === id);
        return user || null;
    }

    async findAll(): Promise<UserEntity[]> {
        return memoryData;
    }
}

describe("UserController", () => {
    let userController: UserController;

    beforeEach(async () => {
        // Initialisez le UserService avec le mock du repository
        const userService = new UserService(new MockUserRepository());
        userController = new UserController(userService);
    });

    it("should be defined", () => {
        expect(userController).toBeDefined();
    });

    it("should get all users", async () => {
        const result = await userController.getAllUsers();
        expect(result).toBe(memoryData);
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
