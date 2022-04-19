const express = require('express');
const upload = require('express-fileupload');

const connectDB = require('./config/db');

const usersRoute = require('./routes/users');

const adminRoute = require('./routes/admin');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (_req, _res) => {
    // allowed XHR methods
    _res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    _res.send();
  });
});
// DB Config

connectDB();

app.use(express.json({ extended: false }));

// Routes
app.use('/api/admin', adminRoute);
app.use('/api', usersRoute);
app.use(upload());

// ------------------Photo Upload---------------//

app.post('/api/admin/upload', (req, res) => {
  if (req.files) {
    const { file } = req.files;
    const filename = file.name;
    console.log(filename);
    file.mv(`./photos/${filename}`, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('file uploaded');
      }
    });
  }
});

// server port
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
