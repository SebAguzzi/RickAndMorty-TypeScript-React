import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carga las variables de entorno desde .env
dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

if (!dbName || !dbUser || !dbPassword) {
  throw new Error('Las variables de entorno de la base de datos no están configuradas.');
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;

