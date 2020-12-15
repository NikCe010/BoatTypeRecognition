//Install express server
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors())

// Serve only the static files form the dist directory
app.use(cors());
app.use(express.static('./dist/machine-learning-web'));

  app.get('/', function(req, res) {
    res.sendFile('index.html', {root: 'dist/machine-learning-web/'}
    );
  });

app.use(express.static('./result1'));
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
