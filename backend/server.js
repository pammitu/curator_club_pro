const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());

require('dotenv').config();

const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const artworkRoutes = require('./routes/artworkRoutes');

app.use('/api/user', userRoutes);
app.use('/api/artworks', artworkRoutes);


app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log('Database connection successful'))
.catch((err) => console.log(`Database connection error:${err}`));

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000");
});

