# Портфолио Тамерлана

Сайт-портфолио frontend-разработчика: интерактивный терминал, имя, которое реагирует на курсор, и шесть мини-проектов, которые можно открыть прямо на сайте.

**Сайт:** https://taintedrr.github.io/portfolio/

Написан на чистом HTML, CSS и JavaScript: без фреймворков, сборки и зависимостей.

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
| `projects/` | Мини-проекты |
| `assets/` | Общие стили и скрипты |

## Как поменять данные

Всё личное лежит в `config.js`: ник на GitHub, Telegram, почта (`email`) и LinkedIn (`linkedin`). Если поля нет или оно пустое, строка на сайте скрывается.

## Запуск локально

Открой `index.html` в браузере или запусти простой сервер:

```bash
python -m http.server 5173
```
