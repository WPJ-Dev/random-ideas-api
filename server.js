const express = require('express');

const port = 5000;
const app = express();

const ideas = require('./ideas.json');

app.get('/', (req, res) => {
    res.send({ message: 'Welcom to RandomIdeas API' });
});

// Get all ideas
app.get('/api/ideas', (req, res) => {
    res.send({ success: true, data: ideas });
});

app.get('/api/ideas/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id)

    if(!idea) {
        res.status(404).json({ success: false, error: 'Resource not found' })
    } else {
    res.send({ success: true, data: idea });
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}.`));