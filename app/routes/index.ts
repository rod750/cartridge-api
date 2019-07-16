import { HelloWorldController } from '../controllers/HelloWorldController';

/** Rutas para usuario actual */
module.exports = function index(fastify, opts, next) {
    fastify.get('/', {}, HelloWorldController.index(fastify));
    next();
};
