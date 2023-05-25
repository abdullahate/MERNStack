import React, { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');

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
    try {
      const response = await fetch('http://localhost:9000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ name, age, grade }),
      });
      const data = await response.json();
      setStudents([...students, data]);
      setName('');
      setAge('');
      setGrade('');
    } catch (error) {
      console.error('Failed to create student', error);
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

  return (
    <div>
      <h1>Student App</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        createStudent();
      }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <button type="submit">Add Student</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
              <td>
                <button onClick={() => deleteStudent(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
