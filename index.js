const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const port = 3000;

// Routes
const lokasiRoutes = require('./routes/lokasiRoutes');
console.log('lokasiRoutes:', typeof lokasiRoutes); // <-- harus 'function'

const platRoutes = require('./routes/platRoutes');

// const stokRoutes = require('./routes/stokRoutes');
// console.log('stokRoutes:', typeof stokRoutes);

const distribusiRoutes = require('./routes/distribusiRoutes');
console.log('distribusiRoutes:', typeof distribusiRoutes);

const userRoutes = require('./routes/userRoutes');
console.log('userRoutes:', typeof userRoutes);

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Register routes
app.use('/api/lokasi', lokasiRoutes);
app.use('/api/plat', platRoutes);
// app.use('/api/stok', stokRoutes);
// app.use('/api/distribusi', distribusiRoutes);
app.use('/api/user', userRoutes);
app.use('/api/distribusi', distribusiRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
