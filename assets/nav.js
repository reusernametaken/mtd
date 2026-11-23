/* Phone/tablet dropdown menus (same breakpoint as site.css). Desktop is untouched. */
(function () {
  var mq = window.matchMedia('(max-width: 1108px)');
  var navs = [].slice.call(document.querySelectorAll('.side-nav'));
  if (!navs.length) return;

  function set(n, open) {
    n.classList.toggle('is-open', open);
    n.querySelector('.side-nav-label').setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closeAll(except) {
    navs.forEach(function (n) { if (n !== except) set(n, false); });
  }
  function sync() {
    navs.forEach(function (n) {
      var l = n.querySelector('.side-nav-label');
      if (mq.matches) {
        l.setAttribute('role', 'button');
        l.setAttribute('tabindex', '0');
        l.setAttribute('aria-expanded', n.classList.contains('is-open') ? 'true' : 'false');
      } else {
        l.removeAttribute('role');
        l.removeAttribute('tabindex');
        l.removeAttribute('aria-expanded');
        n.classList.remove('is-open');
      }
    });
  }

  navs.forEach(function (n, i) {
    var l = n.querySelector('.side-nav-label');
    var list = n.querySelector('.nav-list');
    list.id = list.id || 'navlist-' + i;
    l.setAttribute('aria-controls', list.id);
    function toggle() {
      if (!mq.matches) return;
      var open = !n.classList.contains('is-open');
      closeAll(n);
      set(n, open);
    }
    l.addEventListener('click', toggle);
    l.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    list.addEventListener('click', function (e) {
      if (e.target.closest('a')) set(n, false);
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.side-nav')) closeAll();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });
  window.addEventListener('pageshow', function () { closeAll(); });
  if (mq.addEventListener) mq.addEventListener('change', sync); else mq.addListener(sync);
  sync();
})();
