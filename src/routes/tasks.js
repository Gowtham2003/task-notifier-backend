const express = require('express');
const router = express.Router();
const { Task } = require('../models');

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().populate('persons');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});
// Retrieve a specific task by ID
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('persons');
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve the task' });
  }
});

router.post('/tasks', async (req, res) => {
  const newTask = new Task({ ...req.body });
  const insertedTask = await newTask.save();
  return res.status(201).json(insertedTask);
});

// Update a task
router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('persons');
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update the task' });
  }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the task' });
  }
});

module.exports = router;
