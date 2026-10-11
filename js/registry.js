/*
 * Реестр тем. Файлы в js/data/ вызывают EGIU.section(...) и EGIU.unit(...).
 *
 * Формат юнита:
 *   tip: краткое правило (по-русски)
 *   g:   предложения с пропуском: "I [am working|work|worked](work) now."
 *        — первый вариант правильный, остальные — неправильные;
 *        — "a/b" в первом варианте = несколько правильных ответов;
 *        — "-" = ничего не нужно (например, нулевой артикль);
 *        — "(work)" сразу после скобок — подсказка для режима «впиши».
 *   e:   "предложение с ошибкой => исправленное || другой верный вариант"
 *   t:   "задание => ответ || другой верный ответ"
 *   w:   ["задание для свободного письма", "пример ответа"]
 */
window.EGIU = {
  sections: [],
  units: {},
  list: [],
  lab: {},
  section(en, ru) {
    this.sections.push({ en, ru, units: [] });
  },
  unit(n, title, data) {
    const section = this.sections[this.sections.length - 1];
    const u = Object.assign({ n, title, section }, data);
    section.units.push(u);
    this.units[n] = u;
    this.list.push(u);
  },
};
