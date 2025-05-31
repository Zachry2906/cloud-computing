import User from "./Users.js";
import Note from "./Notes.js";

export const setupRelations = () => {
  User.hasMany(Note, { foreignKey: "userId", as: "notes" });
  Note.belongsTo(User, { foreignKey: "userId", as: "user" });
};