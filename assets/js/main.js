/* ===== Datos del restaurante: completar cuando se faciliten ===== */
const CONFIG = {
  direccion: "C. Candelaria, 22, 38003 Santa Cruz de Tenerife",
  telefono: "",           // p. ej. "+34 922 000 000"
  whatsapp: "",           // solo dígitos con prefijo, p. ej. "34600000000" → activa el envío por WhatsApp
  email: "",              // correo de reservas
  horario: "",            // p. ej. "Mar–Dom · 13:00–00:00"
  instagram: "",          // usuario sin @
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=C.+Candelaria+22,+38003+Santa+Cruz+de+Tenerife"
};

/* ===== Carta, transcrita de las fotografías ===== */
const P = (n,p,o={}) => ({n,p,...o});
const MENU = {
  conservas:[P("Mejillones","16,00",{chk:1}),P("Navajas","23,00"),P("Sardinillas","11,00"),P("Berberechos","32,00"),P("Huevas de merluza","9,00")],
  plato:[P("Almogrote","8,50"),P("Jamón 100% ibérico de bellota","18,00"),P("Surtido de ibéricos 100%","16,00"),P("Tabla de quesos variados","16,00"),
    P("Croquetas de jamón ibérico (ud.)","1,80"),P("Croquetas de gambones (ud.)","1,80"),P("Salmorejo cordobés","6,50"),P("Ensaladilla de ventresca","10,50"),
    P("Tomates aliñados con ventresca","16,00"),P("Papas bravas","8,50"),P("Puerros asados con salsa romesco","15,00"),P("Huevos rotos con Jabuguitos","14,50"),
    P("Calamares en salsa con papas arrugadas","22,00"),P("Solomillo con pimientos asados y papas panaderas","22,00"),P("Entraña de Angus con pimientos asados y papas panaderas","22,00")],
  postre:[P("Tarta de queso","4,50"),P("Tarta de limón","4,50")],
  espumosos:[P("Ondarre Millenium",["5,50","22"]),P("At Roca rosé",["","29"]),P("Bollinger",["","95"]),P("Veuve Clicquot",["","85"]),P("Veuve Clicquot Rosé",["","95"]),
    P("Ruinart Blanc de Blancs",["","125"]),P("Ruinart Rosé",["","120"]),P("Don Perignon",["","250"]),P("Krug",["","395"],{chk:1})],
  blancos:[P("Maruxa Godello",["5,50","24"]),P("Nogora Verdejo",["5,50","24"],{chk:1}),P("Vaquos Verdejo",["5,50","24"],{chk:1}),P("Tres pilares Verdejo",["","25"]),
    P("Muga (Viura, Garnacha blanca y malvasía de rioja)",["","28"]),P("Contempo",["","28"]),P("Montecillo Garnacha blanca",["","28"])],
  tintos:[P("Marqués de Burgos Roble (Ribera del Duero)",["5,50","22"]),P("Montecillo Crianza (Rioja)",["5,50","22"]),P("Muriel Crianza (Rioja)",["5,50","22"]),P("Maruxa (Mencía)",["5,50","22"]),
    P("Muga",["","34"]),P("Tomas postigo",["","47"]),P("Maeste Alma del Vivar",["","35"],{chk:1}),P("Montecillo Edición Limitada",["","23"]),P("Montecillo 22 Barricas",["","139"]),
    P("La Fleur Vivaltus",["","119"],{chk:1}),P("Priorat",["","41"],{chk:1}),P("Numanthia (Toro)",["","65"]),P("Viña Monty",["","46"])]
};
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
document.querySelectorAll('[data-list]').forEach(ul => {
  ul.innerHTML = MENU[ul.dataset.list].map(it => {
    const flag = it.chk ? '<span class="flag">por confirmar</span>' : '';
    const price = Array.isArray(it.p)
      ? `<span class="p pp"><span>${it.p[0] || '—'}</span><span>${it.p[1]}</span></span>`
      : `<span class="p">${it.p}</span>`;
    const li = `<li><span class="n">${esc(it.n)}${flag}</span><span class="d"></span>${price}</li>`;
    return li;
  }).join('');
});

/* ===== Navegación ===== */
const burger = document.getElementById('burger'), nav = document.getElementById('nav');
burger.addEventListener('click', () => { const o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); burger.textContent = o ? 'Cerrar' : 'Menú'; });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); burger.textContent = 'Menú'; }));

const tabLinks = [...document.querySelectorAll('#tabs a')];
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) tabLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
  }), {rootMargin: '-45% 0px -50% 0px'});
  document.querySelectorAll('.cat').forEach(c => io.observe(c));
}

