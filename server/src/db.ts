import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const PRODUCTION = process.env.PRODUCTION;
const DB_DEPLOY = process.env.DB_DEPLOY;


const sequelize =
  PRODUCTION === "true"
    ? new Sequelize(DB_DEPLOY || "", {
        dialect: "postgres",
      })
    : new Sequelize(dbName!, dbUser!, dbPassword!, {
        host: "localhost",
        dialect: "postgres",
        port: 5432,
      });

export default sequelize;
