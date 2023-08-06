const mongoose = require('mongoose');

const Persons = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Person = mongoose.model('Person', Persons);

const Tasks = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  persons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
  dueDate: {
    type: Date,
    required: true,
  },
});
const Task = mongoose.model('Task', Tasks);

module.exports = { Person, Task };
