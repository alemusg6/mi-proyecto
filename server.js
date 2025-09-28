const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const clientes = require('./routes/clientes');
const ordenes = require('./routes/ordenes');

app.use(cors());
app.use(express.json());

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'Interfaz')));

// Ruta principal para index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Interfaz', 'index.html'));
});

// Rutas de la API
app.use('/clientes', clientes);
app.use('/ordenes', ordenes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
