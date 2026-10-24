/* Shared by the portfolio and every mini-project: config links, theme, language, toast, clipboard */
(function () {
  var C = window.PORTFOLIO || {};
  var root = document.documentElement;
  var THEME_KEY = "tm-theme";
  var LANG_KEY = "tm-lang";

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

  /* ---------- Language ----------
     Pages are written in Russian. English comes from dictionaries keyed by the Russian text:
     elements marked data-i18n swap their content, t("…") translates strings in scripts. */
  var lang = store(LANG_KEY);
  if (lang !== "ru" && lang !== "en") {
    lang = /^(ru|uk|be|kk)/i.test(navigator.language || "ru") ? "ru" : "en";
  }
  root.setAttribute("lang", lang);

  var dict = {};
  function norm(s) { return String(s).replace(/\s+/g, " ").trim(); }
  function addDict(d) { for (var k in d) dict[norm(k)] = d[k]; }
  function t(ru) {
    if (lang === "ru") return ru;
    var v = dict[norm(ru)];
    return v === undefined ? ru : v;
  }
  function locale() { return lang === "en" ? "en-US" : "ru-RU"; }

  addDict({
    "Портфолио": "Portfolio",
    "Код на GitHub": "Code on GitHub",
    "Другие проекты": "Other projects",
    "Переключить тему": "Toggle theme",
    "Сменить язык": "Switch language",
    "Тёмная тема": "Dark theme",
    "Светлая тема": "Light theme",
    "Скопировано": "Copied",
    "Текст выделен, нажми Ctrl+C": "Text selected, press Ctrl+C",
    "Не удалось скопировать": "Couldn't copy",
    "Канбан-доска": "Kanban Board",
    "Тренажёр печати": "Typing Test",
    "Трекер расходов": "Expense Tracker",
    "Генератор палитр": "Palette Generator",
    "Pomodoro-таймер": "Pomodoro Timer",
    "Продуктивность": "Productivity",
    "Игры": "Games",
    "Инструменты": "Tools"
  });

  var titleRu;
  function applyI18n(scope) {
    scope = scope || document;
    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (el.__ru === undefined) el.__ru = el.innerHTML;
      el.innerHTML = t(el.__ru);
    });
    scope.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.__ruAttr = el.__ruAttr || {};
      el.getAttribute("data-i18n-attr").split(",").forEach(function (a) {
        a = a.trim();
        if (el.__ruAttr[a] === undefined) el.__ruAttr[a] = el.getAttribute(a) || "";
        el.setAttribute(a, t(el.__ruAttr[a]));
      });
    });
    if (titleRu === undefined) titleRu = document.title;
    document.title = t(titleRu);
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

  function buildTexts() {
    var en = lang === "en";
    return {
      name: (en && C.nameEn) || C.name || "",
      role: (en && C.roleEn) || C.role || "",
      email: C.email || "",
      github: C.githubUser ? "github.com/" + C.githubUser : "",
      telegram: C.telegram ? "@" + C.telegram : "",
      linkedin: (C.linkedin || "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
      year: String(new Date().getFullYear())
    };
  }
  var texts = buildTexts();

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
      toast(t(fallbackEl ? "Текст выделен, нажми Ctrl+C" : "Не удалось скопировать"));
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).then(function () {
          toast(okMsg || t("Скопировано"));
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
    list.innerHTML = "";
    (C.projects || []).forEach(function (p) {
      if (p.id === current) return;
      var a = document.createElement("a");
      a.className = "chip";
      a.href = standalone ? demoUrl(p) : p.file;
      a.textContent = t(p.title);
      list.appendChild(a);
    });
  }

  function setLang(next) {
    if (next !== "ru" && next !== "en") return;
    lang = next;
    store(LANG_KEY, next);
    root.setAttribute("lang", next);
    texts = buildTexts();
    window.TM.texts = texts;
    buildProjectFooter();
    applyConfig(document);
    applyI18n(document);
    document.dispatchEvent(new CustomEvent("langchange", { detail: next }));
  }

  window.TM = {
    config: C,
    links: links,
    texts: texts,
    store: store,
    currentTheme: currentTheme,
    toggleTheme: toggleTheme,
    lang: function () { return lang; },
    setLang: setLang,
    t: t,
    addDict: addDict,
    locale: locale,
    applyI18n: applyI18n,
    toast: toast,
    copy: copy,
    srcUrl: srcUrl,
    demoUrl: demoUrl,
    applyConfig: applyConfig
  };

  function init() {
    buildProjectFooter();
    applyConfig(document);
    applyI18n(document);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
      b.addEventListener("click", function () {
        var th = toggleTheme();
        toast(t(th === "dark" ? "Тёмная тема" : "Светлая тема"));
      });
    });
    document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
      b.addEventListener("click", function () {
        setLang(lang === "ru" ? "en" : "ru");
        toast(lang === "en" ? "English" : "Русский");
      });
    });
    document.querySelectorAll("[data-copy]").forEach(function (b) {
      b.addEventListener("click", function () {
        var key = b.getAttribute("data-copy");
        var target = b.getAttribute("data-copy-target");
        var value = texts[key] || key;
        copy(value, t("Скопировано") + ": " + value, target ? document.getElementById(target) : null);
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
