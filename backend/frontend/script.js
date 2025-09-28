const API = location.origin.includes('file:') ? 'http://localhost:4000' : location.origin.replace(/:\d+$/,':4000');
// Simple helpers
const qs = s => document.querySelector(s);
const registerForm = qs('#registerForm');
const loginForm = qs('#loginForm');
const orderForm = qs('#orderForm');
const panel = qs('#panel');
const clienteName = qs('#clienteName');
const clienteIdInput = qs('#clienteId');
const ordersList = qs('#ordersList');

registerForm.addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(registerForm));
  const res = await fetch(API + '/clientes/registrar', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)});
  const json = await res.json();
  if (res.ok) alert('Registrado OK: ' + json.nombre);
  else alert('Error: ' + (json.error||JSON.stringify(json)));
});

loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(loginForm));
  const res = await fetch(API + '/clientes/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)});
  const json = await res.json();
  if (res.ok) {
    qs('#auth').classList.add('hidden');
    panel.classList.remove('hidden');
    clienteName.textContent = json.nombre;
    clienteIdInput.value = json.id;
    loadOrders(json.id);
  } else {
    alert('Error: ' + (json.error||JSON.stringify(json)));
  }
});

orderForm.addEventListener('submit', async e => {
  e.preventDefault();
  const cliente_id = clienteIdInput.value;
  const data = Object.fromEntries(new FormData(orderForm));
  data.cliente_id = cliente_id;
  const res = await fetch(API + '/ordenes', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)});
  const json = await res.json();
  if (res.ok) {
    orderForm.reset();
    loadOrders(cliente_id);
  } else alert('Error: ' + (json.error||JSON.stringify(json)));
});

async function loadOrders(clienteId){
  ordersList.innerHTML = 'Cargando...';
  const res = await fetch(API + '/ordenes/' + clienteId);
  const arr = await res.json();
  ordersList.innerHTML = '';
  if (!arr.length) { ordersList.innerHTML = '<li>No hay pedidos</li>'; return; }
  arr.forEach(o => {
    const li = document.createElement('li');
    const left = document.createElement('div');
    left.innerHTML = '<strong>' + o.platillo_nombre + '</strong><br/><small>' + (o.notes||'') + '</small><br/><small>Estado: ' + o.estado + '</small>';
    const btn = document.createElement('button');
    btn.textContent = o.estado === 'delivered' ? 'Entregado' : 'Avanzar estado';
    btn.disabled = o.estado === 'delivered';
    btn.addEventListener('click', async () => {
      const r = await fetch(API + '/ordenes/' + o.id + '/estado', { method:'PUT' });
      if (r.ok) loadOrders(clienteId);
    });
    li.appendChild(left);
    li.appendChild(btn);
    ordersList.appendChild(li);
  });
}
