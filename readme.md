## Installation

### Requirements

- Linux (Ubuntu is recommended)
- Node (https://nodejs.org)
- Postgres (recommended) or MySQL

### Instructions

- Run `npm install` and wait until dependencies are downloaded
- Create a database and assign it to an user

## Development

- Create a `.env` file on project root then copy the contents of env-sample to this file. You need to configure the following variables:

    - `JWT_SECRET` Random string for using as salt for web tokens (you can pick a codeigniter encryption key from this page https://randomkeygen.com and it will work well for that purpose)
    - `FIREBASE_TYPE` Firebase type (obtained from the firebase's private key json)
    - `FIREBASE_PROJECT_ID` (obtained from the firebase's private key json)
    - `FIREBASE_PRIVATE_KEY` (obtained from the firebase's private key json)
    - `FIREBASE_CLIENT_EMAIL` (obtained from the firebase's private key json)
    - `UPLOADS_PATH` Absolute path where the uploads will be saved **with write permissions**
- Create a new file named `config.json` on `/db`, copy the contents of `config-sample.json` to it.
- Configure the following variables in `development` object:
    - `username` database username
    - `pasword` database password
    - `host` database host
    - `dialect` orm dialect (`postgres` or `mysql`)
    - `protocol` protocol (normally `tcp` but if you are hosting the app on heroku/dokku and postgres, `postgres` value should be used.
    - `port` database port
- For using with MySQL is required to run `npm install mysql --save`
- Run `npm run db:migrate` to generate the database structure
- Run `npm run db:seed:all` to import sample data (optional)
- Run `npm run dev` to start the dev server, it will run on `http://localhost:8080`

**Commands**

Run `npm run <command>`

- `start` starts the server for production
- `build` builds the project for production
- `dev` starts the server for local development
- `docs` generates the project documentation
- `db:migrate` run pending migrations on database
- `db:migrate:undo` undoes last migration
- `db:migrate:undo:all` undoes all migrations
- `db:migration:generate -- --name <name>` generates a migration with the provided name
- `db:seed:generate -- --name <name>` generates a seed with the provided name
- `db:seed -- <filename>` run specified seed on database
- `db:seed:all` run all seeds on database
- `db:seed:undo` undoes the last seed
- `db:seed:undo:all` undoes all seeds

## Deploy

The application is Dokku compatible:

- Setup the app
- Install the postgres plugin (https://github.com/dokku/dokku-postgres)
- Create a postgres database instance and link it to the app
- Mount a persistence storage to the app for save uploads files (https://github.com/dokku/dokku/blob/master/docs/advanced-usage/persistent-storage.md)
- Set the environment variables on the instance (see the development section for reference)
- Push the app to instance repository

**For a regular linux server (without an http server):**

- Install postgres (recommended) or mysql.
- Create a database and user
- Set the environment variables listed at develop section on your server, plus the following:
    - `NODE_ENV=PRODUCTION`
    - `DATABASE_URL=protocol://user:password@host:port/database_name` (replace the data with your database conf)
    - `PORT=80` (if you want, you can use a different port)
- Install node. On Ubuntu you can run `sudo apt-get install node`. If you don't have this distro, search for the specific instructions.
- Run `npm install` followed by `npm start`

**With Apache server**

Set `PORT` environment variable to a different port to 80 and configure your virtual hosts like this:

```
<VirtualHost your.domain.com:80>   
    ServerName your.domain.com
    ProxyPass / http://localhost:PORT/ connectiontimeout=5 timeout=30  # optional timeout settings  
</VirtualHost>
```

## Architecture

### Stack
- Node
- Typescript 3.1.1
- Fastify 1.14.1
- Sequelize 4.42.0

### Folder structure

- app
    - controllers (api endpoint controllers)
    - middlewares (request middlewares)
    - models (orm models)
    - routes (routes definitions)
    - schemas (response schemas definition)
    - services (data services)
    - index.ts app main entry point
- db
    - migrations (migration files)
    - seeds (data seeds files)
    - config-sample.json (database sample config file)
- dist (this folder is generated when a build is run)
- docs (generated when running `npm run docs`)
- raml (raml api specification)
- .gitignore (ignore file)
- env-sample (.env sample file)
- sequelizerc (orm configuration)
- deploy.sh (deploy script for dokku)
- mockserver.js (mock server that uses the raml definition)
- package.json (project dependencies and command definitions)
- tsconfig.json (typescript compiler configuration)