const express = require('express');
const mongoose = require('mongoose');
const UserRoutes = require('./routes/user-routes');
const ThoughtRoutes = require('./routes/thought-routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes.
app.use('/api/users', UserRoutes);
app.use('/api/thoughts', ThoughtRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
