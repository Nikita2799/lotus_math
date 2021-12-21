import { Request, Response } from "express";
import { DatabaseApi } from "../../../API/Database/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const get_count = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const sum = await db.counter.userMath(userId);

    res.status(200).json(sum);
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: "wrong some" });
  }
};
