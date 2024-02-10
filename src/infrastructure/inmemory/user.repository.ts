import { UserRepository } from "~/domain/user.repository";
import { User } from "~/domain/user.entity";
import { injectable } from "inversify";

@injectable()
export default class InMemoryUserRepository implements UserRepository {
    private readonly memoryData: User[];

    constructor() {
        this.memoryData = [
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
    }

    async findById(id: string): Promise<User | null> {
        // Simuler la recherche d'un utilisateur par ID
        const user = this.memoryData.find((user) => user.id === id);
        return user || null;
    }

    async findAll(): Promise<User[]> {
        return this.memoryData;
    }
}
