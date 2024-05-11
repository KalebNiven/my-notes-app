const express = require('express');
const router = express.Router();
const pool = require('../db');  
const Note=require('../models/Note');

router.get('/', async (req, res) => {
  res.send('Notes API Endpoint');
});

router.post('/notes',async (req,res)=>{
  const {content}=req.body;
  try {
    const newNote=await Note.create({ content });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});
// get all notes api routes
router.get('/notes', async (req,res)=>{
  try {
    const notes= await Note.findAll();
    res.json(notes);
    
  } catch (error) {

    res.status(500).json({message: error.message});
    
  }

});

router.post('/update/notes/:id', async(req,res)=>{
  const {id}=req.params;
  const {content}=req.body;

  try {
    const note=await Note.findByPk(id);
    if(!note){
      return res.status(404).json({message:'Note not found'});

    }
    note.content=content;
    await note.save();
    res.json(note);
    
  } catch (error) {
    res.status(400).json({message: error.message});
    
  }
});
//delete api
router.delete('/delete/notes/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    await note.destroy();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
