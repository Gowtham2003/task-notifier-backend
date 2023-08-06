const express = require('express');
const router = express.Router();
const { Task } = require('../models');
const nodemailer = require('nodemailer');
const { isWithinTwoDaysOfDeadline } = require('../utils');
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'glenda.beatty@ethereal.email',
    pass: '7BdhY6u6dEX7mCN16x',
  },
});

router.get('/sendEmail', async (req, res) => {
  const tasks = await Task.find().populate('persons');
  for (let task of tasks) {
    if (isWithinTwoDaysOfDeadline(task.dueDate, new Date())) {
      for (let person of task.persons) {
        transporter.sendMail({
          from: '"Test 👻"',
          to: person.email,
          subject: `Task Reminder - ${
            task.title
          } Due on ${task.dueDate.toLocaleDateString()}`,
          text: `
Hi ${person.name}},

Just a quick remainder! You have a task coming up:

Task Name: ${task.title}
Description: ${task.description}
Due Date: ${task.dueDate.toLocaleDateString()}

Please make sure to complete it before the due date. If you need any help or have questions, feel free to reach out.

Thanks,
[Your Name]
`,
          //   html: "<b>Hello world?</b>",
        });
      }
    }
  }
  //     const info = await transporter.sendMail({
  //         from: '"Test 👻"',
  //         to: tasks.persons.email,
  return res.status(200).json({ message: 'Email sent' });
});

module.exports = router;
