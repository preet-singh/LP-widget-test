require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
//const errorHandler = require('./public/middleware/error-handler');
const path = require('path');

const app = express();
//const router = express.Router();
const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';
app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// render widget 
app.get('/widget', function(req, res) {
    res.render('pages/widget');
});

// render index
app.get('/index', function(req, res) {
    res.render('pages/index');
});

app.get('/', (req, res) => {
    res.status(200).send('Hello, world!')
});

  
//app.use(errorHandler);

module.exports = app;

