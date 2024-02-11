import Fastify, { FastifyInstance } from "fastify";
import { Container } from "inversify";
import UserController from "~/interfaces/http/user.controller";
import { FastifyControllerBuilder } from "~/core/infrastructure/fastify";
import { userModule } from "~/interfaces/http/user.module";

export default class FastifyServer {
    static build(container: Container): FastifyInstance {
        const fastify = Fastify({
            logger: true,
        });

        container.load(userModule);

        const builder = new FastifyControllerBuilder(fastify, container);

        builder.build(UserController);

        return fastify;
    }
}
