import { User } from "../../Model/User";

export class AllCountStructApi {
  async userMath(userId: number | string) {
    let sum = 0;
    let overallSum = 0;
    let line = 0;
    let sortList: Array<any> = [];
    let listIdFirstLine: Array<any> = [];

    const user = await User.findOne({
      where: { id: userId },
      attributes: ["email", "id", "balance", "overallBalance"],
      raw: false,
    });
    //console.log(user, "user");

    const myUsers = await User.findAll({
      where: { leaderId: user!.getDataValue("email") },
      attributes: ["balance", "email", "id"],
      raw: false,
    });
    if (!myUsers) {
      return [0, 0, 0];
    }
    sortList = myUsers.map((e) => e.getDataValue("balance"));
    listIdFirstLine = myUsers.map((e) => e.getDataValue("email"));
    console.log(sortList, listIdFirstLine, "sort");

    overallSum = sortList.reduce(add, 0);
    sum = (sortList.reduce(add, 0) * 10) / 100;
    line = 1;

    for (let j = 0; j < 11; j++) {
      //console.log(listIdFirstLine);
      const result = await getLead(listIdFirstLine);
      listIdFirstLine = result.emailList;

      if (listIdFirstLine.length === 0) break;
      console.log(j, "j");

      if (j === 0 || j === 1) {
        console.log(line, "line");

        overallSum = overallSum + result.balanceList.reduce(add, 0);
        line = line === 2 ? 3 : 2;
        //sum = sum + (result.balanceList.reduce(add, 0) * 10) / 100;
      } else if (j === 2) {
        overallSum = overallSum + result.balanceList.reduce(add, 0);

        if (user!.getDataValue("overallBalance") > 20000) {
          //sum = sum + (result.balanceList.reduce(add, 0) * 5) / 100;
          line = 4;
        } else break;
      } else if (j === 3) {
        overallSum = overallSum + result.balanceList.reduce(add, 0);

        if (user!.getDataValue("overallBalance") >= 100000) {
          //sum = sum + (result.balanceList.reduce(add, 0) * 2.5) / 100;
          line = 5;
        } else break;
      } else if (j === 4 || j === 5) {
        break; //if (user[i].getDataValue("overallBalance") >= 100000) break;
        sum = sum + (result.balanceList.reduce(add, 0) * 1) / 100;
      } else if (j === 6 || j === 7) {
        break; //if (user[i].getDataValue("overallBalance") >= 100000) break;
        sum = sum + (result.balanceList.reduce(add, 0) * 0.5) / 100;
      } else if (j === 8 || j === 9 || j === 10) {
        break; //if (user[i].getDataValue("overallBalance") >= 100000) break;
        sum = sum + (result.balanceList.reduce(add, 0) * 0.25) / 100;
      }
    }
    await User.update(
      { openLine: line, overallSum: overallSum },
      { where: { id: userId } }
    );
    console.log(sum, line, overallSum);

    return [line, overallSum];
  }
}

function add(accumulator: any, a: any) {
  return accumulator + a;
}

const getLead = async (listId: Array<any>) => {
  let emailList: Array<any> = [];
  let balanceList: Array<any> = [];
  for (let i = 0; i < listId.length; i++) {
    const users = await User.findAll({
      where: { leaderId: listId[i] },
      attributes: ["balance", "email", "id"],
    });

    if (users.length === 0) continue;
    users.map((e) => {
      balanceList.push(e.getDataValue("balance"));
    });
    users.map((e) => {
      emailList.push(e.getDataValue("email"));
    });
  }

  return { emailList, balanceList };
};
