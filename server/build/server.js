"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/auth', authRoutes_1.default);
const PORT = process.env.PORT || 3001;
db_1.default
    .sync()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});