/* ===== Galería ===== */
const shots = [...document.querySelectorAll('#gallery button')].map(b => { const i = b.querySelector('img'); return {src: i.src, alt: i.alt, cap: b.querySelector('figcaption').textContent}; });
const lb = document.getElementById('lb'), lbImg = document.getElementById('lb-img'), lbCap = document.getElementById('lb-cap');
let cur = 0;
const show = i => { cur = (i + shots.length) % shots.length; lbImg.src = shots[cur].src; lbImg.alt = shots[cur].alt; lbCap.textContent = shots[cur].cap; };
const open = i => { show(i); if (lb.showModal) lb.showModal(); };
document.querySelectorAll('#gallery button').forEach(b => b.addEventListener('click', () => open(+b.dataset.i)));
document.getElementById('lb-prev').onclick = () => show(cur - 1);
document.getElementById('lb-next').onclick = () => show(cur + 1);
document.getElementById('lb-close').onclick = () => lb.close();
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });

/* ===== Reservas ===== */
const form = document.getElementById('rform'), dateIn = document.getElementById('r-date');
const today = new Date(); const iso = d => new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString().slice(0,10);
dateIn.min = iso(today);
const fieldErr = (el, msg) => { const f = el.closest('.f'); f.classList.toggle('bad', !!msg); f.querySelector('.err').textContent = msg || ''; };
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  let ok = true;
  const check = (id, cond, msg) => { const el = document.getElementById(id); const bad = !cond; fieldErr(el, bad ? msg : ''); if (bad && ok) { el.focus(); ok = false; } };
  check('r-name', d.name.trim().length > 2, 'Escribe tu nombre y apellidos.');
  check('r-phone', d.phone.replace(/\D/g,'').length >= 9, 'Escribe un teléfono de al menos 9 cifras.');
  check('r-email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email), 'Revisa el correo: falta algo como nombre@dominio.com.');
  check('r-date', d.date && d.date >= dateIn.min, 'Elige una fecha a partir de hoy.');
  check('r-time', !!d.time, 'Indica la hora que prefieres.');
  check('r-guests', !!d.guests, 'Indica cuántas personas venís.');
  if (!ok) return;
  const fecha = new Date(d.date + 'T12:00').toLocaleDateString('es-ES', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
  const text = `Solicitud de reserva · Lala Lounge\nNombre: ${d.name}\nTeléfono: ${d.phone}\nCorreo: ${d.email}\nFecha: ${fecha}\nHora: ${d.time}\nComensales: ${d.guests}` + (d.notes.trim() ? `\nComentarios: ${d.notes.trim()}` : '');
  document.getElementById('result-text').textContent = text;
  const acts = document.getElementById('result-actions'); acts.innerHTML = '';
  const msg = document.getElementById('result-msg');
  if (CONFIG.whatsapp) {
    msg.textContent = 'Envía la solicitud por WhatsApp para que el restaurante la reciba y te confirme disponibilidad.';
    const a = document.createElement('a'); a.className = 'btn btn-solid'; a.target = '_blank'; a.rel = 'noopener';
    a.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`; a.textContent = 'Enviar por WhatsApp'; acts.append(a);
  } else {
    msg.textContent = 'Esta solicitud todavía no se envía a ningún sitio: la web aún no está conectada a WhatsApp, correo ni a una plataforma de reservas. Copia el resumen para enviarlo al restaurante.' + (CONFIG.email ? ` Correo de reservas: ${CONFIG.email}.` : '');
  }
  const c = document.createElement('button'); c.type = 'button'; c.className = 'btn btn-ghost'; c.textContent = 'Copiar resumen';
  c.onclick = () => navigator.clipboard.writeText(text).then(() => { c.textContent = 'Copiado'; }).catch(() => {
    const r = document.createRange(); r.selectNodeContents(document.getElementById('result-text')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); c.textContent = 'Texto seleccionado';
  });
  acts.append(c);
  const res = document.getElementById('result'); res.hidden = false; res.scrollIntoView({behavior:'smooth', block:'nearest'});
});
form.querySelectorAll('input,select').forEach(el => el.addEventListener('input', () => fieldErr(el, '')));

/* ===== Contacto ===== */
const row = (k, v, link) => `<div><dt>${k}</dt><dd>${v ? (link ? `<a href="${link}" target="_blank" rel="noopener">${esc(v)}</a>` : esc(v)) : '<span class="pending">dato por añadir</span>'}</dd></div>`;
document.getElementById('info').innerHTML =
  row('Dirección', CONFIG.direccion, CONFIG.mapsUrl) + row('Teléfono', CONFIG.telefono) +
  row('WhatsApp', CONFIG.whatsapp && '+' + CONFIG.whatsapp, CONFIG.whatsapp && 'https://wa.me/' + CONFIG.whatsapp) +
  row('Horario', CONFIG.horario) + row('Correo', CONFIG.email) +
  row('Instagram', CONFIG.instagram && '@' + CONFIG.instagram, CONFIG.instagram && 'https://instagram.com/' + CONFIG.instagram);
document.getElementById('yr').textContent = today.getFullYear();
