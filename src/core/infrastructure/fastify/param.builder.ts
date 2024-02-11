import { FastifyReply, FastifyRequest } from "fastify";

import { ParamBuilder, ParameterProps } from "@toolibs/http-decorator";

export class FastifyParamBuilder implements ParamBuilder {
    constructor(private readonly params: ParameterProps[]) {}

    dispose(): void {
        throw new Error("Method not implemented.");
    }

    build(req: FastifyRequest, reply: FastifyReply): any[] {
        const args = [];

        for (const { index, name, property, handle } of this.params) {
            switch (name) {
                case "request":
                    args[index] = req;
                    break;
                case "response":
                    args[index] = reply;
                    break;
                case "params":
                case "headers":
                case "query":
                case "body": {
                    args[index] = property ? req[name][property] : req[name];
                    break;
                }
                case "session":
                case "hostname":
                    args[index] = req[name];
                    break;
                case "ip": {
                    args[index] = req.ip;
                    break;
                }
                case "custom": {
                    const value = handle?.apply(null, [req, reply]);
                    args[index] = property ? value[property] : value;
                    break;
                }
                default: {
                    throw new Error(`${name} parameter decorator error`);
                }
            }

            // Check the value of the parameter
        }

        return args;
    }
}
