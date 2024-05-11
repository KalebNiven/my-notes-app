import { Router, Request, Response } from 'express';
import { Note } from '../models/Note';


const router = Router();

// Root endpoint
router.get('/', async (req: Request, res: Response) => {
  res.send('Notes API Endpoint');
});

// Create a new note
router.post('/notes', async (req: Request, res: Response) => {
  const { content } = req.body;
  try {
    const newNote = await Note.create({ content });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Get all notes
router.get('/notes', async (req: Request, res: Response) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Update a note
router.post('/update/notes/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.content = content;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Delete a note
router.delete('/delete/notes/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    await note.destroy();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

export default router;
