/* Portfolio page interactions */
(function () {
  var TM = window.TM;
  var C = TM.config;
  var T = TM.t;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // English for this page, keyed by the Russian text in index.html and below
  TM.addDict({
    "Портфолио Тамерлана": "Tamerlan's Portfolio",
    "Наверх": "Back to top",
    "Разделы": "Sections",
    "Проекты": "Projects",
    "Мини-проекты": "Mini-projects",
    "Обо мне": "About",
    "Стек": "Stack",
    "Процесс": "Process",
    "Контакты": "Contact",
    "Написать": "Contact me",
    "Меню": "Menu",
    "Открыт к новым проектам": "Open to new projects",
    'Делаю быстрые сайты и веб-приложения, которые <span class="mark">приятно открывать</span> на любом экране.':
      'I build fast websites and web apps that <span class="mark">feel great to open</span> on any screen.',
    "Смотреть проекты": "See projects",
    "Мой GitHub": "My GitHub",
    "мини-проектов можно открыть прямо здесь": "mini-projects you can open right here",
    "библиотек: только HTML, CSS и JS": "libraries: just HTML, CSS and JS",
    "языка и 2 темы, переключатели вверху": "languages and 2 themes, switches at the top",
    "Интерактивный терминал": "Interactive terminal",
    "Люблю чистый JavaScript, анимации и быстрые сайты.": "I love plain JavaScript, animation and fast websites.",
    "Введи <b>help</b>, чтобы увидеть команды. Попробуй <b>open 2048</b>.": "Type <b>help</b> to see the commands. Try <b>open 2048</b>.",
    "введи команду…": "type a command…",
    "Команда терминала": "Terminal command",
    "Быстрые команды": "Quick commands",
    "Основные работы": "Main work",
    "Интернет-магазин и Telegram-бот для приёма заказов: от вёрстки до серверной части.": "An online store and a Telegram bot that takes orders, from layout to back end.",
    "Маркет": "Market",
    "Веб-сайт": "Website",
    "E-commerce маркетплейс": "E-commerce marketplace",
    "Каталог товаров, корзина и адаптивный интерфейс, одинаково удобный на телефоне и компьютере.": "Product catalog, shopping cart and a responsive interface that works just as well on a phone as on a desktop.",
    "Открыть сайт": "Open site",
    "Код": "Code",
    "бот": "bot",
    "Привет! Что закажем сегодня?": "Hi! What are we ordering today?",
    "Пицца": "Pizza",
    "Бургеры": "Burgers",
    "Напитки": "Drinks",
    "Корзина · 3": "Cart · 3",
    "Открыть меню": "Open menu",
    "Маргарита": "Margherita",
    "Бургер": "Burger",
    "Лимонад": "Lemonade",
    "Оплатить $18.30": "Pay $18.30",
    "Telegram-бот и Mini App": "Telegram bot and Mini App",
    "Бот для приёма заказов с интерактивным меню и удобным Mini App прямо внутри Telegram.": "An order-taking bot with an interactive menu and a handy Mini App right inside Telegram.",
    "Демо-сервер запускается по запросу. Чтобы проверить бота вживую, напиши мне в Telegram.": "The demo server runs on request. To try the bot live, message me on Telegram.",
    "Запустить бота": "Start the bot",
    "Шесть демо, которые можно потрогать прямо сейчас": "Six demos you can try right now",
    "Каждый проект открывается отдельной страницей и работает без сервера. Открой демо или посмотри код на GitHub.": "Each project opens as its own page and runs without a server. Open a demo or read the code on GitHub.",
    "Фильтр проектов": "Project filter",
    "Все": "All",
    "Нужно": "To do",
    "В работе": "In progress",
    "Готово": "Done",
    "Задачи в трёх колонках: перетаскивание, приоритеты, поиск и прогресс. Доска сохраняется в браузере.": "Tasks in three columns with drag and drop, priorities, search and progress. The board is saved in your browser.",
    "Открыть демо": "Open demo",
    "Анимации · Touch": "Animations · Touch",
    "Головоломка с плавным движением плиток, свайпами на телефоне, отменой хода и рекордом.": "The puzzle with smooth tile movement, swipes on mobile, undo and a high score.",
    "Играть": "Play",
    '<span class="ok">Съешь же ещё этих мяг</span><span class="err">r</span><span class="ok">их фра</span><span class="cur"></span><span class="todo">нцузских булок, да выпей чаю.</span>':
      '<span class="ok">The quick brown f</span><span class="err">p</span><span class="ok">x jum</span><span class="cur"></span><span class="todo">ps over the lazy dog.</span>',
    "зн/мин": "CPM",
    "точность": "accuracy",
    "Input events · Таймеры": "Input events · Timers",
    "Считает скорость в знаках в минуту и точность. Русский и английский тексты, режимы на 15, 30 и 60 секунд.": "Measures your speed in characters per minute and your accuracy. Russian and English texts, 15, 30 and 60 second modes.",
    "Проверить скорость": "Test your speed",
    "Еда": "Food",
    "Жильё": "Housing",
    "Транспорт": "Transport",
    "Досуг": "Leisure",
    "Доходы и траты в долларах по категориям, баланс за месяц и круговая диаграмма, нарисованная на Canvas.": "Income and spending in dollars by category, a monthly balance and a donut chart drawn on Canvas.",
    "Цветовые схемы по правилам гармонии, проверка контраста по WCAG и экспорт в CSS-переменные.": "Color schemes built on harmony rules, WCAG contrast checks and export to CSS variables.",
    "Фокус": "Focus",
    "Циклы фокуса и перерывов, кольцо прогресса, звуковой сигнал и статистика за день.": "Focus and break cycles, a progress ring, a sound alert and daily stats.",
    "Больше кода и экспериментов у меня на GitHub.": "More code and experiments on my GitHub.",
    "Все репозитории": "All repositories",
    "Делаю интерфейсы, в которых всё понятно с первого клика": "I build interfaces that make sense from the first click",
    "Меня зовут": "My name is",
    "я frontend-разработчик. Верстаю адаптивные сайты, собираю веб-приложения и оживляю их анимацией. Все проекты на этой странице я написал с нуля, без шаблонов и библиотек, чтобы было видно, как я работаю с логикой, состоянием и мелкими деталями.":
      "and I'm a frontend developer. I build responsive websites, put together web apps and bring them to life with animation. I wrote every project on this page from scratch, with no templates or libraries, so you can see how I handle logic, state and small details.",
    "Лендинги и сайты": "Landing pages and websites",
    "Адаптивная вёрстка по макету из Figma, анимации и быстрая загрузка.": "Responsive layouts from Figma designs, animation and fast loading.",
    "Веб-приложения": "Web apps",
    "Интерфейсы с состоянием: формы, фильтры, дашборды и личные кабинеты.": "Stateful interfaces: forms, filters, dashboards and user accounts.",
    "Интерактив": "Interactive",
    "Мини-игры, калькуляторы и конфигураторы, которые удерживают посетителя.": "Mini-games, calculators and configurators that keep visitors engaged.",
    "Чем я пользуюсь каждый день": "What I use every day",
    "Шкала показывает уверенность от 1 до 5.": "The scale shows confidence from 1 to 5.",
    "Основа": "Core",
    "семантика, доступность": "semantics, accessibility",
    "Grid, Flexbox, анимации": "Grid, Flexbox, animation",
    "типы, дженерики": "types, generics",
    "Фреймворки": "Frameworks",
    "хуки, роутинг": "hooks, routing",
    "дизайн-системы": "design systems",
    "БЭМ, миксины": "BEM, mixins",
    "Git и GitHub": "Git and GitHub",
    "ветки, PR, Pages": "branches, PRs, Pages",
    "Vite и npm": "Vite and npm",
    "сборка, пакеты": "builds, packages",
    "макеты, Dev Mode": "mockups, Dev Mode",
    "Как проходит работа над проектом": "How a project goes",
    "Разбираюсь в задаче": "Understanding the task",
    "Уточняю цели, аудиторию и сроки. Фиксируем объём работ и стоимость.": "I clarify goals, audience and deadlines. We agree on scope and price.",
    "Прототип": "Prototype",
    "Собираю структуру и первый кликабельный вариант, чтобы обсудить направление.": "I put together the structure and a first clickable version so we can agree on direction.",
    "Разработка": "Development",
    "Пишу код и показываю промежуточные версии. Правки вносим по ходу.": "I write the code and show work in progress. We make changes along the way.",
    "Запуск": "Launch",
    "Выкладываю сайт, проверяю на телефонах и передаю исходники.": "I deploy the site, test it on phones and hand over the source code.",
    'Есть идея или задача? <span class="mark">Напиши мне.</span>': 'Have an idea or a task? <span class="mark">Message me.</span>',
    "Отвечаю в течение дня. Можно сразу в Telegram или собрать короткую заявку: она превратится в готовое сообщение.": "I reply within a day. Message me on Telegram, or fill in a short brief and it turns into a ready-to-send message.",
    "Почта": "Email",
    "Копировать": "Copy",
    "Заявка за минуту": "One-minute brief",
    "Как тебя зовут": "Your name",
    "Анна": "Anna",
    "Что нужно сделать": "What do you need",
    "Лендинг": "Landing page",
    "Сайт компании": "Company website",
    "Веб-приложение": "Web app",
    "Другое": "Other",
    "Бюджет": "Budget",
    "Обсудим": "Let's discuss",
    "до $500": "under $500",
    "от $1,500": "$1,500+",
    "Коротко о задаче": "About the project",
    "Нужен сайт для студии йоги: расписание, цены и запись.": "I need a website for a yoga studio: schedule, prices and booking.",
    "Собрать и скопировать": "Build and copy",
    "<b>Сообщение скопировано.</b> Вставь его в чат или письмо:": "<b>Message copied.</b> Paste it into a chat or an email:",
    "Открыть Telegram": "Open Telegram",
    "Написать на почту": "Send an email",
    "Сайт написан вручную на HTML, CSS и JavaScript.": "Hand-written in HTML, CSS and JavaScript.",
    "Наверх ↑": "Back to top ↑",

    // Script strings
    "Уровень {n} из 5": "Level {n} of 5",
    "список команд": "list of commands",
    "коротко обо мне": "a few words about me",
    "мини-проекты": "mini-projects",
    "основные работы: магазин и бот": "main work: store and bot",
    "открыть проект: open 2048": "open a project: open 2048",
    "технологии, с которыми работаю": "technologies I work with",
    "ссылка на мой GitHub": "link to my GitHub",
    "как со мной связаться": "how to reach me",
    "переключить светлую и тёмную тему": "switch between light and dark theme",
    "сменить язык: lang en": "switch language: lang ru",
    "текущие дата и время": "current date and time",
    "очистить экран": "clear the screen",
    "Верстаю адаптивные сайты, собираю веб-приложения и делаю интерактив. Все проекты здесь написаны с нуля.": "I build responsive websites, web apps and interactive pieces. Every project here is written from scratch.",
    "Открыть: <b>open kanban</b> или <b>open 3</b>": "Open one: <b>open kanban</b> or <b>open 3</b>",
    "магазин": "store",
    "Не нашёл проект «{q}». Список: <b>projects</b>": "Couldn't find project “{q}”. List: <b>projects</b>",
    "Открываю {p}…": "Opening {p}…",
    "GitHub пока не указан в config.js": "GitHub isn't set in config.js yet",
    "почта": "email",
    "Или заполни заявку: ": "Or fill in the brief: ",
    "перейти к форме": "go to the form",
    "Тема: тёмная": "Theme: dark",
    "Тема: светлая": "Theme: light",
    "Язык: русский": "Language: Russian",
    "Язык: английский": "Language: English",
    "Использование: <b>lang ru</b> или <b>lang en</b>": "Usage: <b>lang ru</b> or <b>lang en</b>",
    "[sudo] проверка прав… <span class='t-ok'>доступ разрешён</span>": "[sudo] checking permissions… <span class='t-ok'>access granted</span>",
    "Отличный выбор. Переношу тебя к контактам ✦": "Great choice. Taking you to the contacts ✦",
    "sudo: здесь работает только <b>sudo hire-me</b>": "sudo: only <b>sudo hire-me</b> works here",
    "Команда не найдена: {c}. Введи <b>help</b>": "Command not found: {c}. Type <b>help</b>",
    "Заполни имя и пару слов о задаче.": "Fill in your name and a few words about the project.",
    "Напиши, как к тебе обращаться.": "Tell me your name.",
    "Опиши задачу хотя бы в одном предложении.": "Describe the project in at least one sentence.",
    "Привет, {name}! Меня зовут {client}.\nЗадача: {type}\nБюджет: {budget}\n\n{msg}": "Hi {name}! My name is {client}.\nProject: {type}\nBudget: {budget}\n\n{msg}",
    "Заявка скопирована": "Brief copied"
  });

  function fill(str, map) {
    return str.replace(/\{(\w+)\}/g, function (m, k) { return map[k] !== undefined ? map[k] : m; });
  }

  /* ---------- Kinetic name ---------- */
  var kinetic = document.getElementById("kinetic");
  var letters = [];
  function buildName() {
    var name = (TM.texts.name || "Тамерлан").trim();
    kinetic.querySelectorAll(".kinetic__word").forEach(function (w) { w.remove(); });
    letters = [];
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
  }
  buildName();

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
  var cards = Array.from(document.querySelectorAll("#projectGrid .pcard"));
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
  var meters = Array.from(document.querySelectorAll(".meter"));
  function labelMeters() {
    meters.forEach(function (m) {
      m.setAttribute("aria-label", fill(T("Уровень {n} из 5"), { n: m.getAttribute("data-level") }));
    });
  }
  meters.forEach(function (m) {
    var lvl = parseInt(m.getAttribute("data-level"), 10) || 0;
    m.setAttribute("role", "img");
    for (var i = 1; i <= 5; i++) {
      var dot = document.createElement("i");
      if (i <= lvl) dot.className = "on";
      m.appendChild(dot);
    }
  });
  labelMeters();

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
      return p.id === q || p.title.toLowerCase().indexOf(q) === 0 || T(p.title).toLowerCase().indexOf(q) === 0;
    })[0];
  }

  var commands = {
    help: {
      desc: "список команд",
      run: function () {
        var rows = Object.keys(commands).filter(function (k) { return !commands[k].hidden; }).map(function (k) {
          return "<span>" + k + "</span><span>" + T(commands[k].desc) + "</span>";
        }).join("");
        line('<div class="t-table">' + rows + "</div>");
      }
    },
    about: {
      desc: "коротко обо мне",
      run: function () {
        line(esc(TM.texts.name) + ", " + esc((TM.texts.role || "").toLowerCase()) + ". " + T("Верстаю адаптивные сайты, собираю веб-приложения и делаю интерактив. Все проекты здесь написаны с нуля."), "t-out");
      }
    },
    work: {
      desc: "основные работы: магазин и бот",
      run: function () {
        line('<div class="t-table">' +
          "<span>" + T("магазин") + "</span><span>" + link("https://taintedrr.github.io/myfirstsite/", T("E-commerce маркетплейс")) + " · HTML, CSS, JS</span>" +
          "<span>" + T("бот") + "</span><span>" + link("https://t.me/taintedrrbot", T("Telegram-бот и Mini App")) + " · Python, aiogram</span>" +
          "</div>");
      }
    },
    projects: {
      desc: "мини-проекты",
      run: function () {
        var rows = projects.map(function (p, i) {
          return "<span>" + (i + 1) + ". " + esc(p.id) + "</span><span>" + link("projects/" + p.file, T(p.title)) + " · " + esc(T(p.cat)) + "</span>";
        }).join("");
        line('<div class="t-table">' + rows + "</div>");
        line(T("Открыть: <b>open kanban</b> или <b>open 3</b>"), "t-dim");
      }
    },
    open: {
      desc: "открыть проект: open 2048",
      run: function (arg) {
        var p = findProject(arg);
        if (!p) {
          line(fill(T("Не нашёл проект «{q}». Список: <b>projects</b>"), { q: esc(arg || "") }), "t-err");
          return;
        }
        line(fill(T("Открываю {p}…"), { p: esc(T(p.title)) }), "t-ok");
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
        line(TM.links.github ? "→ " + link(TM.links.github, TM.texts.github) : T("GitHub пока не указан в config.js"), "t-out");
      }
    },
    contact: {
      desc: "как со мной связаться",
      run: function () {
        var rows = "";
        if (TM.links.telegram) rows += "<span>telegram</span><span>" + link(TM.links.telegram, TM.texts.telegram) + "</span>";
        if (TM.links.github) rows += "<span>github</span><span>" + link(TM.links.github, TM.texts.github) + "</span>";
        if (C.email) rows += "<span>" + T("почта") + "</span><span>" + esc(C.email) + "</span>";
        line('<div class="t-table">' + rows + "</div>");
        line(T("Или заполни заявку: ") + link("#contact", T("перейти к форме")), "t-dim");
      }
    },
    lang: {
      desc: "сменить язык: lang en",
      run: function (arg) {
        var next = (arg || "").trim().toLowerCase();
        if (!next) next = TM.lang() === "ru" ? "en" : "ru";
        if (next !== "ru" && next !== "en") { line(T("Использование: <b>lang ru</b> или <b>lang en</b>"), "t-dim"); return; }
        TM.setLang(next);
        line(T(next === "en" ? "Язык: английский" : "Язык: русский"), "t-ok");
      }
    },
    theme: {
      desc: "переключить светлую и тёмную тему",
      run: function () {
        var th = TM.toggleTheme();
        line(T(th === "dark" ? "Тема: тёмная" : "Тема: светлая"), "t-ok");
      }
    },
    date: {
      desc: "текущие дата и время",
      run: function () {
        line(new Date().toLocaleString(TM.locale(), { dateStyle: "full", timeStyle: "short" }), "t-out");
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
          line(T("[sudo] проверка прав… <span class='t-ok'>доступ разрешён</span>"), "t-out");
          line(T("Отличный выбор. Переношу тебя к контактам ✦"), "t-accent");
          setTimeout(function () { document.getElementById("contact").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); }, 700);
        } else {
          line(T("sudo: здесь работает только <b>sudo hire-me</b>"), "t-dim");
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
    else line(fill(T("Команда не найдена: {c}. Введи <b>help</b>"), { c: esc(name) }), "t-err");
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
      err.textContent = T(missing.length === 2 ? "Заполни имя и пару слов о задаче." : (missing[0] === name ? "Напиши, как к тебе обращаться." : "Опиши задачу хотя бы в одном предложении."));
      err.hidden = false;
      missing[0].focus();
      return;
    }
    err.hidden = true;
    var typeInput = brief.querySelector('input[name="type"]:checked');
    var budgetSel = brief.elements.budget;
    var text = fill(T("Привет, {name}! Меня зовут {client}.\nЗадача: {type}\nБюджет: {budget}\n\n{msg}"), {
      name: TM.texts.name,
      client: name.value.trim(),
      type: typeInput.nextElementSibling.textContent,
      budget: budgetSel.options[budgetSel.selectedIndex].text,
      msg: msg.value.trim()
    });
    preview.textContent = text;
    done.hidden = false;
    TM.copy(text, T("Заявка скопирована"), preview);
  });
  brief.addEventListener("input", function (e) {
    if (e.target.classList.contains("is-invalid") && e.target.value.trim()) e.target.classList.remove("is-invalid");
  });

  document.addEventListener("langchange", function () {
    buildName();
    labelMeters();
    err.hidden = true;
  });
})();
