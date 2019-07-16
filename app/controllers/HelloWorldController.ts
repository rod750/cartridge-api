import { BaseController } from "./BaseController";

export class HelloWorldController extends BaseController {
    static index : Function = (fastify) => {
        return (req, reply) => {
            reply.send('Hello world!');
        };
    }
}
