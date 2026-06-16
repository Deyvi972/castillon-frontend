// =============================================
//  CASTILLON — Configuración Global
//  Cambia API_BASE con tu URL de Render
//  Ejemplo: https://castillon-backend.onrender.com
// =============================================
const API_BASE = 'REEMPLAZAR_CON_URL_RENDER';

const HEADERS = {
  'Content-Type': 'application/json'
};

// Sesión
function getSession() {
  try { return JSON.parse(sessionStorage.getItem('usuario')); } catch { return null; }
}
function requireAuth() {
  if (!getSession()) { window.location.href = 'index.html'; return null; }
  return getSession();
}
function logout() {
  sessionStorage.removeItem('usuario');
  window.location.href = 'index.html';
}

// API helpers
async function api(path, method = 'GET', body = null) {
  const opts = { method, headers: HEADERS };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(API_BASE + path, opts);
  if (!r.ok) throw new Error(`Error ${r.status}`);
  const text = await r.text();
  return text ? JSON.parse(text) : null;
}

// Toast
function toast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3000);
}

// Render nombre de usuario en sidebar
function renderUser() {
  const s = getSession();
  if (!s) return;
  document.querySelectorAll('.user-name').forEach(el => el.textContent = s.nombres || s.logeo || 'Usuario');
  document.querySelectorAll('.user-role').forEach(el => el.textContent = s.tipoUsuario || s.cargo || 'Sistema');
}

// Marcar enlace activo en sidebar
function setActiveNav() {
  const page = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === page);
  });
}
