const fs = require("fs");

export const saveToDatabase = (db: any) => {
  fs.writeFileSync("./src/database/db.json", JSON.stringify(db, null, 2), {
    encoding: "utf-8",
  });
};

