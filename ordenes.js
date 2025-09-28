const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /ordenes - crear nueva orden
router.post('/', async (req, res) => {
  const { cliente_id, platillo_nombre, notes } = req.body;
  if (!cliente_id || !platillo_nombre) return res.status(400).json({ error: 'Faltan campos' });
  try {
    const result = await db.query('INSERT INTO ordenes (cliente_id, platillo_nombre, notes) VALUES ($1,$2,$3) RETURNING *', [cliente_id, platillo_nombre, notes]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// GET /ordenes/:clienteId - listar pedidos de un cliente
router.get('/:clienteId', async (req, res) => {
  const { clienteId } = req.params;
  try {
    const result = await db.query('SELECT * FROM ordenes WHERE cliente_id=$1 ORDER BY creado DESC', [clienteId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// PUT /ordenes/:id/estado - actualizar estado (pending -> preparing -> delivered)
router.put('/:id/estado', async (req, res) => {
  const { id } = req.params;
  try {
    const cur = await db.query('SELECT estado FROM ordenes WHERE id=$1', [id]);
    if (!cur.rowCount) return res.status(404).json({ error: 'Orden no encontrada' });
    const estadoActual = cur.rows[0].estado;
    let nuevo;
    if (estadoActual === 'pending') nuevo = 'preparing';
    else if (estadoActual === 'preparing') nuevo = 'delivered';
    else nuevo = estadoActual; // si ya delivered, se queda
    const upd = await db.query('UPDATE ordenes SET estado=$1 WHERE id=$2 RETURNING *', [nuevo, id]);
    res.json(upd.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
