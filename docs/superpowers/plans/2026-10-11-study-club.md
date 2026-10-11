# Study Club Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline. No subagents are authorized.

**Goal:** Мотивировать закрывать ежедневный набор и оба выходных через XP, печати и видимые следующие шаги.

**Architecture:** `js/club.js` содержит чистые правила целей и наград, использует `js/study.js`. `app.js` записывает режим и цель, отображает прогресс и награды. CSS добавляет сдержанную клубную эстетику.

**Tech Stack:** Vanilla HTML/CSS/JS, Node.js test runner.

**Spec:** `docs/superpowers/specs/2026-10-11-study-club-design.md`

## Global Constraints

- Без сервера, новых зависимостей, внешних шрифтов и автоматической публикации.
- Учебные данные и проверка ответов не изменяются.
- 10 XP за новый режим дня, 20 за будний план, 25 за повторение выходного, 50 за полную неделю; уровень — каждые 200 XP.
- Старые календарные отметки сохраняются по прежнему правилу.

## Review Focus

- Повтор режима на другом юните не должен приносить дополнительные XP.
- Пункты из разных юнитов нельзя объединить для закрытия одного дня.
- Перезагрузка и импорт не должны дублировать награды.
- Просмотр следующего дня не должен снять уже заработанную серию.
- Недоступные упражнения исключаются из набора; письмо не получает оценку правильности.

### 1. Правила и данные

Create `js/club.js`, `tests/club.test.cjs`; modify `index.html`.

- [x] Написать и запустить падающие тесты целей, повторов, выходных, серии, старых данных и валидации.
- [x] Реализовать `requiredModes(available, policy)`, `normalize(raw, today)`, `dayStatus(events, day, club)`, `ledger(events, club, today)` и проверить полный набор тестов.

### 2. Интерфейс занятий

Modify `js/app.js`, `README.md`.

- [x] Записывать режим; сохранять выбранную нагрузку и цели дней, уважать старые отметки.
- [x] Добавить ежедневный список, следующий шаг, XP/уровень/серию, печати и обратную связь после подхода.
- [x] Проверить четыре завершённых занятия, повтор, смену юнита, выходные, перезагрузку и экспорт.

### 3. Оформление и передача

Modify `css/style.css`, `index.html`.

- [x] Добавить клубную палитру и печати, поддержку тёмной темы и reduced motion.
- [x] Проверить 320–1440px, консоль, синтаксис, данные 145 юнитов и чистоту diff.
- [x] Подготовить PR, архив, отчёт и скриншоты.

## Verification evidence

- 21 tests passed in Europe/Moscow and America/New_York.
- 16 JavaScript files passed syntax checks; all 145 units and exercise data unchanged.
- Browser: 5 weekday plans + Saturday/Sunday review, 400 XP, 7-day streak, 1 weekly seal; repeat did not add XP; reload retained rewards.
- Browser: core/all switching, target unit change, closed goals preserved, JSON export includes 5 goals and 23 sessions.
- Desktop/mobile: 320, 390, 540, 768, 1440px, light/dark; no horizontal overflow or console errors.
- Author review completed inline; no subagents used. PR and delivery files prepared separately.
