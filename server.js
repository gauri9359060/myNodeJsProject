const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/database');
const path = require('path');
const userRoutes = require('./routes/routes');
const loginAuth = require('./routes/loginAuth');
const registerAuth = require('./routes/registerAuth');

const app = express();
const port = 3000;

// to parse data into JSON
app.use(bodyParser.json());

// parse JSON bodies sent by API clients
app.use(express.json());

// parse URL encoded bodies sent by HTML forms
app.use(express.urlencoded({ extended: false }));

// set the view engine and views directory
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// connect to the database
db.connect((err,connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// define routes
app.use('/auth', loginAuth);
app.use('/auth', registerAuth);
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

