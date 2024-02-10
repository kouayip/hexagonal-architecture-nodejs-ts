import "reflect-metadata"; // We need this in order to use @Decorators

import FastifyServer from "~/infrastructure/fastify/server";

async function bootstrap() {
    const app = FastifyServer.build();

    // Run the server!
    app.listen({ port: 3000 }, (err, address) => {
        if (err) throw err;
        console.log(`Server is now listening on ${address}`);
    });
}

bootstrap();
