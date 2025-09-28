# Restaurante Órdenes - Proyecto (Examen)

## Estructura
- backend/: API con Node.js + Express
- frontend/: HTML/CSS/JS puro
- database.sql: script para crear tablas

## Instrucciones rápidas (desarrollo local)
1. Crear base de datos PostgreSQL llamada `restaurante_ordenes_db` e importar `database.sql`.
2. En `backend/` crear un `.env` con `DATABASE_URL` apuntando a tu DB.
3. Instalar dependencias:
   ```bash
   cd backend
   npm install
   ```
4. Ejecutar servidor:
   ```bash
   npm run dev
   ```
5. Abrir `frontend/index.html` (o servirlo con un servidor estático) y apuntar al backend.

## Despliegue en Render
- Crear instancia PostgreSQL y servicio Web (Node).
- Pegar `DATABASE_URL` en variables de entorno del servicio web.
