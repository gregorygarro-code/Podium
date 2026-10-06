// Hero variant: ?hero=ondas switches to the wave-pattern hero (default: navy).
// ?formula=0 hides the formula section (matches the design's showFormula prop).
(function () {
  var params = new URLSearchParams(location.search);

  if (params.get('hero') === 'ondas') {
    var hero = document.getElementById('hero');
    hero.classList.replace('hero--navy', 'hero--waves');
  }

  if (params.get('formula') === '0') {
    document.getElementById('formula').hidden = true;
    document.querySelectorAll('a[href="#formula"]').forEach(function (a) { a.hidden = true; });
  }

  document.getElementById('year').textContent = new Date().getFullYear();

  // TODO: send the email to the mailing-list provider; for now, only confirm in the UI.
  var form = document.getElementById('subscribe');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.querySelector('button').textContent = '¡Listo!';
  });
})();
