import Fastify, { FastifyInstance } from "fastify";

export default class FastifyServer {
    static build(): FastifyInstance {
        const fastify = Fastify({
            logger: true,
        });

        return fastify;
    }
}
