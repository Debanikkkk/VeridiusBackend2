"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
require("reflect-metadata");
const data_source_1 = require("./data-source");
const envVars_1 = require("./utils/envVars");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./tsoa-auto/routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const tsoa_1 = require("tsoa");
const swagger_json_1 = __importDefault(require("./tsoa-auto/swagger.json"));
const ResErrors_1 = require("./models/res/ResErrors");
const fs = __importStar(require("fs"));
const cronjob_1 = require("./cronjob");
// Initialize database and start server
data_source_1.AppDataSource.initialize()
    .then(async () => {
    data_source_1.AppDataSource.runMigrations({ transaction: 'each' });
    const app = (0, express_1.default)();
    // CORS options
    const allowedOrigins = [...envVars_1.envs.CORS_ALLOWED_ORIGINS, 'http://localhost:3000', 'http://localhost:3001', 'https://chronicpestcontrolagencies.org'];
    const options = { origin: allowedOrigins };
    // Create uploads directory if it doesn’t exist
    const dir = './public/uploads/';
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });
    app.use((0, cors_1.default)(options));
    app.use(bodyParser.json());
    app.use('/public/uploads', express_1.default.static('./public/uploads'));
    // Swagger docs
    app.use('/docs', swagger_ui_express_1.default.serve, async (_req, res) => res.send(swagger_ui_express_1.default.generateHTML(swagger_json_1.default)));
    // Register TSOA routes
    (0, routes_1.RegisterRoutes)(app);
    // Error handling
    app.use((err, req, res, next) => {
        if (err instanceof tsoa_1.ValidateError) {
            console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
            return res.status(422).json({ message: 'Validation Failed', details: err.fields });
        }
        if (err instanceof ResErrors_1.ResponseError) {
            return res.status(err.statusCode).json({ message: err.message });
        }
        if (err instanceof Error) {
            console.log('Internal Server Error: ', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        next();
    });
    // Start cron job
    cronjob_1.updateStatusCron.start();
    // Start Express server
    app.listen(envVars_1.envs.PORT, () => {
        console.log(`Express server has started on port ${envVars_1.envs.PORT}`);
        console.log(`Open http://localhost:${envVars_1.envs.PORT}/docs to see Swagger docs`);
    });
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map