/* Portfolio page interactions */
(function () {
  var TM = window.TM;
  var C = TM.config;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Kinetic name ---------- */
  var kinetic = document.getElementById("kinetic");
  var letters = [];
  (function buildName() {
    var name = (C.name || "Тамерлан").trim();
    kinetic.querySelectorAll(".kinetic__word").forEach(function (w) { w.remove(); });
    var i = 0;
    name.split(/\s+/).forEach(function (word) {
      var w = document.createElement("span");
      w.className = "kinetic__word";
      w.setAttribute("aria-hidden", "true");
      Array.from(word).forEach(function (ch) {
        var s = document.createElement("span");
        s.className = "kl";
        s.textContent = ch;
        s.style.setProperty("--i", i++);
        w.appendChild(s);
        letters.push(s);
      });
      kinetic.appendChild(w);
    });
  })();

  if (finePointer && !reduceMotion) {
    var px = -9999, py = -9999, raf = 0;
    function paint() {
      raf = 0;
      var size = parseFloat(getComputedStyle(kinetic).fontSize) || 120;
      var radius = size * 2.1;
      letters.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var dx = px - (r.left + r.width / 2);
        var dy = py - (r.top + r.height / 2);
        var d = Math.sqrt(dx * dx + dy * dy);
        var f = Math.max(0, 1 - d / radius);
        f = Math.round(f * f * 100) / 100;
        el.style.setProperty("--f", f);
        el.classList.toggle("is-near", f > 0);
      });
    }
    window.addEventListener("pointermove", function (e) {
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    }, { passive: true });
    document.addEventListener("pointerleave", function () {
      px = py = -9999;
      if (!raf) raf = requestAnimationFrame(paint);
    });
  } else if (!reduceMotion) {
    // Touch: a tap sends a wave through the letters
    kinetic.addEventListener("click", function () {
      letters.forEach(function (el, i) {
        setTimeout(function () {
          el.style.setProperty("--f", 1);
          setTimeout(function () { el.style.setProperty("--f", 0); }, 260);
        }, i * 60);
      });
    });
  }

  /* ---------- Header: scrolled state, progress, active link ---------- */
  var header = document.querySelector(".site-header");
  var bar = document.getElementById("progressBar");
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 8);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navLinks = Array.from(document.querySelectorAll(".nav a"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { io.observe(s); });
  }

  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  }
  burger.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
  navLinks.forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Magnetic buttons & card tilt ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".magnetic").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.25;
        var y = (e.clientY - r.top - r.height / 2) * 0.35;
        btn.style.transform = "translate(" + x + "px," + y + "px)";
      });
      btn.addEventListener("pointerleave", function () { btn.style.transform = ""; });
    });

    document.querySelectorAll(".pcard").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var nx = (e.clientX - r.left) / r.width - 0.5;
        var ny = (e.clientY - r.top) / r.height - 0.5;
        card.classList.add("is-tilting");
        card.style.setProperty("--ry", (nx * 6).toFixed(2) + "deg");
        card.style.setProperty("--rx", (-ny * 6).toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", function () {
        card.classList.remove("is-tilting");
        card.style.setProperty("--ry", "0deg");
        card.style.setProperty("--rx", "0deg");
      });
    });
  }

  /* ---------- Project filters ---------- */
  var filterBtns = Array.from(document.querySelectorAll("[data-filter]"));
  var cards = Array.from(document.querySelectorAll(".pcard"));
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      cards.forEach(function (card) {
        var show = f === "all" || card.getAttribute("data-cat") === f;
        card.classList.toggle("is-filtered-out", !show);
        if (show) {
          card.classList.remove("is-entering");
          void card.offsetWidth;
          card.classList.add("is-entering");
        }
      });
    });
  });

  /* ---------- Skill meters ---------- */
  document.querySelectorAll(".meter").forEach(function (m) {
    var lvl = parseInt(m.getAttribute("data-level"), 10) || 0;
    m.setAttribute("role", "img");
    m.setAttribute("aria-label", "Уровень " + lvl + " из 5");
    for (var i = 1; i <= 5; i++) {
      var dot = document.createElement("i");
      if (i <= lvl) dot.className = "on";
      m.appendChild(dot);
    }
  });

  /* ---------- Terminal ---------- */
  var out = document.getElementById("termOut");
  var form = document.getElementById("termForm");
  var input = document.getElementById("termIn");
  var history = [];
  var hIndex = 0;
  var projects = C.projects || [];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function line(html, cls) {
    var d = document.createElement("div");
    d.className = "t-line" + (cls ? " " + cls : "");
    d.innerHTML = html;
    out.appendChild(d);
    return d;
  }
  function link(href, label) {
    var ext = /^https?:/.test(href);
    return '<a href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + esc(label) + "</a>";
  }
  function findProject(q) {
    q = (q || "").toLowerCase().trim();
    if (!q) return null;
    var n = parseInt(q, 10);
    if (n >= 1 && n <= projects.length) return projects[n - 1];
    return projects.filter(function (p) {
      return p.id === q || p.title.toLowerCase().indexOf(q) === 0;
    })[0];
  }

  var commands = {
    help: {
      desc: "список команд",
      run: function () {
        var rows = Object.keys(commands).filter(function (k) { return !commands[k].hidden; }).map(function (k) {
          return "<span>" + k + "</span><span>" + commands[k].desc + "</span>";
        }).join("");
        line('<div class="t-table">' + rows + "</div>");
      }
    },
    about: {
      desc: "коротко обо мне",
      run: function () {
        line(esc(C.name) + ", " + esc((C.role || "").toLowerCase()) + ". Верстаю адаптивные сайты, собираю веб-приложения и делаю интерактив. Все проекты здесь написаны с нуля.", "t-out");
      }
    },
    projects: {
      desc: "мини-проекты",
      run: function () {
        var rows = projects.map(function (p, i) {
          return "<span>" + (i + 1) + ". " + esc(p.id) + "</span><span>" + link("projects/" + p.file, p.title) + " · " + esc(p.cat) + "</span>";
        }).join("");
        line('<div class="t-table">' + rows + "</div>");
        line("Открыть: <b>open kanban</b> или <b>open 3</b>", "t-dim");
      }
    },
    work: {
      desc: "основные работы: магазин и бот",
      run: function () {
        line('<div class="t-table">' +
          "<span>магазин</span><span>" + link("https://taintedrr.github.io/myfirstsite/", "E-commerce маркетплейс") + " · HTML, CSS, JS</span>" +
          "<span>бот</span><span>" + link("https://t.me/taintedrrbot", "Telegram-бот и Mini App") + " · Python, aiogram</span>" +
          "</div>");
      }
    },
    open: {
      desc: "открыть проект: open 2048",
      run: function (arg) {
        var p = findProject(arg);
        if (!p) {
          line("Не нашёл проект «" + esc(arg || "") + "». Список: <b>projects</b>", "t-err");
          return;
        }
        line("Открываю " + esc(p.title) + "…", "t-ok");
        setTimeout(function () { window.location.href = "projects/" + p.file; }, 450);
      }
    },
    skills: {
      desc: "технологии, с которыми работаю",
      run: function () {
        var groups = Array.from(document.querySelectorAll(".stack__group")).map(function (g) {
          var names = Array.from(g.querySelectorAll(".stack__name")).map(function (n) { return n.textContent; });
          return "<span>" + esc(g.querySelector("h3").textContent) + "</span><span>" + esc(names.join(", ")) + "</span>";
        }).join("");
        line('<div class="t-table">' + groups + "</div>");
      }
    },
    github: {
      desc: "ссылка на мой GitHub",
      run: function () {
        line(TM.links.github ? "→ " + link(TM.links.github, TM.texts.github) : "GitHub пока не указан в config.js", "t-out");
      }
    },
    contact: {
      desc: "как со мной связаться",
      run: function () {
        var rows = "";
        if (TM.links.telegram) rows += "<span>telegram</span><span>" + link(TM.links.telegram, TM.texts.telegram) + "</span>";
        if (TM.links.github) rows += "<span>github</span><span>" + link(TM.links.github, TM.texts.github) + "</span>";
        if (C.email) rows += "<span>почта</span><span>" + esc(C.email) + "</span>";
        line('<div class="t-table">' + rows + "</div>");
        line("Или заполни заявку: " + link("#contact", "перейти к форме"), "t-dim");
      }
    },
    theme: {
      desc: "переключить светлую и тёмную тему",
      run: function () {
        var t = TM.toggleTheme();
        line("Тема: " + (t === "dark" ? "тёмная" : "светлая"), "t-ok");
      }
    },
    date: {
      desc: "текущие дата и время",
      run: function () {
        line(new Date().toLocaleString("ru-RU", { dateStyle: "full", timeStyle: "short" }), "t-out");
      }
    },
    clear: {
      desc: "очистить экран",
      run: function () { out.innerHTML = ""; }
    },
    sudo: {
      hidden: true,
      desc: "",
      run: function (arg) {
        if ((arg || "").trim() === "hire-me") {
          line("[sudo] проверка прав… <span class='t-ok'>доступ разрешён</span>", "t-out");
          line("Отличный выбор. Переношу тебя к контактам ✦", "t-accent");
          setTimeout(function () { document.getElementById("contact").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); }, 700);
        } else {
          line("sudo: здесь работает только <b>sudo hire-me</b>", "t-dim");
        }
      }
    },
    echo: {
      hidden: true,
      desc: "",
      run: function (arg) { line(esc(arg || ""), "t-out"); }
    }
  };
  commands.whoami = { hidden: true, desc: "", run: commands.about.run };
  commands.ls = { hidden: true, desc: "", run: commands.projects.run };

  function run(raw) {
    var cmdline = raw.trim();
    if (!cmdline) return;
    line('<span class="t-prompt">$</span>' + esc(cmdline));
    history.push(cmdline);
    hIndex = history.length;
    var parts = cmdline.split(/\s+/);
    var name = parts.shift().toLowerCase();
    var arg = parts.join(" ");
    var cmd = commands[name];
    if (cmd) cmd.run(arg);
    else line("Команда не найдена: " + esc(name) + ". Введи <b>help</b>", "t-err");
    out.scrollTop = out.scrollHeight;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    run(input.value);
    input.value = "";
  });
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") {
      if (hIndex > 0) { hIndex--; input.value = history[hIndex]; }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (hIndex < history.length - 1) { hIndex++; input.value = history[hIndex]; }
      else { hIndex = history.length; input.value = ""; }
      e.preventDefault();
    } else if (e.key === "Tab") {
      var v = input.value.toLowerCase();
      if (!v) return;
      var parts = v.split(" ");
      var pool = parts.length > 1 && parts[0] === "open"
        ? projects.map(function (p) { return "open " + p.id; })
        : Object.keys(commands).filter(function (k) { return !commands[k].hidden; });
      var match = pool.filter(function (c) { return c.indexOf(v) === 0; });
      if (match.length) { input.value = match[0]; e.preventDefault(); }
    }
  });
  document.querySelectorAll("[data-cmd]").forEach(function (b) {
    b.addEventListener("click", function () { run(b.getAttribute("data-cmd")); });
  });
  document.querySelector(".terminal__body").addEventListener("click", function (e) {
    if (e.target.tagName !== "A" && !window.getSelection().toString()) input.focus({ preventScroll: true });
  });

  /* ---------- Brief form ---------- */
  var brief = document.getElementById("brief");
  var err = document.getElementById("briefError");
  var done = document.getElementById("briefDone");
  var preview = document.getElementById("briefPreview");
  brief.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = brief.elements.name;
    var msg = brief.elements.message;
    var missing = [];
    [name, msg].forEach(function (el) {
      var bad = !el.value.trim();
      el.classList.toggle("is-invalid", bad);
      if (bad) missing.push(el);
    });
    if (missing.length) {
      err.textContent = missing.length === 2 ? "Заполни имя и пару слов о задаче." : (missing[0] === name ? "Напиши, как к тебе обращаться." : "Опиши задачу хотя бы в одном предложении.");
      err.hidden = false;
      missing[0].focus();
      return;
    }
    err.hidden = true;
    var text = "Привет, " + (C.name || "") + "! Меня зовут " + name.value.trim() + ".\n" +
      "Задача: " + brief.elements.type.value + "\n" +
      "Бюджет: " + brief.elements.budget.value + "\n\n" +
      msg.value.trim();
    preview.textContent = text;
    done.hidden = false;
    TM.copy(text, "Заявка скопирована", preview);
  });
  brief.addEventListener("input", function (e) {
    if (e.target.classList.contains("is-invalid") && e.target.value.trim()) e.target.classList.remove("is-invalid");
  });
})();
