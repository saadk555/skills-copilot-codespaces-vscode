// Create web server

// Require
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up data file
const commentsPath = path.join(__dirname, 'data', 'comments.json');

// Read data file
const readData = () => {
    const data = fs.readFileSync(commentsPath, 'utf8');
    return JSON.parse(data);
}

// Write data file
const writeData = (data) => {
    fs.writeFileSync(commentsPath, JSON.stringify(data));
}

// Get all comments
app.get('/comments', (req, res) => {
    res.render('comments', { comments: readData() });
});

// Post comment
app.post('/comments', (req, res) => {
    const comments = readData();
    comments.push(req.body);
    writeData(comments);
    res.redirect('/comments');
});

// Listen
app.listen(3000, () => {
    console.log('Server started at port 3000');
});
