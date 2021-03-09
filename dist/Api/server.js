"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const AppRouting_1 = require("./routes/AppRouting");
const swaggerOptions = __importStar(require("../config/swagger.json"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const jwt = require('jsonwebtoken');
// import swaggerJsDoc from 'swagger-jsdoc';
// const swaggerJsDoc  = require("swagger-jsdoc");
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = process.env.PORT || '3000';
        this.router = express_1.Router();
        // this.swaggerDocs = swaggerJsDoc(swaggerOptions);
        this.middleware();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            this.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerOptions));
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
    middleware() {
        this.app.use(cors_1.default())
            .use(express_1.default.json());
    }
    validarJWT(req, res, next) {
        const token = req.header('x-token');
        if (!token) {
            return res.status(404).json({
                ok: false,
                msg: "No hay token en la peticion"
            });
        }
        try {
            const { uid } = jwt.verify(token, process.env.JWT_SECRET);
            next();
        }
        catch (err) {
            console.log(err);
            return res.status(401).json({
                ok: false,
                msg: "Token no valido "
            });
        }
    }
    routes() {
        this.app.use('/api', this.router);
        new AppRouting_1.AppRouting(this.router);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map