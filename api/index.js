const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

//Connect to the database
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to the Database')
);

//middlewares
app.use(express.json())

//Route middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

//start express
app.listen(5000, () => console.log('Server is Up and Running!'))