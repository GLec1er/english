/* Лаборатория произношения: kind snd — классификация звуков, pair — что прозвучало, speak — повтори вслух */

EGIU.lab.ed = {
  icon: '🔚',
  title: 'Окончание -ed',
  short: 'как читается: /t/, /d/ или /ɪd/',
  tip: 'После глухих звуков (p, k, f, s, ʃ, tʃ) -ed звучит как /t/: worked, stopped. После звонких и гласных — /d/: played, lived. После t и d — /ɪd/ (лишний слог): wanted, needed.',
  kind: 'snd',
  task: 'Как звучит окончание -ed?',
  cats: [['t', '/t/'], ['d', '/d/'], ['id', '/ɪd/']],
  items: [
    ['worked', 't'], ['stopped', 't'], ['watched', 't'], ['washed', 't'], ['laughed', 't'], ['finished', 't'], ['kissed', 't'], ['looked', 't'], ['helped', 't'], ['danced', 't'], ['asked', 't'], ['cooked', 't'], ['missed', 't'], ['hoped', 't'],
    ['played', 'd'], ['lived', 'd'], ['opened', 'd'], ['called', 'd'], ['cleaned', 'd'], ['tried', 'd'], ['stayed', 'd'], ['changed', 'd'], ['listened', 'd'], ['arrived', 'd'], ['loved', 'd'], ['used', 'd'], ['moved', 'd'], ['enjoyed', 'd'],
    ['wanted', 'id'], ['needed', 'id'], ['started', 'id'], ['decided', 'id'], ['visited', 'id'], ['waited', 'id'], ['ended', 'id'], ['invited', 'id'], ['hated', 'id'], ['painted', 'id'], ['added', 'id'], ['created', 'id'], ['landed', 'id'], ['shouted', 'id'],
  ],
};

EGIU.lab.s = {
  icon: '🐍',
  title: 'Окончание -s / -es',
  short: 'как читается: /s/, /z/ или /ɪz/',
  tip: 'После глухих (p, t, k, f) -s звучит /s/: works, cats. После звонких и гласных — /z/: plays, dogs. После s, z, ʃ, tʃ, dʒ — /ɪz/ (лишний слог): watches, buses, pages. Правило одинаково для глаголов (he works), множественного числа и \'s.',
  kind: 'snd',
  task: 'Как звучит окончание -s?',
  cats: [['s', '/s/'], ['z', '/z/'], ['iz', '/ɪz/']],
  items: [
    ['works', 's'], ['cats', 's'], ['stops', 's'], ['books', 's'], ['laughs', 's'], ['shops', 's'], ['writes', 's'], ['likes', 's'], ['helps', 's'], ['students', 's'], ['walks', 's'], ['maps', 's'],
    ['plays', 'z'], ['dogs', 'z'], ['lives', 'z'], ['goes', 'z'], ['cars', 'z'], ['friends', 'z'], ['sings', 'z'], ['reads', 'z'], ['tries', 'z'], ['days', 'z'], ['calls', 'z'], ['trains', 'z'],
    ['watches', 'iz'], ['buses', 'iz'], ['washes', 'iz'], ['pages', 'iz'], ['boxes', 'iz'], ['dances', 'iz'], ['changes', 'iz'], ['misses', 'iz'], ['places', 'iz'], ['teaches', 'iz'], ['uses', 'iz'], ['languages', 'iz'],
  ],
};

EGIU.lab.contr = {
  icon: '👂',
  title: 'Сокращения и слабые формы',
  short: 'различите на слух похожие фразы',
  tip: 'В живой речи вспомогательные глаголы сокращаются и звучат слабо: I\'ll, I\'d, he\'s, we\'ve. Различать их помогает контекст и следующий глагол: I\'d gone (had) / I\'d go (would). can звучит /kən/, can\'t — /kɑːnt/ (брит.) с долгим звуком.',
  kind: 'pair',
  items: [
    ["I'll go to work.", 'I go to work.'],
    ["I'd like coffee.", 'I like coffee.'],
    ["She's working today.", 'She was working today.'],
    ["We've finished.", "We'd finished."],
    ['I can come tomorrow.', "I can't come tomorrow."],
    ["He's gone home.", "He'd gone home."],
    ["They're late.", 'They were late.'],
    ["I've lived here for years.", 'I lived here for years.'],
    ["You'll love it.", 'You love it.'],
    ["We'd better go.", "We'd rather go."],
    ['She can swim.', "She can't swim."],
    ["It's raining.", 'It was raining.'],
    ["I'd seen it before.", "I've seen it before."],
    ["He'll call you.", "He'd call you."],
    ['I used to play tennis.', "I'm used to playing tennis."],
    ["We're going to win.", 'We were going to win.'],
  ],
};

EGIU.lab.words = {
  icon: '🗣️',
  title: 'Трудные слова',
  short: 'слова, которые часто произносят неправильно',
  tip: 'В этих словах некоторые буквы не читаются: Wednesday /ˈwenzdeɪ/, comfortable /ˈkʌmftəbl/, vegetable /ˈvedʒtəbl/, clothes /kləʊðz/, island /ˈaɪlənd/, receipt /rɪˈsiːt/. Нажмите 🎤 и проверьте себя.',
  kind: 'speak',
  items: [
    'Wednesday', 'comfortable', 'vegetable', 'clothes', 'island', 'receipt', 'chocolate', 'interesting', 'temperature', 'different',
    'world', 'thought', 'through', 'though', 'thorough', 'cupboard', 'answer', 'listen', 'castle', 'foreign',
    'necessary', 'library', 'February', 'business', 'knowledge', 'heard', 'bought', 'colleague', 'height', 'weight',
  ],
};

EGIU.lab.grammar = {
  icon: '🎙️',
  title: 'Грамматика вслух',
  short: 'скороговорки на сложные формы',
  tip: 'Тренируйте связную речь: сокращения, слабые формы и связывание слов (linking). Сначала прослушайте медленно, затем повторите в нормальном темпе.',
  kind: 'speak',
  items: [
    "I've been waiting for ages.",
    "If I'd known, I would have told you.",
    "She's used to getting up early.",
    "You'd better not be late again.",
    "He must have forgotten about it.",
    "We should've left a bit earlier.",
    "What would you do if you won the lottery?",
    "By this time next year, I'll have finished.",
    "It's the first time I've ever been here.",
    "I wish I could speak English fluently.",
    "Have you ever thought about moving abroad?",
    "Neither of them could have done it.",
  ],
};
