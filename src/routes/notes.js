const router = require('express').Router();
const auth = require('../middlware/auth');
const Note = require('../models/Note');


//READ
router.get('/', auth, async (req, res) => {
    const notes = await Note.find({ user: req.user });
    res.json(notes);
});

//CREATE
router.post('/', auth, async (req, res) => {
    try {
        const note = await Note.create({...req.body, user: req.user});
        res.status(200).json(note);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

//UPDATE
router.put('/:id', auth, async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            {_id: req.params.id, user: req.user},
            req.body,
            { new: true }
        );

        if(!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});


//DELETE
router.delete('/:id', auth, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({_id: req.params.id, user: req.user });
        if(!note) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note Deleted'});          
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;