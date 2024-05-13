import { Router, Request, Response } from 'express';
import { createNote, deleteNote, editNote, getNoteById, getNotes } from '../controller/note'; // Importing controller functions

const router = Router();

// POST endpoint to create a new note
router.post('/notes', createNote);

// GET endpoint to fetch all notes with user details
router.get('/notes', getNotes);

// GET endpoint to fetch a single note by ID
router.get('/notes/:id', getNoteById);

// PUT endpoint to update a note by ID
router.put('/notes/:id', editNote);

// DELETE endpoint to delete a note by ID
router.delete('/notes/:id', deleteNote);

export default router;
