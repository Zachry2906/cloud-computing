import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import { 
    createNote, 
    getNotes, 
    getNote, 
    updateNote, 
    deleteNote,
    getNotesByUserId,
    getArchivedNotes,
    archiveNote,
    unarchiveNote
} from "../controllers/NotesController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();



// Basic CRUD routes
router.post("/notes", createNote);           // Create note
router.get("/notes", getNotes);              // Get all notes
router.get("/notes/:id", getNote);           // Get note by ID
router.put("/notes/:id", updateNote);        // Update note by ID
router.delete("/notes/:id", deleteNote);     // Delete note by ID

// Additional note-specific routes
router.get("/users/:userId/notes", getNotesByUserId);  // Get notes by user ID
router.get("/notes/archived", getArchivedNotes);       // Get all archived notes
router.put("/notes/:id/archive", archiveNote);         // Archive a note
router.put("/notes/:id/unarchive", unarchiveNote);     // Unarchive a note

router.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'index.html'));
  });

export default router;