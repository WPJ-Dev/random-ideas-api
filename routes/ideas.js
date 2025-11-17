const express = require('express');
const router = express.Router();

const ideas = require('../ideas.json');

// Get all ideas
router.get('/', (req, res) => {
    res.send({ success: true, data: ideas });
});

router.get('/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id)

    if(!idea) {
        res.status(404).json({ success: false, error: 'Resource not found' })
    } else {
    res.send({ success: true, data: idea });
    }
});

module.exports = router;