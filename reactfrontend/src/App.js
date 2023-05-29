import React, { useState, useEffect } from 'react';
import "./App.css";
import { FaClock } from 'react-icons/fa';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [exercise, setExercise] = useState('');
  const [grade, setGrade] = useState(new Date());
  const [time, setTime] = useState('00:00:00');
  const [error, setError] = useState('');
  const [editStudentId, setEditStudentId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:9000/students', {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students', error);
    }
  };

  const createStudent = async () => {
    if (!name || !exercise || !grade || !time) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');

    try {
      if (editStudentId) {
        // Editing an existing student
        await fetch(`http://localhost:9000/students/${editStudentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({ name, exercise, grade, time }),
        });
        setStudents(
          students.map((student) =>
            student._id === editStudentId
              ? { ...student, name, exercise, grade, time }
              : student
          )
        );
        setEditStudentId(null);
      } else {
        // Creating a new student
        const response = await fetch('http://localhost:9000/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({ name, exercise, grade, time }),
        });
        const data = await response.json();
        setStudents([...students, data]);
      }

      setName('');
      setExercise('');
      setGrade(new Date());
      setTime('00:00:00');
    } catch (error) {
      console.error('Failed to create/edit student', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await fetch(`http://localhost:9000/students/${id}`, {
        method: 'DELETE',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error('Failed to delete student', error);
    }
  };

  const editStudent = (student) => {
    setEditStudentId(student._id);
    setName(student.name);
    setExercise(student.exercise);
    setGrade(new Date(student.grade));
    (student.time) ? setTime(student.time):setTime('00:00:00');
  };

  const cancelEdit = () => {
    setEditStudentId(null);
    setName('');
    setExercise('');
    setGrade(new Date());
    setTime('00:00:00');
  };

  return (
    <div className="container">
      <h1>Student App</h1>

      <form className="form" onSubmit={(e) => {
        e.preventDefault();
        createStudent();
      }}>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exercise">Exercise:</label>
          <select
            id="exercise"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          >
            <option value="">Select Exercise</option>
            <option value="swimming">Swimming</option>
            <option value="cycling">Cycling</option>
            <option value="running">Running</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="grade\">Date:</label>
          <input
            type="date"
            id="grade"
            value={grade.toISOString().split('T')[0]}
            onChange={(e) => setGrade(new Date(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button type="submit">{editStudentId ? 'Update Student' : 'Add Student'}</button>
          {editStudentId && (
            <button type="button" onClick={cancelEdit}>Cancel</button>
          )}
        </div>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Exercise</th>
            <th>Grade</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.exercise}</td>
              <td>{new Date(student.grade).toDateString()}</td>
              <td>{student.time}</td>
              <td>
                <button onClick={() => deleteStudent(student._id)}>Delete</button>
                <button onClick={() => editStudent(student)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
