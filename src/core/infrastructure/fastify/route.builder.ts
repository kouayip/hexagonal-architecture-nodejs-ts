import { Container } from "inversify";
import { IncomingMessage, Server, ServerResponse } from "http";
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import {
    ClassType,
    ParameterProps,
    RouteBuilder,
    RouteProps,
} from "@toolibs/http-decorator";

import { FastifyParamBuilder } from "./param.builder";

export class FastifyRouteBuilder
    implements
        RouteBuilder<
            RouteHandlerMethod<Server, IncomingMessage, ServerResponse>
        >
{
    constructor(private readonly container: Container) {}

    dispose(): void {
        throw new Error("Method not implemented.");
    }

    build(target: ClassType, route: RouteProps, params: ParameterProps[]) {
        const instance = this.container.get<Object>(target);
        const handle = instance[route.methodName];

        if (typeof handle !== "function") {
            throw new Error(`Property ${route.methodName} not found`);
        }

        const paramBuilder = new FastifyParamBuilder(params);

        return async (
            req: FastifyRequest,
            reply: FastifyReply,
        ): Promise<any> => {
            try {
                //
                let args: any[];

                if (params && params.length) {
                    args = paramBuilder.build(req, reply);
                } else {
                    args = [req, reply];
                }

                const result = await (<Function>handle).apply(instance, args);

                // Check if headers have already been sent
                if (result && !reply.raw.headersSent) {
                    return reply.status(200).send(result);
                }
            } catch (err) {
                console.log(err);

                throw err;
            }
        };
    }
}
