/* Shared by the portfolio and every mini-project: config links, theme, toast, clipboard */
(function () {
  var C = window.PORTFOLIO || {};
  var root = document.documentElement;
  var THEME_KEY = "tm-theme";

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  var saved = store(THEME_KEY);
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function toggleTheme() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    store(THEME_KEY, next);
    document.dispatchEvent(new CustomEvent("themechange", { detail: next }));
    return next;
  }

  // GitHub Pages lowercases the user name in the domain
  var pagesBase = C.githubUser ? "https://" + C.githubUser.toLowerCase() + ".github.io/" : "";

  var links = {
    github: C.githubUser ? "https://github.com/" + C.githubUser : "",
    repo: C.githubUser ? "https://github.com/" + C.githubUser + "/" + (C.repo || "portfolio") : "",
    portfolio: pagesBase ? pagesBase + (C.repo || "portfolio") + "/" : "",
    telegram: C.telegram ? "https://t.me/" + C.telegram : "",
    email: C.email ? "mailto:" + C.email : "",
    linkedin: C.linkedin || ""
  };

  var texts = {
    name: C.name || "",
    role: C.role || "",
    email: C.email || "",
    github: C.githubUser ? "github.com/" + C.githubUser : "",
    telegram: C.telegram ? "@" + C.telegram : "",
    linkedin: (C.linkedin || "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
    year: String(new Date().getFullYear())
  };

  function projectById(id) {
    return (C.projects || []).filter(function (p) { return p.id === id; })[0];
  }

  function srcUrl(id) {
    var p = projectById(id);
    if (!links.github || !p) return links.github || "#";
    if (p.repo) return links.github + "/" + p.repo;
    return links.repo + "/blob/" + (C.branch || "main") + "/projects/" + p.file;
  }

  // Live demo of a project published from its own repository
  function demoUrl(p) {
    return pagesBase && p.repo ? pagesBase + p.repo + "/" : p.file;
  }

  // Standalone copies (one repository per project) link out instead of to sibling files
  var standalone = root.hasAttribute("data-standalone");

  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast is-hidden";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    // force reflow so the transition replays
    void toastEl.offsetWidth;
    toastEl.classList.remove("is-hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.add("is-hidden"); }, 2400);
  }

  function selectText(el) {
    if (!el) return;
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  // Must be called inside a click handler. Falls back to selecting the text.
  function copy(text, okMsg, fallbackEl) {
    function fallback() {
      if (fallbackEl) selectText(fallbackEl);
      toast(fallbackEl ? "Текст выделен — нажми Ctrl+C" : "Не удалось скопировать");
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).then(function () {
          toast(okMsg || "Скопировано");
          return true;
        }, function () { fallback(); return false; });
      }
    } catch (e) { /* fall through */ }
    fallback();
    return Promise.resolve(false);
  }

  function applyConfig(scope) {
    scope = scope || document;
    scope.querySelectorAll("[data-link]").forEach(function (a) {
      var v = links[a.getAttribute("data-link")];
      if (v) a.href = v;
      else (a.closest("[data-optional]") || a).hidden = true;
    });
    scope.querySelectorAll("[data-src]").forEach(function (a) {
      a.href = srcUrl(a.getAttribute("data-src"));
    });
    scope.querySelectorAll("[data-text]").forEach(function (el) {
      var v = texts[el.getAttribute("data-text")];
      if (v) el.textContent = v;
      else {
        var row = el.closest("[data-optional]");
        if (row) row.hidden = true;
      }
    });
    scope.querySelectorAll('a[href^="http"]').forEach(function (a) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
  }

  function buildProjectFooter() {
    var list = document.querySelector("[data-project-nav]");
    if (!list) return;
    var current = list.getAttribute("data-project-nav");
    (C.projects || []).forEach(function (p) {
      if (p.id === current) return;
      var a = document.createElement("a");
      a.className = "chip";
      a.href = standalone ? demoUrl(p) : p.file;
      a.textContent = p.title;
      list.appendChild(a);
    });
  }

  window.TM = {
    config: C,
    links: links,
    texts: texts,
    store: store,
    currentTheme: currentTheme,
    toggleTheme: toggleTheme,
    toast: toast,
    copy: copy,
    srcUrl: srcUrl,
    applyConfig: applyConfig
  };

  function init() {
    buildProjectFooter();
    applyConfig(document);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
      b.addEventListener("click", function () {
        var t = toggleTheme();
        toast(t === "dark" ? "Тёмная тема" : "Светлая тема");
      });
    });
    document.querySelectorAll("[data-copy]").forEach(function (b) {
      b.addEventListener("click", function () {
        var key = b.getAttribute("data-copy");
        var target = b.getAttribute("data-copy-target");
        copy(texts[key] || key, "Скопировано: " + (texts[key] || key), target ? document.getElementById(target) : null);
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
