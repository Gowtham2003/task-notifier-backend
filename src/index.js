const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/', require('./routes/persons.js'));
app.use('/', require('./routes/tasks.js'));
app.use('/', require('./routes/email.js'));

app.get('/', async (req, res) => {
  return res.json({ message: 'Hello, World ✌️' });
});
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(3000, () =>
      console.log('Server started on port http://localhost:3000')
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
