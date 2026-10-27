// ---- Configuración: completar cuando estén definidos ----
var CONFIG = {
  whatsapp: '50672541784',   // número con código de país (506), sin + ni espacios
  storeUrl: ''    // TODO: URL de la tienda o checkout. Vacío = los planes abren WhatsApp
};

(function () {
  var params = new URLSearchParams(location.search);

  // ?hero=ondas cambia al hero con patrón de ondas
  if (params.get('hero') === 'ondas') {
    document.getElementById('hero').classList.replace('hero--navy', 'hero--waves');
  }

  function waLink(text) {
    var base = CONFIG.whatsapp ? 'https://wa.me/' + CONFIG.whatsapp : 'https://wa.me/';
    return base + '?text=' + encodeURIComponent(text);
  }

  // Enlaces de WhatsApp
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = waLink('Hola PODIUM, quiero información para comprar.');
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // Botones de compra de los planes: tienda si existe, si no WhatsApp con el plan elegido
  document.querySelectorAll('.plan [data-buy]').forEach(function (a) {
    var plan = a.closest('.plan').querySelector('.plan__name').textContent.trim();
    if (CONFIG.storeUrl) {
      a.href = CONFIG.storeUrl;
    } else {
      a.href = waLink('Hola PODIUM, quiero comprar: ' + plan + '.');
      a.target = '_blank';
      a.rel = 'noopener';
    }
  });

  // Medición: eventos de Google Analytics 4 (solo se envían si la persona aceptó cookies; ver consent.js)
  window.dataLayer = window.dataLayer || [];
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-track]');
    if (!el) return;
    var cta = el.getAttribute('data-track');
    track('cta_click', { cta: cta });
    if (/whatsapp/.test(cta)) track('contact', { method: 'whatsapp', cta: cta });
    if (/instagram|facebook/.test(cta)) track('select_content', { content_type: 'social', item_id: cta });
  });

  // Barra fija en móvil: aparece cuando el hero sale de pantalla
  // y se oculta en precios y en la lista de lanzamiento, donde ya hay botones.
  var buybar = document.getElementById('buybar');
  var hero = document.getElementById('hero');
  var hiders = [hero, document.getElementById('precios'), document.getElementById('lanzamiento')].filter(Boolean);
  var visible = new Set();
  function setBar(show) {
    buybar.classList.toggle('is-visible', show);
    buybar.setAttribute('aria-hidden', String(!show));
    buybar.querySelectorAll('a').forEach(function (a) { a.tabIndex = show ? 0 : -1; });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.isIntersecting ? visible.add(en.target) : visible.delete(en.target); });
      setBar(visible.size === 0);
    });
    hiders.forEach(function (el) { io.observe(el); });
  }

  // Merch: las miniaturas cambian la foto principal de cada producto
  document.querySelectorAll('.merch__thumb').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.merch__item');
      var photo = item.querySelector('.merch__photo');
      var base = btn.getAttribute('data-src');
      photo.src = base + '-1200.webp';
      photo.srcset = base + '-640.webp 640w, ' + base + '-1200.webp 1200w';
      photo.alt = btn.getAttribute('data-alt');
      item.querySelectorAll('.merch__thumb').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // TODO: enviar el correo al proveedor de email marketing; por ahora solo confirma en pantalla.
  var form = document.getElementById('subscribe');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.querySelector('button').textContent = '¡Listo!';
    track('generate_lead', { method: 'lista_lanzamiento' });
  });
})();
