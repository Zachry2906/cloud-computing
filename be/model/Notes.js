import { Sequelize } from "sequelize";
import db from "../config/db.js";
import User from "./Users.js"; // Import model User untuk relasi

const Note = db.define(
  "note", // Ubah nama tabel menjadi "note" (lebih sesuai)
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Nama tabel user
        key: "id",
      },
    },
    category: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isArchived: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  }
);

export default Note;