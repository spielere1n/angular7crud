//server.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useNewUrlParser: true})
    .then(() => { console.log('Database is connected') },
          err => { console.log('Can not connect to the database' + err) }
    );

const app = express();

app.use(bodyParser.json());
app.use(cors());

let port = process.env.PORT || 4000;

const server = app.listen(() => {
    console.log(`Listening on port ${port}`);
});