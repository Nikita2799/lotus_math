import { Router } from "express";
import { getStructPrcie } from "./controllers/getStructPrice";

export const MathRouter = (router: Router) => {
  router.get("/math/:userId", getStructPrcie);
};
