const express = require('express');
const fs = require('fs');
const path = require('path');
const server = express();
const port = 3000;

server.use(express.static('public'));

function updateHitCounter() {
    const filePath = 'hits.txt';
    let hits = 0;
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        hits = parseInt(data);
    }
    hits++;
    fs.writeFileSync(filePath, hits.toString());
    return hits;
}

function getRandomWord() {
    const filePath = 'allwords.txt';
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');
        const randomLine = lines[Math.floor(Math.random() * lines.length)];
        const parts = randomLine.split('\t');
        const word = parts[0];
        const part = parts[1];
        const defn = parts[2];
        return { word: word, part: part, defn: defn };
    }
}

server.get('/wordRequest', (req, res) => {
    const wordInfo = getRandomWord();
    res.json(wordInfo);
});

server.get('/hits', (req, res) => {
    const hits = updateHitCounter();
    res.json({ hits });
});

server.listen(port, function () {
    console.log(`Listening at http://localhost:${port}`);
});

server.get('/goodbye', function (req, res) {
    res.send('See ya later boss!');
});
