import { Container } from "inversify";
import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import {
    ClassType,
    ControllerBuilder,
    ReflectControllerMetadata,
    ReflectHandleMetadata,
    ReflectParamMetadata,
} from "@toolibs/http-decorator";

import { FastifyRouteBuilder } from "./route.builder";

export class FastifyControllerBuilder implements ControllerBuilder {
    constructor(
        private readonly app: FastifyInstance<
            Server,
            IncomingMessage,
            ServerResponse
        >,
        private readonly container: Container,
    ) {}

    dispose(): void {
        throw new Error("Method not implemented.");
    }

    build(controller: ClassType) {
        const controllerMetadata =
            ReflectControllerMetadata.getMetadata(controller);

        const paramMetadata = ReflectParamMetadata.getMetadata(controller);

        const routeMetadata = ReflectHandleMetadata.getMetadata(controller);

        const routeBuilder = new FastifyRouteBuilder(this.container);

        this.app.register(
            async (instance) => {
                for (const key in routeMetadata) {
                    const props = routeMetadata[key];
                    const paramProps = paramMetadata[props.methodName];

                    const handler = routeBuilder.build(
                        controllerMetadata.target,
                        props,
                        paramProps,
                    );

                    instance.route({
                        method: props.method,
                        url: props.path.toString(),
                        handler,
                    });
                }
            },
            { prefix: controllerMetadata.prefix },
        );
    }
}
