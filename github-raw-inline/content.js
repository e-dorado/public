// Ссылки GitHub на файлы (видео, аудио, PDF, картинки, текст) открываются в новой вкладке.
// Скрипт только смотрит адрес ссылки, по которой кликнули; ничего не читает и никуда не отправляет.
(() => {
  const EXT = /\.(mp4|m4v|webm|ogv|mp3|m4a|ogg|wav|pdf|png|jpe?g|gif|webp|bmp|txt|log)$/i;
  const REPO_FILE = /^\/[^/]+\/[^/]+\/(blob|raw)\/.+/;

  function isFileLink(url) {
    if (!EXT.test(url.pathname)) return false;
    if (url.hostname === "raw.githubusercontent.com" || url.hostname === "media.githubusercontent.com") return true;
    return url.hostname === "github.com" && REPO_FILE.test(url.pathname);
  }

  // Слушаем на window в фазе перехвата: срабатываем раньше обработчиков GitHub,
  // которые подгружают страницы без перезагрузки.
  window.addEventListener("click", (e) => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.defaultPrevented) return;
    const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
    if (!a || a.hasAttribute("download")) return;
    let url;
    try { url = new URL(a.href, location.href); } catch { return; }
    if (!isFileLink(url)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    window.open(url.href, "_blank", "noopener");
  }, true);
})();
