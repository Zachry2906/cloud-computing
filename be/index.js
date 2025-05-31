import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import "dotenv/config";
import cookieParser from "cookie-parser";
import userRoutes from './routes/noteRoutes.js'; // Sesuaikan path dengan struktur proyekmu
import db from "./config/db.js";
import { setupRelations } from "./model/Relation.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const syncDatabase = async () => {
  try {
    await db.sync({ alter: true }); // Gunakan { force: true } untuk reset tabel, atau { alter: true } untuk update
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

syncDatabase();
setupRelations(); // Setup relations setelah mendefinisikan model
// Middleware

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3001", // <- Diganti sama alamat front-end
    credentials: true,
  })
);
app.use(express.json());

app.use('/view', express.static(path.join(__dirname, 'view')));

// Or if you want direct access to index.html at /view:
app.get('/view', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

// Gunakan route user dengan prefix "/api"
app.use('/api', userRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
