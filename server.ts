import express from "express";
import config from "./config/config";
import router from "./mainRouter/mainRouter";

const app = express();

declare global {
  namespace Express {
    interface Request {
      user: any;
      middel: any;
    }
  }
}

app.use(express.json());
app.use("/api", router);
app.use(express.urlencoded({ extended: true }));

app.listen(config.server.PORT, () => {
  console.log(`Server start on: ${config.server.HOST} ${config.server.PORT}`);
});
