"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const envVars_1 = require("./utils/envVars");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: envVars_1.envs.DB_HOST,
    port: envVars_1.envs.DB_PORT,
    username: envVars_1.envs.DB_USERNAME,
    password: envVars_1.envs.DB_PASSWORD,
    database: envVars_1.envs.DB_DBNAME,
    synchronize: false,
    logging: true,
    entities: [__dirname + '/entity/**/*.{ts,js}'],
    // entities: [SesCategory],
    migrations: [__dirname + '/migration/**/*.{ts,js}'],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map