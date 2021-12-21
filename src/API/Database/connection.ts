import { Sequelize } from "sequelize";
import config from "../../../config/config";

export const connection = new Sequelize(
  config.database.database!,
  config.database.user!,
  config.database.password!,
  {
    host: config.database.host,
    dialect: "mysql",
    port: 3306,
    pool: {
      max: 5,
      min: 0,

      acquire: 60000,
      idle: 22000,
    },
  }
);
