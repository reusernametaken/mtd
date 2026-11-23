/* Embeds: scale the analyzer thumbnail to its box; "tap to explore" for the map. */
(function () {
  [].forEach.call(document.querySelectorAll('.embed--thumb'), function (box) {
    var f = box.querySelector('iframe');
    function fit() { f.style.transform = 'scale(' + (box.clientWidth / 1000) + ')'; }
    fit();
    if (window.ResizeObserver) new ResizeObserver(fit).observe(box); else window.addEventListener('resize', fit);
  });
  [].forEach.call(document.querySelectorAll('.embed--map .embed-tap'), function (b) {
    b.addEventListener('click', function () { b.parentNode.classList.add('is-live'); });
  });
})();
