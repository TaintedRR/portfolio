/*
  Все личные данные сайта — здесь. Поменяй значения и сохрани файл:
  ссылки на GitHub, Telegram, почту и кнопки «Код» обновятся на всех страницах.
*/
window.PORTFOLIO = {
  name: "Тамерлан",
  role: "Frontend-разработчик",

  // Ник на GitHub (без github.com/)
  githubUser: "TaintedRR",
  // Репозиторий, в который ты зальёшь этот сайт, и его ветка
  repo: "portfolio",
  branch: "main",

  // Ник в Telegram (без @). Оставь пустым, чтобы скрыть
  telegram: "luvippawii",
  // Полная ссылка на LinkedIn или пустая строка, чтобы скрыть

  // repo — отдельный репозиторий проекта на GitHub, туда ведёт кнопка «Код»
  projects: [
    { id: "kanban",   title: "Канбан-доска",     file: "kanban.html",   cat: "Продуктивность", repo: "kanban-board" },
    { id: "2048",     title: "2048",             file: "2048.html",     cat: "Игры",           repo: "2048-game" },
    { id: "typing",   title: "Тренажёр печати",  file: "typing.html",   cat: "Игры",           repo: "typing-speed-test" },
    { id: "budget",   title: "Трекер расходов",  file: "budget.html",   cat: "Инструменты",    repo: "budget-tracker" },
    { id: "palette",  title: "Генератор палитр", file: "palette.html",  cat: "Инструменты",    repo: "palette-generator" },
    { id: "pomodoro", title: "Pomodoro-таймер",  file: "pomodoro.html", cat: "Продуктивность", repo: "pomodoro-timer" }
  ]
};
