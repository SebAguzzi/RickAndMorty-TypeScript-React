"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateJwt = (userId) => {
    const secretKey = process.env.SECRETORPRIVATEKEY || "";
    const token = jsonwebtoken_1.default.sign({ userId }, secretKey, { expiresIn: "1h" });
    return token;
};
exports.generateJwt = generateJwt;
