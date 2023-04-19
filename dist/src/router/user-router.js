"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controller/UserController"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/login', UserController_1.default.showFormLogin);
exports.userRouter.post('/login', UserController_1.default.login);
exports.userRouter.get('/logout', UserController_1.default.logout);
exports.userRouter.get('/register', UserController_1.default.showFormRegister);
exports.userRouter.post('/register', UserController_1.default.register);
exports.userRouter.get('/cart', UserController_1.default.showFormCart);
exports.userRouter.post('/order/:id', UserController_1.default.orderProduct);
//# sourceMappingURL=user-router.js.map