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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserInFirebase = exports.users = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const admin = __importStar(require("firebase-admin"));
const generateJwt_1 = require("../utils/generateJwt");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const userRecord = yield admin
            .auth()
            .getUserByEmail(username)
            .catch(() => null);
        const existingUser = yield User_1.default.findOne({ where: { username } });
        if (userRecord || existingUser) {
            return res.status(401).json({
                message: "Email address is already in use.",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield User_1.default.create({
            username,
            password: hashedPassword,
        });
        yield (0, exports.createUserInFirebase)(username, password);
        return res.status(201).json({ message: "Registration successful." });
    }
    catch (error) {
        console.error("Registration error:", error);
        return res
            .status(500)
            .json({ message: "An error occurred on the server." });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Please fill in all fields." });
        }
        const existingUser = yield User_1.default.findOne({ where: { username } });
        if (!existingUser) {
            return res.status(400).json({ message: "Username does not exist." });
        }
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password." });
        }
        const token = (0, generateJwt_1.generateJwt)(existingUser.id);
        return res.status(200).json({ message: "Login successful.", token });
    }
    catch (error) {
        console.error("Login error:", error);
        return res
            .status(500)
            .json({ message: "An error occurred on the server." });
    }
});
exports.login = login;
const users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.findAll();
        return res.status(200).json({ users });
    }
    catch (error) {
        console.error("User listing error:", error);
        return res
            .status(500)
            .json({ message: "An error occurred on the server." });
    }
});
exports.users = users;
const createUserInFirebase = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Crea el usuario en Firebase Authentication
    const userRecord = yield admin.auth().createUser({
        email,
        password,
    });
});
exports.createUserInFirebase = createUserInFirebase;
