# Портфолио Тамерлана

Сайт-портфолио frontend-разработчика: интерактивный терминал, имя, которое реагирует на курсор, и шесть мини-проектов, которые можно открыть прямо на сайте.

**Сайт:** https://taintedrr.github.io/portfolio/

Написан на чистом HTML, CSS и JavaScript: без фреймворков, сборки и зависимостей. Сайт и все мини-проекты работают на русском и английском: переключатель RU / EN в шапке, выбор запоминается.

## Основные работы

| Проект | Стек | Ссылки |
|---|---|---|
| E-commerce маркетплейс | HTML5, CSS3, JavaScript | [сайт](https://taintedrr.github.io/myfirstsite/) · [код](https://github.com/TaintedRR/myfirstsite) |
| Telegram-бот и Mini App | Python, aiogram 3.x, WebApp | [бот](https://t.me/taintedrrbot) · [код](https://github.com/TaintedRR/telegrambot) |

## Мини-проекты

У каждого проекта есть свой репозиторий и живое демо.

| Проект | Демо | Код |
|---|---|---|
| Канбан-доска | [открыть](https://taintedrr.github.io/kanban-board/) | [kanban-board](https://github.com/TaintedRR/kanban-board) |
| 2048 | [играть](https://taintedrr.github.io/2048-game/) | [2048-game](https://github.com/TaintedRR/2048-game) |
| Тренажёр печати | [открыть](https://taintedrr.github.io/typing-speed-test/) | [typing-speed-test](https://github.com/TaintedRR/typing-speed-test) |
| Трекер расходов | [открыть](https://taintedrr.github.io/budget-tracker/) | [budget-tracker](https://github.com/TaintedRR/budget-tracker) |
| Генератор палитр | [открыть](https://taintedrr.github.io/palette-generator/) | [palette-generator](https://github.com/TaintedRR/palette-generator) |
| Pomodoro-таймер | [открыть](https://taintedrr.github.io/pomodoro-timer/) | [pomodoro-timer](https://github.com/TaintedRR/pomodoro-timer) |

## Структура

| Файл | Что это |
|---|---|
| `index.html` | Главная страница |
| `config.js` | Личные данные: имя, GitHub, Telegram, почта и список проектов |
| `assets/common.js` | Общий код: тема, переключение языка, ссылки из `config.js` |
| `projects/` | Мини-проекты |
| `assets/` | Общие стили и скрипты |

## Как поменять данные

Всё личное лежит в `config.js`: имя и роль на двух языках (`name`, `nameEn`, `role`, `roleEn`), ник на GitHub, Telegram, почта (`email`) и LinkedIn (`linkedin`). Если поля нет или оно пустое, строка на сайте скрывается.

## Как устроен перевод

Тексты на страницах написаны по-русски. Элементы с атрибутом `data-i18n` берут английский текст из словаря: общий словарь лежит в `assets/common.js`, словарь главной страницы в `assets/site.js`, у каждого мини-проекта свой словарь в начале его скрипта. Ключ словаря это русский текст элемента.

## Запуск локально

Открой `index.html` в браузере или запусти простой сервер:

```bash
python -m http.server 5173
```

---

## English

Portfolio of Tamerlan, a frontend developer: an interactive terminal, a name that reacts to the cursor, two main projects and six mini-projects you can try right on the site.

**Live site:** https://taintedrr.github.io/portfolio/

- Main work: an e-commerce marketplace and a Telegram bot with a Mini App.
- Mini-projects: Kanban Board, 2048, Typing Test, Expense Tracker (in US dollars), Palette Generator and Pomodoro Timer, each with its own repository and live demo.
- The whole site switches between Russian and English with the RU / EN button, and between light and dark themes.
- Plain HTML, CSS and JavaScript with no frameworks, build step or dependencies.
