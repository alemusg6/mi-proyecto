-- SQL script to create database estructura
CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  telefono VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS ordenes (
  id SERIAL PRIMARY KEY,
  cliente_id INT REFERENCES clientes(id),
  platillo_nombre VARCHAR NOT NULL,
  notes TEXT,
  estado VARCHAR DEFAULT 'pending',
  creado TIMESTAMP DEFAULT NOW()
);
