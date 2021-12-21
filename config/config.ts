require("dotenv").config();

const config = {
  server: {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    PREFIX: "/api",
  },
  security: {
    TOKEN: process.env.jwt,
    SECRET: process.env.secret_key,
  },
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
};

export default config;
