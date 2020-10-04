const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var cors = require('cors');


//import routes
const authRoute = require('./routes/auth');
const userInfoRoute = require('./routes/user');

dotenv.config();

//Connect to the database
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to the Database')
);

//middlewares
app.use(cors())
app.use(express.json())

//Route middlewares
app.use('/api/user', authRoute)
app.use('/api/userinfo', userInfoRoute)

//start express
app.listen(5000, () => console.log('Server is Up and Running!'))