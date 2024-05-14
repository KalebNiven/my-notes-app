import { Router, Request, Response } from 'express';
import { models } from '../models/index';  // Adjust the path as necessary
import { Op } from "sequelize";
// You can access models like this
const { User, Note } = models;

// Controller functions to call CRUD APIs

export const createNote = async (req: Request, res: Response) => {
    const {  content, userId } = req.body;
    console.log(content)

    
    if ( isValidLength(content, 20, 200)) {
        return res.status(400).json({ message: "Title and content must be between 20 and 200 characters long." });
    }

    try {
        const newNote = await Note.create({ content, userId });
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create note: ' + (error as Error).message });
    }
}


function isValidLength(value: string | undefined, minLength: number, maxLength: number): boolean {
    
    if (value && value.length !== undefined) {
        return value.length <= minLength && value.length <= maxLength;
    }
    
    return false;
}

export const getNotes = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId as string;
        const notes = await Note.findAll({
            where: { userId: parseInt(userId) },
            include: [{ model: User, as: 'user' }]
        });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve notes: ' + (error as Error).message });
    }
}

export const getNoteById = async (req: Request, res: Response) => {
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
}

export const editNote = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content} = req.body;

   
    if ( isValidLength(content, 20, 200)) {
        return res.status(400).json({ message: " content must be between 20 and 200 characters long." });
    }

    try {
        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        } else {
            note.content = content;
            
            await note.save();
            res.json(note);
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update note: ' + (error as Error).message });
    }
}




export const deleteNote = async (req: Request, res: Response) => {
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
}

export const searchNote = async (req: Request, res: Response) => {
    try {
      const { content } = req.params;
  
      if (typeof content !== 'string') {
        return res.status(400).json({ error: 'Invalid query parameter' });
      }
      else if(content===''){
        const userId = req.query.userId as string;
        const notes = await Note.findAll({
            where: { userId: parseInt(userId) },
            include: [{ model: User, as: 'user' }]
        });
        res.json(notes);
        
      }else{
        const notes = await Note.findAll({
            where: {
                content: {
                [Op.like]: `%${content}%`
              }
            }
          });
          res.json({ data: notes });
      }
  
  
     
    } catch (error) {
      console.error('Error searching notes:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

}
