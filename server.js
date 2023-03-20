const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.json({ extended: false }));

app.use(express.static(path.join(__dirname, 'client')));

app.get('/api', (req, res) => {
  res.send('We have started!');
});

app.use('/api/mail', require('./routes/api/mail'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`server started on Port ${PORT}`));
