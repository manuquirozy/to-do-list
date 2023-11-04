const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const Routes = require('./src/routes/routes');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

const connectionString = process.env.DB_CONNECTION_STRING;

app.set('port', 3000);
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

mongoose
  .connect(connectionString)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((error) => console.error(error));

app.listen(app.get('port'), () => {
  console.log('The server is running on port ' + app.get('puerto'));
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/', Routes);
