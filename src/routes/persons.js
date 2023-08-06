const express = require('express');
const router = express.Router();
const { Person } = require('../models');

router.get('/persons', async (req, res) => {
  const allPersons = await Person.find();
  return res.status(200).json(allPersons);
});
router.get('/persons/:id', async (req, res) => {
  const { id } = req.params;
  const person = await Person.findById(id);
  return res.status(200).json(person);
});
router.post('/persons', async (req, res) => {
  const newPerson = new Person({ ...req.body });
  const insertedPerson = await newPerson.save();
  return res.status(201).json(insertedPerson);
});

router.put('/persons/:id', async (req, res) => {
  const { id } = req.params;
  await Person.updateOne({ _id: id }, req.body);
  const updatedPerson = await Person.findById(id);
  return res.status(200).json(updatedPerson);
});

router.delete('/persons/:id', async (req, res) => {
  const { id } = req.params;
  const deletedPersons = await Person.findByIdAndDelete(id);
  return res.status(200).json(deletedPersons);
});
module.exports = router;
