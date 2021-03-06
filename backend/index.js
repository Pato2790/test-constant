const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mainRoutes = require('./routes');
const initDB = require('./configs/database.init');
var momentTZ = require('moment-timezone');

const app = express();

momentTZ.tz.setDefault("Europe/Madrid");

// Config middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Init DB and init the models
initDB();

// Routes definition.
app.use('/api/', mainRoutes(app));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});