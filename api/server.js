//server.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

const businessRoute = require('./routes/business.route');

//Connect to database
mongoose.connect(config.database);
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connection established');
});

/*mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useNewUrlParser: true})
    .then(() => { console.log('Database is connected') },
          err => { console.log('Can not connect to the database' + err) }
    );*/

const app = express();

app.use(bodyParser.json());

let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/business', businessRoute);

let port = process.env.PORT || 4000;

const server = app.listen(() => {
    console.log(`Listening on port ${port}`);
});