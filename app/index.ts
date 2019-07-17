if(process.env.NODE_ENV !== 'production')
    require('dotenv').config();

import "reflect-metadata";
import { spawn } from 'child_process';
import { ApolloServer } from 'apollo-server-fastify';
import { buildTypeDefsAndResolvers } from 'type-graphql';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const fastify = require('fastify')({ logger: true, bodyLimit: 52428800 });

fastify.register(require('fastify-sensible'));
fastify.register(require('fastify-cors'), {
    origin: '*',
    method: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
});

if(process.env.DOCS_ENABLED) {
    const oas = require('fastify-oas');
    fastify.register(oas, {
        routePrefix: '/documentation',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'OFAB API',
                description: 'OFAB Application and CMS API',
                version: '1.0.0',
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here',
            },
            servers: [
                {
                    url: 'http://localhost:8080',
                    description: 'Default local server'
                },
                {
                    url: 'https://ofab-backend-pruebas.revartsstudio.com',
                    description: 'Test server'
                }
            ],
            consumes: ['application/json'],
            produces: ['application/json'],
            securityDefinitions: {
                Bearer: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            security: [
                { Bearer: [] }
            ] 
        }
    });
}

/**
 * App Main Class
 */
class HuginServer
{
    constructor()
    {
        this.init();
    }

    async init() {
        this.connectDatabase();
        this.loadModels();
        //this.loadRoutes();
        await this.setupApolloServer();
        this.startServer();
    }
    
    /**
     * Starts the server
     */
    startServer() : void
    {
        /* Restart app on crash */
        if(process.env.NODE_ENV == 'production'){
            process.on('exit', () => {
                spawn(process.argv.shift(), process.argv, {
                    cwd: process.cwd(),
                    detached: true,
                    stdio: 'inherit'
                });
            });
        }

        var host = (process.env.NODE_ENV == 'production') ? '0.0.0.0' : '127.0.0.1';
        fastify.listen(process.env.PORT || 8080, host, (err, address) => {
            if(err) {
                fastify.log.error(err);
                process.exit();
            }
            fastify.log.info(`server listening on ${address}`);
            
            if(process.env.DOCS_ENABLED) {
                fastify.oas();
            }
        });
    }

    /**
     * Load routes files from app/routes
     */
    private loadRoutes() : void
    {
        try
        {
            var routes = fs.readdirSync(path.resolve(__dirname, 'routes'));

            routes = routes.filter((filename) => {
                return filename.match(/\.js$/gi);
            });

            routes.forEach(file => {
                let module = path.parse(file).name;
                fastify.register(require(`./routes/${module}`));
            });
        }
        catch(ex)
        {
            if(ex.code == 'ENOENT') {
                console.warn("WARNING: No routes defined");
            }
            else {
                console.error(ex);
            }
        }
    }

    /**
     * Load routes files from app/routes
     */
    private async setupApolloServer()
    {
        const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
            resolvers: [path.resolve(__dirname, 'resolvers', '**/*.js')],
            skipCheck: true
        });

        const apollo = new ApolloServer({
            typeDefs,
            resolvers,
            context: () => {
                var context: any = {};
                context.models = fastify.models;

                return context;
            },
            playground: true,
            introspection: true
        });

        fastify.register(apollo.createHandler());
    }

    /**
     * Raise and check connection to database
     * On development this info should be edited and copied to db/config.json from db/sample-config.json
     */
    private connectDatabase() : void
    {
        var databaseConfig;

        if(process.env.NODE_ENV != 'production') {
            var content = fs.readFileSync(path.resolve(__dirname, '..', 'db', 'config.json'));
            databaseConfig = JSON.parse(content).development;
        }

        const db = (databaseConfig) ?
            new Sequelize(
                databaseConfig.database,
                databaseConfig.username,
                databaseConfig.password,
                {
                    host: databaseConfig.host,
                    dialect: databaseConfig.dialect,
                    port: databaseConfig.port,
                    protocol: databaseConfig.protocol
                }
            ) :
            new Sequelize(process.env.DATABASE_URL);
        
        fastify.decorate('db', db);

        fastify
            .db
            .authenticate()
            .then(() => {
                fastify.log.info("Database connection established.");
            })
            .catch(err => {
                fastify.log.error("Unable to connect to the database:", err.original.code);
            });
    }

    /**
     * Loads modules defined in app/models
     */
    private loadModels() : void
    {
        try
        {
            var routes = fs.readdirSync(path.resolve(__dirname, 'models'));
            var models = {};

            routes = routes.filter((filename) => {
                return filename.match(/\.js$/gi);
            });

            routes.forEach(file => {
                let module = path.parse(file).name;
                models[module] = fastify.db.import(path.resolve(__dirname, 'models', module));
            });

            fastify.decorate('models', models);

            /* Create associations */
            Object.keys(models).forEach(name => {
                var model = models[name];

                if(model.associate) {
                    model.associate(models);
                }
            });
        }
        catch(ex)
        {
            if(ex.code == 'ENOENT') {
                console.warn("WARNING: No models defined");
            }
            else {
                console.error(ex);
            }
        }
    }
}

new HuginServer();
