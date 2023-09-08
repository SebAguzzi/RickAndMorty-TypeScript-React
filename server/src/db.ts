import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const PRODUCTION = process.env.PRODUCTION;
const DB_DEPLOY = process.env.DB_DEPLOY;

if (PRODUCTION !== 'true' && !dbName || !dbUser || !dbPassword) {
  throw new Error(
    "Las variables de entorno de la base de datos no están configuradas."
  );
}

const sequelize =
  PRODUCTION === "true"
    ? new Sequelize(DB_DEPLOY || "", {
        dialect: "postgres",
      })
    : new Sequelize(dbName!, dbUser, dbPassword, {
        host: "localhost",
        dialect: "postgres",
        port: 5432,
      });

export default sequelize;
