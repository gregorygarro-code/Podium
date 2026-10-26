// Aviso de cookies y carga de herramientas de medición solo con consentimiento.
// Compartido por todas las páginas. La elección se guarda en el navegador por 6 meses.
(function () {
  var SETTINGS = {
    ga4Id: '',  // TODO: ID de medición de Google Analytics 4 (G-XXXXXXXXXX). Vacío = no se carga.
    metricoolPixel: 'https://tracker.metricool.com/c3po.jpg?hash=be98a47eeda62c43f621ae17ded043a8'
  };
  var KEY = 'podium-consent';
  var MAX_AGE = 1000 * 60 * 60 * 24 * 182;

  // Google Consent Mode v2: todo denegado hasta que la persona acepte.
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied'
  });

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      if (v && (v.choice === 'granted' || v.choice === 'denied') && Date.now() - v.at < MAX_AGE) return v.choice;
    } catch (e) { /* sin almacenamiento: se vuelve a preguntar */ }
    return null;
  }
  function save(choice) {
    try { localStorage.setItem(KEY, JSON.stringify({ choice: choice, at: Date.now() })); } catch (e) { /* ignorar */ }
  }

  var loaded = false;
  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    var px = new Image(1, 1);
    px.src = SETTINGS.metricoolPixel;
    px.alt = '';
    if (SETTINGS.ga4Id) {
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(SETTINGS.ga4Id);
      document.head.appendChild(s);
      gtag('js', new Date());
      gtag('config', SETTINGS.ga4Id);
    }
  }

  var banner;
  function build() {
    banner = document.createElement('section');
    banner.className = 'consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-labelledby', 'consent-title');
    banner.innerHTML =
      '<div class="consent__text">' +
        '<h2 class="consent__title" id="consent-title">Cookies</h2>' +
        '<p>Usamos herramientas de medición para saber cuántas personas visitan el sitio y de dónde llegan. ' +
        'Solo las activamos si aceptas. <a href="cookies.html">Política de cookies</a></p>' +
      '</div>' +
      '<div class="consent__actions">' +
        '<button type="button" class="consent__btn consent__btn--ghost" data-consent="denied">Rechazar</button>' +
        '<button type="button" class="consent__btn" data-consent="granted">Aceptar</button>' +
      '</div>';
    banner.addEventListener('click', function (e) {
      var b = e.target.closest('[data-consent]');
      if (!b) return;
      var choice = b.getAttribute('data-consent');
      save(choice);
      hide();
      if (choice === 'granted') loadAnalytics();
      else if (loaded) location.reload(); // revocar: recargar sin herramientas
    });
    document.body.appendChild(banner);
  }
  function show() {
    if (!banner) build();
    banner.hidden = false;
    document.body.classList.add('has-consent');
  }
  function hide() {
    if (banner) banner.hidden = true;
    document.body.classList.remove('has-consent');
  }

  function init() {
    var choice = read();
    if (choice === 'granted') loadAnalytics();
    if (!choice) show();
    // Enlaces "Configurar cookies" en el pie de página
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-cookie-settings]')) { e.preventDefault(); show(); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
