"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
class Helper {
    constructor() {
    }
    generarJWT(uid, expireIn = true) {
        return new Promise((resolve, reject) => {
            const payload = {
                uid,
            };
            if (expireIn) {
                jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: '12h'
                }, (err, token) => {
                    if (err) {
                        console.log(err);
                        reject('No se pudo generar el jsowebtoken');
                    }
                    else {
                        resolve(token);
                    }
                });
            }
            else {
                jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
                    if (err) {
                        console.log(err);
                        reject('No se pudo generar el jsowebtoken');
                    }
                    else {
                        resolve(token);
                    }
                });
            }
        });
    }
}
exports.default = new Helper;
//# sourceMappingURL=jwt.js.map