import { Router } from "express";
import { get_count } from "./controllers/get_count";

export const CountRouter = (router: Router) => {
  router.get("/counter/:userId", get_count);
};
