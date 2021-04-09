const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const PORT = 3000;

//Set view file
app.use(express.static(path.join(__dirname + '/views')));

//Set view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./Routes/dashboard'));

app.listen(3000, () => {
    console.log('Listening on port ' + PORT)
});