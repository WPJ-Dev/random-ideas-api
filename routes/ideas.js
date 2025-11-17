const express = require('express');
const router = express.Router();

const ideas = require('../ideas.json');

// Get all ideas
router.get('/', (req, res) => {
    res.send({ success: true, data: ideas });
});

// Get idea by id
router.get('/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id)

    if(!idea) {
        res.status(404).json({ success: false, error: 'Resource not found' })
    } else {
    res.send({ success: true, data: idea });
    }
});

// Add an idea
router.post('/', (req, res) => {
    const idea = {
        id: ideas.length + 1,
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        date: new Date().toISOString().slice(0, 10),
    };

    ideas.push(idea);

    res.json({ success: true, data: idea })
})

module.exports = router;