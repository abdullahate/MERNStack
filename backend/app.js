// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(cors());
// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studentdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Define Student model
const Student = mongoose.model('Student', {
  name: String,
  age: Number,
  grade: String,
});

// Define CRUD endpoints

// Create a new student
app.post('/students', (req, res) => {
  const { name, age, grade } = req.body;
  const student = new Student({ name, age, grade });

  student.save()
    .then(() => {
      res.status(201).json(student);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create student' });
    });
});

// Get all students
app.get('/students', (req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch students' });
    });
});

// Get a specific student
app.get('/students/:id', (req, res) => {
  const id = req.params.id;

  Student.findById(id)
    .then((student) => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json(student);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch student' });
    });
});

// Update a student
app.put('/students/:id', (req, res) => {
  const id = req.params.id;
  const { name, age, grade } = req.body;

  Student.findByIdAndUpdate(id, { name, age, grade }, { new: true })
    .then((student) => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json(student);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update student' });
    });
});

// Delete a student
app.delete('/students/:id', (req, res) => {
  const id = req.params.id;

  Student.findByIdAndRemove(id)
    .then((student) => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json({ message: 'Student deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to delete student' });
    });
});

module.exports = app;
