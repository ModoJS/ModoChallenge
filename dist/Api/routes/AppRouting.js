"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouting = void 0;
const card_services_1 = __importDefault(require("../../Services/card.services"));
const movement_services_1 = __importDefault(require("../../Services/movement.services"));
const statement_services_1 = __importDefault(require("../../Services/statement.services"));
const usuario_services_1 = __importDefault(require("../../Services/usuario.services"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const card_controllers_1 = __importDefault(require("../controllers/card.controllers"));
const movement_controllers_1 = __importDefault(require("../controllers/movement.controllers"));
const statement_controllers_1 = __importDefault(require("../controllers/statement.controllers"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const jwt = require('jsonwebtoken');
class AppRouting {
    constructor(route) {
        this.route = route;
        this.route = route;
        this.configure();
    }
    configure() {
        // Add the routing classes.
        this.addRoute(new card_controllers_1.default(card_services_1.default), true);
        this.addRoute(new movement_controllers_1.default(movement_services_1.default), true);
        this.addRoute(new statement_controllers_1.default(statement_services_1.default), true);
        this.addRoute(new auth_controller_1.default(usuario_services_1.default), false);
        this.addRoute(new user_controller_1.default(usuario_services_1.default), false);
    }
    validarJWT(req, res, next) {
        const token = req.header('x-token');
        if (!token) {
            return res.status(401).json({
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
    addRoute(appRoute, validate) {
        if (validate) {
            this.route.use(appRoute.route, this.validarJWT, appRoute.router);
        }
        else {
            this.route.use(appRoute.route, appRoute.router);
        }
    }
}
exports.AppRouting = AppRouting;
//# sourceMappingURL=AppRouting.js.map