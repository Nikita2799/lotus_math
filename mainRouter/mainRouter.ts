import Router from "express";
import { CountRouter } from "../src/Modules/AllCountStruct/router";
import { MathRouter } from "../src/Modules/UserMath/router";
import { corsSettings } from "./corsSettings/corsSettings";

const router = Router();

router.use(corsSettings);
MathRouter(router);
CountRouter(router);
//enable pre-flight
router.options("*", corsSettings);

export default router;
