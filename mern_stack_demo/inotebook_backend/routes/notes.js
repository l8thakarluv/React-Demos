const express = require('express');
const fetchUsers = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const router = express.Router();

/** Wherever & whenever we add fetchuser, it means for that route login is required */

// ROUTE 1: Get all the notes using: GET /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchUsers, async (req, res) => {
    const notes = await Notes.find({user: req.user.id});
    res.json(notes);
});

// ROUTE 2: Add a note using: POST /api/notes/addnote
router.post('/addnote', fetchUsers, [
    body('title', 'Enter a valid title').exists().isLength({min: 3}),
    body('description', 'Discription must be minimum of 5 characters.').isLength({min: 5})
], async (req, res) => {

    // checking validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()});
    }

    try {
        const { title, description, tag } = req.body;
    
        const noteData = await new Notes({
            title, description, tag, user: req.user.id
        });
    
        const savedNote = await noteData.save();
        return res.send(savedNote);
    } catch(err) {
        return res.status(500).json({message: 'Internal server error!!'});
    }

});

// ROUTE 3: Update an existimg note: POST /api/notes/updatenote
router.put('/updatenote/:id', fetchUsers, async (req, res) => {
    const {title, description, tag} = req.body;    

    // find the note to be updated & update it
    const note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send('Note with this Id does not exists.');
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send('You are unauthorised to make changes for this note.')
    }
    
    // create a new note object
    const newNote = {
        title: title || note.title,
        description: description || note.description,
        tag: tag || note.tag
    };

    // here new: true means, it will return modified object, rather than original one
    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    return res.status(200).json(updatedNote);
});

// ROUTE 4: Delete an existing note: DELETE api/notes/deletenote
router.delete('/deletenote/:id', fetchUsers, async (req, res) => {
    // try/catch to handle any server error like database internal error, connection error etc.
    try {
        // Find the note to be deleted & delete it.
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send(`Note with this id doesn't exists!`);
        }
    
        // Allow deletion only if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('You are not authorized to delete this note!!!');
        }
    
        note = await Notes.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: 'Not has been deleted successfully!!', note});
    } catch (error) {
        return res.status(500).send('Internal server error!!');
    }
});


module.exports = router;