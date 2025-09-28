const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /clientes/registrar
router.post('/registrar', async (req, res) => {
  const { nombre, email, telefono } = req.body;
  if (!nombre || !email || !telefono) return res.status(400).json({ error: 'Faltan campos' });
  try {
    const exist = await db.query('SELECT id FROM clientes WHERE email=$1', [email]);
    if (exist.rowCount) return res.status(409).json({ error: 'Email ya registrado' });
    const result = await db.query('INSERT INTO clientes (nombre,email,telefono) VALUES ($1,$2,$3) RETURNING *', [nombre,email,telefono]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// POST /clientes/login (simula acceso con email + telefono)
router.post('/login', async (req, res) => {
  const { email, telefono } = req.body;
  if (!email || !telefono) return res.status(400).json({ error: 'Faltan campos' });
  try {
    const result = await db.query('SELECT id, nombre, email FROM clientes WHERE email=$1 AND telefono=$2', [email, telefono]);
    if (!result.rowCount) return res.status(401).json({ error: 'Credenciales inválidas' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
