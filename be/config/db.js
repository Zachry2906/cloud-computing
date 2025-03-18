import { Sequelize } from "sequelize";

const db = new Sequelize("js", "root", "", {
    host: "104.197.117.136",
    dialect: "mysql",
});

export default db;