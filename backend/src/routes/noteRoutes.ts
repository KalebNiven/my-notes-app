import { Router, Request, Response } from 'express';
import { models } from '../models/index';  // Adjust the path as necessary

// You can access models like this
const { User, Note } = models;
const router = Router();

// POST endpoint to create a new note
router.post('/notes', async (req: Request, res: Response) => {
    const { content, userId } = req.body;
    try {
        const newNote = await Note.create({ content, userId });
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create note: ' + (error as Error).message });
    }
});

// GET endpoint to fetch all notes with user details
router.get('/notes', async (req: Request, res: Response) => {
    try {
        const notes = await Note.findAll({
            include: [{ model: User, as: 'user' }]
        });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve notes: ' + (error as Error).message });
    }
});

// GET endpoint to fetch a single note by ID
router.get('/notes/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const note = await Note.findByPk(id, {
            include: [{ model: User, as: 'user' }]
        });
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            res.json(note);
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve note: ' + (error as Error).message });
    }
});

// PUT endpoint to update a note by ID
router.put('/notes/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const note = await Note.findByPk(id);
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            note.content = content;
            await note.save();
            res.json(note);
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update note: ' + (error as Error).message });
    }
});

// DELETE endpoint to delete a note by ID
router.delete('/notes/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const note = await Note.findByPk(id);
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            await note.destroy();
            res.json({ message: 'Note deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete note: ' + (error as Error).message });
    }
});

export default router;
