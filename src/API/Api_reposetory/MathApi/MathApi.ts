import { User } from "../../Model/User";

export class MathApi {
  async userMath(userId: number | string) {
    let sortList: Array<any> = [];
    let listIdFirstLine: Array<any> = [];

    const user = await User.findAll({
      attributes: ["email", "id", "balance", "overallBalance"],
      raw: false,
    });
    //console.log(user, "user");

    for (let i = 0; i < user.length; i++) {
      let sum = 0;
      let overallSum = 0;
      let countMyPeople = 0;
      if (user![i].getDataValue("balance") === 0) continue;
      const myUsers = await User.findAll({
        where: { leaderId: user![i].getDataValue("email") },
        attributes: ["balance", "email", "id"],
        raw: false,
      });
      if (!myUsers) {
        continue;
      }
      sortList = myUsers.map((e) => e.getDataValue("balance"));
      listIdFirstLine = myUsers.map((e) => e.getDataValue("email"));
      console.log(sortList, listIdFirstLine, "sort");

      overallSum = sortList.reduce(add, 0);
      sum = (sortList.reduce(add, 0) * 10) / 100;
      console.log(
        overallSum,
        sum,
        `first line user ${user[i].getDataValue("email")}`
      );

      for (let j = 0; j < 11; j++) {
        //console.log(listIdFirstLine);
        const result = await getLead(listIdFirstLine);
        listIdFirstLine = result.emailList;
        countMyPeople = countMyPeople + result.emailList.length;
        console.log(
          result,
          `result line leader for user ${user[i].getDataValue("email")}`,
          j,
          "counter"
        );

        if (listIdFirstLine.length === 0) break;
        console.log(j);

        if (j === 0 || j === 1) {
          overallSum = overallSum + result.balanceList.reduce(add, 0);

          await User.update(
            {
              overallBalance:
                overallSum + user[i].getDataValue("overallBalance"),
            },
            { where: { id: user[i].getDataValue("id") } }
          );
          sum = sum + (result.balanceList.reduce(add, 0) * 10) / 100;
          console.log(
            overallSum,
            sum,
            `sum and overall second and third for user ${"counter " + j} ${user[
              i
            ].getDataValue("email")}`
          );
        }
        if (j === 2) {
          overallSum = overallSum + result.balanceList.reduce(add, 0);
          await User.update(
            {
              overallBalance:
                overallSum + user[i].getDataValue("overallBalance"),
            },
            { where: { id: user[i].getDataValue("id") } }
          );
          console.log(
            user[i].getDataValue("overallBalance"),
            `allbalance 4 line ${j}`
          );

          if (user[i].getDataValue("overallBalance") > 20000) {
            sum = sum + (result.balanceList.reduce(add, 0) * 5) / 100;
            console.log(
              overallSum,
              sum,
              `sum and overall four for user ${"counter " + j} ${user[
                i
              ].getDataValue("email")}`
            );
          } else break;
        }
        if (j === 3) {
          overallSum = overallSum + result.balanceList.reduce(add, 0);
          await User.update(
            {
              overallBalance:
                overallSum + user[i].getDataValue("overallBalance"),
            },
            { where: { id: user[i].getDataValue("id") } }
          );
          if (user[i].getDataValue("overallBalance") >= 100000) {
            sum = sum + (result.balanceList.reduce(add, 0) * 2.5) / 100;
            console.log(
              overallSum,
              sum,
              `sum and overall five for user ${"counter " + j} ${user[
                i
              ].getDataValue("email")}`
            );
          } else break;
        }
        if (j === 4 || j === 5) {
          break; //if (user[i].getDataValue("overallBalance") >= 100000) break;
          sum = sum + (result.balanceList.reduce(add, 0) * 1) / 100;
        }
        if (j === 6 || j === 7) {
          break; //if (user[i].getDataValue("overallBalance") >= 100000) break;
          sum = sum + (result.balanceList.reduce(add, 0) * 0.5) / 100;
        }
        if (j === 8 || j === 9 || j === 10) {
          break; //if (user[i].getDataValue("overallBalance") >= 100000) break;
          sum = sum + (result.balanceList.reduce(add, 0) * 0.25) / 100;
        }
      }
      await User.update(
        { bonusBalance: sum, countMyPeople: countMyPeople, balance: 0 },
        { where: { id: user[i].getDataValue("id") } }
      );
    }

    return "sum";
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
