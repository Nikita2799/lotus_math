import { AllCountStructApi } from "../Api_reposetory/MathApi/AllCountStructApi";
import { MathApi } from "../Api_reposetory/MathApi/MathApi";

export class DatabaseApi {
  public math: MathApi = new MathApi();
  public counter: AllCountStructApi = new AllCountStructApi();
}
