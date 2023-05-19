// Import necessary libraries
const express = require('express');
const ejs = require('ejs');
const http = require('http');
const setupSocketIO = require('./controllers/socketConnections'); // rename to reflect that it's a function

// Create an Express app
const app = express();

// Create an HTTP server and attach Express app to it
const server = http.createServer(app);

// Attach socket.io to the HTTP server
const io = setupSocketIO(server); // use the function here

// Apply Express middleware to the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use route controllers
app.use(require('./controllers/auth'));
app.use(require('./controllers/admin_controller'));
app.use(require('./controllers/student_controller'));
app.use(require('./controllers/index'));

// Default route for unhandled requests
app.use("", function(request, response) {
  response.redirect('/error?code=400');
});

// Start the HTTP server
const port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log('Server started at http://localhost:' + port);
});
