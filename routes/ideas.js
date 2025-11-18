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
});

// Put idea by id
router.put('/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id)

    if(!idea) {
        res.status(404).json({ success: false, error: 'Resource not found' })
    } else {
        idea.text = req.body.text || idea.text;
        idea.tag = req.body.tag || idea.tag;

        res.json({ success: true, data: idea })
    }


});

// Delete idea by id
router.delete('/:id', (req, res) => {
    const idea = ideas.findIndex((idea) => idea.id === +req.params.id)

    if(idea === -1) {
        res.status(404).json({ success: false, error: 'Resource not found' })
    } else {
        ideas.splice(idea, 1);
    
        res.json({ success: true});
    }
    
});

module.exports = router;