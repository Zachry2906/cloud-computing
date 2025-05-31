import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import * as noteController from "../controllers/NotesController.js";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  login,
  logout,
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { getAccessToken } from "../controllers/TokenController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();


router.get("/token", getAccessToken);

// Endpoint buat login & logout
router.post("/login", login);
router.delete("/logout", logout);

// Endpoint CRUD users
// Kita mau endpoint ini tu restricted,
// alias user yg mau akses endpoint ini harus login dulu,
// makanya kita kasih middleware fungsi verifyToken yg udah kita buat sebelumnya.
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.post("/users", createUser);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser)


router.post("/notes", verifyToken, noteController.createNote);
router.get("/notes", verifyToken, noteController.getNotes);
router.get("/notes/:id", verifyToken, noteController.getNote);
router.put("/notes/:id", verifyToken, noteController.updateNote);
router.delete("/notes/:id", verifyToken, noteController.deleteNote);
router.get("/users/:id/notes", verifyToken, noteController.getNotesByUserId); 
    

router.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'index.html'));
  });

export default router;