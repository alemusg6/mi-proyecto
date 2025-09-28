require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const clientes = require('./routes/clientes');
const ordenes = require('./routes/ordenes');
app.use(cors());
app.use(express.json());

app.use('/clientes', clientes);
app.use('/ordenes', ordenes);

const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => res.send({ status: 'ok' }));
app.listen(PORT, () => console.log('Server running on port', PORT));
