require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(process.env.PORT, () => {
    console.log(`Running on Port ${process.env.PORT}`);
})