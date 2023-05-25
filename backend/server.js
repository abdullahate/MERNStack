// Import dependencies
const app = require('./app');
const cors = require('cors');

// Start the server
const port = 9000;
app.use(cors()); // Enable CORS
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});