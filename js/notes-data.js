/* Russian notes: [English source, translation, explanation]. Keep sources aligned with the exercises. */
(function(root){
  const data={
  "units": {
    "1": {
      "g": [
        [
          "Please don't make so much noise. I am trying to work.",
          "Пожалуйста, не шумите так сильно. Я пытаюсь работать.",
          "Просьба не шуметь показывает действие сейчас: I + am + trying; try обозначало бы привычку."
        ],
        [
          "Where's Mark? — He is having a shower.",
          "Где Марк? — Он принимает душ.",
          "Марк занят прямо сейчас: he + is having. Has a shower без контекста описывало бы привычку."
        ],
        [
          "Look! Somebody is swimming in the river.",
          "Смотри! Кто-то плывёт в реке.",
          "Look обращает внимание на происходящее сейчас: somebody + is + swimming."
        ],
        [
          "You are working hard today. Are you tired?",
          "Ты сегодня усердно работаешь. Устал?",
          "Today описывает временную ситуацию: you + are working; works не согласуется с you."
        ],
        [
          "The population of the world is rising very fast.",
          "Население мира очень быстро растёт.",
          "Описываем продолжающееся изменение: is rising. Continuous подходит и для процессов, а не только этой секунды."
        ],
        [
          "Why are you looking at me like that?",
          "Почему ты так на меня смотришь?",
          "Спрашиваем о действии сейчас. В вопросе are ставится перед you; looking сохраняет -ing."
        ],
        [
          "I am not reading this book at the moment. It's boring.",
          "Я сейчас не читаю эту книгу. Она скучная.",
          "At the moment указывает на текущий момент; отрицание — am not + reading."
        ],
        [
          "Kate wants to work in Italy, so she is learning Italian.",
          "Кейт хочет работать в Италии, поэтому учит итальянский.",
          "Учёба идёт в нынешний период: is learning. Необязательно заниматься именно в эту секунду."
        ]
      ],
      "e": [
        [
          "Listen! The baby is crying.",
          "Послушай! Малыш плачет.",
          "Listen показывает происходящее сейчас; нужен is crying, а не форма для обычной привычки cries."
        ],
        [
          "Look, it's raining again.",
          "Смотри, снова идёт дождь.",
          "Look описывает наблюдаемую ситуацию: it is raining; it's — сокращение it is."
        ],
        [
          "I can't talk now — I'm driving.",
          "Я сейчас не могу разговаривать — я за рулём.",
          "Now показывает действие в процессе: I am driving. I'm и I am равнозначны."
        ]
      ],
      "t": [
        [
          "She's cooking dinner.",
          "Она готовит ужин.",
          "Ответ на «что она делает сейчас»: she is + cooking. She's здесь означает she is."
        ],
        [
          "Are you waiting for somebody?",
          "Ты кого-нибудь ждёшь?",
          "В вопросе о текущем действии are ставится перед you; затем waiting и дополнение."
        ]
      ],
      "w": [
        [
          "Right now I'm sitting in my kitchen. My sister is cooking dinner and my dad is watching the news. Outside it's getting dark and it's starting to rain.",
          "Сейчас я сижу на кухне. Сестра готовит ужин, а папа смотрит новости. На улице темнеет и начинается дождь.",
          "Am sitting, is cooking и is watching описывают действия сейчас; is getting dark — изменение состояния."
        ]
      ]
    },
    "2": {
      "g": [
        [
          "Water boils at 100 degrees Celsius.",
          "Вода кипит при 100 градусах Цельсия.",
          "Это общий факт, поэтому Present simple. Water — единственное число, к boil добавляется -s."
        ],
        [
          "My brother works in a bank in the city centre.",
          "Мой брат работает в банке в центре города.",
          "Постоянная работа описывается works: my brother соответствует he, поэтому нужна форма с -s."
        ],
        [
          "How often do you go to the cinema?",
          "Как часто ты ходишь в кино?",
          "How often спрашивает о привычке. Вопрос строится с do + you + go."
        ],
        [
          "Sue doesn't drink coffee.",
          "Сью не пьёт кофе.",
          "Для she отрицание — doesn't + drink. -s уже выражено в does."
        ],
        [
          "The shops usually close at 8 p.m.",
          "Магазины обычно закрываются в восемь вечера.",
          "Usually показывает расписание; shops — множественное число, поэтому close без -s."
        ],
        [
          "What does this word mean?",
          "Что означает это слово?",
          "This word — единственное число: does + this word + mean; после does нельзя добавлять means."
        ],
        [
          "The earth goes round the sun.",
          "Земля вращается вокруг Солнца.",
          "Общий факт выражаем Present simple. The earth соответствует it, поэтому goes."
        ],
        [
          "I promise I won't be late again.",
          "Обещаю, что больше не опоздаю.",
          "I promise само выполняет обещание в момент речи; обычно используется Simple, а не am promising."
        ]
      ],
      "e": [
        [
          "She speaks four languages.",
          "Она говорит на четырёх языках.",
          "She требует speaks с -s. Это умение, а не действие в текущую секунду."
        ],
        [
          "Does your sister live in London?",
          "Твоя сестра живёт в Лондоне?",
          "Your sister соответствует she; в вопросе нужен does, после него live без -s."
        ],
        [
          "I usually get up at seven.",
          "Я обычно встаю в семь.",
          "Usually обозначает привычку. Перед get up не нужен am: это не Continuous."
        ]
      ],
      "t": [
        [
          "Tom doesn't play the piano.",
          "Том не играет на пианино.",
          "Tom соответствует he: doesn't + play. Doesn't и does not — равнозначные формы."
        ],
        [
          "What time does the film start?",
          "Во сколько начинается фильм?",
          "Вопрос о расписании: does + the film + start. Окончание -s после does не добавляется."
        ]
      ],
      "w": [
        [
          "I usually get up at seven. I have breakfast and then I go to work by bus. I never drive because the traffic is terrible. In the evening I often watch a film or read.",
          "Я обычно встаю в семь. Завтракаю, а затем еду на работу на автобусе. Я никогда не езжу на машине, потому что движение ужасное. Вечером часто смотрю фильм или читаю.",
          "Usually, never и often описывают привычки; get, have, go и watch стоят в Present simple."
        ]
      ]
    },
    "3": {
      "g": [
        [
          "Let's go out. It isn't raining now.",
          "Давай выйдем. Сейчас дождя нет.",
          "Now описывает ситуацию сейчас: isn't raining. Doesn't rain означало бы общую закономерность."
        ],
        [
          "Julia is very good at languages. She speaks four languages.",
          "Джулия очень способна к языкам. Она говорит на четырёх языках.",
          "Умение, а не разговор сейчас: speaks. Для she нужна форма с -s."
        ],
        [
          "Hurry up! Everybody is waiting for you.",
          "Поторопись! Все тебя ждут.",
          "Ожидание идёт сейчас: is waiting. Everybody грамматически единственное число, несмотря на значение «все»."
        ],
        [
          "I usually go to work by car, but this week I'm walking.",
          "Я обычно езжу на работу на машине, но на этой неделе хожу пешком.",
          "Usually обозначает привычку: I go. Временный контраст относится к этой неделе."
        ],
        [
          "Normally I finish work at five, but this week I am working until six.",
          "Обычно я заканчиваю работу в пять, но на этой неделе работаю до шести.",
          "This week меняет обычный распорядок: am working показывает временную ситуацию."
        ],
        [
          "Water freezes at 0° Celsius.",
          "Вода замерзает при нуле градусов Цельсия.",
          "Это постоянное свойство: freezes. Is freezing описывало бы конкретный процесс замерзания сейчас."
        ],
        [
          "What are you doing? — I'm writing an email.",
          "Что ты делаешь? — Пишу письмо.",
          "Ответ I'm writing показывает действие сейчас: вопрос — are you doing."
        ],
        [
          "What do you do? — I'm a teacher.",
          "Чем ты занимаешься? — Я учитель.",
          "Спрашиваем о профессии, поэтому do you do. Are you doing спрашивало бы о текущем действии."
        ]
      ],
      "e": [
        [
          "I usually go to bed early.",
          "Я обычно рано ложусь спать.",
          "Usually показывает привычку: go to bed; Continuous здесь не передаёт нужный обычный распорядок."
        ],
        [
          "Be quiet, I'm listening to the radio.",
          "Тихо, я слушаю радио.",
          "Просьба быть тихо связана с действием сейчас: am listening, а не привычкой listen."
        ],
        [
          "He has lived in Madrid all his life.",
          "Он всю жизнь живёт в Мадриде.",
          "Для периода от прошлого до сейчас подходит has lived; is living не выражает эту длительность."
        ]
      ],
      "t": [
        [
          "This month they're staying with us.",
          "В этом месяце они живут у нас.",
          "This month задаёт временное проживание: are staying. They're — сокращение they are."
        ],
        [
          "Steve usually wears jeans, but today he's wearing a suit.",
          "Стив обычно носит джинсы, но сегодня на нём костюм.",
          "Usually требует wears для привычки; today he's wearing противопоставляет ей сегодняшнюю ситуацию."
        ]
      ],
      "w": [
        [
          "Normally I work in an office, but this week I'm working from home. I usually have lunch with colleagues, but now I'm eating at home with my cat.",
          "Обычно я работаю в офисе, но на этой неделе работаю из дома. Обычно обедаю с коллегами, а сейчас ем дома с котом.",
          "Work и have lunch — привычки; am working и am eating — временное отличие от них."
        ]
      ]
    },
    "4": {
      "g": [
        [
          "I don't understand this sentence. Can you explain it?",
          "Я не понимаю это предложение. Можешь объяснить?",
          "Understand обозначает состояние; обычно используем don't understand, а не am not understanding."
        ],
        [
          "Who does this bag belong to?",
          "Кому принадлежит эта сумка?",
          "После does нужен инфинитив belong без -s. Предлог to остаётся в конце вопроса."
        ],
        [
          "I think you're right. (= I believe)",
          "Думаю, ты прав.",
          "Think здесь означает «считаю, полагаю»; для мнения используется Simple, а не процесс обдумывания."
        ],
        [
          "Be quiet! I am thinking about the problem.",
          "Тихо! Я обдумываю эту проблему.",
          "Think about здесь — активный процесс размышления, поэтому am thinking."
        ],
        [
          "We are having dinner at the moment. Can I call you back?",
          "Мы сейчас ужинаем. Можно я перезвоню?",
          "Have dinner означает действие, а не владение: are having подходит для происходящего сейчас."
        ],
        [
          "Tom has a new car. It's red.",
          "У Тома новая машина. Она красная.",
          "Have означает владение, поэтому has. Is having не используется здесь в значении «обладает»."
        ],
        [
          "This soup tastes really good.",
          "Этот суп очень вкусный.",
          "Taste описывает вкус супа, состояние: tastes. Is tasting описывало бы действие человека, пробующего еду."
        ],
        [
          "Why are you being so rude today? You're not usually like this.",
          "Почему ты сегодня такой грубый? Обычно ты не такой.",
          "Are being подчёркивает временное поведение. Are rude описывало бы качество или состояние без этого акцента."
        ]
      ],
      "e": [
        [
          "I know her very well.",
          "Я очень хорошо её знаю.",
          "Know — глагол состояния; используется know, а не am knowing."
        ],
        [
          "Do you believe in ghosts?",
          "Ты веришь в привидения?",
          "Believe обозначает убеждение. Вопрос строится с do, а не are + believing."
        ],
        [
          "She wants a new phone.",
          "Она хочет новый телефон.",
          "Want — состояние; she требует wants с -s, а не is wanting в этом обычном значении."
        ]
      ],
      "t": [
        [
          "I can't remember his name.",
          "Я не могу вспомнить его имя.",
          "После can/can't нужен инфинитив без to: remember, независимо от значения глагола."
        ],
        [
          "What do you think of my new car?",
          "Что ты думаешь о моей новой машине?",
          "Think of спрашивает мнение; вопрос — do you think, а не процесс are you thinking."
        ]
      ],
      "w": [
        [
          "I really like cooking, but I don't know many recipes. Right now I want to learn Italian cooking. I believe anyone can cook well if they practise.",
          "Мне очень нравится готовить, но я знаю мало рецептов. Сейчас хочу научиться итальянской кухне. Я считаю, что любой может хорошо готовить, если будет практиковаться.",
          "Like, know, want и believe описывают состояния и мнения; right now само по себе не требует Continuous."
        ]
      ]
    },
    "5": {
      "g": [
        [
          "Mozart wrote more than 600 pieces of music.",
          "Моцарт написал более шестисот музыкальных произведений.",
          "Жизнь Моцарта завершилась; используем Past simple wrote, а не результат до настоящего have written."
        ],
        [
          "We went to the theatre last night.",
          "Вчера вечером мы ходили в театр.",
          "Last night — законченное прошлое. У go неправильная прошедшая форма went, не goed."
        ],
        [
          "I didn't sleep well last night.",
          "Прошлой ночью я плохо спал.",
          "После didn't нужен инфинитив sleep: прошедшее время уже выражено вспомогательным did."
        ],
        [
          "How much did you pay for your shoes?",
          "Сколько ты заплатил за свои туфли?",
          "Прошедший вопрос: did + you + pay. Нельзя одновременно ставить did и paid."
        ],
        [
          "When I was a child, I was afraid of dogs.",
          "В детстве я боялся собак.",
          "Прошедшая форма be с I — was; were относится к you/we/they."
        ],
        [
          "She bought a new dress yesterday.",
          "Вчера она купила новое платье.",
          "Buy — неправильный глагол: bought. Brought — прошедшая форма bring, «принести»."
        ],
        [
          "It was hot, so I opened the window.",
          "Было жарко, поэтому я открыл окно.",
          "Последовательность завершённых событий в прошлом: opened. Для результата до сейчас контекст не задан."
        ],
        [
          "Where were you yesterday evening?",
          "Где ты был вчера вечером?",
          "У be вопрос строится без did. Для you нужна форма were перед подлежащим."
        ]
      ],
      "e": [
        [
          "I didn't go to work yesterday.",
          "Я вчера не ходил на работу.",
          "После didn't используем go, не went: прошедшее время уже выражено в did."
        ],
        [
          "Did you see the match last night?",
          "Ты видел вчерашний матч?",
          "Did стоит перед you; основной глагол после него — see, не saw."
        ],
        [
          "We met them two years ago.",
          "Мы встретили их два года назад.",
          "У meet неправильная форма met. Meeted не является стандартной прошедшей формой."
        ]
      ],
      "t": [
        [
          "Did you enjoy the party?",
          "Тебе понравилась вечеринка?",
          "Вопрос в Past simple: did + you + enjoy, без окончания -ed после did."
        ],
        [
          "I taught English last year.",
          "В прошлом году я преподавал английский.",
          "Last year задаёт законченное прошлое; teach меняется на неправильную форму taught."
        ]
      ],
      "w": [
        [
          "Last weekend I visited my grandparents. We had lunch together and then we went for a walk in the park. In the evening I watched a film and went to bed early.",
          "В прошлые выходные я навестил бабушку и дедушку. Мы вместе пообедали, а затем гуляли в парке. Вечером я посмотрел фильм и рано лёг спать.",
          "Visited, had, went и watched описывают завершённые события. У had и went неправильные прошедшие формы."
        ]
      ]
    },
    "6": {
      "g": [
        [
          "What were you doing at 10 o'clock last night?",
          "Что ты делал вчера в десять вечера?",
          "Спрашиваем о процессе в конкретный прошлый момент: were + you + doing."
        ],
        [
          "When I arrived, they were having dinner.",
          "Когда я приехал, они ужинали.",
          "Were having — процесс, уже шедший при моём приезде; arrived — короткое событие на его фоне."
        ],
        [
          "I saw Sue in town. She was waiting for a bus.",
          "Я видел Сью в городе. Она ждала автобус.",
          "Was waiting описывает процесс в момент встречи; waited само по себе сообщало бы о завершённом ожидании."
        ],
        [
          "It was raining when we left the house.",
          "Когда мы вышли из дома, шёл дождь.",
          "Was raining — фон в момент прошлого события left; is raining относилось бы к настоящему."
        ],
        [
          "Tom burnt his hand while he was cooking.",
          "Том обжёг руку, пока готовил.",
          "Burnt — отдельное событие на фоне was cooking; не длительный процесс обжигания."
        ],
        [
          "While I was walking home, I met an old friend.",
          "Пока я шёл домой, я встретил старого друга.",
          "Was walking — фоновый процесс; met — событие, которое случилось во время него."
        ],
        [
          "I wasn't listening when the teacher explained it.",
          "Я не слушал, когда учитель это объяснял.",
          "Wasn't listening показывает отсутствие процесса в тот момент; not listening без was грамматически неполно."
        ],
        [
          "We were playing tennis when it started to rain.",
          "Мы играли в теннис, когда начался дождь.",
          "Were playing — процесс до события started. Are playing относилось бы к настоящему."
        ]
      ],
      "e": [
        [
          "When the phone rang, I was having a shower.",
          "Когда зазвонил телефон, я принимал душ.",
          "Was having показывает процесс, шедший при звонке; had a shower могло бы обозначать последующее завершённое действие."
        ],
        [
          "I saw a strange light in the sky.",
          "Я увидел странный свет в небе.",
          "Saw передаёт отдельное восприятие. Was seeing обычно не используется для случайного замеченного объекта."
        ],
        [
          "What were you doing when the accident happened? — I was walking to work.",
          "Что ты делал, когда произошла авария? — Я шёл на работу.",
          "Обе формы Continuous описывают процесс в момент аварии; happened остаётся коротким событием."
        ]
      ],
      "t": [
        [
          "The lights went out while I was cooking.",
          "Свет погас, пока я готовил.",
          "Went out — событие; while I was cooking задаёт фоновый процесс в прошлом."
        ],
        [
          "She was driving to work when she had an accident.",
          "Она ехала на работу, когда попала в аварию.",
          "Was driving — длительный фон; had an accident — событие внутри этого процесса."
        ]
      ],
      "w": [
        [
          "It was a cold evening. I was walking home and people were hurrying to the station. Suddenly a dog ran out of a shop and jumped on me. It was only playing!",
          "Был холодный вечер. Я шёл домой, а люди спешили на станцию. Вдруг собака выбежала из магазина и прыгнула на меня. Она просто играла!",
          "Was walking и were hurrying задают фон; ran и jumped — события на его фоне."
        ]
      ]
    },
    "7": {
      "g": [
        [
          "I can't find my keys. I have lost them.",
          "Я не могу найти ключи. Я их потерял.",
          "Have lost связывает потерю с результатом сейчас: ключей нет. Lost обычно рассказывает о прошлом событии."
        ],
        [
          "Sarah has just gone out. She'll be back soon.",
          "Сара только что вышла. Она скоро вернётся.",
          "Has just gone сообщает свежую новость; gone означает, что она ещё не вернулась."
        ],
        [
          "Have you finished your homework yet?",
          "Ты уже закончил домашнее задание?",
          "Yet в вопросе спрашивает о результате к настоящему: have + finished, третья форма."
        ],
        [
          "The road is closed. There has been an accident.",
          "Дорога закрыта. Произошла авария.",
          "Has been объясняет нынешний результат — закрытую дорогу. Past simple акцентировал бы прошлое событие."
        ],
        [
          "I'm not hungry. I have already eaten.",
          "Я не голоден. Я уже поел.",
          "Have already eaten объясняет состояние сейчас. После have нужна третья форма eaten, не eat."
        ],
        [
          "Tom isn't here. He has gone to the shop. He'll be back in ten minutes.",
          "Тома здесь нет. Он ушёл в магазин. Вернётся через десять минут.",
          "Has gone означает «ушёл и ещё там»; has been обычно означает «побывал и вернулся»."
        ],
        [
          "My English has improved a lot this year.",
          "В этом году мой английский заметно улучшился.",
          "This year рассматривается как незавершённый период; has improved показывает достигнутое к настоящему."
        ],
        [
          "We haven't decided where to go yet.",
          "Мы ещё не решили, куда поехать.",
          "Haven't + decided выражает отсутствие результата до сейчас; после have нужна третья форма."
        ]
      ],
      "e": [
        [
          "I've lost my passport. I can't travel now.",
          "Я потерял паспорт. Теперь я не могу путешествовать.",
          "Have lost подчёркивает актуальный результат. Само lost возможно как рассказ о прошлом, но здесь тренируется связь с настоящим."
        ],
        [
          "Has she finished the report?",
          "Она закончила отчёт?",
          "После has нужна третья форма finished; finish без окончания не образует Present perfect."
        ],
        [
          "They have gone home.",
          "Они ушли домой.",
          "После have нужна третья форма gone. Went — вторая форма, используется без have."
        ]
      ],
      "t": [
        [
          "He has cut his hair.",
          "Он подстригся.",
          "Has cut показывает изменение, видимое сейчас; cut одинаково пишется во всех трёх формах."
        ],
        [
          "Have you bought the tickets yet?",
          "Ты уже купил билеты?",
          "Вопрос о результате: have + you + bought; yet обычно ставится в конце."
        ]
      ],
      "w": [
        [
          "My town has changed a lot. They've built a new shopping centre and they've opened two new parks. I've started a new job and I've made some new friends.",
          "Мой город сильно изменился. Построили новый торговый центр и открыли два новых парка. Я начал новую работу и завёл новых друзей.",
          "Has changed, have built и have made показывают изменения с результатом сейчас; конкретное законченное время не названо."
        ]
      ]
    },
    "8": {
      "g": [
        [
          "Have you ever been to Japan?",
          "Ты когда-нибудь был в Японии?",
          "Ever спрашивает об опыте до настоящего: have you been. Past simple требует отдельного прошлого контекста."
        ],
        [
          "I have never ridden a horse.",
          "Я никогда не ездил верхом на лошади.",
          "Жизненный опыт: have never + ridden. Rode — вторая форма, после have нужна третья."
        ],
        [
          "This is the first time I have driven a car.",
          "Я впервые вожу машину.",
          "После this is the first time обычно используется Present perfect: have driven."
        ],
        [
          "She's a great writer. She has written ten books so far.",
          "Она прекрасная писательница. На данный момент она написала десять книг.",
          "So far означает «до сих пор»: has written подсчитывает результат к настоящему."
        ],
        [
          "I haven't seen Tom today. Is he ill?",
          "Сегодня я не видел Тома. Он болен?",
          "Сегодняшний период ещё рассматривается как открытый: haven't seen. Позднее возможен другой временной акцент."
        ],
        [
          "It's the most interesting film I have ever seen.",
          "Это самый интересный фильм, который я когда-либо видел.",
          "Have ever seen сравнивает нынешний фильм со всем опытом до сейчас; saw не подходит после have."
        ],
        [
          "We have had three tests this week, and it's only Wednesday.",
          "На этой неделе у нас уже было три контрольные, а сейчас только среда.",
          "Неделя ещё идёт; have had сообщает число событий к текущему моменту."
        ],
        [
          "How many times have you been to London?",
          "Сколько раз ты был в Лондоне?",
          "Считаем опыт до настоящего: have you been. Отдельный законченный период не указан."
        ]
      ],
      "e": [
        [
          "Have you ever eaten sushi?",
          "Ты когда-нибудь ел суши?",
          "В британском учебном контексте опыт до сейчас выражаем Have you ever eaten; eaten — третья форма eat."
        ],
        [
          "It's the first time I've seen this film.",
          "Я впервые смотрю этот фильм.",
          "После it's the first time используем I've seen; это конструкция об опыте к текущему моменту."
        ],
        [
          "I have never been to Australia.",
          "Я никогда не был в Австралии.",
          "Never ставится после have и перед been; отдельное not не нужно."
        ]
      ],
      "t": [
        [
          "Have you ever lost your wallet?",
          "Ты когда-нибудь терял кошелёк?",
          "Вопрос об опыте: have + you + ever + lost, третья форма lose."
        ],
        [
          "It's the first time he has driven a car.",
          "Он впервые водит машину.",
          "После it's the first time используем he has driven; he's здесь сокращает he has."
        ]
      ],
      "w": [
        [
          "I've been to Spain twice, but I've never been to Asia. I've tried snails, but I've never eaten insects. I've never jumped out of a plane and I don't want to!",
          "Я дважды был в Испании, но никогда не был в Азии. Пробовал улиток, но никогда не ел насекомых. Никогда не прыгал с парашютом и не хочу!",
          "Have been, have tried и have never eaten описывают жизненный опыт без точного прошлого времени."
        ]
      ]
    },
    "9": {
      "g": [
        [
          "You're out of breath. Have you been running?",
          "Ты запыхался. Ты бегал?",
          "Have been running связывает недавний процесс с видимым результатом сейчас — одышкой."
        ],
        [
          "It has been raining for two hours.",
          "Дождь идёт уже два часа.",
          "Процесс начался раньше и продолжается: has been raining. Is raining не выражает весь период до сейчас."
        ],
        [
          "How long have you been learning English?",
          "Как долго ты учишь английский?",
          "How long спрашивает о длительности до настоящего: have you been learning."
        ],
        [
          "I have been waiting for you since six o'clock!",
          "Я жду тебя с шести часов!",
          "Since задаёт начало ожидания, которое продолжается: have been waiting, а не только am waiting."
        ],
        [
          "Her eyes are red. She has been crying.",
          "У неё красные глаза. Она плакала.",
          "Has been crying объясняет нынешний след недавнего процесса. Она уже могла перестать плакать."
        ],
        [
          "We have been living in this flat for ten years.",
          "Мы живём в этой квартире уже десять лет.",
          "Have been living подчёркивает длительность до сейчас. Have lived тоже возможно, но здесь его нет среди вариантов."
        ],
        [
          "Paul has been working too hard recently. He needs a holiday.",
          "Последнее время Пол слишком много работает. Ему нужен отпуск.",
          "Recently связывает длительный недавний процесс с настоящим: has been working."
        ],
        [
          "Why are your hands so dirty? What have you been doing?",
          "Почему у тебя такие грязные руки? Что ты делал?",
          "Have you been doing спрашивает о недавнем процессе, результат которого виден сейчас."
        ]
      ],
      "e": [
        [
          "I've been waiting here for an hour.",
          "Я жду здесь уже час.",
          "Ожидание началось час назад и продолжается: have been waiting; am waiting не выражает прошедшую длительность."
        ],
        [
          "How long have you been working here?",
          "Как давно ты здесь работаешь?",
          "How long до настоящего требует have you been working, а не are you working."
        ],
        [
          "She has been studying all day.",
          "Она учится весь день.",
          "После has been нужен глагол с -ing: studying, не study."
        ]
      ],
      "t": [
        [
          "It has been raining for two hours.",
          "Дождь идёт уже два часа.",
          "For обозначает длительность; has been raining соединяет начало процесса в прошлом с настоящим."
        ],
        [
          "How long have you been waiting?",
          "Как долго ты ждёшь?",
          "Вопрос о продолжающейся длительности: have + you + been + waiting."
        ]
      ],
      "w": [
        [
          "I've been learning English for three years. Recently I've been watching a lot of series in English. I've also been going to the gym since September.",
          "Я учу английский три года. Последнее время смотрю много сериалов на английском. Ещё с сентября хожу в спортзал.",
          "Have been learning и have been going подчёркивают длительность. For — период, since — начальная точка."
        ]
      ]
    },
    "10": {
      "g": [
        [
          "I have written five emails this morning.",
          "Сегодня утром я написал пять писем.",
          "Пять готовых писем — измеримый результат: have written. Continuous подчёркивал бы процесс, а не завершённое количество."
        ],
        [
          "I have been writing emails all morning.",
          "Я всё утро пишу письма.",
          "All morning подчёркивает процесс и длительность: have been writing, без подсчёта готовых писем."
        ],
        [
          "Somebody has eaten all the chocolates. The box is empty!",
          "Кто-то съел все конфеты. Коробка пуста!",
          "Пустая коробка — завершённый результат: has eaten. Has been eating не утверждает, что съедено всё."
        ],
        [
          "My hands are dirty because I have been repairing my bike.",
          "У меня грязные руки, потому что я ремонтировал велосипед.",
          "Have been repairing объясняет след процесса сейчас; завершённость ремонта не утверждается."
        ],
        [
          "I have known Lisa for years.",
          "Я знаю Лизу много лет.",
          "Know — глагол состояния: have known. Форма have been knowing в этом значении не используется."
        ],
        [
          "How many pages of the book have you read so far?",
          "Сколько страниц книги ты уже прочитал?",
          "How many pages спрашивает количество завершённого: have you read, а не длительность процесса."
        ],
        [
          "She has been playing tennis since she was eight.",
          "Она играет в теннис с восьми лет.",
          "Has been playing подчёркивает продолжающуюся деятельность. Has played тоже грамматически возможно с акцентом на опыт.",
          [
            "has played"
          ]
        ],
        [
          "I've lost my glasses. I have been looking for them for half an hour.",
          "Я потерял очки. Ищу их уже полчаса.",
          "Have been looking показывает длительный поиск до сейчас; look не выражает эту временную связь."
        ]
      ],
      "e": [
        [
          "I've read three books this month.",
          "В этом месяце я прочитал три книги.",
          "Три законченные книги — результат, поэтому have read. Continuous само по себе не сообщает, что книги дочитаны."
        ],
        [
          "We have known each other since school.",
          "Мы знаем друг друга со школы.",
          "Know — состояние; have known охватывает период до сейчас, без Continuous."
        ],
        [
          "Have you finished? — No, I'm still reading it.",
          "Ты закончил? — Нет, я всё ещё читаю.",
          "Still reading показывает незавершённый процесс сейчас; have read обозначало бы завершённый результат."
        ]
      ],
      "t": [
        [
          "He has painted the kitchen.",
          "Он покрасил кухню.",
          "По условию работа завершена: has painted передаёт готовый результат, а не ход работы."
        ],
        [
          "She has been learning Spanish for six months.",
          "Она учит испанский уже полгода.",
          "Have been learning подчёркивает продолжающийся процесс; for six months задаёт длительность."
        ]
      ],
      "w": [
        [
          "I've been studying for my exams for weeks. I've already finished three subjects and I've written two essays. I've been sleeping badly, but I've learned a lot.",
          "Я несколько недель готовлюсь к экзаменам. Уже закончил три предмета и написал два эссе. Плохо сплю, но многое выучил.",
          "Have been studying и sleeping — процессы; have finished, written и learned — достигнутые результаты."
        ]
      ]
    },
    "11": {
      "g": [
        [
          "How long have you been married?",
          "Как давно ты женат или замужем?",
          "How long охватывает период до сейчас: have you been married. Are описывало бы только нынешнее состояние."
        ],
        [
          "I have been in this job for six months.",
          "Я работаю на этой должности уже полгода.",
          "Have been связывает начало состояния с настоящим; am не выражает прошедший период for six months."
        ],
        [
          "Bob and Alice have known each other since they were children.",
          "Боб и Элис знают друг друга с детства.",
          "Since задаёт начало состояния; know требует Present perfect simple — have known."
        ],
        [
          "How long have you had your car?",
          "Как давно у тебя эта машина?",
          "Have означает владение: have you had, без Continuous. Первый have — вспомогательный, had — смысловой."
        ],
        [
          "I have been feeling ill since yesterday.",
          "Я плохо себя чувствую со вчерашнего дня.",
          "Have been feeling подчёркивает продолжающееся недомогание. Since yesterday связывает его с началом в прошлом."
        ],
        [
          "It's been raining since I got up.",
          "Дождь идёт с тех пор, как я встал.",
          "Since вводит начальную точку; for вводило бы длительность, например for two hours."
        ],
        [
          "Max hasn't had a holiday for two years.",
          "Макс два года не был в отпуске.",
          "Hasn't had описывает отсутствие события за период до сейчас; doesn't have не выражает этот период."
        ],
        [
          "Jo is in London now. She arrived yesterday.",
          "Джо сейчас в Лондоне. Она приехала вчера.",
          "Здесь утверждается место сейчас, без указания длительности: is. Has been потребовало бы иной структуры контекста."
        ]
      ],
      "e": [
        [
          "I've known him for ten years.",
          "Я знаю его уже десять лет.",
          "Состояние от прошлого до сейчас: have known. Present simple не сочетается с for ten years в этом смысле."
        ],
        [
          "How long have you been living here?",
          "Как давно ты здесь живёшь?",
          "Для длительности до сейчас подходят have lived или have been living; are living описывает лишь текущую ситуацию."
        ],
        [
          "She has been ill since Monday.",
          "Она болеет с понедельника.",
          "Has been ill выражает состояние, начавшееся раньше; is ill не передаёт период since Monday."
        ]
      ],
      "t": [
        [
          "I have been a teacher since 2015.",
          "Я работаю учителем с 2015 года.",
          "Have been a teacher — состояние до сейчас; have been teaching — продолжающаяся деятельность с тем же началом."
        ],
        [
          "How long have you had this phone?",
          "Как давно у тебя этот телефон?",
          "Владение выражаем Simple perfect: have you had; have не употребляется здесь в Continuous."
        ]
      ],
      "w": [
        [
          "I've lived in this city for twelve years. I've known my best friend since primary school. I've had my phone for two years and it's still working well.",
          "Я живу в этом городе двенадцать лет. Знаю лучшего друга с начальной школы. Телефон у меня два года, и он всё ещё хорошо работает.",
          "Have lived, known и had описывают период до сейчас. Since — начало, for — длительность."
        ]
      ]
    },
    "12": {
      "g": [
        [
          "She's been in Paris since Monday.",
          "Она в Париже с понедельника.",
          "Monday — начальная точка: since. For потребовало бы периода, например three days."
        ],
        [
          "I've been waiting for twenty minutes.",
          "Я жду уже двадцать минут.",
          "Twenty minutes — длительность, поэтому for. Since обозначало бы момент начала."
        ],
        [
          "They've been married for ten years.",
          "Они женаты десять лет.",
          "Ten years — период: for. Since нужен перед датой или событием начала."
        ],
        [
          "I haven't seen him since we left school.",
          "Я не видел его с тех пор, как мы окончили школу.",
          "Since может вводить целое предложение о начальной точке; for перед таким событием не подходит."
        ],
        [
          "When did you start your new job?",
          "Когда ты начал новую работу?",
          "Спрашиваем момент начала завершённого события: when. How long спрашивает длительность и требует другой конструкции."
        ],
        [
          "It's been raining since lunchtime.",
          "Дождь идёт с обеда.",
          "Lunchtime — точка начала: since. For не используется с названием момента в этом значении."
        ],
        [
          "It's a long time since I last went to the theatre.",
          "Я давно не был в театре.",
          "Конструкция it's a long time since + прошлое событие показывает, сколько времени прошло с него."
        ],
        [
          "We moved here three years ago.",
          "Мы переехали сюда три года назад.",
          "Ago отсчитывает время назад от сейчас и обычно сочетается с Past simple; before требует другую точку отсчёта."
        ]
      ],
      "e": [
        [
          "I've lived here for five years.",
          "Я живу здесь пять лет.",
          "Five years — длительность: for. Since five years не обозначает точку начала."
        ],
        [
          "I haven't eaten since breakfast.",
          "Я не ел с завтрака.",
          "Завтрак — начальное событие: since breakfast. For breakfast означало бы «на завтрак» и меняло смысл."
        ],
        [
          "When did you arrive?",
          "Когда ты приехал?",
          "Приезд — завершённое событие: did you arrive. How long ago тоже возможно с did, но не have arrived."
        ]
      ],
      "t": [
        [
          "It's three months since I last saw Tom.",
          "Прошло три месяца с тех пор, как я последний раз видел Тома.",
          "It's + период + since + Past simple переформулирует отсутствие встречи за этот срок."
        ],
        [
          "How long have you had your car?",
          "Как давно у тебя машина?",
          "Меняем вопрос о покупке when did you buy на длительность владения: how long have you had."
        ]
      ],
      "w": [
        [
          "I've been a student since 2023. I've played the guitar for six years. I haven't seen my cousin since last summer. It's two weeks since I last went swimming.",
          "Я студент с 2023 года. Играю на гитаре шесть лет. Не видел двоюродного брата с прошлого лета. Я не плавал две недели.",
          "Since 2023 и since last summer — начало; for six years — длительность; it's two weeks since — срок после события."
        ]
      ]
    },
    "13": {
      "g": [
        [
          "I lost my key yesterday.",
          "Вчера я потерял ключ.",
          "Yesterday задаёт законченное прошлое: lost. Present perfect с таким указанием времени здесь не используется."
        ],
        [
          "I have lost my key. Can you help me look for it?",
          "Я потерял ключ. Поможешь его поискать?",
          "Have lost подчёркивает нынешний результат: ключа нет. Точное прошлое время не задано."
        ],
        [
          "Shakespeare wrote many plays.",
          "Шекспир написал много пьес.",
          "Жизнь Шекспира — завершённый прошлый период, поэтому wrote, а не has written."
        ],
        [
          "My sister is a writer. She has written many books.",
          "Моя сестра — писательница. Она написала много книг.",
          "Has written рассматривает творчество живого автора до настоящего, без законченного временного периода."
        ],
        [
          "Did you see the news last night?",
          "Ты видел новости вчера вечером?",
          "Last night — законченное прошлое; вопрос с did + see, а не have seen."
        ],
        [
          "Where's my bike? Somebody has taken it!",
          "Где мой велосипед? Кто-то его забрал!",
          "Has taken сообщает причину нынешнего отсутствия велосипеда; связь с настоящим важнее времени события."
        ],
        [
          "Ow! I have cut my finger. It's bleeding.",
          "Ой! Я порезал палец. Он кровоточит.",
          "Have cut сообщает свежий результат, видимый сейчас. Had cut потребовало бы другой прошлой точки отсчёта."
        ],
        [
          "When did you arrive?",
          "Когда ты приехал?",
          "When спрашивает о конкретном завершённом событии: did you arrive."
        ]
      ],
      "e": [
        [
          "I saw her yesterday.",
          "Я видел её вчера.",
          "Yesterday требует Past simple saw; have seen используется без этого законченного времени."
        ],
        [
          "When did you finish school?",
          "Когда ты окончил школу?",
          "When спрашивает о прошлом событии; вопрос строится did you finish, не have you finished."
        ],
        [
          "Columbus discovered America in 1492.",
          "Колумб открыл Америку в 1492 году.",
          "In 1492 — законченная дата: discovered. Present perfect не используется с таким указанием законченного времени."
        ]
      ],
      "t": [
        [
          "I bought a new phone yesterday.",
          "Вчера я купил новый телефон.",
          "Yesterday задаёт Past simple; у buy неправильная форма bought."
        ],
        [
          "I have broken my arm.",
          "Я сломал руку.",
          "По условию рука сейчас в гипсе: have broken подчёркивает результат до настоящего."
        ]
      ],
      "w": [
        [
          "Our team has won the cup! They played the final last night in Madrid. The first goal came in the tenth minute and the fans celebrated until morning.",
          "Наша команда выиграла кубок! Финал играли вчера вечером в Мадриде. Первый гол забили на десятой минуте, а болельщики праздновали до утра.",
          "Has won сообщает новость; played, came и celebrated добавляют подробности в завершённом прошлом."
        ]
      ]
    },
    "14": {
      "g": [
        [
          "I haven't seen Kate this week. I wonder where she is.",
          "На этой неделе я не видел Кейт. Интересно, где она.",
          "Эта неделя рассматривается как ещё идущая: haven't seen охватывает период до сейчас."
        ],
        [
          "I didn't see Kate last week.",
          "На прошлой неделе я не видел Кейт.",
          "Last week завершилась: didn't see. Present perfect с этим периодом не используется."
        ],
        [
          "Tom has lived in Rome for a year. He still lives there.",
          "Том живёт в Риме уже год. Он всё ещё там живёт.",
          "Has lived связывает начало проживания с настоящим; lived обозначало бы законченный период."
        ],
        [
          "My grandfather lived in Rome for a year when he was young.",
          "В молодости мой дед год прожил в Риме.",
          "When he was young — завершённый прошлый период: lived, а не has lived."
        ],
        [
          "Have you had a holiday this year?",
          "Ты уже был в отпуске в этом году?",
          "Этот год рассматривается как продолжающийся: have you had спрашивает о событии к настоящему."
        ],
        [
          "It didn't rain much last summer.",
          "Прошлым летом дождей было мало.",
          "Last summer — завершённый период; отрицание в Past simple — didn't rain."
        ],
        [
          "I haven't drunk any coffee today.",
          "Сегодня я ещё не пил кофе.",
          "Сегодня рассматривается как открытый период: haven't drunk. Drunk — третья форма после have."
        ],
        [
          "Jill worked in a bank for five years. Then she gave it up.",
          "Джилл пять лет работала в банке. Потом уволилась.",
          "Работа завершилась, поэтому worked; длительность сама по себе не требует Present perfect."
        ]
      ],
      "e": [
        [
          "I worked there from 2015 to 2019.",
          "Я работал там с 2015 по 2019 год.",
          "Обе даты ограничивают законченный период: worked, не have worked."
        ],
        [
          "Mozart wrote over 600 pieces of music.",
          "Моцарт написал более шестисот музыкальных произведений.",
          "Творчество завершилось в прошлом; wrote, а не Present perfect has written."
        ],
        [
          "Have you ever ridden a camel?",
          "Ты когда-нибудь ездил на верблюде?",
          "Опыт до настоящего: have you ever ridden. Past simple был бы уместен в отдельном прошлом периоде."
        ]
      ],
      "t": [
        [
          "I have had one coffee this morning.",
          "Сегодня утром я выпил одну чашку кофе.",
          "По условию сейчас одиннадцать утра, период ещё открыт: have had. Had после have — третья форма."
        ],
        [
          "Did you go to the gym last week?",
          "Ты ходил в спортзал на прошлой неделе?",
          "Last week — законченное прошлое: did + you + go, без have."
        ]
      ],
      "w": [
        [
          "This year I've read eight books and I've travelled to two new countries. Last year I read only three books and I didn't travel at all because I was working too much.",
          "В этом году я прочитал восемь книг и побывал в двух новых странах. В прошлом году прочитал только три книги и совсем не путешествовал, потому что слишком много работал.",
          "This year связывается с have read и have travelled; last year — с read и didn't travel в прошлом."
        ]
      ]
    },
    "15": {
      "g": [
        [
          "When I arrived at the party, Tom wasn't there. He had gone home.",
          "Когда я пришёл на вечеринку, Тома там не было. Он ушёл домой.",
          "Had gone — действие раньше моего прихода. Has gone связывало бы уход с настоящим."
        ],
        [
          "I didn't recognise him. He had changed a lot.",
          "Я его не узнал. Он сильно изменился.",
          "Had changed произошло до прошлого момента didn't recognise; Past perfect показывает порядок этих событий."
        ],
        [
          "The house was quiet. Everybody had gone to bed.",
          "В доме было тихо. Все уже легли спать.",
          "Had gone to bed предшествует прошлому состоянию was quiet."
        ],
        [
          "She was nervous because she had never flown before.",
          "Она нервничала, потому что раньше никогда не летала.",
          "Had never flown описывает отсутствие опыта до того прошлого момента; flown — третья форма fly."
        ],
        [
          "We were too late. The film had already started.",
          "Мы опоздали. Фильм уже начался.",
          "Had already started — начало фильма раньше нашего прибытия; already подчёркивает предшествование."
        ],
        [
          "I had just put the phone down when it rang again.",
          "Я только что положил трубку, как телефон снова зазвонил.",
          "Had just put произошло непосредственно перед rang. Put одинаково пишется во всех трёх формах."
        ],
        [
          "When I got home, I found that somebody had broken the window.",
          "Когда я пришёл домой, обнаружил, что кто-то разбил окно.",
          "Had broken предшествует found; broken — третья форма после had."
        ],
        [
          "He told me he had lost his job.",
          "Он сказал мне, что потерял работу.",
          "Had lost обозначает потерю раньше told; has lost относило бы результат к настоящему."
        ]
      ],
      "e": [
        [
          "When we got to the cinema, the film had already started.",
          "Когда мы пришли в кино, фильм уже начался.",
          "Had already started явно показывает, что начало фильма было раньше got to the cinema."
        ],
        [
          "I was sure I had seen him before.",
          "Я был уверен, что раньше его видел.",
          "Had seen описывает опыт до прошлой уверенности was sure; have seen относится к настоящему."
        ],
        [
          "She had gone out when I phoned.",
          "Она уже вышла, когда я позвонил.",
          "После had нужна третья форма gone, не вторая went."
        ]
      ],
      "t": [
        [
          "When I got to the station, the train had left.",
          "Когда я добрался до станции, поезд уже ушёл.",
          "Поезд ушёл раньше прибытия: had left. Got остаётся более поздним событием в Past simple."
        ],
        [
          "I wasn't hungry in the evening because I had eaten a big lunch.",
          "Вечером я не был голоден, потому что плотно пообедал.",
          "Had eaten обозначает обед до вечернего состояния; eaten — третья форма eat."
        ]
      ],
      "w": [
        [
          "When I arrived at the airport, I realised I had left my passport at home. I had packed everything else! Luckily my brother had not left the house yet, so he brought it to me.",
          "Когда я приехал в аэропорт, понял, что оставил паспорт дома. Всё остальное я упаковал! К счастью, брат ещё не вышел из дома, поэтому привёз мне паспорт.",
          "Had left, packed и not left предшествуют arrived и realised; brought — последующее событие рассказа."
        ]
      ]
    },
    "16": {
      "g": [
        [
          "The ground was wet. It had been raining.",
          "Земля была мокрой. До этого шёл дождь.",
          "Had been raining объясняет след процесса в прошлом; has been raining относилось бы к настоящему."
        ],
        [
          "When I arrived, Kate was angry. She had been waiting for an hour.",
          "Когда я приехал, Кейт была сердита. Она ждала уже час.",
          "Had been waiting подчёркивает длительность ожидания до arrived."
        ],
        [
          "We had been playing football for half an hour when it started to rain.",
          "Мы играли в футбол уже полчаса, когда начался дождь.",
          "Had been playing охватывает процесс до прошлого события started; have been — до настоящего."
        ],
        [
          "His clothes were dirty because he had been working in the garden.",
          "Его одежда была грязной, потому что он работал в саду.",
          "Had been working объясняет результат процесса, видимый в тот прошлый момент."
        ],
        [
          "I was tired because I had been studying all night.",
          "Я устал, потому что занимался всю ночь.",
          "Had been studying показывает длительную причину прошлого состояния was tired."
        ],
        [
          "They had been travelling for ten hours, so they were exhausted.",
          "Они ехали десять часов, поэтому очень устали.",
          "Had been travelling подчёркивает длительность до прошлого состояния were exhausted."
        ],
        [
          "She had been learning English for two years before she moved to London.",
          "Она учила английский два года, прежде чем переехала в Лондон.",
          "Had been learning — процесс до moved; has been learning отсчитывало бы до сейчас."
        ],
        [
          "When the boss came in, the workers had been talking for twenty minutes.",
          "Когда вошёл начальник, работники разговаривали уже двадцать минут.",
          "Had been talking показывает накопленную длительность до came in."
        ]
      ],
      "e": [
        [
          "I had been waiting for two hours when she finally arrived.",
          "Я ждал уже два часа, когда она наконец приехала.",
          "Had been waiting выражает длительность до arrived; was waiting — только процесс в прошлый момент."
        ],
        [
          "His eyes were red. He had been crying.",
          "У него были красные глаза. Он плакал.",
          "Had been crying объясняет состояние в прошлом; has been crying объясняло бы состояние сейчас."
        ],
        [
          "We had known each other for years.",
          "Мы знали друг друга много лет.",
          "Know — состояние, поэтому had known. Форма had been knowing здесь не используется."
        ]
      ],
      "t": [
        [
          "He had been running.",
          "Он бегал.",
          "Прошлая одышка — результат предшествующего процесса: had been running."
        ],
        [
          "We had been driving for three hours.",
          "Мы ехали уже три часа.",
          "Считаем длительность от восьми до остановки в одиннадцать: had been driving."
        ]
      ],
      "w": [
        [
          "When I got home, I was exhausted. I had been working since seven in the morning and I hadn't eaten anything. My flatmate had been cooking all afternoon, so dinner was ready.",
          "Когда я пришёл домой, был совершенно измучен. Работал с семи утра и ничего не ел. Сосед весь день готовил, поэтому ужин был готов.",
          "Had been working и cooking — длительные процессы до got home; hadn't eaten — отсутствие завершённого действия."
        ]
      ]
    },
    "17": {
      "g": [
        [
          "I have got two brothers.",
          "У меня два брата.",
          "Have got выражает наличие сейчас; с I используется have, не has и не Continuous."
        ],
        [
          "Have you got a pen?",
          "У тебя есть ручка?",
          "В конструкции have got вопрос начинается с have; do не добавляется к have got."
        ],
        [
          "She doesn't have a car. She goes everywhere by bike.",
          "У неё нет машины. Она везде ездит на велосипеде.",
          "В отрицании с do используется doesn't have; she требует does, не do."
        ],
        [
          "We are having lunch at the moment. Can I call you later?",
          "Мы сейчас обедаем. Можно позвонить позже?",
          "Have lunch — действие, поэтому возможно are having. Have got выражает наличие, а не приём пищи."
        ],
        [
          "When I was a child, I had long hair.",
          "В детстве у меня были длинные волосы.",
          "Прошлое владение выражаем had; have got в этом значении обычно используется в настоящем."
        ],
        [
          "Did you have a good time at the party last night?",
          "Ты хорошо провёл время на вчерашней вечеринке?",
          "Have a good time — действие; вопрос в прошлом строится did you have."
        ],
        [
          "I usually have a shower in the morning.",
          "Я обычно принимаю душ утром.",
          "Have a shower — действие-привычка: have. Have got не заменяет have в этом выражении."
        ],
        [
          "He hasn't got any money.",
          "У него нет денег.",
          "Отрицание have got для he — hasn't got. Doesn't got смешивает две разные конструкции."
        ]
      ],
      "e": [
        [
          "I have a new car.",
          "У меня новая машина.",
          "Владение — have или have got. Am having здесь не обозначает обладание машиной."
        ],
        [
          "Have you got a minute?",
          "У тебя есть минутка?",
          "Либо have you got, либо do you have; do you have got смешивает два способа вопроса."
        ],
        [
          "We had a great holiday last year.",
          "В прошлом году мы прекрасно провели отпуск.",
          "Have a holiday — действие; его прошедшая форма had, без got."
        ]
      ],
      "t": [
        [
          "Have you got a bike?",
          "У тебя есть велосипед?",
          "По условию используем have got: have + you + got + дополнение."
        ],
        [
          "She doesn't have any brothers.",
          "У неё нет братьев.",
          "Отрицание с do: she doesn't have. Any естественно в отрицательном предложении."
        ]
      ],
      "w": [
        [
          "I've got a small flat and a lazy cat. I haven't got a car. In the morning I have a shower, then I have breakfast. I usually have a big coffee before work.",
          "У меня маленькая квартира и ленивый кот. Машины нет. Утром я принимаю душ, потом завтракаю. Перед работой обычно выпиваю большую чашку кофе.",
          "Have got — наличие; have a shower, breakfast и a coffee — действия, без got."
        ]
      ]
    },
    "18": {
      "g": [
        [
          "I used to play tennis a lot, but now I don't.",
          "Раньше я много играл в теннис, но теперь не играю.",
          "Used to + play обозначает прошлую привычку, которая изменилась; после to нужен инфинитив."
        ],
        [
          "There used to be a cinema here, but it closed.",
          "Раньше здесь был кинотеатр, но он закрылся.",
          "Used to be описывает прежнее состояние. Being после used to для прошлой привычки не подходит."
        ],
        [
          "Did you use to live in the country?",
          "Ты раньше жил за городом?",
          "После did пишется use to, без -d: прошедшее время уже выражено did."
        ],
        [
          "I didn't use to like coffee, but now I drink it every day.",
          "Раньше я не любил кофе, а теперь пью его каждый день.",
          "После didn't нужна форма use to; отрицание not used to без did не образует эту конструкцию."
        ],
        [
          "Kate used to have long hair.",
          "Раньше у Кейт были длинные волосы.",
          "Used to have описывает прежнее состояние; uses to не является настоящей формой этой конструкции."
        ],
        [
          "My dad used to smoke, but he gave it up last year.",
          "Отец раньше курил, но в прошлом году бросил.",
          "Used to smoke — прошлое привычное действие; used to smoking относится к другой конструкции «привыкший»."
        ],
        [
          "We used to go to the beach every summer.",
          "Раньше мы каждое лето ездили на пляж.",
          "Used to требует инфинитив go, не прошедшее went и не форму going."
        ],
        [
          "Now there's a big supermarket where there used to be a park.",
          "Теперь там большой супермаркет, а раньше был парк.",
          "Used to be показывает исчезнувшее состояние; после to нужна начальная форма be."
        ]
      ],
      "e": [
        [
          "I used to work in a shop.",
          "Раньше я работал в магазине.",
          "Утверждение о прошлой привычке: used to work. Use to без did здесь не подходит."
        ],
        [
          "Did you use to play football?",
          "Ты раньше играл в футбол?",
          "В вопросе did уже выражает прошлое, поэтому use to, а не used to."
        ],
        [
          "When I was young I used to live in Paris.",
          "В молодости я жил в Париже.",
          "Для прежнего состояния used to + live; used to living означало бы «привык к жизни» с be."
        ]
      ],
      "t": [
        [
          "He used to have a beard.",
          "Раньше у него была борода.",
          "Used to have передаёт прошлое состояние, которого теперь нет; have остаётся инфинитивом."
        ],
        [
          "I didn't use to eat fish.",
          "Раньше я не ел рыбу.",
          "Отрицание прошлой привычки: didn't use to + eat."
        ]
      ],
      "w": [
        [
          "When I was a child, I used to be very shy. I used to read all the time and I didn't use to like sport. Now I play football twice a week and I talk to everybody.",
          "В детстве я был очень застенчивым. Всё время читал и не любил спорт. Теперь играю в футбол дважды в неделю и со всеми разговариваю.",
          "Used to и didn't use to описывают прежние привычки; play и talk противопоставляют им нынешние."
        ]
      ]
    },
    "19": {
      "g": [
        [
          "I am meeting Kate for lunch tomorrow. We booked a table.",
          "Завтра я обедаю с Кейт. Мы забронировали столик.",
          "Бронь подтверждает договорённость: am meeting. Present continuous может обозначать согласованное будущее."
        ],
        [
          "The train leaves at 8.15 tomorrow morning.",
          "Завтра утром поезд отправляется в 8:15.",
          "Расписание передаём Present simple leaves. Другие будущие формы возможны, но здесь тренируется расписание."
        ],
        [
          "What are you doing this weekend?",
          "Что ты делаешь в эти выходные?",
          "Спрашиваем о планах и договорённостях: are you doing. Do you do обычно спрашивает привычку."
        ],
        [
          "The film starts at 7.30, so let's meet at 7.",
          "Фильм начинается в 7:30, так что давай встретимся в семь.",
          "Время по программе: starts. Film — единственное число, поэтому окончание -s."
        ],
        [
          "We are going to a concert on Saturday. I've got the tickets.",
          "В субботу мы идём на концерт. У меня есть билеты.",
          "Билеты подтверждают устроенный план: are going. Это Present continuous, не going to + инфинитив."
        ],
        [
          "What time does the museum open tomorrow?",
          "Во сколько завтра открывается музей?",
          "Вопрос о расписании: does + the museum + open, без -s после does."
        ],
        [
          "I am not working next Monday. I've got a day off.",
          "В следующий понедельник я не работаю. У меня выходной.",
          "Оформленный выходной — договорённость: am not working. Won't working грамматически неполно."
        ],
        [
          "Our flight arrives in Rome at 10.45 according to the timetable.",
          "По расписанию наш рейс прибывает в Рим в 10:45.",
          "According to the timetable задаёт расписание: arrives с -s для our flight."
        ]
      ],
      "e": [
        [
          "I'm seeing the dentist tomorrow at 4.",
          "Завтра в четыре я иду к стоматологу.",
          "Для конкретной записи на приём используем am seeing; see здесь означает встречу, а не зрительное восприятие."
        ],
        [
          "The concert starts at 8, according to the programme.",
          "По программе концерт начинается в восемь.",
          "Для программы выбираем starts. Is starting возможно в иных контекстах, но не выражает здесь учебный акцент."
        ],
        [
          "Are you doing anything this evening?",
          "У тебя есть какие-нибудь планы на этот вечер?",
          "Для будущих планов нужен are you doing; после are используется -ing, не do."
        ]
      ],
      "t": [
        [
          "I'm playing tennis with Tom on Friday.",
          "В пятницу я играю в теннис с Томом.",
          "По условию всё уже согласовано: am playing. Present continuous выражает договорённость."
        ],
        [
          "What time does the bus leave?",
          "Во сколько отправляется автобус?",
          "Вопрос о расписании: does the bus leave. После does окончание -s не добавляется."
        ]
      ],
      "w": [
        [
          "On Monday I'm meeting my teacher. On Wednesday I'm having dinner with friends. My train to Kazan leaves at 6.40 on Friday and arrives at noon.",
          "В понедельник я встречаюсь с преподавателем. В среду ужинаю с друзьями. В пятницу мой поезд в Казань отправляется в 6:40 и прибывает в полдень.",
          "Am meeting и having — договорённости; leaves и arrives — расписание транспорта."
        ]
      ]
    },
    "20": {
      "g": [
        [
          "I've decided. I am going to learn to drive this year.",
          "Я решил: в этом году научусь водить.",
          "Решение уже принято: am going to. Going to без формы be неполно."
        ],
        [
          "Look at those black clouds! It is going to rain.",
          "Смотри на эти чёрные тучи! Сейчас пойдёт дождь.",
          "Есть видимые признаки будущего: is going to rain. Is raining означало бы, что дождь уже идёт."
        ],
        [
          "What are you going to wear to the party?",
          "Что ты собираешься надеть на вечеринку?",
          "Вопрос о намерении: are + you + going to + wear. To перед wear обязательно."
        ],
        [
          "He's too close to the edge. He is going to fall!",
          "Он слишком близко к краю. Сейчас упадёт!",
          "Прогноз по наблюдаемой опасности: is going to fall. Will falling грамматически неверно."
        ],
        [
          "I was going to call you yesterday, but I forgot.",
          "Я собирался позвонить тебе вчера, но забыл.",
          "Намерение было в прошлом и не осуществилось: was going to call. Was calling описывало бы процесс звонка."
        ],
        [
          "We are not going to stay in a hotel. We're camping.",
          "Мы не собираемся останавливаться в гостинице. Будем жить в палатке.",
          "Отрицание намерения: are not going to + stay; will не сочетается с going to так."
        ],
        [
          "Sarah's pregnant. She is going to have a baby in May.",
          "Сара беременна. В мае у неё будет ребёнок.",
          "Будущее ожидается по нынешним признакам: is going to have; is going have пропускает to."
        ],
        [
          "Are you going to watch the match tonight?",
          "Ты собираешься смотреть матч сегодня вечером?",
          "Вопрос о намерении начинается are you going to; не will you going to."
        ]
      ],
      "e": [
        [
          "I'm going to visit my aunt next week.",
          "На следующей неделе я собираюсь навестить тётю.",
          "Перед going to нужен be: I am going to. I'm — сокращение I am."
        ],
        [
          "Look! That car is going to crash!",
          "Смотри! Эта машина сейчас врежется!",
          "В задании прогноз основан на видимой ситуации: is going to crash. Will выражал бы общее предсказание."
        ],
        [
          "Are you going to buy a new phone?",
          "Ты собираешься купить новый телефон?",
          "Полная конструкция — are you going to buy; to перед инфинитивом нельзя пропустить."
        ]
      ],
      "t": [
        [
          "I'm going to paint my room blue.",
          "Я собираюсь покрасить комнату в синий цвет.",
          "Решение уже принято по условию: am going to paint."
        ],
        [
          "I was going to go to the gym yesterday, but I didn't.",
          "Я собирался вчера пойти в спортзал, но не пошёл.",
          "Was going to описывает прежнее намерение; but I didn't сообщает, что оно не осуществилось."
        ]
      ],
      "w": [
        [
          "This year I'm going to read more books in English. I'm going to save money for a trip to Japan, and I'm not going to waste so much time on my phone.",
          "В этом году я собираюсь читать больше книг на английском. Буду копить на поездку в Японию и не буду тратить столько времени на телефон.",
          "Am going to — заранее принятые намерения; am not going to — решение отказаться от действия."
        ]
      ]
    },
    "21": {
      "g": [
        [
          "The phone's ringing. — OK, I will answer it.",
          "Телефон звонит. — Хорошо, я отвечу.",
          "Решение принимается в ответ на звонок: will answer. Going to подчёркивало бы заранее принятое намерение."
        ],
        [
          "I'm thirsty. — Are you? I will get you some water.",
          "Я хочу пить. — Правда? Я принесу тебе воды.",
          "Спонтанное предложение помощи: will get. Оно появляется в момент разговора."
        ],
        [
          "Shall I open the window? It's hot in here.",
          "Мне открыть окно? Здесь жарко.",
          "Shall I предлагает действие от моего имени; will I обычно спрашивает о будущем, а не предлагает помощь."
        ],
        [
          "I promise I won't tell anybody.",
          "Обещаю никому не рассказывать.",
          "Won't + tell выражает обещание не делать действие; won't сокращает will not."
        ],
        [
          "My car won't start. I think the battery is dead.",
          "Машина не заводится. Думаю, аккумулятор разряжен.",
          "Won't start может выражать «отказ» вещи работать сейчас, а не только будущее."
        ],
        [
          "Don't worry about the exam. I'm sure you will pass.",
          "Не переживай об экзамене. Я уверен, что ты сдашь.",
          "Will pass — уверенный прогноз, а не уже происходящее are passing."
        ],
        [
          "What shall we do this evening? Any ideas?",
          "Что нам делать этим вечером? Есть идеи?",
          "Shall we просит предложения или совет о совместном действии."
        ],
        [
          "That bag looks heavy. I will help you with it.",
          "Сумка выглядит тяжёлой. Я помогу тебе её нести.",
          "Will help — предложение помощи, сделанное сейчас, без предварительной договорённости."
        ]
      ],
      "e": [
        [
          "I'm feeling cold. — I'll close the window.",
          "Мне холодно. — Я закрою окно.",
          "Для решения в ответ на жалобу выбираем I'll close; I'm closing могло бы описывать уже начатое действие."
        ],
        [
          "Shall I carry your bag?",
          "Мне понести твою сумку?",
          "Shall I — обычная форма предложения помощи; will I спрашивало бы о будущем действии."
        ],
        [
          "I promise I'll call you tomorrow.",
          "Обещаю позвонить тебе завтра.",
          "Обещание о будущем выражаем will call; I call обычно относится к привычке или расписанию."
        ]
      ],
      "t": [
        [
          "Shall I make you a cup of tea?",
          "Сделать тебе чашку чая?",
          "Shall I предлагает моё действие; make остаётся инфинитивом без to."
        ],
        [
          "I won't tell anybody.",
          "Я никому не скажу.",
          "Won't tell выражает обещание; anybody и anyone равнозначны в этом отрицании."
        ]
      ],
      "w": [
        [
          "A: I'm so tired and the flat is a mess. B: Don't worry, I'll help you. Shall I do the washing-up? A: That would be great. B: And I'll cook dinner tonight.",
          "А: Я так устал, а в квартире бардак. Б: Не волнуйся, я помогу. Помыть посуду? А: Было бы здорово. Б: А ещё сегодня приготовлю ужин.",
          "I'll help и cook — предложения сейчас; shall I предлагает помощь; would be выражает оценку возможного результата."
        ]
      ]
    },
    "22": {
      "g": [
        [
          "I think it will rain tomorrow.",
          "Думаю, завтра будет дождь.",
          "I think вводит прогноз: will rain. Rains обычно выражает факт или привычку."
        ],
        [
          "I don't think she will come to the party.",
          "Я не думаю, что она придёт на вечеринку.",
          "Отрицание уже стоит в don't think; will come сохраняет смысл «не ожидаю её прихода»."
        ],
        [
          "Don't drink coffee before bed. You won't sleep.",
          "Не пей кофе перед сном. Не уснёшь.",
          "Won't sleep — прогноз будущего последствия; don't sleep описывало бы привычку."
        ],
        [
          "In fifty years, people will live on Mars, I'm sure.",
          "Уверен, через пятьдесят лет люди будут жить на Марсе.",
          "Will live выражает мнение о будущем, без подтверждённой договорённости."
        ],
        [
          "Tom will probably be late. He's always late.",
          "Том, вероятно, опоздает. Он всегда опаздывает.",
          "Обычный порядок: will + probably + be. После will нужна форма be, не is."
        ],
        [
          "I hope you will enjoy your holiday.",
          "Надеюсь, отпуск тебе понравится.",
          "После hope допустимы и will enjoy, и enjoy с будущим смыслом; оба варианта указаны как правильные."
        ],
        [
          "Do you think the exam will be difficult?",
          "Думаешь, экзамен будет трудным?",
          "Будущий прогноз в придаточном: will be. Один be без вспомогательного глагола не образует сказуемое."
        ],
        [
          "I'm sure everything will be fine.",
          "Уверен, всё будет хорошо.",
          "Will be выражает уверенность о будущем; is being обычно описывает временное поведение сейчас."
        ]
      ],
      "e": [
        [
          "I don't think it will be difficult.",
          "Думаю, это не будет трудно.",
          "I don't think it will — обычная форма отрицательного мнения. I think it won't тоже возможно при другом акценте."
        ],
        [
          "I'm sure they'll like your cake at the party tomorrow.",
          "Уверен, завтра на вечеринке им понравится твой торт.",
          "Will like — мнение о будущем; like в Simple без will не выражает здесь учебный прогноз."
        ],
        [
          "I'll probably see you tomorrow.",
          "Вероятно, увидимся завтра.",
          "Probably обычно ставится между will и основным глаголом. Позиция в начале возможна, но меняет акцент."
        ]
      ],
      "t": [
        [
          "I'm sure you'll pass the exam.",
          "Уверен, ты сдашь экзамен.",
          "I'm sure вводит прогноз: you will pass. You'll сокращает you will."
        ],
        [
          "I don't think it will snow.",
          "Я не думаю, что пойдёт снег.",
          "Отрицательное ожидание обычно выражаем I don't think + will snow, без второго отрицания."
        ]
      ],
      "w": [
        [
          "I think cars will drive themselves. I'm sure people will work from home more. I don't think we will use cash. Robots will probably do most housework.",
          "Думаю, машины будут ездить сами. Уверен, люди чаще будут работать из дома. Не думаю, что будем пользоваться наличными. Роботы, вероятно, будут делать большую часть работы по дому.",
          "Will выражает мнения о будущем; probably стоит после will; don't think содержит отрицание ожидания."
        ]
      ]
    },
    "23": {
      "g": [
        [
          "Why are you filling that bucket? — I am going to wash the car.",
          "Зачем ты наполняешь ведро? — Собираюсь мыть машину.",
          "Подготовка уже идёт, намерение принято раньше: am going to wash."
        ],
        [
          "Oh, I've left the door open. — I will go and shut it.",
          "Ой, я оставил дверь открытой. — Я пойду и закрою.",
          "Ответ выражает решение сейчас: will go. Заранее согласованный план не задан."
        ],
        [
          "We've run out of milk. — Really? I will get some from the shop.",
          "Молоко закончилось. — Правда? Я куплю в магазине.",
          "Решение принято после новости: will get, а не заранее выбранное going to."
        ],
        [
          "I've already decided. I am going to study medicine.",
          "Я уже решил: буду изучать медицину.",
          "Already decided показывает прежнее решение: am going to study."
        ],
        [
          "Look at the sky! It is going to be a beautiful day.",
          "Посмотри на небо! День будет прекрасным.",
          "Прогноз основан на нынешних признаках: is going to be. После is going to нужен be."
        ],
        [
          "Did you call Tom? — Oh no, I forgot. I will call him now.",
          "Ты позвонил Тому? — Ой, забыл. Сейчас позвоню.",
          "Will call выражает решение, принятое в ходе разговора."
        ],
        [
          "A: Can you lend me some money? B: Sorry, I am going to buy a laptop with it. I've chosen one already.",
          "А: Можешь одолжить денег? Б: Извини, я собираюсь купить на них ноутбук. Уже выбрал.",
          "I've chosen one already подтверждает предварительное намерение: am going to buy."
        ],
        [
          "I think Liverpool will win the match tonight.",
          "Думаю, сегодня вечером «Ливерпуль» выиграет матч.",
          "I think вводит мнение-прогноз: will win. Are going win пропускает to."
        ]
      ],
      "e": [
        [
          "I've already decided: I'm going to buy a new car next month.",
          "Я уже решил: в следующем месяце куплю новую машину.",
          "Для подчёркнутого прежнего решения в этом задании выбираем going to; will могло бы звучать как объявление решения."
        ],
        [
          "There's someone at the door. — I'll get it!",
          "Кто-то у двери. — Я открою!",
          "I'll get it — решение в ответ на новую ситуацию, а не заранее составленный план."
        ],
        [
          "Look out! You're going to drop that plate!",
          "Осторожно! Ты сейчас уронишь тарелку!",
          "Видимые признаки немедленной опасности: are going to drop."
        ]
      ],
      "t": [
        [
          "I'll lend you a pen.",
          "Я одолжу тебе ручку.",
          "Решение дать ручку возникает сейчас: I'll lend. Lend означает одолжить, give — дать."
        ],
        [
          "I'm going to sell my car.",
          "Я собираюсь продать машину.",
          "По условию решение принято на прошлой неделе: am going to sell."
        ]
      ],
      "w": [
        [
          "A: The printer isn't working. B: I'll have a look at it. — A: Why are you buying paint? B: I'm going to paint my bedroom this weekend.",
          "А: Принтер не работает. Б: Я посмотрю. — А: Зачем покупаешь краску? Б: Собираюсь на выходных покрасить спальню.",
          "I'll have a look — реакция сейчас; going to paint — намерение, для которого уже куплена краска."
        ]
      ]
    },
    "24": {
      "g": [
        [
          "Don't call me at 8. I will be having dinner then.",
          "Не звони в восемь. Я тогда буду ужинать.",
          "Will be having — процесс в конкретный будущий момент; will have само по себе не подчёркивает процесс."
        ],
        [
          "This time next week I will be lying on a beach in Spain.",
          "В это время на следующей неделе я буду лежать на пляже в Испании.",
          "This time next week задаёт момент внутри будущего процесса: will be lying."
        ],
        [
          "By the time you get here, we will have finished the work.",
          "К твоему приезду мы закончим работу.",
          "Will have finished показывает завершённость раньше будущего момента by the time you get here."
        ],
        [
          "Next year they will have been married for 25 years.",
          "В следующем году они будут женаты уже двадцать пять лет.",
          "Will have been отсчитывает накопленную длительность состояния к будущей точке."
        ],
        [
          "Will you be using your bike tomorrow? Can I borrow it?",
          "Ты завтра будешь пользоваться велосипедом? Можно мне его взять?",
          "Will you be using мягко спрашивает о будущих планах; после will be нужна форма -ing."
        ],
        [
          "The film will have started by the time we get to the cinema.",
          "К нашему приходу в кино фильм уже начнётся.",
          "Will have started — событие завершится до момента by the time we get there."
        ],
        [
          "At 10 o'clock tomorrow I will be working in my office.",
          "Завтра в десять я буду работать в офисе.",
          "В десять действие будет в процессе: will be working. Will have worked обозначало бы завершённый результат."
        ],
        [
          "I will have saved enough money by next summer to buy a car.",
          "К следующему лету я накоплю достаточно денег на машину.",
          "By next summer задаёт срок готового результата: will have saved."
        ]
      ],
      "e": [
        [
          "By next June I will have finished my studies.",
          "К следующему июню я закончу учёбу.",
          "В задании подчёркиваем завершённость к сроку: will have finished. Will finish может просто сообщать будущий факт."
        ],
        [
          "At midnight tonight I will be sleeping, so don't call.",
          "Сегодня в полночь я буду спать, поэтому не звони.",
          "Процесс в будущий момент: will be sleeping; will sleep не подчёркивает нахождение внутри действия."
        ],
        [
          "By the end of the year I will have read twenty books, so I'll be able to stop then.",
          "К концу года я прочитаю двадцать книг и смогу остановиться.",
          "Will have read подчёркивает законченный объём к сроку by the end of the year."
        ]
      ],
      "t": [
        [
          "I'll be having a lesson.",
          "Я буду на занятии.",
          "По условию в 6:30 занятие будет в процессе: will be having a lesson."
        ],
        [
          "By Friday I'll have finished the report.",
          "К пятнице я закончу отчёт.",
          "By Friday означает завершённый результат к сроку: will have finished."
        ]
      ],
      "w": [
        [
          "At 10 a.m. tomorrow I'll be sitting in a meeting. At 8 p.m. I'll be cooking dinner. By the end of the year I'll have passed my driving test and I'll have read twelve books.",
          "Завтра в десять утра я буду сидеть на совещании. В восемь вечера буду готовить ужин. К концу года сдам экзамен по вождению и прочитаю двенадцать книг.",
          "Will be sitting и cooking — процессы в моменты; will have passed и read — результаты к сроку."
        ]
      ]
    },
    "25": {
      "g": [
        [
          "I'll call you when I get home.",
          "Я позвоню, когда приду домой.",
          "После when в придаточном времени о будущем ставим get, без will. Will остаётся в главной части."
        ],
        [
          "Wait here until I come back.",
          "Жди здесь, пока я не вернусь.",
          "После until для будущего используется Present simple come, а не will come."
        ],
        [
          "We'll start dinner as soon as Tom arrives.",
          "Начнём ужинать, как только придёт Том.",
          "После as soon as используем arrives; Tom — единственное число, поэтому -s."
        ],
        [
          "If it rains tomorrow, we'll stay at home.",
          "Если завтра пойдёт дождь, останемся дома.",
          "В обычном условии будущего после if — rains без will; результат выражается we'll stay."
        ],
        [
          "I'll give you the book when I have finished it.",
          "Я дам тебе книгу, когда дочитаю её.",
          "Have finished после when подчёркивает завершённость; будущий will в этой временной части не нужен."
        ],
        [
          "Before you go out, close the windows.",
          "Прежде чем выйти, закрой окна.",
          "После before в придаточном времени используется go, хотя речь о будущем."
        ],
        [
          "I might go to the shop later. If I go, I'll buy some bread.",
          "Возможно, позже пойду в магазин. Если пойду, куплю хлеб.",
          "Поход не гарантирован, поэтому if. When представляло бы его как ожидаемое событие."
        ],
        [
          "I'll be ready when you come back. (I'm sure you will come back.)",
          "Я буду готов, когда ты вернёшься.",
          "Возвращение считается ожидаемым: when. If добавило бы условность «если вернёшься»."
        ]
      ],
      "e": [
        [
          "I'll phone you when I arrive.",
          "Я позвоню, когда приеду.",
          "When arrive — придаточное времени; will используется в главном I'll phone, не внутри него."
        ],
        [
          "If you need help, call me.",
          "Если нужна будет помощь, позвони.",
          "В обычном будущем условии if + need, без will. Call — просьба в главной части."
        ],
        [
          "Don't go out until it stops raining.",
          "Не выходи, пока дождь не прекратится.",
          "После until ставим stops; it требует -s. Will в этом придаточном не нужен."
        ]
      ],
      "t": [
        [
          "I'll watch TV when I've finished my homework.",
          "Я посмотрю телевизор, когда закончу домашнее задание.",
          "When I've finished подчёркивает завершённость; when I finish тоже допустимо для последовательности будущих действий."
        ],
        [
          "If you're late, call me.",
          "Если опоздаешь, позвони мне.",
          "Будущее условие: if you are late, без will. You're сокращает you are."
        ]
      ],
      "w": [
        [
          "As soon as I get home, I'll have a shower. When I've had dinner, I'll do my English homework. If I have time, I'll call my mum before I go to bed.",
          "Как только приду домой, приму душ. После ужина сделаю английский. Если будет время, позвоню маме перед сном.",
          "В придаточных as soon as, when, if и before используем present; будущее will стоит в главных частях."
        ]
      ]
    },
    "26": {
      "g": [
        [
          "I can swim, but not very well.",
          "Я умею плавать, но не очень хорошо.",
          "Can + swim выражает умение; после can не ставится to и не добавляется am."
        ],
        [
          "I'm afraid I can't come to the party tomorrow.",
          "Боюсь, завтра не смогу прийти на вечеринку.",
          "Can't может обозначать будущую невозможность, если время ясно из tomorrow; not can — неверный порядок."
        ],
        [
          "When I was young, I could run very fast.",
          "В молодости я умел очень быстро бегать.",
          "Could описывает общую способность в прошлом; can — в настоящем."
        ],
        [
          "I haven't been able to sleep well recently.",
          "Последнее время мне не удаётся нормально спать.",
          "После haven't нужна форма been able to; can и could не имеют формы для Present perfect."
        ],
        [
          "The fire spread quickly, but everybody was able to escape.",
          "Огонь быстро распространился, но всем удалось спастись.",
          "Was able to обозначает конкретный успешный случай в прошлом; could обычно описывает общее умение."
        ],
        [
          "You'll be able to speak English fluently soon.",
          "Скоро ты сможешь свободно говорить по-английски.",
          "После will используем be able to; два модальных will can вместе не ставятся."
        ],
        [
          "I tried hard, but I couldn't open the door.",
          "Я очень старался, но не смог открыть дверь.",
          "Couldn't подходит для конкретной неудачи в прошлом; wasn't able потребовало бы to перед open."
        ],
        [
          "My grandmother can't use a computer, so I'm teaching her.",
          "Бабушка не умеет пользоваться компьютером, поэтому я её учу.",
          "Контекст обучения показывает отсутствие умения: can't. Could относилось бы к прошлому или условию."
        ]
      ],
      "e": [
        [
          "I will be able to help you tomorrow.",
          "Завтра я смогу тебе помочь.",
          "После will нужен be able to, не can. Can help tomorrow тоже возможно без will."
        ],
        [
          "She can speak three languages.",
          "Она говорит на трёх языках.",
          "После can нужен speak без to; модальный глагол уже связывает подлежащее и инфинитив."
        ],
        [
          "The exam was difficult, but I was able to pass it.",
          "Экзамен был трудным, но мне удалось его сдать.",
          "Конкретный успех в прошлом передаём was able to или managed to; could обычно обозначает общую способность."
        ]
      ],
      "t": [
        [
          "I'd like to be able to play the piano.",
          "Я хотел бы уметь играть на пианино.",
          "После would like to требуется инфинитив be able to; can не имеет такой формы."
        ],
        [
          "It was raining but we were able to get home dry.",
          "Шёл дождь, но нам удалось добраться домой сухими.",
          "Were able to передаёт конкретный успешный результат; were согласуется с we."
        ]
      ],
      "w": [
        [
          "When I was five, I could swim, but I couldn't ride a bike. Now I can drive and I can speak two languages. One day I'd like to be able to play the guitar.",
          "В пять лет я умел плавать, но не умел ездить на велосипеде. Теперь могу водить и говорить на двух языках. Когда-нибудь хочу научиться играть на гитаре.",
          "Could — прошлое умение; can — нынешнее; to be able to подходит после I'd like."
        ]
      ]
    },
    "27": {
      "g": [
        [
          "What shall we do tonight? — We could go to the cinema.",
          "Что будем делать вечером? — Можно сходить в кино.",
          "Could + go предлагает возможный вариант; could have требовало бы третью форму и относилось к прошлому."
        ],
        [
          "Why did you walk home? You could have taken a taxi.",
          "Зачем ты шёл домой пешком? Можно было взять такси.",
          "Could have taken — возможность в прошлом, которой не воспользовались; could take относится к иной временной точке."
        ],
        [
          "I was so tired I could have slept for a week.",
          "Я так устал, что мог бы проспать целую неделю.",
          "Could have slept — воображаемая возможность в прошлом; slept — третья форма после have."
        ],
        [
          "The situation was bad, but it could have been worse.",
          "Ситуация была плохой, но могла быть хуже.",
          "Could have been сравнивает прошлое с неосуществившимся худшим вариантом; could be — возможность сейчас."
        ],
        [
          "Where's Tom? — I don't know. He could be at the library.",
          "Где Том? — Не знаю. Возможно, в библиотеке.",
          "Could be выражает предположение о настоящем; could have потребовало бы третью форму и прошлый смысл."
        ],
        [
          "I couldn't live in a big city. I'd hate it.",
          "Я не смог бы жить в большом городе. Мне бы не понравилось.",
          "Couldn't — воображаемая невозможность сейчас или в будущем, связанная с I'd hate it."
        ],
        [
          "Why didn't you ask me? I could have helped you.",
          "Почему ты не спросил меня? Я мог бы помочь.",
          "Could have helped — нереализованная помощь в прошлом, а не нынешняя возможность could help."
        ],
        [
          "She could have won the race, but she fell.",
          "Она могла выиграть забег, но упала.",
          "Could have won описывает возможность, которая не осуществилась; won — третья форма win."
        ]
      ],
      "e": [
        [
          "You could have told me earlier!",
          "Ты мог бы сказать мне раньше!",
          "Yesterday относит упрёк к прошлому: could have told; could tell обозначало бы возможность сейчас."
        ],
        [
          "Why didn't you call me? I could have helped you.",
          "Почему не позвонил? Я мог бы помочь.",
          "Пропущенная возможность в прошлом: could have helped, не просто could help."
        ],
        [
          "I could have gone to the party, but I was too tired.",
          "Я мог пойти на вечеринку, но слишком устал.",
          "После could have нужна третья форма gone, не go."
        ]
      ],
      "t": [
        [
          "We could go to the park.",
          "Мы могли бы пойти в парк.",
          "Could go — мягкое предложение возможного действия, без to после could."
        ],
        [
          "I could have called Sam.",
          "Я мог бы позвонить Сэму.",
          "Could have called обозначает возможное, но не сделанное действие в прошлом."
        ]
      ],
      "w": [
        [
          "Last year I could have moved to Berlin, but I stayed. Things could have been very different! This weekend we could visit the museum or we could go hiking.",
          "В прошлом году я мог переехать в Берлин, но остался. Всё могло сложиться совсем иначе! В эти выходные можно сходить в музей или в поход.",
          "Could have moved и been — прошлые нереализованные варианты; could visit и go — предложения на будущее."
        ]
      ]
    },
    "28": {
      "g": [
        [
          "You've been travelling all day. You must be tired.",
          "Ты весь день в дороге. Должно быть, устал.",
          "Must be — уверенный вывод по признакам; can't означало бы «не может быть», mustn't — запрет."
        ],
        [
          "That can't be Tom. He's in Australia.",
          "Это не может быть Том. Он в Австралии.",
          "Can't be выражает уверенный отрицательный вывод; mustn't обычно запрещает действие."
        ],
        [
          "She knows a lot about films. She must watch a lot of them.",
          "Она многое знает о кино. Должно быть, часто смотрит фильмы.",
          "Must watch — вывод о её привычке по знаниям; can't выражало бы противоположный вывод."
        ],
        [
          "The phone rang, but I didn't hear it. I must have been asleep.",
          "Телефон звонил, но я его не слышал. Должно быть, я спал.",
          "Must have been — вывод о прошлом; must be относилось бы к настоящему."
        ],
        [
          "He passed the exam without studying? That can't be true!",
          "Он сдал экзамен без подготовки? Не может быть!",
          "Can't be true выражает недоверие к факту; mustn't обозначало бы запрет, не логический вывод."
        ],
        [
          "The ground is wet. It must have rained last night.",
          "Земля мокрая. Должно быть, ночью шёл дождь.",
          "Must have rained — уверенный вывод о прошлом по нынешнему результату."
        ],
        [
          "Kate walked past without saying hello. She can't have seen me.",
          "Кейт прошла мимо, не поздоровавшись. Наверное, она меня не увидела.",
          "Can't have seen — отрицательный вывод о прошлом; mustn't have не заменяет эту конструкцию."
        ],
        [
          "They haven't eaten all day. They must be hungry.",
          "Они весь день не ели. Должно быть, голодны.",
          "Must be hungry — вывод о нынешнем состоянии; must have требовало бы ещё третью форму."
        ]
      ],
      "e": [
        [
          "She can't be at home — the lights are off and nobody answers.",
          "Её не может быть дома: свет выключен и никто не отвечает.",
          "В логике примера признаки ведут к отрицательному выводу can't be; must be выражало бы обратное."
        ],
        [
          "He must have forgotten his keys.",
          "Должно быть, он забыл ключи.",
          "После must have нужна третья форма forgotten, не forget."
        ],
        [
          "It can't be true! — No, it must be true.",
          "Не может быть! — Нет, это наверняка правда.",
          "После must нужен инфинитив be: must be true. Без be нет смыслового глагола."
        ]
      ],
      "t": [
        [
          "You must be joking.",
          "Ты, должно быть, шутишь.",
          "Must be joking — уверенный вывод о процессе сейчас; must здесь не выражает обязанность."
        ],
        [
          "Tom can't have seen us.",
          "Том не мог нас увидеть.",
          "Can't have seen — уверенный отрицательный вывод о прошлом; seen — третья форма see."
        ]
      ],
      "w": [
        [
          "The man at the next table must be a businessman — he's wearing a suit and talking on two phones. He can't be very relaxed. He must have had a busy day.",
          "Мужчина за соседним столиком, должно быть, бизнесмен: он в костюме и говорит по двум телефонам. Вряд ли он расслаблен. Наверное, день был напряжённый.",
          "Must be и can't be — выводы о настоящем; must have had — предположение о прошлом дне."
        ]
      ]
    },
    "29": {
      "g": [
        [
          "Take an umbrella. It might rain later.",
          "Возьми зонт. Возможно, позже пойдёт дождь.",
          "Might rain — неопределённая возможность; must выражало бы уверенный вывод."
        ],
        [
          "I'm not sure where Jo is. She may be in the garden.",
          "Не знаю точно, где Джо. Возможно, она в саду.",
          "May be выражает неуверенное предположение; must be означало бы более уверенный вывод."
        ],
        [
          "Tom isn't answering. He might have gone out.",
          "Том не отвечает. Возможно, он вышел.",
          "Might have gone — предположение о прошлом действии, объясняющем отсутствие сейчас."
        ],
        [
          "I may not go to the party. I'm not sure yet.",
          "Возможно, я не пойду на вечеринку. Пока не уверен.",
          "May not — «возможно, не»; mustn't — запрет; can't — невозможность."
        ],
        [
          "Don't touch the dog! It might bite you.",
          "Не трогай собаку! Она может укусить.",
          "Might bite предупреждает о возможном риске; must утверждало бы уверенное предположение."
        ],
        [
          "I can't find my phone. I might have left it in the taxi.",
          "Не могу найти телефон. Возможно, оставил его в такси.",
          "Might have left относится к возможному прошлому событию; might leave — к будущему."
        ],
        [
          "She might be working — she often works late on Fridays.",
          "Возможно, она работает: по пятницам часто задерживается.",
          "Might be working — возможный процесс сейчас; might work могло бы описывать привычку или будущий выбор."
        ],
        [
          "Why didn't he answer? — He may not have heard the phone.",
          "Почему он не ответил? — Возможно, не услышал телефон.",
          "May not have heard — неуверенное отрицательное предположение о прошлом; heard — третья форма."
        ]
      ],
      "e": [
        [
          "It might snow tonight.",
          "Возможно, ночью пойдёт снег.",
          "Might не получает -s даже с it; после модального глагола snow остаётся инфинитивом."
        ],
        [
          "She may have forgotten about the meeting.",
          "Возможно, она забыла о встрече.",
          "После may have нужна третья форма forgotten."
        ],
        [
          "He might have missed the train.",
          "Возможно, он опоздал на поезд.",
          "После might используется have, не has, независимо от he; missed — третья форма."
        ]
      ],
      "t": [
        [
          "Sarah might be busy.",
          "Возможно, Сара занята.",
          "Might be выражает неуверенное предположение о состоянии; be — инфинитив после might."
        ],
        [
          "They may have missed the bus.",
          "Возможно, они не успели на автобус.",
          "May have missed — предположение о прошлом; have + третья форма после may."
        ]
      ],
      "w": [
        [
          "I'm not sure what I'll do this weekend. I might visit my friends in the country, or I may stay at home and study. It might rain, so I may not go far.",
          "Не знаю, что буду делать на выходных. Возможно, навещу друзей за городом или останусь дома заниматься. Может пойти дождь, так что, возможно, далеко не поеду.",
          "Might и may обозначают варианты; may not — отсутствие действия как возможность, без запрета."
        ]
      ]
    },
    "30": {
      "g": [
        [
          "I'm not sure what I'll do. I might go away for the weekend.",
          "Ещё не знаю, что буду делать. Возможно, уеду на выходные.",
          "Might go — неопределённый план; must обозначало бы необходимость, should — совет."
        ],
        [
          "The bus is so slow. We might as well walk.",
          "Автобус очень медленный. Пожалуй, лучше пойти пешком.",
          "Might as well — «можно и так, нет большого смысла в альтернативе»; порядок слов фиксирован."
        ],
        [
          "Don't phone at 9. I might be having dinner.",
          "Не звони в девять. Возможно, я буду ужинать.",
          "Might be having — возможный процесс в будущий момент; must be having было бы уверенным выводом."
        ],
        [
          "Take a map. You might need it.",
          "Возьми карту. Она может понадобиться.",
          "Might need обозначает возможность, а не обязательную необходимость must."
        ],
        [
          "There's nothing on TV. We might as well go to bed.",
          "По телевизору ничего интересного. Пожалуй, можно идти спать.",
          "Might as well выражает разумный выбор при отсутствии лучшей альтернативы."
        ],
        [
          "I may not be here tomorrow, so let's do it today.",
          "Завтра меня, возможно, здесь не будет, так что сделаем сегодня.",
          "May not be — неопределённое отсутствие; mustn't было бы запретом."
        ],
        [
          "Ask Anna. She might know his number.",
          "Спроси Анну. Возможно, она знает его номер.",
          "Might know — предположение. После might глагол know без -s."
        ],
        [
          "The concert may be cancelled because of the storm.",
          "Из-за шторма концерт могут отменить.",
          "May be cancelled — пассив: may + be + третья форма; may cancelled пропускает be."
        ]
      ],
      "e": [
        [
          "I might buy a new car.",
          "Возможно, я куплю новую машину.",
          "После might инфинитив buy используется без to."
        ],
        [
          "We may as well stay here.",
          "Пожалуй, можно остаться здесь.",
          "Устойчивое выражение — may/might as well, не as good."
        ],
        [
          "I might go to the cinema tonight.",
          "Возможно, вечером пойду в кино.",
          "Might go обозначает возможное действие; might be going — возможный план. Might going пропускает be."
        ]
      ],
      "t": [
        [
          "I might go to the gym tonight.",
          "Возможно, сегодня вечером пойду в спортзал.",
          "Might go заменяет perhaps I'll go, сохраняя неопределённость."
        ],
        [
          "We might as well take our time.",
          "Пожалуй, можно не спешить.",
          "Might as well take our time — разумный выбор, потому что фильм уже начался и спешка мало изменит."
        ]
      ],
      "w": [
        [
          "I might go to Georgia this summer, or I may stay with my parents. Flights are expensive, so we might as well go by train. I may not have much time anyway.",
          "Возможно, летом поеду в Грузию или поживу у родителей. Перелёты дорогие, так что можно поехать поездом. Возможно, времени всё равно будет мало.",
          "Might и may выражают варианты; might as well — выбор по обстоятельствам; may not — неопределённое отрицание."
        ]
      ]
    },
    "31": {
      "g": [
        [
          "In many countries, you have to be 18 to drive.",
          "Во многих странах для вождения нужно достичь восемнадцати лет.",
          "Have to выражает требование правил; после must не ставят to. You требует have, не has."
        ],
        [
          "I had to work late yesterday.",
          "Вчера мне пришлось допоздна работать.",
          "Для обязанности в прошлом используем had to; у must нет такой прошедшей формы."
        ],
        [
          "Do you have to wear a uniform at school?",
          "В школе нужно носить форму?",
          "Вопрос с do: do you have to. Must не используется после do."
        ],
        [
          "It's a great film. You must see it!",
          "Это отличный фильм. Ты обязательно должен его посмотреть!",
          "Must здесь — настойчивая рекомендация говорящего; после must нужен see без to."
        ],
        [
          "She doesn't have to get up early. She's on holiday.",
          "Ей не нужно рано вставать. Она в отпуске.",
          "Doesn't have to — отсутствие необходимости; mustn't означало бы запрет вставать."
        ],
        [
          "I'll have to buy a new phone soon.",
          "Скоро мне придётся купить новый телефон.",
          "После will используем have to; will must сочетать нельзя."
        ],
        [
          "What time did you have to leave yesterday?",
          "Во сколько тебе вчера пришлось уйти?",
          "Вопрос о прошлой необходимости: did you have to + leave."
        ],
        [
          "My brother has to take medicine every day.",
          "Мой брат должен каждый день принимать лекарство.",
          "My brother соответствует he: has to. Must to — неверная конструкция."
        ]
      ],
      "e": [
        [
          "I had to work yesterday.",
          "Вчера мне пришлось работать.",
          "Past simple обязанности — had to; must не используется с yesterday в этом смысле."
        ],
        [
          "She doesn't have to work on Sundays.",
          "Ей не нужно работать по воскресеньям.",
          "Для she отрицание — doesn't have to, не don't."
        ],
        [
          "Do you have to go now?",
          "Тебе нужно уйти сейчас?",
          "Либо do you have to, либо must you; do you must смешивает две конструкции."
        ]
      ],
      "t": [
        [
          "I had to wait an hour.",
          "Мне пришлось ждать час.",
          "Had to wait передаёт необходимость в прошлом; wait for an hour тоже допустимо."
        ],
        [
          "You don't have to pay.",
          "Тебе не нужно платить.",
          "Don't have to означает «не обязательно», а не «запрещено»."
        ]
      ],
      "w": [
        [
          "At work I have to start at nine and I have to answer lots of emails. I don't have to wear a suit. Yesterday I had to stay late. I must find a better job!",
          "На работе я должен начинать в девять и отвечать на множество писем. Костюм носить не нужно. Вчера пришлось задержаться. Надо найти работу получше!",
          "Have to — обязанности; don't have to — необязательность; had to — прошлое; must — собственная настойчивая мысль."
        ]
      ]
    },
    "32": {
      "g": [
        [
          "You mustn't smoke in the hospital. It's forbidden.",
          "В больнице нельзя курить. Это запрещено.",
          "Mustn't — запрет. Don't have to и needn't означали бы, что курить необязательно."
        ],
        [
          "We've got plenty of time. You needn't hurry.",
          "У нас много времени. Тебе не нужно торопиться.",
          "Needn't hurry — нет необходимости; mustn't hurry запрещало бы спешить."
        ],
        [
          "You mustn't tell anyone. It's a secret!",
          "Никому не говори. Это секрет!",
          "Mustn't tell запрещает разглашать; needn't означало бы только отсутствие необходимости рассказать."
        ],
        [
          "I needn't have bought so much food. Nobody came.",
          "Зря я купил столько еды. Никто не пришёл.",
          "Needn't have bought — покупка состоялась, но была ненужной; needn't buy относится к нынешней необходимости."
        ],
        [
          "You don't have to come with me, but you can if you want.",
          "Тебе не обязательно идти со мной, но можешь, если хочешь.",
          "Don't have to снимает обязанность; mustn't запрещало бы пойти."
        ],
        [
          "Drivers mustn't use their phones while driving.",
          "Водителям нельзя пользоваться телефоном за рулём.",
          "Mustn't выражает запрет; needn't означало бы только «необязательно»."
        ],
        [
          "We didn't need to take a taxi, so we walked.",
          "Нам не нужно было такси, поэтому мы пошли пешком.",
          "Didn't need to описывает отсутствие необходимости в прошлом; по контексту такси не взяли."
        ],
        [
          "You needn't wash those cups. They're already clean.",
          "Эти чашки мыть не нужно. Они уже чистые.",
          "Needn't wash снимает необходимость; mustn't wash запрещало бы мыть их."
        ]
      ],
      "e": [
        [
          "You needn't pay — it's free.",
          "Платить не нужно — это бесплатно.",
          "Needn't или don't have to означает отсутствие необходимости; mustn't — запрет, другой смысл."
        ],
        [
          "You needn't worry.",
          "Тебе не нужно волноваться.",
          "После модального needn't нет to; в конструкции don't need to предлог to нужен."
        ],
        [
          "I needn't have gone to the meeting.",
          "Мне не стоило идти на эту встречу.",
          "После needn't have нужна третья форма gone, не went."
        ]
      ],
      "t": [
        [
          "You mustn't park here.",
          "Здесь нельзя парковаться.",
          "Mustn't park означает запрет; после mustn't инфинитив без to."
        ],
        [
          "I needn't have taken an umbrella.",
          "Зря я взял зонт.",
          "Needn't have taken показывает, что зонт взяли, но он не понадобился; taken — третья форма."
        ]
      ],
      "w": [
        [
          "Guests must take off their shoes. You mustn't feed the cat — she's on a diet! You needn't bring anything, and you don't have to wash the dishes.",
          "Гости должны разуваться. Кота кормить нельзя: он на диете! Ничего приносить не нужно, и посуду мыть необязательно.",
          "Must — обязанность; mustn't — запрет; needn't и don't have to — отсутствие необходимости."
        ]
      ]
    },
    "33": {
      "g": [
        [
          "You look tired. You should go to bed.",
          "Ты выглядишь уставшим. Тебе стоит лечь спать.",
          "Should — совет; must to неверно, а ought потребовало бы to перед go."
        ],
        [
          "You shouldn't eat so much sugar. It's bad for you.",
          "Не стоит есть столько сахара. Это вредно.",
          "Shouldn't выражает совет не делать действие; ought not потребовало бы to."
        ],
        [
          "I should have studied harder. I failed the exam.",
          "Мне стоило усерднее учиться. Я провалил экзамен.",
          "Should have studied — сожаление о том, чего не сделали в прошлом; should study — нынешний совет."
        ],
        [
          "The film was great. You should have come with us.",
          "Фильм был отличный. Тебе стоило пойти с нами.",
          "Should have come — упущенная прошлая возможность; come здесь третья форма."
        ],
        [
          "Do you think I should apply for the job?",
          "Думаешь, мне стоит подать заявку на эту работу?",
          "Should apply — запрос совета; ought требует to, а shall to неверно."
        ],
        [
          "Tom left an hour ago. He should be home by now.",
          "Том ушёл час назад. Он уже должен быть дома.",
          "Should be — ожидание по обстоятельствам, а не требование. Should have потребовало бы третью форму."
        ],
        [
          "We shouldn't have eaten so much. I feel sick.",
          "Зря мы столько съели. Меня тошнит.",
          "Shouldn't have eaten — оценка уже сделанного прошлого действия; eaten — третья форма."
        ],
        [
          "There should be more cycle lanes in the city.",
          "В городе должно быть больше велодорожек.",
          "Should be выражает мнение о желательном положении дел; после should нет to."
        ]
      ],
      "e": [
        [
          "You should see a doctor.",
          "Тебе стоит показаться врачу.",
          "После should инфинитив see используется без to."
        ],
        [
          "I should have gone to bed earlier last night.",
          "Вчера мне стоило раньше лечь спать.",
          "Оценка прошлого: should have gone, не should went."
        ],
        [
          "Do you think I should call her?",
          "Думаешь, мне стоит ей позвонить?",
          "После do you think порядок в придаточном прямой: I should call, не should I call."
        ]
      ],
      "t": [
        [
          "He should go to the dentist.",
          "Ему стоит сходить к стоматологу.",
          "Should go/see — совет. Dentist — стоматолог; toothache задаёт причину рекомендации."
        ],
        [
          "I should have taken a map.",
          "Мне стоило взять карту.",
          "Should have taken оценивает не сделанное в прошлом действие; taken — третья форма take."
        ]
      ],
      "w": [
        [
          "You should listen to English every day and you shouldn't be afraid of mistakes. I should have started speaking earlier — I only read books for years.",
          "Стоит каждый день слушать английскую речь и не бояться ошибок. Мне следовало раньше начать говорить: много лет я только читал.",
          "Should и shouldn't — советы сейчас; should have started — сожаление о прошлом."
        ]
      ]
    },
    "34": {
      "g": [
        [
          "The doctor suggested that I should rest for a few days.",
          "Врач посоветовал мне несколько дней отдохнуть.",
          "Should rest передаёт рекомендацию после suggested that. Rested тоже возможно в британском варианте, с иным оформлением придаточного.",
          [
            "rested"
          ]
        ],
        [
          "They insisted that we stay for dinner.",
          "Они настояли, чтобы мы остались на ужин.",
          "После insist that возможна базовая форма stay, без -s и to; также допустима конструкция should stay."
        ],
        [
          "It's important that everybody should be on time.",
          "Важно, чтобы все пришли вовремя.",
          "Should be выражает требуемую ситуацию после it's important that, а не процесс is being."
        ],
        [
          "I recommend that you see this film.",
          "Я рекомендую тебе посмотреть этот фильм.",
          "После recommend that используется базовая форма see; seeing и to see здесь не образуют сказуемое придаточного."
        ],
        [
          "It's strange that he should say such a thing.",
          "Странно, что он говорит такое.",
          "Should say после it's strange выражает удивление фактом; это не обычный совет."
        ],
        [
          "Take an umbrella in case it should rain.",
          "Возьми зонт на случай дождя.",
          "In case it should rain обозначает возможную ситуацию, для которой готовимся заранее."
        ],
        [
          "What do you suggest I do?",
          "Что ты советуешь мне сделать?",
          "В придаточном после suggest используется I do; doing и to do не образуют здесь нужный порядок."
        ],
        [
          "If you should see Tom, tell him to call me.",
          "Если вдруг увидишь Тома, попроси его позвонить мне.",
          "If you should see — более осторожное условие «если случайно увидишь»; should не обозначает обязанность."
        ]
      ],
      "e": [
        [
          "She suggested that I take a break.",
          "Она предложила мне сделать перерыв.",
          "Suggest не строится как suggest me to; подходят suggested that I take или suggested taking."
        ],
        [
          "They demanded that he pay immediately.",
          "Они потребовали, чтобы он немедленно заплатил.",
          "Для требования используется базовая форма pay или should pay; это требуемое, а не совершённое действие."
        ],
        [
          "It's essential that you sign the form.",
          "Необходимо, чтобы ты подписал форму.",
          "Sign или should sign передаёт требование; are signing обозначало бы происходящий процесс."
        ]
      ],
      "t": [
        [
          "My friend suggested that I buy a new laptop.",
          "Друг предложил мне купить новый ноутбук.",
          "Suggested that I buy/should buy передаёт совет; bought тоже допустимо в британском употреблении."
        ],
        [
          "They insisted that I stay with them.",
          "Они настояли, чтобы я остался у них.",
          "Insisted that I stay/should stay передаёт требование; местоимения меняются при пересказе."
        ]
      ],
      "w": [
        [
          "My teacher suggested that I read more in English. She recommended that I start with short stories. My dad insisted that I should take a course in London.",
          "Учитель предложил мне больше читать на английском и начать с рассказов. Отец настоял, чтобы я прошёл курс в Лондоне.",
          "После suggested, recommended и insisted возможны придаточные с базовой формой или should + инфинитив."
        ]
      ]
    },
    "35": {
      "g": [
        [
          "It's late. We had better go home.",
          "Уже поздно. Нам лучше идти домой.",
          "Had better + go — совет с возможными последствиями; have better и had better to неверны."
        ],
        [
          "You'd better not be late again.",
          "Тебе лучше больше не опаздывать.",
          "Отрицание had better not + be; don't и to здесь не добавляются."
        ],
        [
          "It's time you went to bed.",
          "Тебе пора спать.",
          "It's time + подлежащее + Past simple: went выражает желательное действие сейчас, не прошлое событие."
        ],
        [
          "It's time to leave — the taxi is here.",
          "Пора уходить: такси приехало.",
          "Без отдельного подлежащего после it's time используется to leave."
        ],
        [
          "You had better take an umbrella. It looks like rain.",
          "Лучше возьми зонт. Похоже, будет дождь.",
          "Had better — устойчивый совет по ситуации; would better и should better не используются."
        ],
        [
          "It's about time the government did something about this.",
          "Давно пора правительству что-нибудь с этим сделать.",
          "It's about time + подлежащее + did: прошедшая форма выражает, что действие уже пора выполнить."
        ],
        [
          "I'd better phone my mum. She'll be worried.",
          "Лучше позвоню маме. Она будет волноваться.",
          "После had better инфинитив phone без to. I'd здесь означает I had."
        ],
        [
          "It's time we had a holiday.",
          "Нам пора в отпуск.",
          "It's time we had: Past simple обозначает желательное действие сейчас или в ближайшем будущем."
        ]
      ],
      "e": [
        [
          "You'd better see a doctor.",
          "Тебе лучше показаться врачу.",
          "Had better + see без to; you'd в этой конструкции сокращает you had."
        ],
        [
          "It's time you went home.",
          "Тебе пора домой.",
          "It's time you went использует Past simple; it's time to go — альтернативная конструкция без отдельного подлежащего."
        ],
        [
          "We'd better not wake him.",
          "Нам лучше его не будить.",
          "Отрицание ставится после better: had better not wake, а не hadn't better."
        ]
      ],
      "t": [
        [
          "You'd better hurry.",
          "Тебе лучше поторопиться.",
          "Had better hurry предупреждает о последствии — пропущенном автобусе; после better нет to."
        ],
        [
          "It's time we started cooking.",
          "Нам пора начать готовить.",
          "It's time we started использует прошедшую форму для желательного действия сейчас."
        ]
      ],
      "w": [
        [
          "It's time you started looking for a job! You'd better update your CV first. And you'd better not stay up so late — it's time you got up before noon.",
          "Тебе давно пора искать работу! Сначала лучше обновить резюме. И не стоит так поздно ложиться: пора вставать до полудня.",
          "It's time + started/got выражает «уже пора»; had better + инфинитив предупреждает о возможных последствиях."
        ]
      ]
    },
    "36": {
      "g": [
        [
          "It would be nice to live by the sea.",
          "Было бы здорово жить у моря.",
          "Воображаемая ситуация: would be. Will be звучало бы как прогноз реального будущего; would без be неполно."
        ],
        [
          "I'd love a dog, but I wouldn't have time to walk it.",
          "Я бы очень хотел собаку, но у меня не было бы времени её выгуливать.",
          "Wouldn't have — воображаемый недостаток времени. После would нужна начальная форма have, не had."
        ],
        [
          "When I was a child, my grandfather would tell me stories every night.",
          "В детстве дедушка каждый вечер рассказывал мне истории.",
          "Would tell — повторяющееся действие в прошлом; every night подчёркивает привычку. Will tell относится к будущему."
        ],
        [
          "I tried to start the car, but it wouldn't start.",
          "Я пытался завести машину, но она никак не заводилась.",
          "Wouldn't start выражает «отказ» машины завестись в прошлом. Won't — сейчас; didn't would неверно."
        ],
        [
          "He promised he would call me, but he didn't.",
          "Он обещал позвонить мне, но не позвонил.",
          "После прошлого promised используем would call — будущее с точки зрения прошлого; will обычно меняется на would."
        ],
        [
          "I would like a coffee, please.",
          "Я хотел бы кофе, пожалуйста.",
          "Would like — вежливая просьба сейчас. Like сообщало бы предпочтение; will like — прогноз."
        ],
        [
          "I wouldn't do that if I were you.",
          "На твоём месте я бы этого не делал.",
          "If I were you задаёт воображаемое условие, поэтому wouldn't do. Won't обозначало бы реальное будущее."
        ],
        [
          "She said she would be here at 8, but it's 9 now.",
          "Она сказала, что будет здесь в восемь, но уже девять.",
          "Would be передаёт будущее относительно прошлого said. Would требует be, а не самостоятельную будущую форму will."
        ]
      ],
      "e": [
        [
          "I knew she would be angry.",
          "Я знал, что она рассердится.",
          "Будущее с прошлой точки зрения: knew + would be. She'd здесь означает she would."
        ],
        [
          "Would you like to come with us?",
          "Хочешь пойти с нами?",
          "Would like to + инфинитив come; coming после to в этой конструкции не используется."
        ],
        [
          "I wish you would stop complaining.",
          "Хотелось бы, чтобы ты перестал жаловаться.",
          "Wish + would выражает желание изменить чужое поведение; will здесь не передаёт это пожелание."
        ]
      ],
      "t": [
        [
          "Tom promised he would help me.",
          "Том обещал мне помочь.",
          "В пересказе обещания will меняется на would; promised to help — другой допустимый способ передать то же обещание."
        ],
        [
          "If I had a lot of money, I would travel.",
          "Если бы у меня было много денег, я бы путешествовал.",
          "If + Past simple задаёт нереальное условие; would + travel — воображаемый результат, не обычный прогноз."
        ]
      ],
      "w": [
        [
          "When I was little, we would spend every summer at my grandmother's. We would swim in the lake every day. If I had a free summer now, I would travel around Asia.",
          "В детстве мы каждое лето жили у бабушки и каждый день плавали в озере. Если бы сейчас у меня было свободное лето, я бы путешествовал по Азии.",
          "Would spend/swim — прошлые привычки; if I had + would travel — воображаемая нынешняя возможность."
        ]
      ]
    },
    "37": {
      "g": [
        [
          "Could you open the window, please?",
          "Не мог бы ты открыть окно, пожалуйста?",
          "Could you + open — вежливая просьба. Would you mind потребовало бы opening, не open."
        ],
        [
          "Would you mind closing the door?",
          "Ты не против закрыть дверь?",
          "После would you mind требуется форма -ing: closing, а не to close."
        ],
        [
          "Can I borrow your pen?",
          "Можно одолжить твою ручку?",
          "Can I спрашивает разрешение на моё действие. Would I и do I не выражают такую просьбу здесь."
        ],
        [
          "Would you like something to drink?",
          "Хочешь что-нибудь выпить?",
          "Would you like — предложение сейчас; do you like спрашивает общие вкусы."
        ],
        [
          "May I use your phone, please?",
          "Можно воспользоваться твоим телефоном, пожалуйста?",
          "May I — вежливый запрос разрешения. После may используем use без to."
        ],
        [
          "Would you like to come to dinner on Saturday?",
          "Хочешь прийти на ужин в субботу?",
          "После would like требуется to come; coming и come без to здесь не подходят."
        ],
        [
          "Do you mind if I sit here?",
          "Ты не против, если я сяду здесь?",
          "После do you mind if для разрешения используется Present simple sit; will не нужен."
        ],
        [
          "Can I get you anything from the shop?",
          "Принести тебе что-нибудь из магазина?",
          "Can I get you — предложение услуги от моего имени, а не вопрос о привычке do I get."
        ]
      ],
      "e": [
        [
          "Would you mind helping me?",
          "Ты не против помочь мне?",
          "После would you mind используется helping с -ing, а не to help."
        ],
        [
          "Would you like a cup of tea?",
          "Хочешь чашку чая?",
          "Would you like предлагает чай сейчас; do you like спрашивало бы, нравится ли чай вообще."
        ],
        [
          "Could I ask you a question?",
          "Можно задать тебе вопрос?",
          "После could/can инфинитив ask без to. Could звучит вежливее и осторожнее."
        ]
      ],
      "t": [
        [
          "Could you tell me the time, please?",
          "Не подскажешь, который час, пожалуйста?",
          "Could you tell — вежливая просьба незнакомому человеку; после could нет to."
        ],
        [
          "Would you like to go to the cinema tonight?",
          "Хочешь сегодня вечером пойти в кино?",
          "Would you like to go — приглашение; to перед инфинитивом обязательно."
        ]
      ],
      "w": [
        [
          "Host: Would you like something to drink? Guest: Yes, could I have some water, please? And may I use your bathroom? Host: Of course. Can I get you anything else?",
          "Хозяин: Хочешь что-нибудь выпить? Гость: Да, можно немного воды, пожалуйста? И можно воспользоваться ванной? Хозяин: Конечно. Ещё что-нибудь принести?",
          "Would you like — предложение; could I и may I — просьба и разрешение; can I get — предложение помощи."
        ]
      ]
    },
    "38": {
      "g": [
        [
          "If I find your keys, I'll call you.",
          "Если найду твои ключи, позвоню.",
          "Реальная возможность: if + find, затем will. В обычном условии после if не ставим will."
        ],
        [
          "If I won the lottery, I would buy a house by the sea.",
          "Если бы я выиграл в лотерею, купил бы дом у моря.",
          "Воображаемое условие: if + won, результат would buy. Won здесь не обозначает состоявшийся выигрыш."
        ],
        [
          "What would you do if you lost your job?",
          "Что бы ты сделал, если бы потерял работу?",
          "If you lost задаёт воображаемую ситуацию; вопрос результата — would you do."
        ],
        [
          "If it rains tomorrow, we'll stay at home.",
          "Если завтра пойдёт дождь, останемся дома.",
          "Реальное будущее условие: if + rains, затем will stay."
        ],
        [
          "I'd be very surprised if he came. He never comes.",
          "Я бы очень удивился, если бы он пришёл. Он никогда не приходит.",
          "Маловероятная воображаемая ситуация: came сочетается с would be."
        ],
        [
          "If you press this button, the machine starts.",
          "Если нажать эту кнопку, машина запускается.",
          "Общая закономерность: Present simple в обеих частях, press и starts."
        ],
        [
          "If I had more time, I would learn to play the guitar.",
          "Если бы у меня было больше времени, я бы научился играть на гитаре.",
          "Had more time — нереальное условие сейчас; его результат — would learn."
        ],
        [
          "If we took a taxi, it would be faster — but it's too expensive.",
          "Если бы мы взяли такси, было бы быстрее, но это слишком дорого.",
          "Took — воображаемый вариант; would be — его результат. Would не ставим в обычной if-части."
        ]
      ],
      "e": [
        [
          "If I had money, I would buy it.",
          "Если бы у меня были деньги, я бы это купил.",
          "If + had задаёт нереальное условие; would используется в результате, не перед have в if-части."
        ],
        [
          "If you see Tom, say hello.",
          "Если увидишь Тома, передай привет.",
          "Обычное будущее условие: if you see, без will."
        ],
        [
          "What would you do if you won a million dollars?",
          "Что бы ты сделал, если бы выиграл миллион долларов?",
          "Won задаёт нереальную ситуацию; ей соответствует would you do, а не обычное будущее will."
        ]
      ],
      "t": [
        [
          "If I had a car, I would drive to work.",
          "Если бы у меня была машина, я бы ездил на работу на ней.",
          "If I had + would drive описывает воображаемое наличие машины и его результат."
        ],
        [
          "If you miss the bus, you'll be late.",
          "Если пропустишь автобус, опоздаешь.",
          "Реальная возможность: if + miss, then will be. Present simple после if относится к будущему."
        ]
      ],
      "w": [
        [
          "If I won a million, I would buy a house in the mountains and I would travel for a year. If the weather is good tomorrow, I'll go for a long walk.",
          "Если бы я выиграл миллион, купил бы дом в горах и год путешествовал. Если завтра будет хорошая погода, пойду на долгую прогулку.",
          "Won + would — воображаемое; is good + will go — реальное будущее условие."
        ]
      ]
    },
    "39": {
      "g": [
        [
          "If I knew her address, I would write to her.",
          "Если бы я знал её адрес, написал бы ей.",
          "Knew показывает нереальное знание сейчас; would write — результат. Would know в обычной if-части не нужно."
        ],
        [
          "I wish I had more free time.",
          "Хотелось бы иметь больше свободного времени.",
          "Wish + had выражает сожаление о настоящем: сейчас времени мало, это не рассказ о прошлом."
        ],
        [
          "If I were you, I'd take the job.",
          "На твоём месте я бы согласился на работу.",
          "If I were you — устойчивый совет через воображаемую ситуацию; were допустимо со всеми лицами."
        ],
        [
          "I wish I could speak Chinese.",
          "Хотелось бы уметь говорить по-китайски.",
          "Wish + could выражает отсутствующее сейчас умение; can не передаёт нереальное желание."
        ],
        [
          "If he didn't work so hard, he wouldn't be so tired.",
          "Если бы он работал меньше, не был бы так утомлён.",
          "Didn't work — нереальное условие сейчас; wouldn't be — предполагаемый результат."
        ],
        [
          "I wish it wasn't so cold today.",
          "Жаль, что сегодня так холодно.",
          "Wish + wasn't/weren't выражает желательное отличие от настоящего; оба варианта здесь допустимы."
        ],
        [
          "If I lived near the sea, I would go swimming every day.",
          "Если бы я жил у моря, каждый день плавал бы.",
          "Lived — воображаемое нынешнее условие; would go — его результат."
        ],
        [
          "What would you do if you were in my position?",
          "Что бы ты сделал на моём месте?",
          "После if используется were для нереальной позиции; would ставится в вопросе результата."
        ]
      ],
      "e": [
        [
          "I wish I had a bigger flat.",
          "Хотелось бы иметь квартиру побольше.",
          "Wish + had выражает сожаление о нынешнем положении; have не передаёт нереальность."
        ],
        [
          "If I knew the answer, I would tell you.",
          "Если бы я знал ответ, я бы сказал тебе.",
          "If I knew + would tell — воображаемое настоящее; would know в if-части здесь не нужно."
        ],
        [
          "If I were you, I wouldn't do that.",
          "На твоём месте я бы этого не делал.",
          "If I were you — стандартная форма нереального совета; was встречается в разговорной речи."
        ]
      ],
      "t": [
        [
          "I wish I had a car.",
          "Хотелось бы иметь машину.",
          "Wish + had обозначает сожаление о том, чего сейчас нет."
        ],
        [
          "If I knew the answer, I could help you.",
          "Если бы я знал ответ, смог бы помочь тебе.",
          "Knew — нереальное условие; could help подчёркивает возможность, would help — предполагаемое действие."
        ]
      ],
      "w": [
        [
          "I wish I lived closer to work. If I lived closer, I wouldn't spend two hours on the bus. I wish I could cook well — I would invite friends more often.",
          "Хотелось бы жить ближе к работе. Тогда я не тратил бы два часа на автобус. Хотелось бы хорошо готовить: чаще приглашал бы друзей.",
          "Wish + lived/could — отсутствующее сейчас; if + lived и would — воображаемые последствия."
        ]
      ]
    },
    "40": {
      "g": [
        [
          "If I had known you were ill, I would have visited you.",
          "Если бы я знал, что ты болен, навестил бы тебя.",
          "Had known — нереальное прошлое условие; would have visited — неосуществившийся прошлый результат."
        ],
        [
          "If you had told me, I would have helped you.",
          "Если бы ты рассказал мне, я бы помог.",
          "Had told — прошлое условие; would have helped — результат в том же нереальном прошлом."
        ],
        [
          "I wish I had gone to the party last night.",
          "Жаль, что я вчера не пошёл на вечеринку.",
          "Wish + had gone выражает сожаление о прошлом; went обычно использовалось бы для нереального настоящего."
        ],
        [
          "If he hadn't been so tired, he wouldn't have had the accident.",
          "Если бы он не был так утомлён, не попал бы в аварию.",
          "Hadn't been — отрицательное прошлое условие; wouldn't have had — неслучившийся результат."
        ],
        [
          "We would have won if we had played better.",
          "Мы бы выиграли, если бы играли лучше.",
          "Had played и would have won относятся к прошлому, которое уже нельзя изменить."
        ],
        [
          "I wish I hadn't said that. It was stupid.",
          "Жаль, что я это сказал. Это было глупо.",
          "Wish + hadn't said выражает сожаление о сделанном; didn't say означало бы другой временной смысл."
        ],
        [
          "If the weather had been better, we would have gone to the beach.",
          "Если бы погода была лучше, мы бы поехали на пляж.",
          "Had been — нереальное прошлое условие; would have gone — возможный прошлый результат."
        ],
        [
          "If I had taken a taxi, I wouldn't have been late.",
          "Если бы я взял такси, не опоздал бы.",
          "Had taken задаёт альтернативное прошлое; wouldn't have been относится к результату в прошлом."
        ]
      ],
      "e": [
        [
          "If I had known, I would have come.",
          "Если бы я знал, я бы пришёл.",
          "В if-части нереального прошлого — had known; would have ставится в части результата."
        ],
        [
          "I wish I had studied more last year.",
          "Жаль, что в прошлом году я мало занимался.",
          "Last year — прошлое сожаление: wish + had studied, не просто studied."
        ],
        [
          "If she had asked me, I would have helped her.",
          "Если бы она попросила меня, я бы помог ей.",
          "Had asked задаёт прошлое условие; для прошлого результата нужен would have helped."
        ]
      ],
      "t": [
        [
          "If I had known about the meeting, I would have gone.",
          "Если бы я знал о встрече, пошёл бы.",
          "Had known и would have gone описывают неслучившуюся альтернативу уже завершённому прошлому."
        ],
        [
          "I wish I had taken some photos.",
          "Жаль, что я не сделал фотографии.",
          "Wish + had taken выражает сожаление о прошлом упущении; I'd здесь сокращает I had."
        ]
      ],
      "w": [
        [
          "I wish I had learned English at school. If I had worked harder, I would have passed the exam. If I had passed, I would have studied abroad.",
          "Жаль, что я не выучил английский в школе. Если бы занимался усерднее, сдал бы экзамен. Тогда учился бы за границей.",
          "Had learned/worked/passed — нереальные прошлые условия; would have passed/studied — их прошлые результаты."
        ]
      ]
    },
    "41": {
      "g": [
        [
          "I wish you would stop making that noise!",
          "Хотелось бы, чтобы ты перестал так шуметь!",
          "Wish + would stop выражает раздражение и желание изменить чужое поведение; не обычный будущий прогноз."
        ],
        [
          "I hope you have a nice weekend.",
          "Надеюсь, выходные пройдут хорошо.",
          "Hope выражает реальное пожелание о будущем; после него допустим Present simple have."
        ],
        [
          "I wish I hadn't eaten so much. I feel sick.",
          "Зря я столько съел. Меня тошнит.",
          "Wish + hadn't eaten выражает сожаление о прошлом действии, результат которого ощущается сейчас."
        ],
        [
          "I wish it would stop raining. I want to go out.",
          "Хотелось бы, чтобы дождь прекратился. Я хочу выйти.",
          "Wish + would stop — желание изменить продолжающуюся ситуацию."
        ],
        [
          "I wish I was taller.",
          "Хотелось бы быть выше ростом.",
          "Wish + was/were описывает нереальное желательное состояние сейчас; оба варианта здесь допустимы."
        ],
        [
          "I wish I could come with you, but I have to work.",
          "Жаль, что не могу пойти с тобой: нужно работать.",
          "Wish + could выражает отсутствующую возможность сейчас; can не передаёт этот смысл."
        ],
        [
          "I wish you had told me about this yesterday.",
          "Жаль, что ты вчера мне об этом не сказал.",
          "Wish + had told выражает сожаление о прошлом; yesterday подтверждает временную точку."
        ],
        [
          "I hope it doesn't rain tomorrow.",
          "Надеюсь, завтра не будет дождя.",
          "Hope выражает надежду на реальное будущее; doesn't rain допустимо после hope."
        ]
      ],
      "e": [
        [
          "I hope you'll come to my party.",
          "Надеюсь, ты придёшь на мою вечеринку.",
          "Для возможного будущего события используем hope; wish обычно описывает отличие от реальности."
        ],
        [
          "I wish I were rich.",
          "Хотелось бы быть богатым.",
          "Нереальное нынешнее состояние: wish + were/was. Would обычно связано с желаемым изменением поведения."
        ],
        [
          "I wish I hadn't gone to bed so late last night.",
          "Зря я так поздно лёг вчера.",
          "Прошлое сожаление: wish + hadn't gone, а не didn't go."
        ]
      ],
      "t": [
        [
          "I wish he would stop playing loud music.",
          "Хотелось бы, чтобы он перестал включать громкую музыку.",
          "Wish + would stop выражает недовольство повторяющимся поведением и просьбу его изменить."
        ],
        [
          "I wish I had learned to swim.",
          "Жаль, что в детстве я не научился плавать.",
          "Wish + had learned/learnt — сожаление о прошлом; обе третьи формы learn допустимы."
        ]
      ],
      "w": [
        [
          "I wish people wouldn't talk so loudly on the phone in the bus. I wish I had a bigger kitchen. I wish I hadn't sold my old guitar.",
          "Хотелось бы, чтобы люди не разговаривали так громко по телефону в автобусе. Хотелось бы кухню побольше. Жаль, что я продал старую гитару.",
          "Wish + would — поведение; had a bigger kitchen — настоящее; hadn't sold — сожаление о прошлом."
        ]
      ]
    },
    "42": {
      "g": [
        [
          "This house was built in 1890.",
          "Этот дом построили в 1890 году.",
          "Дом получает действие: was + built, третья форма. Built без was не образует пассив."
        ],
        [
          "English is spoken all over the world.",
          "На английском говорят во всём мире.",
          "English — объект речи; пассив is spoken. Speaks делало бы язык исполнителем действия."
        ],
        [
          "The windows are cleaned every week.",
          "Окна моют каждую неделю.",
          "Регулярный пассив: are + cleaned; windows — множественное число."
        ],
        [
          "My bike was stolen last night.",
          "Вчера ночью мой велосипед украли.",
          "Прошлый пассив: was stolen. Stole — вторая форма, а после be нужна третья."
        ],
        [
          "Many accidents are caused by bad driving.",
          "Многие аварии вызваны плохим вождением.",
          "Аварии — результат действия: are caused; by указывает причину или источник действия."
        ],
        [
          "When was the telephone invented?",
          "Когда изобрели телефон?",
          "Вопрос пассива: was + the telephone + invented; телефон не изобретает сам."
        ],
        [
          "Cheese is made from milk.",
          "Сыр делают из молока.",
          "Регулярный пассив: is made. Makes означало бы, что сыр сам что-то делает."
        ],
        [
          "We weren't invited to the wedding.",
          "Нас не пригласили на свадьбу.",
          "We получает действие: weren't invited; didn't invite означало бы «мы не пригласили»."
        ]
      ],
      "e": [
        [
          "The letter was written yesterday.",
          "Письмо написали вчера.",
          "После was нужна третья форма written; wrote — форма активного Past simple."
        ],
        [
          "This song is sung by everybody.",
          "Эту песню поют все.",
          "Пассив is + sung; sing — инфинитив, не третья форма."
        ],
        [
          "The museum was built in 1900.",
          "Музей построили в 1900 году.",
          "Для прошлого пассива нужен was built; без was предложение не имеет правильного сказуемого."
        ]
      ],
      "t": [
        [
          "The office is cleaned every day.",
          "Офис убирают каждый день.",
          "Объект the office становится подлежащим пассива: is cleaned every day."
        ],
        [
          "The Mona Lisa was painted by Leonardo da Vinci.",
          "«Мону Лизу» написал Леонардо да Винчи.",
          "Was painted — прошлый пассив; by вводит исполнителя действия."
        ]
      ],
      "w": [
        [
          "Bread is made from flour, water and yeast. The ingredients are mixed and the dough is left for an hour. Then it is baked in a hot oven.",
          "Хлеб делают из муки, воды и дрожжей. Ингредиенты смешивают, а тесто оставляют на час. Затем выпекают в горячей печи.",
          "Is made, are mixed, is left и is baked описывают процесс без указания конкретного исполнителя."
        ]
      ]
    },
    "43": {
      "g": [
        [
          "The work will be finished tomorrow.",
          "Работу закончат завтра.",
          "Будущий пассив: will + be + finished. Will finish означало бы, что работа сама что-то заканчивает."
        ],
        [
          "This problem can be solved easily.",
          "Эту проблему легко решить.",
          "Пассив после can: can be solved. После be нужна третья форма, не solve."
        ],
        [
          "My car has been repaired. It's working again.",
          "Мою машину починили. Она снова работает.",
          "Has been repaired — завершённый пассив с результатом сейчас; машина не ремонтирует сама."
        ],
        [
          "The road is closed. It is being repaired.",
          "Дорога закрыта. Её ремонтируют.",
          "Пассивный процесс сейчас: is being repaired; is repairing делало бы дорогу исполнителем."
        ],
        [
          "I don't like being told what to do.",
          "Мне не нравится, когда мне указывают, что делать.",
          "После like допустима форма -ing; пассив этой формы — being told."
        ],
        [
          "The room looks nice. It has been painted.",
          "Комната выглядит красиво. Её покрасили.",
          "Has been painted сообщает завершённый результат; has painted означало бы действие самой комнаты."
        ],
        [
          "The bridge was being built when I was there.",
          "Когда я был там, мост строили.",
          "Was being built — пассивный процесс в прошлый момент; was building было бы активным действием."
        ],
        [
          "This letter must be sent today.",
          "Это письмо нужно отправить сегодня.",
          "Пассив после must: must be sent; sent — третья форма send."
        ]
      ],
      "e": [
        [
          "The new hospital will be built next year.",
          "Новую больницу построят в следующем году.",
          "После will пассив требует be + built; will built пропускает be."
        ],
        [
          "The house is being painted at the moment.",
          "Дом сейчас красят.",
          "Is being painted — пассивный процесс; is painting означало бы, что дом красит что-то сам."
        ],
        [
          "Has the email been sent?",
          "Письмо уже отправили?",
          "Пассив Present perfect: has + been + sent; send не является третьей формой."
        ]
      ],
      "t": [
        [
          "My wallet has been stolen.",
          "Мой кошелёк украли.",
          "Has been stolen сохраняет связь с настоящим, переводя активное somebody has stolen в пассив."
        ],
        [
          "A new school is being built.",
          "Строится новая школа.",
          "Are building в активе превращается в is being built; новая школа — объект действия."
        ]
      ],
      "w": [
        [
          "A new park has been opened near my house. The old cinema is being turned into a library, and a new metro station will be built next year.",
          "Рядом с домом открыли новый парк. Старый кинотеатр сейчас превращают в библиотеку, а новую станцию метро построят в следующем году.",
          "Has been opened — результат; is being turned — текущий процесс; will be built — будущий пассив."
        ]
      ]
    },
    "44": {
      "g": [
        [
          "I was born in 2001.",
          "Я родился в 2001 году.",
          "Рождение как событие в прошлом: was born. Am born не передаёт дату рождения."
        ],
        [
          "She was offered a new job last week.",
          "На прошлой неделе ей предложили новую работу.",
          "Получатель she становится подлежащим: was offered, прошлый пассив."
        ],
        [
          "We were given a map at the entrance.",
          "У входа нам дали карту.",
          "Were given — пассив с получателем we; gave означало бы, что мы сами дали карту."
        ],
        [
          "Where were you born?",
          "Где ты родился?",
          "Вопрос о рождении в прошлом: were you born. Born не используется здесь с did."
        ],
        [
          "Tom got injured in a football match.",
          "Том получил травму на футбольном матче.",
          "Get + injured — разговорный пассив или изменение состояния; injure после got не подходит."
        ],
        [
          "I wasn't told about the change of plan.",
          "Мне не сообщили об изменении плана.",
          "Wasn't told — пассив для получателя I; didn't tell означало бы «я не сообщил»."
        ],
        [
          "He was asked a lot of difficult questions at the interview.",
          "На собеседовании ему задали много трудных вопросов.",
          "Was asked делает получателя вопросов подлежащим пассива; asked без was меняло бы роль."
        ],
        [
          "Be careful or you'll get hurt.",
          "Осторожнее, иначе поранишься.",
          "Get hurt — стать пострадавшим; hurt здесь третья форма, а не hurting."
        ]
      ],
      "e": [
        [
          "I was born in Moscow.",
          "Я родился в Москве.",
          "Для рождения используем was born, поскольку это прошлое событие."
        ],
        [
          "She was given some flowers.",
          "Ей подарили цветы.",
          "После was нужна третья форма given, не инфинитив give."
        ],
        [
          "They got married last year.",
          "Они поженились в прошлом году.",
          "Устойчивое выражение get married; после got нужна форма married."
        ]
      ],
      "t": [
        [
          "I was given a prize.",
          "Мне вручили приз.",
          "Получатель I становится подлежащим: was given. Предмет a prize остаётся дополнением."
        ],
        [
          "We weren't told the truth.",
          "Нам не сказали правду.",
          "Отрицательный пассив: we weren't told; weren't сокращает were not."
        ]
      ],
      "w": [
        [
          "I was born in Samara in 1999. For my eighteenth birthday I was given a guitar. Last year I was offered a job in Moscow, but I didn't take it.",
          "Я родился в Самаре в 1999 году. На восемнадцатилетие мне подарили гитару. В прошлом году предложили работу в Москве, но я отказался.",
          "Was born — рождение; was given и offered — полученные действия; didn't take — собственное решение."
        ]
      ]
    },
    "45": {
      "g": [
        [
          "It is said that he is very rich.",
          "Говорят, что он очень богат.",
          "Безличная пассивная конструкция: it is said that. It не обозначает человека, который говорит."
        ],
        [
          "He is said to be very rich.",
          "Говорят, что он очень богат.",
          "После he is said используется to be; вариант с that потребовал бы начало it is said."
        ],
        [
          "The prisoner is believed to have escaped last night.",
          "Считается, что заключённый сбежал вчера ночью.",
          "To have escaped обозначает событие раньше нынешнего мнения is believed."
        ],
        [
          "You are supposed to wear a seat belt.",
          "Ты должен пристегнуться.",
          "Be supposed to выражает ожидаемое требование; после are нужна форма supposed."
        ],
        [
          "The film is supposed to be very good. Let's see it.",
          "Говорят, фильм очень хороший. Давай посмотрим.",
          "Is supposed to be — предполагаемая оценка; после supposed нужен to + инфинитив."
        ],
        [
          "It is reported that two people were injured.",
          "Сообщается, что двое пострадали.",
          "It is reported that — безличный пассив; reports делало бы it конкретным сообщающим субъектом."
        ],
        [
          "She is thought to be the best player in the team.",
          "Её считают лучшим игроком команды.",
          "После she is thought используется to be; being не образует эту конструкцию."
        ],
        [
          "You weren't supposed to tell anyone! It was a secret.",
          "Ты не должен был никому рассказывать! Это был секрет.",
          "Weren't supposed to — нарушение ожидаемого правила; supposed сохраняет окончание -ed."
        ]
      ],
      "e": [
        [
          "He is said to be a genius.",
          "Его считают гением.",
          "Либо he is said to be, либо it is said that he is; нельзя смешать начала двух конструкций."
        ],
        [
          "We are supposed to be at work by nine.",
          "Мы должны быть на работе к девяти.",
          "Устойчивая форма be supposed to; после are нужно supposed, не suppose."
        ],
        [
          "The thieves are believed to have escaped yesterday.",
          "Считается, что воры сбежали вчера.",
          "Прошлое событие после are believed: to have escaped, а не to escape."
        ]
      ],
      "t": [
        [
          "The castle is said to be haunted.",
          "Говорят, в замке есть привидения.",
          "После the castle is said нужен инфинитивный пассив to be haunted."
        ],
        [
          "The fire is believed to have started in the kitchen.",
          "Считается, что пожар начался на кухне.",
          "To have started передаёт событие раньше текущего убеждения is believed."
        ]
      ],
      "w": [
        [
          "A famous painting has disappeared from the city museum. It is believed that the thieves entered through the roof. They are thought to have left the country.",
          "Из городского музея исчезла известная картина. Считается, что воры проникли через крышу. Предполагают, что они покинули страну.",
          "It is believed that вводит сообщение; are thought to have left показывает предполагаемое предшествующее событие."
        ]
      ]
    },
    "46": {
      "g": [
        [
          "I had my hair cut at the hairdresser's yesterday.",
          "Вчера мне подстригли волосы в парикмахерской.",
          "Had + my hair + cut: услугу выполнил другой человек. Cut my hair означало бы, что я подстриг себя."
        ],
        [
          "We're having our house painted next week.",
          "На следующей неделе нам будут красить дом.",
          "Have + объект + painted выражает заказанную услугу; are having — устроенный будущий план."
        ],
        [
          "Where do you have your car serviced?",
          "Где ты обслуживаешь машину?",
          "Have + your car + serviced означает обслуживание другими; объект ставится перед третьей формой."
        ],
        [
          "She had her bag stolen on the train.",
          "У неё украли сумку в поезде.",
          "Had her bag stolen описывает неприятное событие с её вещью, а не её собственное воровство."
        ],
        [
          "You should get your eyes tested.",
          "Тебе стоит проверить зрение.",
          "Get + your eyes + tested — обследование у другого человека; объект стоит перед tested."
        ],
        [
          "I need to get my phone repaired.",
          "Мне нужно отдать телефон в ремонт.",
          "Get + my phone + repaired означает, что ремонт выполняет кто-то другой."
        ],
        [
          "Have you had your hair cut? It looks shorter.",
          "Тебя подстригли? Волосы стали короче.",
          "Have you had + объект + cut — вопрос о полученной услуге с результатом сейчас."
        ],
        [
          "We had a new kitchen fitted last year.",
          "В прошлом году нам установили новую кухню.",
          "Had + a new kitchen + fitted означает установку другими, а не самостоятельную работу."
        ]
      ],
      "e": [
        [
          "I have my hair cut at the hairdresser's every month.",
          "Каждый месяц мне стригут волосы в парикмахерской.",
          "Have/get my hair cut выражает услугу; I cut my hair означало бы, что стригу самостоятельно."
        ],
        [
          "We had our flat painted by a professional.",
          "Профессионал покрасил нам квартиру.",
          "Порядок услуги: had + our flat + painted; had painted our flat означало бы наше прошлое действие."
        ],
        [
          "He had his car stolen last night.",
          "Вчера ночью у него украли машину.",
          "Had his car stolen — неприятность с его машиной; had stolen his car делало бы его вором."
        ]
      ],
      "t": [
        [
          "Tom had his car repaired.",
          "Том отдал машину в ремонт.",
          "Tom had + his car + repaired показывает ремонт, выполненный механиком для Тома."
        ],
        [
          "Anna had her TV stolen.",
          "У Анны украли телевизор.",
          "Had her TV stolen сообщает о событии, от которого она пострадала; это не заказанная услуга."
        ]
      ],
      "w": [
        [
          "I have my hair cut every six weeks. I never wash my car myself — I get it washed at the garage. Last month I had my laptop repaired.",
          "Мне стригут волосы раз в шесть недель. Сам машину не мою: её моют в сервисе. В прошлом месяце мне починили ноутбук.",
          "Have/get + объект + третья форма обозначает услуги, которые выполняют другие люди."
        ]
      ]
    },
    "47": {
      "g": [
        [
          "Tom said that he was tired.",
          "Том сказал, что устал.",
          "При пересказе после said форма am обычно сдвигается в was; описываем его состояние в момент слов."
        ],
        [
          "She told me she would call later.",
          "Она сказала мне, что позвонит позже.",
          "Will при обычном пересказе после told меняется на would — будущее из прошлого."
        ],
        [
          "He said he couldn't swim.",
          "Он сказал, что не умеет плавать.",
          "Can't при обычном пересказе после said становится couldn't."
        ],
        [
          "Anna said she had lost her keys.",
          "Анна сказала, что потеряла ключи.",
          "Have lost сдвигается в had lost: потеря предшествует прошлому сообщению."
        ],
        [
          "They said they were going to buy a new car.",
          "Они сказали, что собираются купить новую машину.",
          "Are going to при пересказе обычно меняется на were going to."
        ],
        [
          "Kate told me that she was leaving.",
          "Кейт сказала мне, что уходит.",
          "Перед me нужен told; say требует to me. Told to me здесь не используется."
        ],
        [
          "Paul said that he didn't like coffee.",
          "Пол сказал, что не любит кофе.",
          "Said может сразу вводить that-часть; told обычно требует получателя, например told me."
        ],
        [
          "He said he had seen the film before.",
          "Он сказал, что уже видел фильм.",
          "Have seen при обычном сдвиге времени становится had seen — опыт до прошлого сообщения."
        ]
      ],
      "e": [
        [
          "She told me that she was busy.",
          "Она сказала мне, что занята.",
          "Tell + me или say + to me; said me без to не подходит."
        ],
        [
          "He said that he would come.",
          "Он сказал, что придёт.",
          "Say может вводить that без получателя; tell требует дополнение, например told me."
        ],
        [
          "Tom said he would help us.",
          "Том сказал, что поможет нам.",
          "Для обычного сдвига после said используем would help. Will возможно, если намеренно сохраняем актуальное будущее."
        ]
      ],
      "t": [
        [
          "Anna said she was hungry.",
          "Анна сказала, что голодна.",
          "I'm hungry при пересказе становится she was hungry; меняются местоимение и время."
        ],
        [
          "Tom said he couldn't come to the party.",
          "Том сказал, что не может прийти на вечеринку.",
          "I can't come превращается в he couldn't come при обычном сдвиге времени после said."
        ]
      ],
      "w": [
        [
          "Yesterday I met Katya. She said she was moving to St Petersburg. She told me she had found a great job there and that she would visit us in summer.",
          "Вчера я встретил Катю. Она сказала, что переезжает в Петербург, нашла там отличную работу и летом навестит нас.",
          "Am moving → was moving; have found → had found; will visit → would visit при пересказе."
        ]
      ]
    },
    "48": {
      "g": [
        [
          "She asked me to help her.",
          "Она попросила меня помочь ей.",
          "Ask + получатель + to help передаёт просьбу; help без to здесь не подходит."
        ],
        [
          "The doctor told me not to eat so much sugar.",
          "Врач сказал мне не есть столько сахара.",
          "Tell + получатель + not to eat передаёт отрицательный совет; don't eat используется в прямой речи."
        ],
        [
          "He told us to wait outside.",
          "Он велел нам ждать снаружи.",
          "Tell + us + to wait передаёт распоряжение через инфинитив."
        ],
        [
          "I asked him not to tell anyone.",
          "Я попросил его никому не рассказывать.",
          "Отрицательная просьба: ask + him + not to tell. Не добавляем don't внутри инфинитивной конструкции."
        ],
        [
          "Sam said he likes jazz, and he still does.",
          "Сэм сказал, что любит джаз, и всё ещё любит.",
          "Если сказанное актуально, likes можно сохранить; liked тоже допустимо при обычном сдвиге времени."
        ],
        [
          "My mum told me to be careful.",
          "Мама сказала мне быть осторожным.",
          "Tell + me + to be. Инфинитив to be обязателен после получателя."
        ],
        [
          "They asked us to come early.",
          "Они попросили нас прийти пораньше.",
          "Ask + us + to come передаёт просьбу, не конструкцию с coming."
        ],
        [
          "The teacher told the students not to talk.",
          "Учитель велел ученикам не разговаривать.",
          "Tell + получатель + not to talk. Don't talk было бы прямой командой."
        ]
      ],
      "e": [
        [
          "She told me not to worry.",
          "Она сказала мне не волноваться.",
          "Косвенная просьба строится not to worry, а не don't worry."
        ],
        [
          "He asked me not to be late.",
          "Он попросил меня не опаздывать.",
          "Not to be — обычный нейтральный порядок отрицательного инфинитива; to not be тоже встречается."
        ],
        [
          "The police told the driver to stop.",
          "Полицейские велели водителю остановиться.",
          "Tell принимает получателя без to: told the driver, затем to stop."
        ]
      ],
      "t": [
        [
          "Tom asked me to close the door.",
          "Том попросил меня закрыть дверь.",
          "Прямая просьба please close превращается в asked me to close."
        ],
        [
          "Mum told me not to stay out late.",
          "Мама сказала мне не задерживаться допоздна.",
          "Don't stay превращается в told me not to stay."
        ]
      ],
      "w": [
        [
          "My boss asked me to finish the report by Friday. My doctor told me to sleep more and not to drink coffee in the evening. My mum asked me to call her more often.",
          "Начальник попросил закончить отчёт к пятнице. Врач посоветовал больше спать и не пить кофе вечером. Мама попросила чаще ей звонить.",
          "Asked/told + получатель + to do передаёт просьбы; not to drink — отрицательный инфинитив."
        ]
      ]
    },
    "49": {
      "g": [
        [
          "Where do you live?",
          "Где ты живёшь?",
          "Обычный вопрос в Present simple: where + do + you + live; после do нет -s."
        ],
        [
          "What time did the film start?",
          "Во сколько начался фильм?",
          "В прошлом вопрос строится did + подлежащее + start, не started после did."
        ],
        [
          "Who told you that? — Tom told me.",
          "Кто тебе это сказал? — Том.",
          "Who само является подлежащим; нейтральный вопрос строится told без did. Did tell могло бы усиливать вопрос.",
          [
            "did tell you"
          ]
        ],
        [
          "Who did you meet at the party? — I met Kate.",
          "Кого ты встретил на вечеринке? — Кейт.",
          "Who — дополнение, подлежащее you сохраняется; нужен did you meet."
        ],
        [
          "What happened last night?",
          "Что случилось вчера вечером?",
          "What — подлежащее, поэтому happened без вспомогательного did. Did happen могло бы выражать особое ударение.",
          [
            "did happen"
          ]
        ],
        [
          "How long have you been here?",
          "Как давно ты здесь?",
          "Вопрос о периоде до сейчас: have + you + been; прямой порядок you have been не подходит."
        ],
        [
          "Don't you like pizza? I thought everybody liked it.",
          "Разве тебе не нравится пицца? Я думал, она всем нравится.",
          "Отрицательный вопрос с удивлением: don't you. Полное do you not тоже возможно, но звучит формальнее.",
          [
            "Do you not"
          ]
        ],
        [
          "Why isn't Sam at work today?",
          "Почему Сэм сегодня не на работе?",
          "У be вопрос без do: isn't ставится перед Sam."
        ]
      ],
      "e": [
        [
          "Where are you going?",
          "Куда ты идёшь?",
          "В прямом вопросе are ставится перед you: where are you going."
        ],
        [
          "What happened to your car?",
          "Что случилось с твоей машиной?",
          "What — подлежащее; нейтральная форма happened без did. Did happen возможно при подчёркивании."
        ],
        [
          "How many people came to the party?",
          "Сколько человек пришло на вечеринку?",
          "How many people — подлежащее, поэтому came без did; did come возможно для особого усиления."
        ]
      ],
      "t": [
        [
          "Who broke the window?",
          "Кто разбил окно?",
          "Спрашиваем подлежащее: who + broke. Дополнительный did в нейтральном вопросе не нужен."
        ],
        [
          "What did Tom break?",
          "Что разбил Том?",
          "Спрашиваем дополнение; Tom остаётся подлежащим: what + did + Tom + break."
        ]
      ],
      "w": [
        [
          "Where did you grow up? When did you decide to become an actor? Who helped you most at the beginning? What happened on your first day on set?",
          "Где ты вырос? Когда решил стать актёром? Кто больше всего помог тебе в начале? Что случилось в первый съёмочный день?",
          "Where/when требуют did; who и what в последних вопросах — подлежащие, поэтому helped/happened без did."
        ]
      ]
    },
    "50": {
      "g": [
        [
          "Do you know where she lives?",
          "Ты знаешь, где она живёт?",
          "Внутри косвенного вопроса прямой порядок: she lives, без does she live."
        ],
        [
          "Can you tell me what time it is?",
          "Не подскажешь, который час?",
          "После what time внутри косвенного вопроса порядок it is, не is it."
        ],
        [
          "I don't know if Tom is coming.",
          "Я не знаю, придёт ли Том.",
          "If вводит косвенный вопрос без вопросительного слова и означает «ли»; that утверждало бы факт."
        ],
        [
          "He asked me where I was going.",
          "Он спросил, куда я иду.",
          "Косвенный вопрос: I was going, прямой порядок; am обычно сдвигается в was после asked."
        ],
        [
          "Do you know how much this costs?",
          "Ты знаешь, сколько это стоит?",
          "В придаточном this costs, без does; costs получает -s, потому что вспомогательный does исчез."
        ],
        [
          "I wonder why he left so early.",
          "Интересно, почему он так рано ушёл.",
          "После I wonder в косвенном вопросе he left, без вопросительного did he leave."
        ],
        [
          "She asked me whether I liked jazz.",
          "Она спросила, нравится ли мне джаз.",
          "Whether вводит вопрос «ли»; that передавало бы утверждение, а не вопрос."
        ],
        [
          "Could you tell me where the station is?",
          "Не подскажешь, где станция?",
          "Внутри косвенного вопроса the station is; инверсия is the station здесь не нужна."
        ]
      ],
      "e": [
        [
          "Do you know what time the bank opens?",
          "Ты знаешь, во сколько открывается банк?",
          "После do you know порядок the bank opens; does исчезает, к open возвращается -s."
        ],
        [
          "He asked me where I lived.",
          "Он спросил, где я живу.",
          "Косвенный вопрос имеет порядок I lived; did I live было бы прямым вопросом."
        ],
        [
          "I don't know if he is at home.",
          "Я не знаю, дома ли он.",
          "Нужен if/whether и прямой порядок he is; самостоятельное is he после I don't know не подходит."
        ]
      ],
      "t": [
        [
          "Can you tell me where the post office is?",
          "Не подскажешь, где почта?",
          "Прямой where is меняется на where the post office is внутри вопроса can you tell me."
        ],
        [
          "He asked me if I was a student.",
          "Он спросил, студент ли я.",
          "Вопрос без вопросительного слова вводится if/whether; are you меняется на I was при пересказе."
        ]
      ],
      "w": [
        [
          "Excuse me, could you tell me where the nearest metro station is? Do you know what time the museum closes? I wonder if there's a good café near here.",
          "Извините, не подскажете, где ближайшая станция метро? Вы знаете, во сколько закрывается музей? Интересно, есть ли поблизости хорошее кафе.",
          "После could you tell me и do you know — прямой порядок; if означает «ли»."
        ]
      ]
    },
    "51": {
      "g": [
        [
          "I'm tired. — So am I.",
          "Я устал. — Я тоже.",
          "После so для согласия инверсия: so am I. Am соответствует исходному I'm tired."
        ],
        [
          "I don't like horror films. — Neither do I.",
          "Мне не нравятся ужастики. — Мне тоже.",
          "После neither используем положительный вспомогательный do и инверсию; дополнительное don't не нужно."
        ],
        [
          "I've never been to China. — Neither have I.",
          "Я никогда не был в Китае. — Я тоже.",
          "Исходное время Present perfect, поэтому neither have I. Never делает исходный смысл отрицательным."
        ],
        [
          "Is it going to rain? — I hope not.",
          "Будет дождь? — Надеюсь, нет.",
          "Отрицательная короткая реакция — I hope not; no и don't здесь не заменяют целое придаточное."
        ],
        [
          "She can speak French. — Can she? I can't. (I can't speak it)",
          "Она говорит по-французски. — Правда? А я нет.",
          "Повторяем модальный can в реакции; I can't заменяет I can't speak French."
        ],
        [
          "Tom went to the party. — So did I.",
          "Том пошёл на вечеринку. — Я тоже.",
          "Исходное went — Past simple; короткое согласие строится so did I."
        ],
        [
          "Is the shop open today? — I think so.",
          "Магазин сегодня открыт? — Думаю, да.",
          "So заменяет положительное утверждение «он открыт»: I think so."
        ],
        [
          "You didn't lock the door. — Yes, I did! I'm sure.",
          "Ты не запер дверь. — Нет, запер! Я уверен.",
          "Yes, I did возражает отрицательному утверждению и подтверждает действие в прошлом."
        ]
      ],
      "e": [
        [
          "I love chocolate. — So do I.",
          "Я люблю шоколад. — Я тоже.",
          "Для согласия с другим человеком so do I. So I do обычно подтверждает утверждение о самом себе."
        ],
        [
          "I can't swim. — Neither can I.",
          "Я не умею плавать. — Я тоже.",
          "После neither/nor инверсия: can I, без дополнительного not."
        ],
        [
          "Will it rain? — I hope not.",
          "Будет дождь? — Надеюсь, нет.",
          "Отрицательный вариант I hope so — I hope not, не I hope no."
        ]
      ],
      "t": [
        [
          "So am I.",
          "Я тоже голоден.",
          "К исходному I'm hungry подходит вспомогательный am: so am I."
        ],
        [
          "Neither did I.",
          "Я тоже плохо спал.",
          "Отрицательное согласие с didn't sleep: neither did I, без повторного not."
        ]
      ],
      "w": [
        [
          "A: I love winter. B: Do you? I don't. A: I can't stand hot weather. B: Neither can I, actually. A: I've never been skiing. B: Neither have I!",
          "А: Люблю зиму. Б: Правда? А я нет. А: Не выношу жару. Б: Я тоже. А: Никогда не катался на лыжах. Б: Я тоже!",
          "Do, can и have повторяют вспомогательную форму исходной реплики; neither выражает отрицательное согласие."
        ]
      ]
    },
    "52": {
      "g": [
        [
          "It's a beautiful day, isn't it?",
          "День прекрасный, правда?",
          "Положительное it's требует отрицательный хвостик isn't it; используем тот же be и местоимение it."
        ],
        [
          "You don't eat meat, do you?",
          "Ты не ешь мясо, да?",
          "После отрицательного don't eat хвостик положительный: do you."
        ],
        [
          "Tom has been to Paris, hasn't he?",
          "Том был в Париже, правда?",
          "Has been — Present perfect; хвостик использует has, а Tom заменяется he."
        ],
        [
          "You won't tell anyone, will you?",
          "Ты никому не расскажешь, да?",
          "После won't tell положительный хвостик will you."
        ],
        [
          "I'm late, aren't I?",
          "Я опаздываю, да?",
          "Для I'm стандартный отрицательный хвостик — aren't I."
        ],
        [
          "Let's go for a walk, shall we?",
          "Давай прогуляемся, хорошо?",
          "После предложения let's обычно используется хвостик shall we."
        ],
        [
          "She can't drive, can she?",
          "Она не умеет водить, да?",
          "После can't drive хвостик положительный can she; do здесь не подходит."
        ],
        [
          "They went to the beach, didn't they?",
          "Они ездили на пляж, правда?",
          "Went — Past simple; хвостик didn't they, не were."
        ]
      ],
      "e": [
        [
          "You live here, don't you?",
          "Ты живёшь здесь, да?",
          "Хвостик должен соответствовать подлежащему you: don't you, не don't they."
        ],
        [
          "She isn't coming, is she?",
          "Она не придёт, да?",
          "Отрицательное isn't coming требует положительный хвостик is she."
        ],
        [
          "Open the door, will you?",
          "Открой дверь, пожалуйста, хорошо?",
          "После просьбы-императива возможны will/would/could/can you; do you не подходит как обычный хвостик."
        ]
      ],
      "t": [
        [
          "You've finished your work, haven't you?",
          "Ты закончил работу, правда?",
          "You've finished — Present perfect; положительная часть требует haven't you."
        ],
        [
          "Kate doesn't like football, does she?",
          "Кейт не любит футбол, да?",
          "После doesn't like положительный хвостик does she; Kate заменяется she."
        ]
      ],
      "w": [
        [
          "The meeting starts at ten, doesn't it? You've sent the report, haven't you? Mark isn't coming today, is he? We don't need the projector, do we?",
          "Совещание начинается в десять, да? Ты отправил отчёт, правда? Марк сегодня не придёт, да? Проектор нам не нужен, да?",
          "Хвостик повторяет вспомогательный глагол и меняет знак: doesn't, haven't, is, do."
        ]
      ]
    },
    "53": {
      "g": [
        [
          "I enjoy reading in bed.",
          "Мне нравится читать в постели.",
          "После enjoy используется форма -ing: reading, не to read."
        ],
        [
          "Would you mind opening the window?",
          "Не мог бы ты открыть окно?",
          "После mind требуется opening с -ing; to open в этой конструкции не используется."
        ],
        [
          "Have you finished cleaning the kitchen?",
          "Ты закончил уборку кухни?",
          "После finish используется cleaning с -ing; to clean обозначало бы иной способ связи."
        ],
        [
          "She suggested going to the cinema.",
          "Она предложила пойти в кино.",
          "После suggest без that-придаточного используется going, не to go."
        ],
        [
          "He keeps making the same mistakes.",
          "Он снова и снова делает одни и те же ошибки.",
          "Keep + making означает продолжать действие; после keep нужна форма -ing."
        ],
        [
          "I'm trying to avoid eating sugar.",
          "Я стараюсь избегать сахара.",
          "После avoid используется eating; trying to относится к avoid, но не меняет форму после него."
        ],
        [
          "Imagine living on a desert island!",
          "Представь жизнь на необитаемом острове!",
          "После imagine действие выражается living с -ing."
        ],
        [
          "When did you give up smoking?",
          "Когда ты бросил курить?",
          "После give up используется smoking; это прекращение привычки."
        ]
      ],
      "e": [
        [
          "I don't mind waiting.",
          "Я не против подождать.",
          "Mind требует waiting с -ing; don't mind to wait — неверное сочетание."
        ],
        [
          "Have you considered changing your job?",
          "Ты думал о смене работы?",
          "После consider используется changing, не to change."
        ],
        [
          "He denied stealing the money.",
          "Он отрицал, что украл деньги.",
          "Deny требует stealing или having stolen; последний вариант явно подчёркивает предшествование."
        ]
      ],
      "t": [
        [
          "Do you mind waiting a few minutes?",
          "Ты не против подождать несколько минут?",
          "После do you mind используется waiting, сохраняя смысл просьбы."
        ],
        [
          "She suggested taking a taxi.",
          "Она предложила взять такси.",
          "Suggested + taking выражает предложенное действие без отдельного получателя."
        ]
      ],
      "w": [
        [
          "I enjoy cooking and I don't mind washing up. I try to avoid watching TV late at night. I gave up eating fast food last year, but I keep thinking about burgers!",
          "Мне нравится готовить, и я не против мыть посуду. Стараюсь не смотреть телевизор поздно. В прошлом году перестал есть фастфуд, но всё думаю о бургерах!",
          "Enjoy, mind, avoid, gave up и keep требуют последующий глагол в форме -ing."
        ]
      ]
    },
    "54": {
      "g": [
        [
          "We decided to stay at home.",
          "Мы решили остаться дома.",
          "После decide используется to + инфинитив: to stay."
        ],
        [
          "He promised to call me.",
          "Он обещал мне позвонить.",
          "Promise соединяется с инфинитивом to call."
        ],
        [
          "I can't afford to buy a new car.",
          "Я не могу позволить себе новую машину.",
          "Afford требует to buy, не buying; смысл — финансовая возможность покупки."
        ],
        [
          "She refused to answer my question.",
          "Она отказалась отвечать на мой вопрос.",
          "После refuse используется to answer."
        ],
        [
          "I forgot to lock the door. Can you go back?",
          "Я забыл запереть дверь. Можешь вернуться?",
          "Forgot to lock — действие не выполнено; forgot locking означало бы, что не помню уже выполненное."
        ],
        [
          "They seem to be very happy together.",
          "Кажется, они очень счастливы вместе.",
          "После seem используется to be; being не образует здесь нужное сказуемое."
        ],
        [
          "We managed to find a hotel at last.",
          "Нам наконец удалось найти гостиницу.",
          "Manage to find выражает успешное выполнение; после manage требуется to."
        ],
        [
          "He pretended to be asleep.",
          "Он притворился спящим.",
          "Pretend соединяется с to be, не being."
        ]
      ],
      "e": [
        [
          "I hope to see you soon.",
          "Надеюсь скоро тебя увидеть.",
          "После hope инфинитив to see; seeing без предлога здесь не подходит."
        ],
        [
          "She agreed to help me.",
          "Она согласилась мне помочь.",
          "После agree используется to help."
        ],
        [
          "He offered to carry my bag.",
          "Он предложил понести мою сумку.",
          "После offered to нужен инфинитив carry, не carrying."
        ]
      ],
      "t": [
        [
          "Tom offered to pay for dinner.",
          "Том предложил оплатить ужин.",
          "Offer to pay передаёт добровольное предложение действия; после offer нужен to-инфинитив."
        ],
        [
          "She refused to lend me her car.",
          "Она отказалась одолжить мне машину.",
          "Refuse to lend передаёт отказ; при пересказе your car меняется на her car."
        ]
      ],
      "w": [
        [
          "In January I decided to get fit. I promised to go to the gym three times a week. I managed to lose five kilos, but I forgot to stop eating cake.",
          "В январе я решил привести себя в форму. Обещал ходить в зал трижды в неделю. Удалось сбросить пять килограммов, но забыл перестать есть торт.",
          "Decided, promised, managed и forgot требуют to-инфинитив; внутри stop eating используется -ing."
        ]
      ]
    },
    "55": {
      "g": [
        [
          "I want you to help me.",
          "Я хочу, чтобы ты помог мне.",
          "Want + you + to help: отдельный исполнитель действия ставится перед инфинитивом."
        ],
        [
          "She told me to wait outside.",
          "Она велела мне ждать снаружи.",
          "Tell + me + to wait передаёт распоряжение; to здесь необходимо."
        ],
        [
          "My parents didn't let me go out.",
          "Родители не разрешили мне выйти.",
          "После let + me инфинитив go используется без to."
        ],
        [
          "The film made me cry.",
          "Фильм заставил меня плакать.",
          "В активе make + me + cry, без to."
        ],
        [
          "Can you remind me to buy some milk?",
          "Можешь напомнить мне купить молоко?",
          "Remind + me + to buy: получатель стоит перед инфинитивом с to."
        ],
        [
          "He advised us to book early.",
          "Он посоветовал нам забронировать заранее.",
          "Advise + us + to book; booking здесь не следует непосредственно после us."
        ],
        [
          "Would you like me to drive?",
          "Хочешь, я поведу машину?",
          "Would like + me + to drive указывает, чьё действие предлагается."
        ],
        [
          "They don't allow people to smoke here.",
          "Здесь людям не разрешают курить.",
          "Allow + people + to smoke; при указанном исполнителе нужен to-инфинитив."
        ]
      ],
      "e": [
        [
          "I want you to come with me.",
          "Я хочу, чтобы ты пошёл со мной.",
          "Обычная конструкция want + you + to come, а не want that you."
        ],
        [
          "She made me tidy my room.",
          "Она заставила меня убрать комнату.",
          "После made + me в активе используется tidy без to."
        ],
        [
          "They let us use the pool.",
          "Они разрешили нам пользоваться бассейном.",
          "После let + us инфинитив use идёт без to."
        ]
      ],
      "t": [
        [
          "I asked Tom not to be late.",
          "Я попросил Тома не опаздывать.",
          "Ask + Tom + not to be передаёт отрицательную просьбу."
        ],
        [
          "My friend advised me to see a lawyer.",
          "Друг посоветовал мне обратиться к юристу.",
          "Advise + me + to see преобразует прямой совет you should see."
        ]
      ],
      "w": [
        [
          "My parents wanted me to become a doctor. They made me practise the piano every day, but they let me stay up late on Fridays. My teachers expected me to be quiet.",
          "Родители хотели, чтобы я стал врачом. Заставляли ежедневно заниматься пианино, но разрешали поздно ложиться по пятницам. Учителя ожидали, что я буду тихим.",
          "Wanted/expected + me + to do; made/let + me + do без to."
        ]
      ]
    },
    "56": {
      "g": [
        [
          "I remember visiting this place as a child.",
          "Я помню, как приезжал сюда в детстве.",
          "Remember visiting — память об уже случившемся; remember to visit было бы напоминанием будущего действия."
        ],
        [
          "Please remember to post the letter.",
          "Пожалуйста, не забудь отправить письмо.",
          "Remember to post означает выполнить действие, не забыв; remembering posting относилось бы к прошлому воспоминанию."
        ],
        [
          "I'll never forget meeting you for the first time.",
          "Я никогда не забуду нашу первую встречу.",
          "Forget meeting — забыть уже пережитое событие; forget to meet означало бы не выполнить встречу."
        ],
        [
          "I regret saying those things. I was wrong.",
          "Жалею, что сказал это. Я был неправ.",
          "Regret saying — сожаление о сделанном; regret to say — вежливое вступление к сообщению сейчас."
        ],
        [
          "We regret to inform you that your flight has been cancelled.",
          "С сожалением сообщаем, что ваш рейс отменён.",
          "Regret to inform — формальная формула перед неприятной новостью, а не сожаление о самом факте сообщения."
        ],
        [
          "Did you remember to turn off the lights?",
          "Ты не забыл выключить свет?",
          "Remember to turn off спрашивает, было ли выполнено нужное действие."
        ],
        [
          "After the break, the speaker went on to talk about climate change. (a new topic)",
          "После перерыва докладчик перешёл к теме изменения климата.",
          "Go on to talk обозначает следующее, новое действие; go on talking — продолжение прежней темы."
        ],
        [
          "He went on working until he was 75.",
          "Он продолжал работать до семидесяти пяти лет.",
          "Go on working продолжает то же действие; to work означало бы переход к следующему действию."
        ]
      ],
      "e": [
        [
          "Don't forget to lock the door.",
          "Не забудь запереть дверь.",
          "Don't forget to lock — напоминание выполнить действие, не воспоминание о запирании."
        ],
        [
          "I remember seeing this film as a child.",
          "Я помню, как смотрел этот фильм в детстве.",
          "Remember seeing относится к уже случившемуся событию; remember to see — к необходимому будущему действию."
        ],
        [
          "I regret telling him my secret.",
          "Жалею, что рассказал ему секрет.",
          "Regret telling — сожаление о сделанном; regret to tell предваряло бы сообщение прямо сейчас."
        ]
      ],
      "t": [
        [
          "I remember posting the letter.",
          "Я помню, как отправлял письмо.",
          "Помним состоявшееся действие: remember posting, не напоминание remember to post."
        ],
        [
          "Remember to call your grandmother.",
          "Не забудь позвонить бабушке.",
          "Remember to call напоминает выполнить действие в будущем."
        ]
      ],
      "w": [
        [
          "I remember swimming in the river with my cousins. Last week I forgot to pay my phone bill. I regret not learning to play an instrument when I was young.",
          "Помню, как плавал в реке с двоюродными братьями и сёстрами. На прошлой неделе забыл оплатить телефон. Жалею, что в молодости не научился играть на инструменте.",
          "Remember swimming — воспоминание; forgot to pay — пропущенное действие; regret not learning — прошлое сожаление."
        ]
      ]
    },
    "57": {
      "g": [
        [
          "I tried to open the window, but it was stuck.",
          "Я пытался открыть окно, но оно заело.",
          "Try to open подчёркивает попытку трудного действия; try opening — испытать способ как эксперимент."
        ],
        [
          "I've got a headache. — Try taking an aspirin.",
          "У меня болит голова. — Попробуй принять аспирин.",
          "Try taking предлагает проверить способ решения проблемы; try to подчёркивало бы усилие выполнить действие."
        ],
        [
          "The grass is long. It needs cutting.",
          "Трава высокая. Её нужно подстричь.",
          "Needs cutting имеет пассивный смысл: траву должны подстричь, а не трава должна стричь."
        ],
        [
          "I need to go to the shop.",
          "Мне нужно пойти в магазин.",
          "I need to go: необходимость моего собственного действия выражается to-инфинитивом."
        ],
        [
          "She couldn't help laughing when she saw his hat.",
          "Увидев его шляпу, она не смогла удержаться от смеха.",
          "Can't/couldn't help + laughing — устойчивое «не могу не»; to laugh меняло бы конструкцию."
        ],
        [
          "Can you help me carry these boxes?",
          "Поможешь мне перенести коробки?",
          "После help me допустим инфинитив carry без to; help me to carry тоже возможно."
        ],
        [
          "This shirt needs washing.",
          "Эту рубашку нужно постирать.",
          "Needs washing — пассивный смысл, равный needs to be washed."
        ],
        [
          "I tried to stay awake, but I fell asleep.",
          "Я старался не заснуть, но уснул.",
          "Tried to stay подчёркивает усилие выполнить действие; tried staying означало бы попробовать такой способ."
        ]
      ],
      "e": [
        [
          "Your hair needs cutting.",
          "Тебе нужно подстричься.",
          "Hair needs cutting или needs to be cut: волосы получают действие, поэтому требуется пассивный смысл."
        ],
        [
          "I couldn't help smiling.",
          "Я не смог удержаться от улыбки.",
          "Couldn't help smiling — устойчивое выражение с -ing."
        ],
        [
          "I tried to open the door, but it was locked.",
          "Я пытался открыть дверь, но она была заперта.",
          "Tried to open подчёркивает попытку; tried opening тоже возможно как проверка способа. Голый open после tried не подходит."
        ]
      ],
      "t": [
        [
          "The windows need cleaning.",
          "Окна нужно вымыть.",
          "Need cleaning/washing имеет пассивный смысл; need to be cleaned — развёрнутый вариант."
        ],
        [
          "Try restarting it.",
          "Попробуй перезагрузить его.",
          "Try restarting предлагает проверить способ решения проблемы, а не только постараться выполнить действие."
        ]
      ],
      "w": [
        [
          "My laptop was very slow. I tried restarting it and I tried deleting old files. Nothing worked. Also, my kitchen needs painting and the door needs fixing.",
          "Ноутбук работал очень медленно. Пробовал перезагрузить его и удалить старые файлы. Ничего не помогло. Ещё кухню нужно покрасить, а дверь починить.",
          "Tried restarting/deleting — эксперименты; needs painting/fixing — действия, которые нужно выполнить над предметами."
        ]
      ]
    },
    "58": {
      "g": [
        [
          "I'd like to go to Italy one day.",
          "Когда-нибудь я хотел бы побывать в Италии.",
          "После would like нужен to go; это желание, а не like going о привычном удовольствии."
        ],
        [
          "Do you enjoy dancing?",
          "Тебе нравится танцевать?",
          "После enjoy только форма -ing: dancing."
        ],
        [
          "Would you like to come with us?",
          "Хочешь пойти с нами?",
          "Would like требует to come, в отличие от обычного like, допускающего -ing."
        ],
        [
          "I'd love to see you again.",
          "Я бы очень хотел снова тебя увидеть.",
          "После would love нужен to see; seeing здесь не используется."
        ],
        [
          "I'd prefer to stay at home tonight.",
          "Сегодня я предпочёл бы остаться дома.",
          "Would prefer выражает конкретное желание и требует to stay."
        ],
        [
          "I'd like to have seen the concert, but I was ill.",
          "Я хотел бы увидеть тот концерт, но был болен.",
          "To have seen относится к прошлому несостоявшемуся событию; to see обычно выражало бы настоящее или будущее желание."
        ],
        [
          "Do you like getting up early?",
          "Тебе нравится рано вставать?",
          "Обычный like допускает getting up. To getting неверно; to get тоже могло бы быть допустимо, но его нет среди вариантов."
        ],
        [
          "I wouldn't like to be in his position.",
          "Я не хотел бы оказаться на его месте.",
          "После wouldn't like используется to be, не being."
        ]
      ],
      "e": [
        [
          "I would like to go to the beach.",
          "Я хотел бы пойти на пляж.",
          "Would like требует to go; like going без would имело бы другой смысл."
        ],
        [
          "Would you like to come to my party?",
          "Хочешь прийти на мою вечеринку?",
          "Would you like + to come — приглашение; coming после would like не подходит."
        ],
        [
          "I'd love to have met her, but she left before I arrived.",
          "Я хотел бы познакомиться с ней, но она ушла до моего прихода.",
          "To have met обозначает упущенную встречу в прошлом; to meet не передаёт предшествование."
        ]
      ],
      "t": [
        [
          "Would you like to come to the cinema?",
          "Хочешь пойти в кино?",
          "Would you like to come — приглашение с обязательным to-инфинитивом."
        ],
        [
          "I'd like to have seen the match.",
          "Я хотел бы увидеть тот матч.",
          "To have seen выражает желание об упущенном прошлом событии."
        ]
      ],
      "w": [
        [
          "I love walking in the forest and I like cooking for friends. I hate getting up early. One day I'd like to live by the sea, and I'd love to learn to sail.",
          "Люблю гулять в лесу и готовить для друзей. Ненавижу рано вставать. Когда-нибудь хотел бы жить у моря и научиться ходить под парусом.",
          "Love/like/hate допускают -ing; would like/love требуют to + инфинитив для желаемого действия."
        ]
      ]
    },
    "59": {
      "g": [
        [
          "I prefer tea to coffee.",
          "Я предпочитаю чай кофе.",
          "Сравнение после prefer: A to B, не A than B."
        ],
        [
          "I'd rather stay at home tonight.",
          "Сегодня я лучше останусь дома.",
          "После would rather инфинитив stay без to и без -ing."
        ],
        [
          "I'd rather walk than take a bus.",
          "Лучше пойду пешком, чем поеду автобусом.",
          "Would rather do A than do B; than связывает два сравниваемых действия."
        ],
        [
          "I'd rather you didn't tell anyone.",
          "Я предпочёл бы, чтобы ты никому не говорил.",
          "Другой исполнитель you после would rather требует Past simple didn't tell, хотя желание относится к настоящему."
        ],
        [
          "I prefer driving to travelling by train.",
          "Я предпочитаю водить машину поездкам на поезде.",
          "Параллельная конструкция prefer driving to travelling: обе стороны выражены -ing, to — предлог."
        ],
        [
          "Would you rather have tea or coffee?",
          "Ты предпочёл бы чай или кофе?",
          "После would rather нужен have без to."
        ],
        [
          "I'd prefer to eat at home tonight.",
          "Сегодня я предпочёл бы поесть дома.",
          "После would prefer нужен to eat; после would rather, напротив, было бы eat без to."
        ],
        [
          "I'd rather you came tomorrow, not today.",
          "Я предпочёл бы, чтобы ты пришёл завтра, не сегодня.",
          "После would rather + другой исполнитель используется came — нереальное желательное действие, не прошлый приход."
        ]
      ],
      "e": [
        [
          "I'd rather go by train.",
          "Я лучше поеду поездом.",
          "Would rather go используется без to."
        ],
        [
          "I prefer football to tennis.",
          "Я предпочитаю футбол теннису.",
          "Prefer football to tennis: после prefer для сравнения нужен to, не than."
        ],
        [
          "I'd rather you didn't smoke here.",
          "Я предпочёл бы, чтобы ты здесь не курил.",
          "После would rather you используем didn't smoke — желательное поведение сейчас."
        ]
      ],
      "t": [
        [
          "I'd rather stay in than go out.",
          "Я лучше останусь дома, чем выйду.",
          "Would rather stay than go: два инфинитива без to, соединённые than."
        ],
        [
          "I'd rather you didn't call me after ten.",
          "Я предпочёл бы, чтобы ты не звонил после десяти.",
          "Would rather + you + didn't call выражает пожелание к чужому действию."
        ]
      ],
      "w": [
        [
          "I prefer the city to the countryside. I'd rather read a book than watch a film. In winter I'd rather stay at home than go skiing. I prefer walking to driving.",
          "Я предпочитаю город деревне. Лучше почитаю книгу, чем посмотрю фильм. Зимой лучше останусь дома, чем пойду на лыжах. Предпочитаю ходить пешком, а не водить.",
          "Prefer A to B; would rather + инфинитив + than + инфинитив — две разные конструкции сравнения."
        ]
      ]
    },
    "60": {
      "g": [
        [
          "I'm interested in learning Spanish.",
          "Меня интересует изучение испанского.",
          "После предлога in глагол ставится в форме -ing: learning."
        ],
        [
          "She left without saying goodbye.",
          "Она ушла, не попрощавшись.",
          "После without используется saying; without to say не образует эту конструкцию."
        ],
        [
          "I'm looking forward to seeing you.",
          "С нетерпением жду встречи с тобой.",
          "To в look forward to — предлог, поэтому seeing, а не инфинитив see."
        ],
        [
          "He's very good at telling jokes.",
          "Он очень хорошо рассказывает шутки.",
          "После предлога at — telling с -ing."
        ],
        [
          "Wash your hands before eating.",
          "Мой руки перед едой.",
          "После before как предлога используется eating; before you eat — другой допустимый способ, с подлежащим."
        ],
        [
          "Instead of taking the bus, we walked.",
          "Вместо автобуса мы пошли пешком.",
          "После instead of действие выражается taking с -ing."
        ],
        [
          "Thank you for helping me.",
          "Спасибо, что помог мне.",
          "После for используется helping с -ing, не to help."
        ],
        [
          "How about going out for dinner?",
          "Как насчёт поужинать вне дома?",
          "После about используется going; how about + -ing предлагает действие."
        ]
      ],
      "e": [
        [
          "I'm tired of waiting.",
          "Мне надоело ждать.",
          "После предлога of нужен waiting с -ing."
        ],
        [
          "I look forward to hearing from you.",
          "Жду вашего ответа с нетерпением.",
          "To в look forward to — предлог, поэтому hearing, не hear."
        ],
        [
          "After finishing work, I went home.",
          "Закончив работу, я пошёл домой.",
          "After + finishing — предлог и -ing; after I finished — союз и полное предложение."
        ]
      ],
      "t": [
        [
          "He left the room without saying anything.",
          "Он вышел из комнаты, ничего не сказав.",
          "После without используется saying; anything естественно в конструкции с отрицательным смыслом."
        ],
        [
          "I'm looking forward to seeing you on Friday.",
          "С нетерпением жду встречи с тобой в пятницу.",
          "Look forward to + seeing, поскольку to здесь предлог."
        ]
      ],
      "w": [
        [
          "Dear Ms Smith, Thank you for sending me information about the course. I am interested in improving my business English. I look forward to hearing from you.",
          "Уважаемая госпожа Смит! Спасибо за информацию о курсе. Я заинтересован в улучшении делового английского. С нетерпением жду вашего ответа.",
          "For sending, in improving и to hearing: после предлогов глагол получает -ing; to здесь не инфинитивное."
        ]
      ]
    },
    "61": {
      "g": [
        [
          "I've lived in London for years, so I'm used to driving on the left.",
          "Я много лет живу в Лондоне, поэтому привык ездить по левой стороне.",
          "Be used to означает «привык»; to здесь предлог, поэтому driving с -ing."
        ],
        [
          "It took me a long time to get used to working at night.",
          "Мне понадобилось много времени, чтобы привыкнуть работать ночью.",
          "Get used to — процесс привыкания; после to как предлога используется working."
        ],
        [
          "She isn't used to living alone.",
          "Она не привыкла жить одна.",
          "Be used to + living обозначает привычность; это не used to live о прошлом."
        ],
        [
          "Don't worry, you'll soon get used to it.",
          "Не волнуйся, скоро привыкнешь.",
          "Get used to описывает изменение привычности; после will get остаётся инфинитивом."
        ],
        [
          "When I was a child, I used to play in the street.",
          "В детстве я обычно играл на улице.",
          "Used to play — прежняя привычка. Was used to потребовало бы playing и означало бы «был привыкшим»."
        ],
        [
          "I'm not used to getting up so early.",
          "Я не привык так рано вставать.",
          "После be used to используется getting с -ing, поскольку to — предлог."
        ],
        [
          "He's a farmer. He's used to hard work.",
          "Он фермер. Он привык к тяжёлой работе.",
          "Hard — прилагательное к work. Hardly означает «едва» и не описывает тяжёлую работу."
        ],
        [
          "Have you got used to the new system yet?",
          "Ты уже привык к новой системе?",
          "Have got used to спрашивает о достигнутой привычности; be use to — неверная форма."
        ]
      ],
      "e": [
        [
          "I'm used to getting up early.",
          "Я привык рано вставать.",
          "Be used to + getting; инфинитив get после предлога to здесь не подходит."
        ],
        [
          "I can't get used to living here.",
          "Я никак не могу привыкнуть жить здесь.",
          "После get used to используется living с -ing."
        ],
        [
          "He used to play football every weekend when he was young.",
          "В молодости он играл в футбол каждые выходные.",
          "Прежняя привычка — used to play без is; is used to playing означало бы «привык играть»."
        ]
      ],
      "t": [
        [
          "She'll get used to it.",
          "Она привыкнет.",
          "Will get used to описывает будущий процесс достижения привычности."
        ],
        [
          "I'm used to working late.",
          "Я привык работать допоздна.",
          "Be used to + working показывает, что действие для меня привычно сейчас."
        ]
      ],
      "w": [
        [
          "When I moved to Moscow, I wasn't used to the crowds. It took me months to get used to the noise. Now I'm used to the metro and I even like it.",
          "После переезда в Москву я не привык к толпам. На привыкание к шуму ушли месяцы. Теперь я привык к метро и даже люблю его.",
          "Wasn't used to — прежнее состояние; get used to — изменение; am used to — нынешняя привычность."
        ]
      ]
    },
    "62": {
      "g": [
        [
          "Have you succeeded in finding a job?",
          "Тебе удалось найти работу?",
          "Устойчивое сочетание succeed in; после предлога in требуется finding."
        ],
        [
          "She insisted on paying for dinner.",
          "Она настояла, чтобы оплатить ужин.",
          "Insist on + paying; to pay и in paying не подходят к этому сочетанию."
        ],
        [
          "I'm thinking of moving to Spain.",
          "Я подумываю переехать в Испанию.",
          "Think of + moving выражает рассматриваемый вариант; после of используется -ing."
        ],
        [
          "I don't feel like going out tonight.",
          "Сегодня мне не хочется выходить.",
          "Feel like + going означает желание; to go не используется в этой конструкции."
        ],
        [
          "He apologised for being late.",
          "Он извинился за опоздание.",
          "Apologise for + being late; предлог for вводит причину извинения."
        ],
        [
          "The rain prevented us from playing tennis.",
          "Дождь помешал нам играть в теннис.",
          "Prevent + us + from playing; после from требуется -ing."
        ],
        [
          "They accused him of stealing the money.",
          "Его обвинили в краже денег.",
          "Accuse + him + of stealing; предлог of вводит обвиняемое действие."
        ],
        [
          "I congratulated her on passing the exam.",
          "Я поздравил её со сдачей экзамена.",
          "Congratulate + her + on passing; после on нужна форма -ing."
        ]
      ],
      "e": [
        [
          "I insisted on seeing the manager.",
          "Я настоял на встрече с руководителем.",
          "Insist on seeing — стандартная конструкция; insist to see не подходит."
        ],
        [
          "She dreams of becoming a pilot.",
          "Она мечтает стать пилотом.",
          "Dream of + becoming; после предлога of — форма -ing."
        ],
        [
          "Thank you for coming.",
          "Спасибо, что пришёл.",
          "Thank you for + coming; после for не ставим to-инфинитив."
        ]
      ],
      "t": [
        [
          "Tom apologised for forgetting my birthday.",
          "Том извинился, что забыл мой день рождения.",
          "Apologised for forgetting передаёт причину извинения; местоимение меняется при пересказе."
        ],
        [
          "The noise prevented me from sleeping.",
          "Шум мешал мне спать.",
          "Prevented + me + from sleeping выражает препятствие действию."
        ]
      ],
      "w": [
        [
          "I dream of travelling around the world. I'm thinking of taking a year off. Last week I apologised to my friend for missing her party — the snow prevented me from getting there.",
          "Я мечтаю путешествовать по миру и подумываю взять год отпуска. На прошлой неделе извинился перед подругой за пропущенную вечеринку: снег помешал добраться.",
          "Dream of, think of, apologise for и prevent from требуют последующий глагол с -ing."
        ]
      ]
    },
    "63": {
      "g": [
        [
          "There's no point in waiting. He isn't coming.",
          "Нет смысла ждать. Он не придёт.",
          "There's no point in + waiting выражает бесполезность; in можно опустить, но форма -ing сохраняется."
        ],
        [
          "This museum is worth visiting.",
          "Этот музей стоит посетить.",
          "Worth + visiting означает, что посещение заслуживает времени; to visit после worth не используется."
        ],
        [
          "It's no use complaining.",
          "Жаловаться бесполезно.",
          "После it's no use используется complaining с -ing."
        ],
        [
          "I had trouble finding your house.",
          "Мне было трудно найти твой дом.",
          "Have trouble + finding описывает трудность действия; to find здесь не используется."
        ],
        [
          "I spent the whole day cleaning the flat.",
          "Я весь день убирал квартиру.",
          "Spend time + cleaning говорит, на что ушло время."
        ],
        [
          "Let's go swimming this afternoon.",
          "Давай после обеда поплаваем.",
          "Go swimming — обычная конструкция для занятия; go to swim имело бы иной акцент цели."
        ],
        [
          "Don't waste time reading that book. It's boring.",
          "Не трать время на эту книгу. Она скучная.",
          "Waste time + reading выражает занятие, на которое расходуется время."
        ],
        [
          "It isn't worth repairing this old TV.",
          "Этот старый телевизор не стоит ремонтировать.",
          "Not worth + repairing оценивает действие как нецелесообразное; to repair после worth не подходит."
        ]
      ],
      "e": [
        [
          "It's worth seeing this film.",
          "Этот фильм стоит посмотреть.",
          "Worth + seeing; to see после worth не используется."
        ],
        [
          "I have difficulty understanding him.",
          "Мне трудно его понять.",
          "Have difficulty + understanding; предлог in также допустим."
        ],
        [
          "We went shopping yesterday.",
          "Вчера мы ходили за покупками.",
          "Go shopping — устойчивое сочетание без to."
        ]
      ],
      "t": [
        [
          "There's no point in arguing with him.",
          "Нет смысла с ним спорить.",
          "There's no point (in) arguing: in необязателен, форма -ing обязательна."
        ],
        [
          "I spent two hours doing my homework.",
          "Я два часа делал домашнее задание.",
          "Spend + время + doing показывает занятие, на которое ушёл указанный срок."
        ]
      ],
      "w": [
        [
          "The old town is worth visiting, especially in spring. It isn't worth going to the zoo — it's very small. I spend most weekends walking along the river.",
          "Старый город стоит посетить, особенно весной. В зоопарк идти не стоит: он маленький. Большинство выходных я провожу, гуляя вдоль реки.",
          "Worth visiting и going оценивают занятия; spend weekends walking описывает расход времени."
        ]
      ]
    },
    "64": {
      "g": [
        [
          "I went to the shop to buy some bread.",
          "Я пошёл в магазин купить хлеб.",
          "To buy выражает цель конкретного действия; for buying обычно описывает назначение, не эту цель."
        ],
        [
          "We went out for a walk.",
          "Мы вышли на прогулку.",
          "For + существительное a walk; to потребовало бы глагол, например to walk."
        ],
        [
          "Speak louder so that everybody can hear you.",
          "Говори громче, чтобы все могли тебя слышать.",
          "So that вводит полное предложение с подлежащим everybody и глаголом can hear."
        ],
        [
          "I'm saving money to buy a car.",
          "Я коплю деньги на покупку машины.",
          "To buy — цель действия; for buy грамматически неверно."
        ],
        [
          "She left early so that she wouldn't miss the train.",
          "Она вышла рано, чтобы не опоздать на поезд.",
          "So that + she wouldn't miss выражает цель с отдельным подлежащим и отрицанием."
        ],
        [
          "This knife is for cutting bread.",
          "Этот нож предназначен для нарезки хлеба.",
          "For cutting описывает назначение предмета; после предлога for используется -ing."
        ],
        [
          "He called me to invite me to his party.",
          "Он позвонил, чтобы пригласить меня на вечеринку.",
          "To invite выражает цель конкретного звонка."
        ],
        [
          "I wrote it down so that I wouldn't forget.",
          "Я записал это, чтобы не забыть.",
          "So that + I wouldn't forget — полное придаточное цели; to перед I не используется."
        ]
      ],
      "e": [
        [
          "I came here to learn English.",
          "Я приехал сюда учить английский.",
          "Цель приезда — to learn; for learn не образует правильную конструкцию."
        ],
        [
          "She studies hard to pass the exam.",
          "Она усердно учится, чтобы сдать экзамен.",
          "Цель: to pass или so that she can pass; for to pass здесь не используется."
        ],
        [
          "Let's take a taxi so that we will be on time.",
          "Давай возьмём такси, чтобы приехать вовремя.",
          "После so that нужно полное предложение; альтернатива — to be без so that."
        ]
      ],
      "t": [
        [
          "I went to the bank to get some money.",
          "Я пошёл в банк снять деньги.",
          "To get some money отвечает на вопрос о цели похода."
        ],
        [
          "I'll leave the door open so that the cat can come in.",
          "Я оставлю дверь открытой, чтобы кот мог войти.",
          "So that + the cat can come задаёт цель с другим исполнителем, не I."
        ]
      ],
      "w": [
        [
          "I'm learning English to get a better job. I watch series in English so that I can understand natural speech. I go to a café on Fridays for a conversation club.",
          "Я учу английский, чтобы найти работу лучше. Смотрю сериалы, чтобы понимать естественную речь. По пятницам хожу в кафе на разговорный клуб.",
          "To get — цель; so that I can — полное придаточное; for a club — предлог и существительное."
        ]
      ]
    },
    "65": {
      "g": [
        [
          "This question is easy to answer.",
          "На этот вопрос легко ответить.",
          "После easy используется to answer; question — смысловой объект действия, повторять it не нужно."
        ],
        [
          "It was kind of you to help me.",
          "Было очень любезно с твоей стороны помочь мне.",
          "Kind оценивает поступок человека, поэтому of you; for you обычно указывает участника или условия."
        ],
        [
          "I'm glad to hear that you're feeling better.",
          "Рад слышать, что тебе лучше.",
          "После glad для реакции используется to hear."
        ],
        [
          "He was the first person to arrive.",
          "Он пришёл первым.",
          "После the first person часто используется to arrive, описывая действие этого человека."
        ],
        [
          "This book is difficult to understand.",
          "Эту книгу трудно понять.",
          "Difficult to understand: book уже является смысловым объектом, дополнительное it не нужно."
        ],
        [
          "I was surprised to see him there.",
          "Я удивился, увидев его там.",
          "После surprised используется to see для причины реакции."
        ],
        [
          "It's not safe to swim here.",
          "Здесь небезопасно плавать.",
          "It is not safe + to swim оценивает действие."
        ],
        [
          "She's likely to be late again.",
          "Вероятно, она снова опоздает.",
          "Be likely to + be late выражает вероятность; being после likely не образует эту конструкцию."
        ]
      ],
      "e": [
        [
          "It's very kind of you to invite me.",
          "Очень любезно с твоей стороны пригласить меня.",
          "Kind of you оценивает человека по поступку; for you передавало бы другой смысл."
        ],
        [
          "This car is easy to drive.",
          "Этой машиной легко управлять.",
          "Car уже является объектом drive по смыслу; повтор it в конце не нужен."
        ],
        [
          "He was the last to leave the office.",
          "Он ушёл из офиса последним.",
          "После the last (person) используется to leave."
        ]
      ],
      "t": [
        [
          "Tom is difficult to understand.",
          "Тома трудно понять.",
          "Tom — подлежащее и смысловой объект understand; difficult to understand без повторения him."
        ],
        [
          "It was nice of you to help me.",
          "Было любезно с твоей стороны помочь мне.",
          "Nice of you + to help оценивает поступок конкретного человека."
        ]
      ],
      "w": [
        [
          "English grammar is quite easy to learn, but pronunciation is hard to master. I was surprised to find how many words look like Russian ones. It's nice to understand songs.",
          "Английскую грамматику довольно легко учить, но произношение трудно освоить. Меня удивило, сколько слов похожи на русские. Приятно понимать песни.",
          "Easy to learn, hard to master и nice to understand оценивают действия; surprised to find передаёт реакцию."
        ]
      ]
    },
    "66": {
      "g": [
        [
          "The path was icy, so I walked carefully. I was afraid of falling.",
          "Дорожка была обледенелой, поэтому я шёл осторожно. Боялся упасть.",
          "Afraid of falling — страх нежелательного случайного события; afraid to обычно подчёркивает страх предпринять действие."
        ],
        [
          "I was afraid to ask the teacher, so I said nothing.",
          "Я боялся спросить учителя и ничего не сказал.",
          "Afraid to ask подчёркивает, что страх помешал сделать намеренное действие."
        ],
        [
          "I'm interested in learning about history.",
          "Мне интересно изучать историю.",
          "Interested in + learning выражает интерес к деятельности; in — предлог, поэтому -ing."
        ],
        [
          "I was interested to hear that you've got a new job.",
          "Было интересно узнать, что у тебя новая работа.",
          "Interested to hear передаёт реакцию на полученную информацию, а не хобби или деятельность."
        ],
        [
          "I'm sorry for shouting at you yesterday.",
          "Прости, что я вчера на тебя кричал.",
          "Sorry for shouting — извинение за сделанное; sorry to обычно предваряет реакцию или сообщение."
        ],
        [
          "I'm sorry to hear that you're ill.",
          "Мне жаль слышать, что ты болен.",
          "Sorry to hear выражает сочувственную реакцию на новость."
        ],
        [
          "She was certain to win — everyone knew she would.",
          "Она наверняка победила бы: все это знали.",
          "Certain to win выражает уверенность в результате; of win пропускает нужную форму -ing."
        ],
        [
          "He's afraid of losing his job.",
          "Он боится потерять работу.",
          "Afraid of losing — страх нежелательного события; afraid to lose означало бы страх намеренного действия."
        ]
      ],
      "e": [
        [
          "I'm interested in learning Japanese.",
          "Меня интересует изучение японского.",
          "Для интереса к деятельности используем interested in learning."
        ],
        [
          "She was afraid to tell him the truth, so she lied.",
          "Она боялась сказать ему правду, поэтому солгала.",
          "Afraid to tell подчёркивает страх выполнить намеренное действие; после of понадобилось бы telling."
        ],
        [
          "I'm sorry to hear about your accident.",
          "Мне жаль узнать о твоей аварии.",
          "Sorry to hear выражает реакцию на плохую новость; for hearing не передаёт этот смысл."
        ]
      ],
      "t": [
        [
          "I was afraid to go into the water.",
          "Я боялся заходить в воду.",
          "Afraid to go описывает страх, из-за которого действие не выполняется."
        ],
        [
          "She's afraid of having an accident.",
          "Она боится попасть в аварию.",
          "Afraid of having — страх нежелательного события, не страх намеренно устроить аварию."
        ]
      ],
      "w": [
        [
          "As a child I was afraid of getting lost in big shops. I was afraid to speak in front of the class. Now I'm interested in learning languages and travelling.",
          "В детстве я боялся потеряться в больших магазинах и боялся говорить перед классом. Теперь интересуюсь языками и путешествиями.",
          "Afraid of getting lost — событие; afraid to speak — намеренное действие; interested in — интерес к деятельности."
        ]
      ]
    },
    "67": {
      "g": [
        [
          "I saw her get into a taxi and drive away.",
          "Я видел, как она села в такси и уехала.",
          "See + her + get/drive без to показывает наблюдаемую последовательность целиком."
        ],
        [
          "I heard somebody singing when I walked past the house.",
          "Проходя мимо дома, я слышал, как кто-то пел.",
          "Heard somebody singing показывает процесс в момент наблюдения; to sing после heard не используется."
        ],
        [
          "Did you see the accident happen?",
          "Ты видел, как произошла авария?",
          "See + the accident + happen без to описывает наблюдаемое событие."
        ],
        [
          "I could smell something burning.",
          "Я чувствовал запах чего-то горящего.",
          "Smell + something + burning показывает происходящий процесс."
        ],
        [
          "We watched them play the whole match.",
          "Мы посмотрели, как они сыграли весь матч.",
          "The whole match подчёркивает целое действие: watched them play без to."
        ],
        [
          "I felt something crawling up my leg.",
          "Я чувствовал, как что-то ползёт по ноге.",
          "Felt something crawling описывает ощущаемый процесс; to crawl здесь не используется."
        ],
        [
          "I didn't hear you come in last night.",
          "Я не слышал, как ты вчера вошёл.",
          "Hear + you + come без to описывает событие прихода."
        ],
        [
          "Can you hear the birds singing?",
          "Слышишь, как поют птицы?",
          "Hear + the birds + singing показывает процесс сейчас."
        ]
      ],
      "e": [
        [
          "I saw him leave the building.",
          "Я видел, как он вышел из здания.",
          "See somebody leave — целое действие; leaving — процесс. В обеих формах to не добавляется."
        ],
        [
          "I heard her cry.",
          "Я слышал, как она плакала.",
          "Hear her cry — действие целиком; crying — наблюдаемый процесс; to cry здесь не подходит."
        ],
        [
          "We watched the children play in the park.",
          "Мы наблюдали, как дети играли в парке.",
          "После watched the children допустимы play или playing, но не отдельная прошедшая форма played."
        ]
      ],
      "t": [
        [
          "I saw Tom get out of the car.",
          "Я видел, как Том вышел из машины.",
          "Saw + Tom + get без to описывает наблюдаемое целое событие."
        ],
        [
          "I heard somebody shouting.",
          "Я слышал, как кто-то кричал.",
          "Heard somebody shouting показывает процесс, который был слышен."
        ]
      ],
      "w": [
        [
          "On my way to work I saw a man running for the bus. I heard a baby crying in the next flat. I watched a little girl feed the ducks in the park.",
          "По дороге на работу я видел мужчину, бегущего к автобусу. Слышал плач ребёнка в соседней квартире. Наблюдал, как девочка кормила уток.",
          "Running и crying — процессы; feed без to показывает наблюдаемое действие."
        ]
      ]
    },
    "68": {
      "g": [
        [
          "Feeling tired, I went to bed early.",
          "Я устал и рано лёг спать.",
          "Feeling tired — оборот причины с -ing; его исполнитель тот же I, что в главной части."
        ],
        [
          "Having finished her work, she went home.",
          "Закончив работу, она пошла домой.",
          "Having finished показывает, что работа завершилась раньше went home."
        ],
        [
          "Be careful when crossing the road.",
          "Будь осторожен, переходя дорогу.",
          "When crossing сокращает when you are crossing; нужен глагол с -ing."
        ],
        [
          "She hurt her hand playing volleyball.",
          "Она повредила руку, играя в волейбол.",
          "Playing показывает действие, во время которого произошла травма, а не цель to play."
        ],
        [
          "Not knowing what to do, I called my dad.",
          "Не зная, что делать, я позвонил отцу.",
          "Отрицательный -ing оборот: not knowing, без do/don't."
        ],
        [
          "Being a doctor, he knew what to do.",
          "Он был врачом, поэтому знал, что делать.",
          "Being a doctor объясняет причину; исполнитель оборота и главной части один — he."
        ],
        [
          "Jill was sitting in an armchair reading a book.",
          "Джилл сидела в кресле и читала книгу.",
          "Reading добавляет одновременное действие; отдельный read не связывает его с основной частью."
        ],
        [
          "Having seen the film before, I didn't want to see it again.",
          "Я уже видел фильм и не хотел смотреть его снова.",
          "Having seen подчёркивает предшествование опыта решению не смотреть снова."
        ]
      ],
      "e": [
        [
          "Feeling hungry, I made a sandwich.",
          "Проголодавшись, я сделал бутерброд.",
          "Feeling hungry — оборот с -ing, выражающий состояние-причину; felt не образует такой оборот."
        ],
        [
          "Having finished the exam, he left the room.",
          "Закончив экзамен, он вышел из комнаты.",
          "Having finished показывает действие раньше left; have finished без подлежащего здесь не подходит."
        ],
        [
          "Not having any money, I couldn't buy it.",
          "У меня не было денег, и я не мог это купить.",
          "Отрицательный оборот — not having; don't не ставится перед having."
        ]
      ],
      "t": [
        [
          "Walking home, I met an old friend.",
          "Идя домой, я встретил старого друга.",
          "Walking home описывает одновременный процесс; исполнитель обоих действий один — I."
        ],
        [
          "Having finished her homework, she went to bed.",
          "Закончив домашнее задание, она легла спать.",
          "Having finished подчёркивает завершение раньше следующего события."
        ]
      ],
      "w": [
        [
          "Having finished work early, I decided to walk home. Feeling hungry, I stopped at a café. Sitting by the window, I watched people hurrying past in the rain.",
          "Рано закончив работу, я решил идти домой пешком. Проголодавшись, зашёл в кафе. Сидя у окна, наблюдал за людьми, спешащими мимо под дождём.",
          "Having finished — предшествующее действие; feeling и sitting — причины или одновременные состояния с тем же исполнителем."
        ]
      ]
    },
    "69": {
      "g": [
        [
          "Can I ask you a question?",
          "Можно задать тебе вопрос?",
          "Question исчисляется; для одного нового вопроса нужен a question."
        ],
        [
          "I need some information.",
          "Мне нужна информация.",
          "Information неисчисляемое: без -s и без an; some обозначает неопределённое количество."
        ],
        [
          "There isn't much milk in the fridge.",
          "В холодильнике мало молока.",
          "Milk неисчисляемое, поэтому much, не many."
        ],
        [
          "She gave me some good advice.",
          "Она дала мне хороший совет.",
          "Advice неисчисляемое: some advice, без advices и без an."
        ],
        [
          "How many apples do you want?",
          "Сколько яблок ты хочешь?",
          "Apples — исчисляемое множественное число, поэтому how many."
        ],
        [
          "I don't have much money.",
          "У меня мало денег.",
          "Money неисчисляемое: much money, не many money."
        ],
        [
          "The news is very bad today.",
          "Сегодня новости очень плохие.",
          "News выглядит как множественное, но грамматически единственное: is."
        ],
        [
          "We need some bread for breakfast.",
          "Нам нужен хлеб на завтрак.",
          "Bread неисчисляемое; some подходит, a и many требуют исчисляемый предмет."
        ]
      ],
      "e": [
        [
          "I'd like some information about the course.",
          "Я хотел бы информацию о курсе.",
          "Information не принимает an; допустимы some information или information без артикля."
        ],
        [
          "Can you give me some advice?",
          "Можешь дать мне совет?",
          "Advice неисчисляемое и не имеет обычной формы advices."
        ],
        [
          "The furniture in this room is old.",
          "Мебель в этой комнате старая.",
          "Furniture неисчисляемое: без -s и с глаголом is."
        ]
      ],
      "t": [
        [
          "I bought two new chairs.",
          "Я купил два новых стула.",
          "Chair исчисляется: после two множественное число chairs, без a."
        ],
        [
          "How much water do you drink every day?",
          "Сколько воды ты пьёшь каждый день?",
          "Water неисчисляемое, поэтому how much, а не how many."
        ]
      ],
      "w": [
        [
          "There's some milk and a lot of cheese in my fridge. There aren't many vegetables, but there are some eggs. There isn't much bread, so I need to buy some.",
          "В холодильнике есть молоко и много сыра. Овощей немного, но есть яйца. Хлеба мало, нужно купить.",
          "Milk, cheese и bread неисчисляемые; vegetables и eggs — исчисляемое множественное число."
        ]
      ]
    },
    "70": {
      "g": [
        [
          "We had lovely weather on holiday.",
          "В отпуске была прекрасная погода.",
          "Weather неисчисляемое: без a и без множественного -s."
        ],
        [
          "The traffic was terrible this morning.",
          "Сегодня утром движение было ужасным.",
          "Traffic неисчисляемое и согласуется с was, не were."
        ],
        [
          "I'm looking for work. (= a job)",
          "Я ищу работу.",
          "Work в значении занятости неисчисляемое: без a. Job в этом смысле исчисляемое."
        ],
        [
          "Have you got much luggage?",
          "У тебя много багажа?",
          "Luggage неисчисляемое: без -s; much используется с его количеством."
        ],
        [
          "Let me give you a piece of advice.",
          "Позволь дать тебе один совет.",
          "Advice неисчисляемое; a piece делает выражение счётным."
        ],
        [
          "You've made a lot of progress this year.",
          "В этом году ты сильно продвинулся.",
          "Progress неисчисляемое; a lot of progress, без -s."
        ],
        [
          "Could you buy a loaf of bread?",
          "Можешь купить буханку хлеба?",
          "Bread неисчисляемое, а loaf исчисляемое; одну буханку выражаем a loaf of bread."
        ],
        [
          "Your hair is really long now.",
          "У тебя теперь очень длинные волосы.",
          "Hair как общая масса волос неисчисляемое: is. Отдельные волоски можно назвать hairs."
        ]
      ],
      "e": [
        [
          "We had terrible weather yesterday.",
          "Вчера была ужасная погода.",
          "Weather неисчисляемое, поэтому артикль a убирается."
        ],
        [
          "My luggage is very heavy.",
          "Мой багаж очень тяжёлый.",
          "Luggage без -s и с is; для отдельных вещей можно сказать bags или suitcases."
        ],
        [
          "I'm going to look for new work.",
          "Я собираюсь искать новую работу.",
          "Work в значении занятости не принимает a; a new job — исчисляемый вариант."
        ]
      ],
      "t": [
        [
          "I need a piece of advice.",
          "Мне нужен один совет.",
          "A piece of advice позволяет посчитать неисчисляемое advice."
        ],
        [
          "How much furniture have you got?",
          "Сколько у тебя мебели?",
          "Furniture неисчисляемое, поэтому how much и без -s."
        ]
      ],
      "w": [
        [
          "The scenery was amazing, but the weather was awful. We had too much luggage and the traffic in the city was terrible. The hotel staff gave us useful information.",
          "Виды были потрясающими, но погода ужасной. Багажа было слишком много, а движение в городе было жутким. Сотрудники отеля дали полезную информацию.",
          "Scenery, weather, luggage, traffic и information неисчисляемые; им не нужны a и множественное -s."
        ]
      ]
    },
    "71": {
      "g": [
        [
          "My sister is a nurse.",
          "Моя сестра — медсестра.",
          "Название профессии в единственном числе требует a/an; nurse начинается согласным звуком, поэтому a."
        ],
        [
          "I bought some flowers for my mum.",
          "Я купил маме цветы.",
          "Flowers — множественное число; some обозначает неопределённое количество, a/an не подходит."
        ],
        [
          "He's an engineer.",
          "Он инженер.",
          "Engineer начинается гласным звуком, поэтому an; профессия в единственном числе требует артикля."
        ],
        [
          "What a beautiful day!",
          "Какой прекрасный день!",
          "Восклицание what a + прилагательное + исчисляемое единственное day."
        ],
        [
          "Dogs are good pets. (in general)",
          "Собаки — хорошие домашние животные.",
          "Говорим о собаках вообще: множественное dogs без the; a не сочетается с множественным числом."
        ],
        [
          "There's an apple on the table.",
          "На столе лежит яблоко.",
          "Одно новое исчисляемое apple начинается гласным звуком: an apple."
        ],
        [
          "Have you got an umbrella?",
          "У тебя есть зонт?",
          "Umbrella начинается гласным звуком, поэтому an в единственном числе."
        ],
        [
          "I met some interesting people at the party.",
          "На вечеринке я встретил интересных людей.",
          "People — множественное число; some обозначает неопределённую группу."
        ]
      ],
      "e": [
        [
          "My father is a teacher.",
          "Мой отец — учитель.",
          "Профессия teacher в единственном числе требует a."
        ],
        [
          "I've got some new shoes.",
          "У меня новые туфли.",
          "Shoes — множественное число; a убирается, some допустимо."
        ],
        [
          "What a nice day!",
          "Какой чудесный день!",
          "Перед nice day в конструкции what нужен a, поскольку day исчисляемое единственное."
        ]
      ],
      "t": [
        [
          "Tom is a doctor.",
          "Том — врач.",
          "Doctor — профессия в единственном числе: a doctor."
        ],
        [
          "There are some books on the shelf.",
          "На полке стоят книги.",
          "При множественном books меняется и глагол: there are some books."
        ]
      ],
      "w": [
        [
          "My mother is an architect and my father is a pilot. My brother is a student. We have a dog, two cats and some fish. Our neighbours are teachers.",
          "Мама — архитектор, отец — пилот, брат — студент. У нас есть собака, две кошки и рыбки. Соседи — учителя.",
          "An architect, a pilot/student/dog — единственное; cats, fish и teachers — множественное без a/an."
        ]
      ]
    },
    "72": {
      "g": [
        [
          "I've got a car and a motorbike. The car is old.",
          "У меня есть машина и мотоцикл. Машина старая.",
          "Первое упоминание — a car; при повторном обращении к той же машине — the car."
        ],
        [
          "Can you close the door, please?",
          "Можешь закрыть дверь, пожалуйста?",
          "The door — дверь, понятная обоим из ситуации, не любая случайная дверь."
        ],
        [
          "We stayed at a small hotel near the beach.",
          "Мы остановились в маленьком отеле у пляжа.",
          "Отель впервые вводится как один из возможных: a small hotel."
        ],
        [
          "I had a sandwich and an apple. The sandwich wasn't very good.",
          "Я съел бутерброд и яблоко. Бутерброд был не очень хорошим.",
          "The sandwich относится к уже названному конкретному бутерброду."
        ],
        [
          "The sun is shining today.",
          "Сегодня светит солнце.",
          "The sun — единственный очевидный объект в нашей обычной ситуации."
        ],
        [
          "Is there a bank near here?",
          "Поблизости есть банк?",
          "Спрашиваем о любом подходящем банке: a bank; конкретный банк ещё не известен."
        ],
        [
          "Where's the bathroom? (in this flat)",
          "Где ванная?",
          "В квартире имеется в виду определённая ванная, понятная из ситуации: the bathroom."
        ],
        [
          "She's the best student in our class.",
          "Она лучшая ученица в нашем классе.",
          "Перед превосходной степенью best обычно стоит the: выделяем одну среди группы."
        ]
      ],
      "e": [
        [
          "I saw a film last night. The film was very good.",
          "Вчера я посмотрел фильм. Он был очень хорошим.",
          "Первое упоминание a film; повтор того же объекта — the film."
        ],
        [
          "Can you pass me the salt, please?",
          "Передай соль, пожалуйста.",
          "The salt означает конкретную соль на столе, понятную участникам разговора."
        ],
        [
          "The moon goes round the Earth.",
          "Луна вращается вокруг Земли.",
          "The moon — единственный известный объект в обычном земном контексте."
        ]
      ],
      "t": [
        [
          "The dress was cheap.",
          "Платье было дешёвым.",
          "Платье уже названо в предыдущем предложении, поэтому the dress."
        ],
        [
          "Is there a bank near here?",
          "Поблизости есть банк?",
          "A bank означает любой банк, не конкретный известный."
        ]
      ],
      "w": [
        [
          "I live in a small flat. There's a bedroom, a kitchen and a bathroom. The kitchen is my favourite room. There's a big window, and from the window you can see the river.",
          "Я живу в маленькой квартире. Есть спальня, кухня и ванная. Кухня — любимая комната. Есть большое окно, из которого видна река.",
          "A вводит новые объекты; the kitchen/window возвращается к названным, the river понятна из местной ситуации."
        ]
      ]
    },
    "73": {
      "g": [
        [
          "We went to the cinema last night.",
          "Вчера вечером мы ходили в кино.",
          "В обычном британском выражении go to the cinema используется the; речь о посещении кино."
        ],
        [
          "I don't watch TV very often.",
          "Я нечасто смотрю телевизор.",
          "Watch TV — устойчивое выражение без артикля; the TV могло бы обозначать конкретный аппарат."
        ],
        [
          "What did you have for breakfast?",
          "Что ты ел на завтрак?",
          "Название обычного приёма пищи breakfast после for обычно без артикля."
        ],
        [
          "I'd love to live by the sea.",
          "Я бы очень хотел жить у моря.",
          "By the sea — обычное выражение; sea обозначает море как среду, а не один неопределённый водоём."
        ],
        [
          "The sky is very blue today.",
          "Сегодня небо очень голубое.",
          "The sky — известный, единственный для наблюдателя объект ситуации."
        ],
        [
          "I heard the news on the radio.",
          "Я услышал новости по радио.",
          "On the radio — стандартное выражение для радиовещания; on TV, напротив, без the."
        ],
        [
          "We're going away next week.",
          "На следующей неделе мы уезжаем.",
          "Next week как обстоятельство времени используется без the."
        ],
        [
          "Mount Everest is the highest mountain in the world.",
          "Эверест — самая высокая гора в мире.",
          "In the world — стандартное выражение; world рассматривается как единственный известный мир."
        ]
      ],
      "e": [
        [
          "I love listening to the radio in the morning.",
          "Люблю утром слушать радио.",
          "Listen to the radio — радиовещание вообще; a radio скорее обозначало бы один приёмник."
        ],
        [
          "What did you have for lunch?",
          "Что ты ел на обед?",
          "For lunch обычно без the; конкретный особый обед потребовал бы другого контекста."
        ],
        [
          "Let's go to the theatre tonight.",
          "Давай сегодня вечером сходим в театр.",
          "Go to the theatre — стандартное британское выражение для посещения театра."
        ]
      ],
      "t": [
        [
          "I saw it on TV.",
          "Я видел это по телевизору.",
          "On TV/television обозначает вещание без артикля, не физический аппарат."
        ],
        [
          "The earth goes round the sun.",
          "Земля вращается вокруг Солнца.",
          "The sun — единственный очевидный объект в обычном земном контексте."
        ]
      ],
      "w": [
        [
          "On my perfect Sunday I have breakfast by the sea, then I go to the beach. In the evening we go to the theatre. I don't watch TV at all.",
          "В идеальное воскресенье я завтракаю у моря, потом иду на пляж. Вечером мы идём в театр. Телевизор совсем не смотрю.",
          "Have breakfast и watch TV — без артикля; by the sea и to the theatre — с the."
        ]
      ]
    },
    "74": {
      "g": [
        [
          "Children go to school from the age of six.",
          "Дети идут в школу с шести лет.",
          "Go to school означает учиться, поэтому без the; the school выделяло бы конкретное здание."
        ],
        [
          "My mum went to the school to talk to my teacher.",
          "Мама пришла в школу поговорить с моим учителем.",
          "Она не учится, а посещает конкретное здание: the school."
        ],
        [
          "He's ill. He's in hospital.",
          "Он болен. Он в больнице.",
          "В британском употреблении in hospital означает находиться там как пациент, без the."
        ],
        [
          "I'm tired. I'm going to bed.",
          "Я устал. Иду спать.",
          "Go to bed — устойчивое «ложиться спать», без артикля."
        ],
        [
          "What time do you finish work?",
          "Во сколько ты заканчиваешь работу?",
          "Work как работа или рабочий день обычно без артикля в finish work."
        ],
        [
          "Ken's brother is in prison for robbery.",
          "Брат Кена в тюрьме за ограбление.",
          "In prison обозначает статус заключённого, не просто местонахождение в здании."
        ],
        [
          "I went to the hospital to visit my friend.",
          "Я пришёл в больницу навестить друга.",
          "Посещение конкретного здания, а не лечение в роли пациента: the hospital."
        ],
        [
          "Let's go home.",
          "Пойдём домой.",
          "Home после глагола движения употребляется без to и без артикля."
        ]
      ],
      "e": [
        [
          "I go to work by bus.",
          "Я езжу на работу на автобусе.",
          "Go to work — стандартное выражение о работе, без the."
        ],
        [
          "After the class we went home.",
          "После занятия мы пошли домой.",
          "Go home: home здесь обстоятельство направления, без to и the."
        ],
        [
          "My brother is at university. He studies law.",
          "Брат учится в университете. Он изучает право.",
          "At university в британском варианте обозначает статус студента, без the."
        ]
      ],
      "t": [
        [
          "I'm going to bed.",
          "Я иду спать.",
          "Go to bed означает ложиться спать, поэтому без the."
        ],
        [
          "He's at university.",
          "Он учится в университете.",
          "At university описывает обучение; конкретное здание не выделяется."
        ]
      ],
      "w": [
        [
          "I get up at seven and go to work at eight. My son goes to school by bus. I usually get home at six. I go to bed quite late, around midnight.",
          "Я встаю в семь, а в восемь иду на работу. Сын ездит в школу на автобусе. Обычно возвращаюсь домой в шесть. Ложусь поздно, около полуночи.",
          "Go to work/school/bed — назначение без the; get home — без to."
        ]
      ]
    },
    "75": {
      "g": [
        [
          "I love music, especially jazz.",
          "Я люблю музыку, особенно джаз.",
          "Music — неисчисляемое понятие вообще, поэтому без the."
        ],
        [
          "The music in this film is fantastic.",
          "Музыка в этом фильме замечательная.",
          "Уточнение in this film выделяет конкретную музыку: the music."
        ],
        [
          "life is not always easy.",
          "Жизнь не всегда проста.",
          "Life как общее понятие используется без the; конкретная жизнь потребовала бы уточнения."
        ],
        [
          "dogs are friendlier than cats, I think.",
          "Мне кажется, собаки дружелюбнее кошек.",
          "Dogs и cats обозначают классы вообще: множественное число без the."
        ],
        [
          "Where are the children? — They're in the garden.",
          "Где дети? — Они в саду.",
          "The children — определённые дети, которых знают участники разговора."
        ],
        [
          "I'm interested in history of art.",
          "Я интересуюсь историей искусства.",
          "History of art — название области изучения, без артикля в этом общем смысле."
        ],
        [
          "The history of this town is very interesting.",
          "История этого города очень интересна.",
          "Of this town выделяет конкретную историю: the history."
        ],
        [
          "vegetables are good for you.",
          "Овощи полезны.",
          "Vegetables — целый класс предметов, поэтому множественное число без the."
        ]
      ],
      "e": [
        [
          "Money doesn't bring happiness.",
          "Деньги не приносят счастья.",
          "Money и happiness — общие понятия, без the."
        ],
        [
          "I don't like cold weather.",
          "Я не люблю холодную погоду.",
          "Говорим о погоде вообще, а не о конкретном периоде: cold weather без the."
        ],
        [
          "The children in my class are very noisy.",
          "Дети в моём классе очень шумные.",
          "In my class ограничивает известную группу; поэтому the children."
        ]
      ],
      "t": [
        [
          "Cats are independent.",
          "Кошки независимы.",
          "Cats обозначает животных вообще: множественное число без the."
        ],
        [
          "The cats in our street are noisy.",
          "Кошки на нашей улице шумные.",
          "In our street выделяет конкретную группу: the cats."
        ]
      ],
      "w": [
        [
          "I love music and I hate noise. I think people are generally kind. I don't like football, but the football team in my town is really good.",
          "Люблю музыку и не люблю шум. Думаю, люди в целом добрые. Футбол не нравится, но команда моего города очень хорошая.",
          "Music, noise, people и football — общее; the football team in my town — конкретная команда."
        ]
      ]
    },
    "76": {
      "g": [
        [
          "The tiger is in danger of extinction.",
          "Тигр находится под угрозой исчезновения.",
          "The tiger может представлять весь вид, а не одно животное."
        ],
        [
          "Who invented the telephone?",
          "Кто изобрёл телефон?",
          "The telephone обозначает изобретение как класс предметов."
        ],
        [
          "Can you play the guitar?",
          "Ты умеешь играть на гитаре?",
          "В стандартном play the guitar название музыкального инструмента используется с the."
        ],
        [
          "The rich should pay more taxes.",
          "Богатые должны платить больше налогов.",
          "The rich — группа людей; прилагательное с the заменяет rich people."
        ],
        [
          "The French are famous for their food.",
          "Французы известны своей кухней.",
          "The French обозначает народ как группу и согласуется с are."
        ],
        [
          "The government should help the unemployed.",
          "Правительство должно помогать безработным.",
          "The unemployed означает безработных людей как группу; отдельного существительного people не нужно."
        ],
        [
          "The computer has changed our lives.",
          "Компьютер изменил нашу жизнь.",
          "The computer представляет изобретение как целый класс, а не один конкретный прибор."
        ],
        [
          "We need to do more for the elderly.",
          "Нужно больше помогать пожилым.",
          "The elderly означает группу пожилых людей; an не образует такое коллективное значение."
        ]
      ],
      "e": [
        [
          "I play the piano a little.",
          "Я немного играю на пианино.",
          "В стандартном play the piano название инструмента используется с the."
        ],
        [
          "Life is hard for the poor.",
          "Бедным живётся тяжело.",
          "The poor — бедные люди как группа; poor без the осталось бы только прилагательным."
        ],
        [
          "The English drink a lot of tea.",
          "Англичане пьют много чая.",
          "Группа: the English или English people без the; эти два способа не нужно смешивать."
        ]
      ],
      "t": [
        [
          "The whale is the largest animal in the world.",
          "Кит — самое большое животное в мире.",
          "The whale представляет класс; the largest выделяет превосходную степень."
        ],
        [
          "The young often have lots of energy.",
          "У молодых часто много энергии.",
          "The young означает молодых людей и имеет множественное значение."
        ]
      ],
      "w": [
        [
          "The smartphone has changed everything. The young use it for everything, but the elderly sometimes find it difficult. The rich and the poor both depend on it now.",
          "Смартфон изменил всё. Молодые используют его для всего, а пожилым иногда трудно. И богатые, и бедные теперь от него зависят.",
          "The smartphone — изобретение; the young, elderly, rich и poor — группы людей с множественным значением."
        ]
      ]
    },
    "77": {
      "g": [
        [
          "I'd like to visit Canada.",
          "Я хотел бы побывать в Канаде.",
          "Обычное название страны Canada используется без the."
        ],
        [
          "Have you ever been to the United States?",
          "Ты когда-нибудь был в США?",
          "The United States содержит states во множественном числе и употребляется с the."
        ],
        [
          "Mount Elbrus is in the Caucasus.",
          "Эльбрус находится на Кавказе.",
          "Название горного региона или цепи the Caucasus используется с the; Mount Elbrus — без него."
        ],
        [
          "Lake Baikal is the deepest lake in the world.",
          "Байкал — самое глубокое озеро в мире.",
          "Название с Lake: Lake Baikal без the; in the world остаётся стандартным выражением."
        ],
        [
          "She lives in Paris.",
          "Она живёт в Париже.",
          "Обычное название города Paris используется без артикля."
        ],
        [
          "The Alps are a popular place for skiing.",
          "Альпы — популярное место для катания на лыжах.",
          "Название горной цепи во множественном числе: the Alps."
        ],
        [
          "Amsterdam is the capital of the Netherlands.",
          "Амстердам — столица Нидерландов.",
          "The Netherlands — название страны, традиционно употребляемое с the."
        ],
        [
          "We went to the Czech Republic last summer.",
          "Прошлым летом мы ездили в Чешскую Республику.",
          "Название с Republic употребляется с the: the Czech Republic."
        ]
      ],
      "e": [
        [
          "I was born in Russia.",
          "Я родился в России.",
          "Russia — обычное название страны, без the."
        ],
        [
          "They live in the United Kingdom.",
          "Они живут в Соединённом Королевстве.",
          "Название с Kingdom требует the: the United Kingdom."
        ],
        [
          "We climbed Mount Everest.",
          "Мы поднялись на Эверест.",
          "Имя отдельной горы Everest или Mount Everest обычно без the."
        ]
      ],
      "t": [
        [
          "He's from the USA.",
          "Он из США.",
          "В сокращении сохраняется артикль: the USA."
        ],
        [
          "Moscow is the capital of Russia.",
          "Москва — столица России.",
          "Обычные названия города и страны Moscow и Russia — без the."
        ]
      ],
      "w": [
        [
          "I'd love to visit the United States, especially New York. I'd also like to go skiing in the Alps and see Lake Geneva. One day I want to climb Mount Kilimanjaro.",
          "Хотел бы побывать в США, особенно в Нью-Йорке. Ещё покататься на лыжах в Альпах и увидеть Женевское озеро. Когда-нибудь хочу подняться на Килиманджаро.",
          "The United States/Alps — с the; New York, Lake Geneva и Mount Kilimanjaro — без него."
        ]
      ]
    },
    "78": {
      "g": [
        [
          "The Nile flows into the Mediterranean.",
          "Нил впадает в Средиземное море.",
          "Названия рек и морей обычно с the: the Nile, the Mediterranean."
        ],
        [
          "We stayed at the Hilton.",
          "Мы остановились в «Хилтоне».",
          "Название отеля в этом употреблении — the Hilton."
        ],
        [
          "The Volga is the longest river in Europe.",
          "Волга — самая длинная река Европы.",
          "Название реки the Volga — с the; Europe как континент — без него."
        ],
        [
          "They live in Baker Street.",
          "Они живут на Бейкер-стрит.",
          "Названия улиц вроде Baker Street обычно без the."
        ],
        [
          "We had a picnic in Hyde Park.",
          "Мы устроили пикник в Гайд-парке.",
          "Hyde Park — имя парка, обычно без артикля."
        ],
        [
          "Have you been to the Louvre?",
          "Ты был в Лувре?",
          "Название музея the Louvre употребляется с the."
        ],
        [
          "Our plane landed at Heathrow Airport.",
          "Наш самолёт приземлился в аэропорту Хитроу.",
          "Именное название Heathrow Airport обычно без the."
        ],
        [
          "He studied at Cambridge University.",
          "Он учился в Кембриджском университете.",
          "Именная конструкция Cambridge University — без the; University of Cambridge устроена иначе."
        ]
      ],
      "e": [
        [
          "We sailed across the Atlantic.",
          "Мы пересекли Атлантику под парусом.",
          "Название океана the Atlantic употребляется с the."
        ],
        [
          "I'm meeting her in Central Park.",
          "Я встречаюсь с ней в Центральном парке.",
          "Название Central Park используется без the."
        ],
        [
          "Let's go to the National Gallery.",
          "Давай сходим в Национальную галерею.",
          "Название музея или галереи здесь — the National Gallery."
        ]
      ],
      "t": [
        [
          "We swam in the Black Sea.",
          "Мы плавали в Чёрном море.",
          "Название моря: the Black Sea."
        ],
        [
          "We arrived at Kazansky Station.",
          "Мы приехали на Казанский вокзал.",
          "Именное название станции Kazansky Station в этой конструкции — без the."
        ]
      ],
      "w": [
        [
          "Start your day in Gorky Park, then walk along the Moskva. Visit the Pushkin Museum and in the evening see a ballet at the Bolshoi. Arbat Street is great for shopping.",
          "Начните день в Парке Горького, потом прогуляйтесь вдоль Москвы-реки. Посетите Пушкинский музей, а вечером балет в Большом. Арбат хорош для покупок.",
          "Gorky Park и Arbat Street — без the; река и названия музея/театра здесь — с the."
        ]
      ]
    },
    "79": {
      "g": [
        [
          "My jeans are too tight.",
          "Джинсы мне слишком тесны.",
          "Jeans имеет множественную форму и требует are."
        ],
        [
          "The police are looking for him.",
          "Полиция его разыскивает.",
          "Police в этом значении согласуется с множественным are, хотя не имеет обычного окончания -s."
        ],
        [
          "I need a pair of scissors.",
          "Мне нужны ножницы.",
          "Scissors — множественная форма; одну пару обозначаем a pair of scissors."
        ],
        [
          "The news was surprising.",
          "Новость оказалась неожиданной.",
          "News грамматически единственное число, поэтому was, не were."
        ],
        [
          "Physics is my favourite subject.",
          "Физика — мой любимый предмет.",
          "Physics как учебный предмет имеет единственное значение и требует is."
        ],
        [
          "Three days isn't long enough for a holiday.",
          "Трёх дней мало для отпуска.",
          "Период рассматриваем как одну величину, поэтому isn't, несмотря на множественное days."
        ],
        [
          "How many people were at the party?",
          "Сколько человек было на вечеринке?",
          "People — множественное число; в прошлом нужен were."
        ],
        [
          "These trousers are too long.",
          "Эти брюки слишком длинные.",
          "Trousers — множественная форма, поэтому these и are."
        ]
      ],
      "e": [
        [
          "Where are my glasses?",
          "Где мои очки?",
          "Glasses во множественном числе требуют are."
        ],
        [
          "The police are coming.",
          "Полиция едет.",
          "Police в этом значении согласуется с are, не is."
        ],
        [
          "I bought some new trousers.",
          "Я купил новые брюки.",
          "Trousers — множественное; a возможно только с pair: a new pair of trousers."
        ]
      ],
      "t": [
        [
          "The people are very friendly here.",
          "Люди здесь очень дружелюбные.",
          "People — множественное число, поэтому are."
        ],
        [
          "I need a new pair of jeans.",
          "Мне нужна новая пара джинсов.",
          "A pair делает выражение счётным; сами jeans сохраняют множественную форму."
        ]
      ],
      "w": [
        [
          "Today I'm wearing black jeans and a white shirt. My glasses are in my bag, together with some money and a pair of scissors. My shoes are new.",
          "Сегодня я в чёрных джинсах и белой рубашке. Очки в сумке вместе с деньгами и ножницами. Туфли новые.",
          "Jeans, glasses, scissors и shoes — множественные формы; a pair считает комплект, money неисчисляемое."
        ]
      ]
    },
    "80": {
      "g": [
        [
          "Let's meet at the bus stop.",
          "Давай встретимся на автобусной остановке.",
          "Первое существительное bus определяет вид второго: bus stop, не stop bus."
        ],
        [
          "It was a two-hour flight.",
          "Перелёт длился два часа.",
          "Перед существительным составное определение two-hour: hour в единственном числе, с дефисом."
        ],
        [
          "Can you change a ten-pound note?",
          "Можешь разменять десятифунтовую купюру?",
          "В определении ten-pound noun pound остаётся в единственном числе."
        ],
        [
          "I need a new toothbrush.",
          "Мне нужна новая зубная щётка.",
          "Toothbrush — сложное существительное: первое tooth определяет назначение brush."
        ],
        [
          "She works in a shoe shop.",
          "Она работает в обувном магазине.",
          "Существительное-определение shoe обычно в единственном числе перед shop."
        ],
        [
          "Do you know the phone number of the hotel?",
          "Ты знаешь номер телефона гостиницы?",
          "Phone определяет number и стоит перед ним, без множественного -s."
        ],
        [
          "We stayed in a five-star hotel.",
          "Мы остановились в пятизвёздочном отеле.",
          "Five-star — составное определение перед hotel; star без -s."
        ],
        [
          "There's a car park behind the station.",
          "За станцией есть парковка.",
          "Car park — обычное сочетание: car определяет вид park, без -s."
        ]
      ],
      "e": [
        [
          "We went on a three-week holiday.",
          "Мы ездили в трёхнедельный отпуск.",
          "Перед holiday определение three-week, без -s у week."
        ],
        [
          "She works in a shoe shop.",
          "Она работает в обувном магазине.",
          "Shoe как определение перед shop обычно в единственном числе."
        ],
        [
          "I need a new toothbrush.",
          "Мне нужна новая зубная щётка.",
          "Правильный порядок сложного существительного — toothbrush, не brush tooth."
        ]
      ],
      "t": [
        [
          "a six-hour journey",
          "Шестичасовая поездка.",
          "Перед journey используем six-hour с hour в единственном числе."
        ],
        [
          "a tennis ball",
          "Теннисный мяч.",
          "Tennis определяет назначение ball и ставится перед ним."
        ]
      ],
      "w": [
        [
          "I bought a train ticket online. It was a four-hour journey to the city centre. My hotel room was small, but it had a lovely sea view and a coffee machine.",
          "Я купил билет на поезд онлайн. Поездка до центра заняла четыре часа. Номер был маленьким, но с красивым видом на море и кофемашиной.",
          "Train ticket, hotel room, city centre, sea view и coffee machine — noun + noun; four-hour — единое определение."
        ]
      ]
    },
    "81": {
      "g": [
        [
          "This is my brother's car.",
          "Это машина моего брата.",
          "Принадлежность человеку: brother's перед car, апостроф и -s после единственного brother."
        ],
        [
          "What's the name of the street?",
          "Как называется эта улица?",
          "Обычная конструкция для части или свойства вещи: the name of the street."
        ],
        [
          "The children's toys are everywhere.",
          "Детские игрушки повсюду.",
          "Children — неправильное множественное без -s, поэтому принадлежность children's с апострофом перед s."
        ],
        [
          "My parents' house is very old.",
          "Дом моих родителей очень старый.",
          "Parents уже заканчивается множественным -s; притяжательный апостроф ставится после него."
        ],
        [
          "Did you read yesterday's newspaper?",
          "Ты читал вчерашнюю газету?",
          "Для времени возможен притяжательный 's: yesterday's newspaper."
        ],
        [
          "I'll see you at the end of the film.",
          "Увидимся в конце фильма.",
          "Часть вещи обычно выражаем end of the film; слова end и film не меняются местами."
        ],
        [
          "I've got a week's holiday in May.",
          "В мае у меня недельный отпуск.",
          "Период в притяжательной конструкции: a week's holiday, апостроф перед s у одной недели."
        ],
        [
          "Is this Tom's phone?",
          "Это телефон Тома?",
          "Имя владельца получает 's: Tom's phone, без дополнительного the."
        ]
      ],
      "e": [
        [
          "My father's car is red.",
          "Машина моего отца красная.",
          "Для личной принадлежности father's car естественнее, чем car of my father; конструкция с of не универсально запрещена."
        ],
        [
          "The roof of the house needs repairing.",
          "Крышу дома нужно ремонтировать.",
          "Правильное отношение части и целого — the roof of the house."
        ],
        [
          "This is my friend's house.",
          "Это дом моего друга.",
          "Friend's — один друг; friends' — несколько друзей. Апостроф показывает принадлежность и число владельцев."
        ]
      ],
      "t": [
        [
          "Kate's bike",
          "Велосипед Кейт.",
          "Имя владельца + 's ставится перед предметом: Kate's bike."
        ],
        [
          "the beginning of the story",
          "Начало истории.",
          "Часть и целое: the beginning of the story."
        ]
      ],
      "w": [
        [
          "My sister's room is next to my parents' bedroom. The walls of the kitchen are yellow. My dad's favourite chair is by the window. Our cat's bed is under the stairs.",
          "Комната сестры рядом со спальней родителей. Стены кухни жёлтые. Любимое кресло отца у окна, а кошачья лежанка под лестницей.",
          "Sister's/dad's/cat's — один владелец; parents' — несколько; walls of the kitchen — часть вещи."
        ]
      ]
    },
    "82": {
      "g": [
        [
          "Be careful! Don't cut yourself.",
          "Осторожно! Не порежься.",
          "Исполнитель и пострадавший совпадают: you → yourself; обычное you не выражает возвратный смысл."
        ],
        [
          "We really enjoyed ourselves at the party.",
          "На вечеринке мы прекрасно провели время.",
          "Enjoy ourselves — хорошо провести время; для we возвратное местоимение ourselves."
        ],
        [
          "She taught herself to play the guitar.",
          "Она сама научилась играть на гитаре.",
          "Она учила саму себя: taught herself. Her означало бы другую женщину."
        ],
        [
          "I feel much better today.",
          "Сегодня я чувствую себя намного лучше.",
          "Feel better обычно не требует возвратного местоимения, несмотря на русское «себя»."
        ],
        [
          "Tom and Ann love each other.",
          "Том и Энн любят друг друга.",
          "Each other выражает взаимность; themselves означало бы, что каждый любит самого себя."
        ],
        [
          "He lives by himself.",
          "Он живёт один.",
          "By himself означает самостоятельно или в одиночку; by him не выражает этот смысл."
        ],
        [
          "Help yourselves to food, everybody!",
          "Все, угощайтесь!",
          "Обращение к нескольким людям требует yourselves; help yourselves — приглашение взять угощение."
        ],
        [
          "Try to relax and enjoy the music.",
          "Попробуй расслабиться и насладиться музыкой.",
          "Relax обычно используется без возвратного местоимения в этом значении."
        ]
      ],
      "e": [
        [
          "I hurt myself when I fell.",
          "Падая, я ушибся.",
          "Подлежащее и дополнение — один человек: hurt myself, не hurt me."
        ],
        [
          "Did you enjoy yourselves, children?",
          "Дети, вы хорошо провели время?",
          "Обращаемся к нескольким: yourselves, не единственное yourself."
        ],
        [
          "We met at the station.",
          "Мы встретились на станции.",
          "Meet в значении встречи друг с другом обычно без ourselves."
        ]
      ],
      "t": [
        [
          "I did it by myself.",
          "Я сделал это сам.",
          "By myself подчёркивает отсутствие помощи; myself без by тоже может усиливать самостоятельность."
        ],
        [
          "They look at each other.",
          "Они смотрят друг на друга.",
          "Each other выражает взаимное действие между двумя людьми."
        ]
      ],
      "w": [
        [
          "I taught myself to cook by watching videos. Last month I cooked for twelve friends. Everybody helped themselves to food and we really enjoyed ourselves.",
          "Я сам научился готовить по видео. В прошлом месяце готовил для двенадцати друзей. Все угощались, и мы прекрасно провели время.",
          "Taught myself — возвратность; helped themselves и enjoyed ourselves — устойчивые выражения."
        ]
      ]
    },
    "83": {
      "g": [
        [
          "I met a friend of mine in town.",
          "Я встретил в городе одного из своих друзей.",
          "A friend of mine — один из друзей; после of нужен mine, не объектное me."
        ],
        [
          "I'd like to have my own car.",
          "Хотелось бы иметь собственную машину.",
          "My own car подчёркивает личное владение; own ставится после my."
        ],
        [
          "She lives on her own.",
          "Она живёт одна.",
          "On her own — устойчивое «одна»; равнозначный вариант by herself."
        ],
        [
          "Is he a friend of yours?",
          "Он один из твоих друзей?",
          "A friend of yours: после of используется самостоятельное притяжательное yours."
        ],
        [
          "Did you make that cake yourself?",
          "Ты сам испёк этот торт?",
          "Yourself усиливает самостоятельность действия; your own потребовало бы существительное."
        ],
        [
          "They want a house of their own.",
          "Они хотят собственный дом.",
          "A house of their own: после of стоит притяжательное their + own."
        ],
        [
          "I went on holiday by myself.",
          "Я поехал в отпуск один.",
          "By myself или on my own означает в одиночку; by my own смешивает конструкции."
        ],
        [
          "That's a cousin of Tom's.",
          "Это один из двоюродных родственников Тома.",
          "A cousin of Tom's — конструкция двойной принадлежности; после имени сохраняется 's."
        ]
      ],
      "e": [
        [
          "He is a friend of mine.",
          "Он один из моих друзей.",
          "После a friend of нужен mine, не me."
        ],
        [
          "I want to have my own room.",
          "Я хочу собственную комнату.",
          "Own требует владельца: my own room или a room of my own."
        ],
        [
          "She travelled on her own.",
          "Она путешествовала одна.",
          "On her own и by herself равнозначны; on herself не выражает одиночество."
        ]
      ],
      "t": [
        [
          "He did it on his own.",
          "Он сделал это самостоятельно.",
          "On his own обозначает отсутствие помощи."
        ],
        [
          "Kate is a friend of mine.",
          "Кейт — одна из моих подруг.",
          "A friend of mine — один из друзей; mine заменяет my friends в конструкции."
        ]
      ],
      "w": [
        [
          "I like travelling on my own, but I prefer to cook with a friend of mine. One day I'd like to have my own garden and grow my own vegetables.",
          "Люблю путешествовать один, но готовить предпочитаю с одним из друзей. Когда-нибудь хочу собственный сад и свои овощи.",
          "On my own — одиночество; a friend of mine — один из друзей; my own — личное владение."
        ]
      ]
    },
    "84": {
      "g": [
        [
          "There's a new restaurant in King Street.",
          "На Кинг-стрит новый ресторан.",
          "There is вводит существование нового объекта; it обычно отсылает к уже известному."
        ],
        [
          "I've been to the new restaurant. It's very good.",
          "Я был в новом ресторане. Он очень хороший.",
          "Ресторан уже упомянут, поэтому it отсылает к нему; there вводило бы новый объект."
        ],
        [
          "There was a lot of traffic this morning.",
          "Сегодня утром было много машин.",
          "There was сообщает наличие; traffic неисчисляемое, поэтому was."
        ],
        [
          "It is a long way from here to the airport.",
          "Отсюда до аэропорта далеко.",
          "Для расстояния используется формальное it, не there."
        ],
        [
          "There must be a mistake. I didn't order this.",
          "Здесь, должно быть, ошибка. Я этого не заказывал.",
          "There must be вводит предполагаемое наличие ошибки; после must нужен be."
        ],
        [
          "It's a pity you can't come.",
          "Жаль, что ты не можешь прийти.",
          "It's a pity — стандартная оценочная конструкция с it."
        ],
        [
          "There used to be a cinema here.",
          "Раньше здесь был кинотеатр.",
          "There used to be сообщает о прежнем существовании объекта."
        ],
        [
          "It was cold, so we stayed inside.",
          "Было холодно, поэтому мы остались внутри.",
          "Для погоды используем формальное it was, не there was."
        ]
      ],
      "e": [
        [
          "There's a lot of noise in the street.",
          "На улице много шума.",
          "Наличие описывается there is; один is без подлежащего здесь не подходит."
        ],
        [
          "There's no need to hurry.",
          "Нет нужды торопиться.",
          "There's no need сообщает отсутствие необходимости; it's no need не является обычной конструкцией."
        ],
        [
          "It's raining.",
          "Идёт дождь.",
          "Погода выражается it is raining; there не используется как подлежащее дождя."
        ]
      ],
      "t": [
        [
          "There's a big museum in the town.",
          "В городе есть большой музей.",
          "There is вводит существующий объект и его местоположение."
        ],
        [
          "It was windy yesterday.",
          "Вчера было ветрено.",
          "Погодная конструкция: it was windy."
        ]
      ],
      "w": [
        [
          "There's a big park near my house. It's very quiet in the mornings. There are two supermarkets and a nice café. It's only ten minutes from the city centre.",
          "Рядом с домом большой парк. По утрам он тихий. Есть два супермаркета и уютное кафе. До центра всего десять минут.",
          "There вводит объекты; it отсылает к парку и используется для времени пути."
        ]
      ]
    },
    "85": {
      "g": [
        [
          "I bought some apples.",
          "Я купил яблоки.",
          "В обычном утверждении о неопределённом количестве используется some; a не сочетается с apples."
        ],
        [
          "I didn't buy any bread.",
          "Я не купил хлеба.",
          "После didn't в нейтральном отрицании используется any; no создало бы второе отрицание."
        ],
        [
          "Would you like some tea?",
          "Хочешь чаю?",
          "В предложении угощения обычно some, даже в вопросе; an не сочетается с неисчисляемым tea."
        ],
        [
          "Is there anybody in the room? — I don't know.",
          "В комнате кто-нибудь есть? — Не знаю.",
          "Anybody подходит для открытого вопроса без ожидания конкретного человека."
        ],
        [
          "You can take any bus. They all go to the centre.",
          "Можешь сесть на любой автобус. Все идут в центр.",
          "Any здесь значит «любой без ограничения», а не неопределённое количество some."
        ],
        [
          "I'm hungry. I want something to eat.",
          "Я голоден. Хочу что-нибудь поесть.",
          "Обычное положительное желание: something. Nothing означало бы, что есть нечего или ничего не хочется."
        ],
        [
          "We didn't see anybody we knew.",
          "Мы не встретили никого знакомого.",
          "После didn't используем anybody; nobody создало бы двойное отрицание в стандартной форме."
        ],
        [
          "Can I have some water, please?",
          "Можно воды, пожалуйста?",
          "В просьбе ожидаем получить предложенное количество, поэтому обычно some."
        ]
      ],
      "e": [
        [
          "I haven't got any money.",
          "У меня нет денег.",
          "Нейтральное отрицание: haven't got any или have got no; не соединяем not и no."
        ],
        [
          "Would you like some coffee?",
          "Хочешь кофе?",
          "Предложение угощения обычно строится с some, в отличие от открытого вопроса о наличии."
        ],
        [
          "Did anybody call?",
          "Кто-нибудь звонил?",
          "После did основной глагол call без -ed; anybody и anyone равнозначны."
        ]
      ],
      "t": [
        [
          "I haven't got any friends in London.",
          "У меня нет друзей в Лондоне.",
          "В отрицании haven't got используем any вместо утвердительного some."
        ],
        [
          "Would you like some biscuits?",
          "Хочешь печенья?",
          "В предложении угощения some обычно естественнее, чем any."
        ]
      ],
      "w": [
        [
          "We've got some eggs, but we haven't got any milk. There isn't any cheese left. I need to buy some bread and something for dinner.",
          "Есть яйца, но молока нет. Сыр тоже закончился. Нужно купить хлеб и что-нибудь на ужин.",
          "Some — наличие или покупка; any после отрицания; something — неопределённый предмет в утверждении."
        ]
      ]
    },
    "86": {
      "g": [
        [
          "There's no milk in the fridge.",
          "В холодильнике нет молока.",
          "No стоит перед существительным milk; none используется самостоятельно или с of."
        ],
        [
          "How many tickets are left? — None.",
          "Сколько билетов осталось? — Ни одного.",
          "None заменяет количество без повторения tickets; no требует существительное."
        ],
        [
          "I saw nobody at the station.",
          "Я никого не видел на станции.",
          "Nobody уже содержит отрицание; did not добавлять не нужно."
        ],
        [
          "Nobody came to the meeting.",
          "На встречу никто не пришёл.",
          "Nobody — отрицательное подлежащее; came остаётся положительной формой."
        ],
        [
          "I've got nothing to do.",
          "Мне нечего делать.",
          "Nothing — отрицательное местоимение «ничего»; none не заменяет предмет действия таким способом."
        ],
        [
          "She said nothing about it.",
          "Она ничего об этом не сказала.",
          "Nothing содержит отрицание; anything без отрицательного глагола не передаёт этот смысл."
        ],
        [
          "I don't want anything to eat, thanks.",
          "Я ничего не хочу есть, спасибо.",
          "Отрицание уже в don't, поэтому anything, не nothing."
        ],
        [
          "None of my friends speak Japanese.",
          "Никто из моих друзей не говорит по-японски.",
          "None of + my friends выделяет группу с отрицательным количеством; no of не используется."
        ]
      ],
      "e": [
        [
          "I didn't do anything wrong.",
          "Я не сделал ничего плохого.",
          "Либо didn't do anything, либо did nothing; два отрицания вместе не нужны."
        ],
        [
          "There's no bread left.",
          "Хлеба не осталось.",
          "No + bread или not any bread; none не ставится непосредственно перед bread."
        ],
        [
          "Nobody helped me.",
          "Никто мне не помог.",
          "Nobody уже отрицает действие; didn't нужно убрать."
        ]
      ],
      "t": [
        [
          "I met nobody.",
          "Я никого не встретил.",
          "Nobody позволяет заменить didn't meet anybody на met nobody."
        ],
        [
          "There's no sugar.",
          "Сахара нет.",
          "No sugar заменяет not any sugar; there is сохраняет положительную форму."
        ]
      ],
      "w": [
        [
          "Yesterday was terrible. Nobody called me, there was nothing on TV and there was no food in the fridge. I had nowhere to go and nothing to do.",
          "Вчера всё было ужасно. Никто не позвонил, по телевизору ничего не было и еды в холодильнике не осталось. Некуда было пойти и нечем заняться.",
          "Nobody, nothing, no и nowhere уже несут отрицание; второе not не требуется."
        ]
      ]
    },
    "87": {
      "g": [
        [
          "How much money have you got?",
          "Сколько у тебя денег?",
          "Money неисчисляемое, поэтому much, не many или few."
        ],
        [
          "There aren't many people here today.",
          "Сегодня здесь немного людей.",
          "People — множественное число, поэтому many в отрицании aren't many."
        ],
        [
          "I have a little time. I can help you.",
          "У меня есть немного времени. Я могу помочь.",
          "A little time — некоторое количество, которого достаточно; little подчёркивало бы нехватку."
        ],
        [
          "Hurry up! We have very little time.",
          "Поторопись! Времени совсем мало.",
          "Little с неисчисляемым time подчёркивает недостаток; few используется с исчисляемыми."
        ],
        [
          "She has a few good friends.",
          "У неё есть несколько хороших друзей.",
          "A few + friends — некоторое число; a little используется с неисчисляемым."
        ],
        [
          "Few people came to the lecture. It was a pity.",
          "На лекцию пришло мало людей. Очень жаль.",
          "Few уже имеет отрицательный по смыслу акцент «мало»; didn't come меняло бы смысл."
        ],
        [
          "There's plenty of food. Don't buy any more.",
          "Еды предостаточно. Больше не покупай.",
          "Plenty of + food означает достаточное количество с запасом; перед food нужен of."
        ],
        [
          "I don't drink much coffee.",
          "Я пью немного кофе.",
          "Coffee неисчисляемое, поэтому much в отрицании, не many."
        ]
      ],
      "e": [
        [
          "How much water do you drink?",
          "Сколько воды ты пьёшь?",
          "Water неисчисляемое: how much, не how many."
        ],
        [
          "I've got a little money, so I can buy you a coffee.",
          "У меня немного денег, могу купить тебе кофе.",
          "A little money означает некоторую достаточную сумму; few не сочетается с money."
        ],
        [
          "There are many problems.",
          "Есть много проблем.",
          "Problems исчисляемое множественное: many или a lot of, не much."
        ]
      ],
      "t": [
        [
          "We've got plenty of time.",
          "У нас достаточно времени с запасом.",
          "Plenty of time означает более чем достаточный объём; time неисчисляемое."
        ],
        [
          "Few people know about it.",
          "Об этом мало кто знает.",
          "Few people имеет акцент недостаточного количества, близкий к not many."
        ]
      ],
      "w": [
        [
          "This week I have very little free time and too many meetings. I've got a few friends coming on Friday and plenty of food, but not much money left.",
          "На этой неделе свободного времени мало, а встреч слишком много. В пятницу придут несколько друзей. Еды хватает, но денег почти не осталось.",
          "Little/much — time и money; many/a few — meetings и friends; plenty of подходит для food."
        ]
      ]
    },
    "88": {
      "g": [
        [
          "Most people like music.",
          "Большинство людей любит музыку.",
          "Общая группа people без определителя: most people, без of."
        ],
        [
          "Most of my friends live near me.",
          "Большинство моих друзей живёт рядом.",
          "My выделяет конкретную группу, поэтому most of my friends."
        ],
        [
          "Some of the students didn't pass the exam.",
          "Некоторые студенты не сдали экзамен.",
          "Перед определённой группой the students используется some of."
        ],
        [
          "None of us went to the party.",
          "Никто из нас не пошёл на вечеринку.",
          "Перед местоимением us используется none of; no us и nothing of не подходят."
        ],
        [
          "I spent all my money.",
          "Я потратил все свои деньги.",
          "All может непосредственно стоять перед my money; whole обычно требует один исчисляемый целый объект."
        ],
        [
          "All children need love.",
          "Всем детям нужна любовь.",
          "Общая группа во множественном: all children, без of."
        ],
        [
          "Half of this money is yours.",
          "Половина этих денег твоя.",
          "Half of this money выделяет долю определённого количества; half this money тоже грамматически возможно.",
          [
            ""
          ]
        ],
        [
          "Many of the questions were difficult.",
          "Многие вопросы были трудными.",
          "The questions — определённая группа, поэтому many of the questions."
        ]
      ],
      "e": [
        [
          "Most people enjoy holidays.",
          "Большинство людей любит отдых.",
          "Most people — общая группа без the/my; of убирается."
        ],
        [
          "Some of my friends are coming.",
          "Некоторые мои друзья придут.",
          "Перед my friends требуется some of."
        ],
        [
          "None of the shops were open.",
          "Ни один магазин не был открыт.",
          "Для доли определённой группы используется none of, не no of."
        ]
      ],
      "t": [
        [
          "None of my friends came.",
          "Никто из моих друзей не пришёл.",
          "None of my friends означает нулевое число внутри определённой группы."
        ],
        [
          "I slept through most of the film.",
          "Я проспал большую часть фильма.",
          "Most of the film обозначает долю конкретного фильма."
        ]
      ],
      "w": [
        [
          "There are twelve people in my English class. Most of us work in IT. Some of the students are very shy, but all of them try hard. None of us like grammar tests!",
          "В моей группе английского двенадцать человек. Большинство работает в IT. Некоторые студенты застенчивы, но все стараются. Никто не любит тесты по грамматике!",
          "Most/some/all/none of выделяют долю перед местоимениями или определённой группой."
        ]
      ]
    },
    "89": {
      "g": [
        [
          "Both my parents are teachers.",
          "Оба моих родителя — учителя.",
          "Для двух людей используется both; all обычно описывает группу больше двух."
        ],
        [
          "Neither restaurant is very expensive. Let's go to the first one.",
          "Ни один ресторан не очень дорогой. Пойдём в первый.",
          "Neither + restaurant означает «ни один из двух» и сочетается с единственным существительным."
        ],
        [
          "You can sit on either side. It doesn't matter.",
          "Можешь сесть с любой стороны. Неважно с какой.",
          "Either side — любая из двух сторон; both означало бы обе одновременно."
        ],
        [
          "Neither of my brothers can swim.",
          "Ни один из моих братьев не умеет плавать.",
          "Neither of + my brothers относится к двум; none обычно применяется к более широкой группе."
        ],
        [
          "Both Tom and Ann were late.",
          "И Том, и Энн опоздали.",
          "Парная конструкция both A and B включает обоих."
        ],
        [
          "I speak neither French nor German.",
          "Я не говорю ни по-французски, ни по-немецки.",
          "Neither A nor B отрицает оба варианта; либо/or строится с either."
        ],
        [
          "We can go either today or tomorrow.",
          "Можно поехать сегодня или завтра.",
          "Either A or B предлагает один из двух вариантов."
        ],
        [
          "I've got two sisters. Both of them live abroad.",
          "У меня две сестры. Обе живут за границей.",
          "Перед them нужно both of them; обе сестры включены."
        ]
      ],
      "e": [
        [
          "Both restaurants are good.",
          "Оба ресторана хорошие.",
          "Либо both restaurants, либо both of the restaurants; после of нужна определённая группа."
        ],
        [
          "Neither of my parents speaks English.",
          "Ни один из родителей не говорит по-английски.",
          "Neither уже содержит отрицание; дополнительное don't убирается. Единственное и разговорное множественное согласование возможны."
        ],
        [
          "I like both tea and coffee.",
          "Мне нравятся и чай, и кофе.",
          "Для включения обоих вариантов — both A and B, не either A and B."
        ]
      ],
      "t": [
        [
          "Neither Tom nor Kate eats meat.",
          "Ни Том, ни Кейт не едят мясо.",
          "Neither Tom nor Kate отрицает оба варианта; eats — стандартное согласование с ближайшим единственным Kate."
        ],
        [
          "You can either call me or send an email.",
          "Можешь либо позвонить мне, либо написать письмо.",
          "Either... or... соединяет альтернативные действия."
        ]
      ],
      "w": [
        [
          "My two best friends are very different. Both of them are funny, but neither of them is very organised. I could live in either city — both are beautiful.",
          "Два моих лучших друга очень разные. Оба смешные, но ни один не очень организованный. Могу жить в любом из двух городов: оба красивы.",
          "Both — оба; neither — ни один из двух; either — любой один из двух."
        ]
      ]
    },
    "90": {
      "g": [
        [
          "I go to the gym every day.",
          "Я хожу в спортзал каждый день.",
          "Every day — регулярность «каждый день»; all day означало бы весь день без перерыва."
        ],
        [
          "I was at home all day yesterday.",
          "Вчера я весь день был дома.",
          "All day — целый день; every day описывало бы повторение по дням."
        ],
        [
          "She read the whole book in one evening.",
          "Она прочитала всю книгу за вечер.",
          "The whole book — один целый объект; all the book требует другой порядок."
        ],
        [
          "Everybody was happy.",
          "Все были счастливы.",
          "Everybody обозначает всех людей, но грамматически единственное: was."
        ],
        [
          "Everything is ready.",
          "Всё готово.",
          "Everything имеет единственное согласование is; all things потребовало бы are."
        ],
        [
          "It rained for the whole week.",
          "Дождь шёл всю неделю.",
          "The whole week — один целый период, whole стоит после the."
        ],
        [
          "Every student has to pass the test.",
          "Каждый студент должен пройти тест.",
          "Every требует единственное student и глагол has."
        ],
        [
          "All the shops were closed.",
          "Все магазины были закрыты.",
          "All the shops — полная группа во множественном; every потребовало бы shop."
        ]
      ],
      "e": [
        [
          "Everybody was there.",
          "Все были там.",
          "Everybody грамматически единственное, поэтому was, не were."
        ],
        [
          "I work every day except Sunday.",
          "Я работаю каждый день, кроме воскресенья.",
          "Для регулярности используется every day; all days здесь не является обычным выражением."
        ],
        [
          "I ate the whole cake.",
          "Я съел весь торт.",
          "Либо the whole cake, либо all the cake; the all cake — неверный порядок."
        ]
      ],
      "t": [
        [
          "We spent the whole day at the beach.",
          "Мы провели на пляже весь день.",
          "The whole day обозначает целый единичный период."
        ],
        [
          "I listen to music every day.",
          "Я слушаю музыку каждый день.",
          "Every day описывает регулярное повторение по дням."
        ]
      ],
      "w": [
        [
          "I drink coffee every morning and go swimming every week. Last Sunday I spent the whole day reading — I was in bed all day and finished the whole book.",
          "Каждое утро пью кофе и каждую неделю плаваю. В прошлое воскресенье весь день читал: лежал в постели и дочитал всю книгу.",
          "Every — регулярность; all day/the whole day — полный период; the whole book — целый объект."
        ]
      ]
    },
    "91": {
      "g": [
        [
          "Each side of a square is the same length.",
          "Все стороны квадрата одинаковой длины.",
          "Each выделяет каждую сторону по отдельности. Every тоже грамматически возможно, с общим акцентом.",
          [
            "Every"
          ]
        ],
        [
          "There's a light at each corner of the room.",
          "В каждом углу комнаты есть светильник.",
          "Each рассматривает небольшую группу углов по отдельности; every также возможно при общем охвате.",
          [
            "every"
          ]
        ],
        [
          "Every country in the world has a flag. (all countries)",
          "У каждой страны мира есть флаг.",
          "Every подчёркивает все страны как группу; each тоже возможно с акцентом на отдельные страны.",
          [
            "Each"
          ]
        ],
        [
          "The tickets cost £10 each.",
          "Каждый билет стоит десять фунтов.",
          "После цены each означает «за штуку»; every в этой конечной позиции не используется."
        ],
        [
          "Each of the children got a present.",
          "Каждый ребёнок получил подарок.",
          "Each of + the children выделяет членов конкретной группы; every of не используется."
        ],
        [
          "She visits her grandmother every Sunday.",
          "Она навещает бабушку каждое воскресенье.",
          "Every Sunday — регулярность; each of потребовало бы определённую множественную группу."
        ],
        [
          "We each have our own room.",
          "У каждого из нас своя комната.",
          "Each может стоять после we и перед глаголом; every так не ставится."
        ],
        [
          "I enjoyed every minute of the trip.",
          "Мне понравилась каждая минута поездки.",
          "Every minute — вся поездка без исключений; each of не ставится перед единственным minute."
        ]
      ],
      "e": [
        [
          "Each of the students has a book.",
          "У каждого студента есть книга.",
          "Each of the students или every one of the students; голое every of неверно."
        ],
        [
          "Each student got a certificate.",
          "Каждый студент получил сертификат.",
          "После each без of существительное единственное: each student."
        ],
        [
          "The apples cost 20p each.",
          "Каждое яблоко стоит двадцать пенсов.",
          "Each после цены означает «за штуку»; every в этой позиции не подходит."
        ]
      ],
      "t": [
        [
          "Each player has a ball.",
          "У каждого игрока есть мяч.",
          "Each player + has: игроки рассматриваются по одному."
        ],
        [
          "I go to the cinema every Friday.",
          "Я хожу в кино каждую пятницу.",
          "Every Friday — регулярное повторение; Friday в единственном числе."
        ]
      ],
      "w": [
        [
          "In this game each player has five cards. Every round, each of us takes one card from the table. Every player must speak English during the whole game!",
          "В этой игре у каждого игрока пять карт. В каждом раунде каждый из нас берёт карту со стола. Все должны говорить по-английски всю игру.",
          "Each player/each of us — отдельные участники; every round/player — охват без исключений."
        ]
      ]
    },
    "92": {
      "g": [
        [
          "The woman who lives next door is a doctor.",
          "Женщина, которая живёт по соседству, — врач.",
          "Who или that относится к человеку и является подлежащим lives; which относится к вещам."
        ],
        [
          "Where's the book that was on the table?",
          "Где книга, которая лежала на столе?",
          "That/which относится к book как вещи; who используется для людей."
        ],
        [
          "I don't like people who are rude.",
          "Я не люблю грубых людей.",
          "Who/that связывает people с их действием are rude."
        ],
        [
          "What he said was not true.",
          "То, что он сказал, было неправдой.",
          "What здесь означает the thing that; отдельного существительного перед ним нет."
        ],
        [
          "The bus which goes to the airport leaves from here.",
          "Автобус до аэропорта отправляется отсюда.",
          "Which/that относится к bus как предмету и является подлежащим goes."
        ],
        [
          "A dictionary is a book that gives the meaning of words.",
          "Словарь — книга, которая объясняет значения слов.",
          "That/which относится к book; where задавало бы место, не подлежащее gives."
        ],
        [
          "Everything that happened was my fault.",
          "Во всём случившемся виноват я.",
          "После everything обычное относительное местоимение — that; what уже включает значение «то, что»."
        ],
        [
          "The man who phoned you didn't leave his name.",
          "Мужчина, который тебе звонил, не назвал имени.",
          "Who/that — подлежащее phoned и относится к человеку; whose выражало бы принадлежность."
        ]
      ],
      "e": [
        [
          "The man who works in the shop is my uncle.",
          "Мужчина, работающий в магазине, — мой дядя.",
          "Для человека используются who/that, не which."
        ],
        [
          "Everything that he said was true.",
          "Всё, что он сказал, было правдой.",
          "После everything используем that или опускаем дополнение; what не добавляется после существительного."
        ],
        [
          "I lost the keys which you gave me.",
          "Я потерял ключи, которые ты мне дал.",
          "Keys — вещи: which/that; местоимение как дополнение можно опустить."
        ]
      ],
      "t": [
        [
          "The man who helped me was very kind.",
          "Мужчина, который помог мне, был очень добр.",
          "Who заменяет подлежащее he в относительном придаточном; повтор he не нужен."
        ],
        [
          "The phone that I bought doesn't work.",
          "Телефон, который я купил, не работает.",
          "That соединяет phone с уточнением; phone — объект bought в придаточном."
        ]
      ],
      "w": [
        [
          "A pilot is a person who flies planes. A fridge is a machine which keeps food cold. My best friend is someone who always tells me the truth.",
          "Пилот — человек, который управляет самолётами. Холодильник — устройство, сохраняющее еду холодной. Лучший друг — тот, кто всегда говорит правду.",
          "Who относится к людям; which — к машине; относительное местоимение здесь является подлежащим."
        ]
      ]
    },
    "93": {
      "g": [
        [
          "The book I'm reading is very interesting.",
          "Книга, которую я сейчас читаю, очень интересная.",
          "Относительное слово — дополнение к I'm reading, поэтому можно опустить that/which."
        ],
        [
          "The man who lives next door is a pilot.",
          "Мужчина, живущий по соседству, — пилот.",
          "Who/that — подлежащее lives; его нельзя опустить в этом придаточном."
        ],
        [
          "Is this the hotel you stayed at?",
          "Это отель, в котором ты жил?",
          "That/which — дополнение, его можно опустить; предлог at остаётся в конце."
        ],
        [
          "The people we met on holiday were very nice.",
          "Люди, с которыми мы познакомились в отпуске, были приятными.",
          "We — подлежащее met; who/that — дополнение, поэтому его можно опустить."
        ],
        [
          "Did you find the keys you lost?",
          "Ты нашёл потерянные ключи?",
          "You — подлежащее lost; that/which как дополнение можно опустить."
        ],
        [
          "The girl who works in the café is my cousin.",
          "Девушка, работающая в кафе, — моя двоюродная сестра.",
          "Who/that — подлежащее works и не опускается."
        ],
        [
          "That's the man I told you about.",
          "Это мужчина, о котором я тебе говорил.",
          "Who/that как дополнение можно опустить, но about остаётся в конце."
        ],
        [
          "The film we saw last night was boring.",
          "Фильм, который мы смотрели вчера, был скучным.",
          "We — подлежащее saw; that/which — дополнение, которое можно опустить."
        ]
      ],
      "e": [
        [
          "The man I spoke to was very helpful.",
          "Мужчина, с которым я разговаривал, очень помог.",
          "После I spoke to не нужно повторять him: объект уже выражен the man и относительной связью."
        ],
        [
          "The house we live in is very old.",
          "Дом, в котором мы живём, очень старый.",
          "Live in требует in; можно оставить предлог в конце или использовать where."
        ],
        [
          "The woman who lives next door is a doctor.",
          "Женщина, которая живёт по соседству, — врач.",
          "В придаточном lives нужен субъект who/that; его нельзя опустить."
        ]
      ],
      "t": [
        [
          "I watched the film you recommended.",
          "Я посмотрел фильм, который ты рекомендовал.",
          "You — подлежащее recommended; относительное дополнение that/which можно опустить."
        ],
        [
          "The girl I was talking to is my sister.",
          "Девушка, с которой я говорил, — моя сестра.",
          "I — подлежащее was talking; who/that можно опустить, предлог to сохраняется."
        ]
      ],
      "w": [
        [
          "The book I'm reading now is about Japan. The people I work with are very friendly. The city I live in is quite small, but the café I go to every morning is great.",
          "Книга, которую читаю, о Японии. Коллеги очень дружелюбны. Мой город небольшой, а кафе, куда хожу каждое утро, прекрасное.",
          "Относительные дополнения опущены; предлоги with, in и to остаются при своих глаголах."
        ]
      ]
    },
    "94": {
      "g": [
        [
          "I met a man whose wife is a famous singer.",
          "Я встретил мужчину, чья жена — известная певица.",
          "Whose выражает принадлежность: his wife. Who's означает who is/has, не «чья»."
        ],
        [
          "This is the house where I was born.",
          "Это дом, где я родился.",
          "Where обозначает место; which потребовало бы предлог in."
        ],
        [
          "Do you remember the day when we first met?",
          "Помнишь день, когда мы впервые встретились?",
          "When относится ко времени the day, не к месту."
        ],
        [
          "The reason why I'm late is the traffic.",
          "Я опоздал из-за дорожного движения.",
          "Why связывает reason с объяснением причины; where относится к месту."
        ],
        [
          "The woman to whom I spoke was very helpful.",
          "Женщина, с которой я говорил, очень помогла.",
          "После предлога to в формальном относительном придаточном используется whom."
        ],
        [
          "A widow is a woman whose husband has died.",
          "Вдова — женщина, у которой умер муж.",
          "Whose + husband выражает принадлежность мужа женщине."
        ],
        [
          "Is there a shop near here where I can buy batteries?",
          "Поблизости есть магазин, где можно купить батарейки?",
          "Where обозначает место покупки; which потребовало бы предлог."
        ],
        [
          "That's the girl whose phone I found.",
          "Это девушка, чей телефон я нашёл.",
          "Whose phone выражает принадлежность; who's означало бы who is/has."
        ]
      ],
      "e": [
        [
          "I know a man whose car was stolen.",
          "Я знаю мужчину, у которого украли машину.",
          "Для принадлежности нужен whose; who's не является притяжательной формой."
        ],
        [
          "The hotel where we stayed was cheap.",
          "Отель, в котором мы жили, был дешёвым.",
          "Where выражает место; с which или без него нужен at в конце."
        ],
        [
          "The person to whom you should write is the manager.",
          "Писать нужно руководителю.",
          "Формально to whom; разговорный вариант who... to переносит предлог в конец."
        ]
      ],
      "t": [
        [
          "I have a friend whose father is an actor.",
          "У меня есть подруга, чей отец — актёр.",
          "Whose father связывает родственника с подругой и заменяет her father."
        ],
        [
          "This is the restaurant where we had our first date.",
          "Это ресторан, где было наше первое свидание.",
          "Where соединяет restaurant с действием в этом месте."
        ]
      ],
      "w": [
        [
          "I grew up in a village where everybody knew each other. I had a neighbour whose son was a famous footballer. I remember the day when he came back to visit.",
          "Я вырос в деревне, где все знали друг друга. У соседа сын был известным футболистом. Помню день, когда он приехал в гости.",
          "Where — место; whose — принадлежность; when — время."
        ]
      ]
    },
    "95": {
      "g": [
        [
          "My mother, who is 70, still works.",
          "Мама, которой семьдесят, всё ещё работает.",
          "Информация в запятых дополнительная; для человека нужен who, не that, и его нельзя опустить."
        ],
        [
          "We stayed at the Grand Hotel, which a friend had recommended.",
          "Мы остановились в «Гранд-отеле», который рекомендовал друг.",
          "После запятой для вещи используется which; that не вводит дополнительное придаточное."
        ],
        [
          "Paris, which is the capital of France, is beautiful.",
          "Париж, столица Франции, прекрасен.",
          "Which добавляет информацию о городе; where обозначало бы место действия, не подлежащее is."
        ],
        [
          "My sister, whose husband is French, lives in Lyon.",
          "Моя сестра, у которой муж француз, живёт в Лионе.",
          "Whose husband выражает принадлежность; who/whose нельзя смешивать."
        ],
        [
          "Mr Brown, whom I met yesterday, is my new boss.",
          "Мистер Браун, которого я встретил вчера, — мой новый начальник.",
          "Whom — формальное дополнение о человеке; в дополнительном придаточном его не опускают."
        ],
        [
          "We went to Rome, where we saw the Colosseum.",
          "Мы поехали в Рим, где увидели Колизей.",
          "Where добавляет информацию о событиях в названном месте."
        ],
        [
          "The Volga, which flows into the Caspian Sea, is very long.",
          "Волга, впадающая в Каспийское море, очень длинная.",
          "Which относится к реке и вводит дополнительное придаточное в запятых."
        ],
        [
          "Kate, who I've known for years, is a great friend.",
          "Кейт, которую я знаю много лет, — прекрасная подруга.",
          "Who относится к человеку; после запятой that не используется, даже как дополнение."
        ]
      ],
      "e": [
        [
          "My father, who is a doctor, works very hard.",
          "Мой отец, врач, очень много работает.",
          "Дополнительная информация в запятых вводится who, не that."
        ],
        [
          "London, which is in England, is very big.",
          "Лондон, находящийся в Англии, очень большой.",
          "Дополнительное придаточное о городе вводится which, не that."
        ],
        [
          "Ann, who I met last week, is very funny.",
          "Энн, которую я встретил на прошлой неделе, очень смешная.",
          "В дополнительном придаточном who/whom не опускается, даже если это дополнение."
        ]
      ],
      "t": [
        [
          "My brother, who lives in Canada, is an engineer.",
          "Мой брат, живущий в Канаде, — инженер.",
          "Who добавляет информацию о человеке; запятые показывают, что это не выбор одного брата из нескольких."
        ],
        [
          "The Eiffel Tower, which was built in 1889, is 330 m tall.",
          "Эйфелева башня, построенная в 1889 году, имеет высоту 330 метров.",
          "Which добавляет сведения об известном объекте; придаточное выделяется запятыми."
        ]
      ],
      "w": [
        [
          "My grandfather, who is 85, still goes fishing every day. Kazan, which is on the Volga, is my favourite city. My aunt, whose daughter is a pianist, lives in Riga.",
          "Дедушка, которому восемьдесят пять, каждый день рыбачит. Казань на Волге — мой любимый город. Тётя, чья дочь пианистка, живёт в Риге.",
          "Who — человек; which — город; whose — принадлежность. Дополнительные сведения выделяются запятыми."
        ]
      ]
    },
    "96": {
      "g": [
        [
          "He has three brothers, all of whom are doctors.",
          "У него три брата, и все врачи.",
          "После all of в относительном придаточном о людях используется whom, не them."
        ],
        [
          "She gave me some advice, most of which was useful.",
          "Она дала мне советы, большинство из которых были полезными.",
          "Most of which относится к advice; which связывает части одного предложения."
        ],
        [
          "Tom didn't come, which was a surprise.",
          "Том не пришёл, что было неожиданно.",
          "Which относится ко всему предыдущему факту, а не к Тому."
        ],
        [
          "I have two cars, neither of which works.",
          "У меня две машины, и ни одна не работает.",
          "Neither of which относится к двум машинам; which соединяет относительное придаточное."
        ],
        [
          "The man with whom she lives is a painter.",
          "Мужчина, с которым она живёт, — художник.",
          "После предлога with формально используется whom для человека."
        ],
        [
          "We had a party, which went on until 3 a.m.",
          "Мы устроили вечеринку, которая длилась до трёх утра.",
          "Which вводит дополнительное придаточное после запятой; that здесь не используется."
        ],
        [
          "I asked many people, none of whom knew the answer.",
          "Я спросил многих, но никто не знал ответа.",
          "После none of в относительном придаточном о людях нужно whom."
        ],
        [
          "She passed all her exams, which made her parents very happy.",
          "Она сдала все экзамены, чем очень обрадовала родителей.",
          "Which отсылает ко всему событию сдачи экзаменов."
        ]
      ],
      "e": [
        [
          "I have many friends, most of whom live abroad.",
          "У меня много друзей, большинство живёт за границей.",
          "Most of whom объединяет предложения; them who смешивает обычное и относительное местоимения."
        ],
        [
          "He apologised, which was nice.",
          "Он извинился, что было приятно.",
          "Which отсылает ко всему предыдущему действию; what так не соединяет части."
        ],
        [
          "I bought two books, both of which are great.",
          "Я купил две книги, и обе прекрасны.",
          "Both of which вводит относительное придаточное; both of them потребовало бы отдельное предложение или союз."
        ]
      ],
      "t": [
        [
          "Our flight was delayed, which was annoying.",
          "Наш рейс задержали, что было неприятно.",
          "Which относится к событию задержки целиком."
        ],
        [
          "I've got lots of photos, some of which are very old.",
          "У меня много фотографий, некоторые очень старые.",
          "Some of which связывает часть группы с уже названными photos."
        ]
      ],
      "w": [
        [
          "Our teacher cancelled the exam, which made everybody happy. We invited forty people, most of whom came. They brought lots of food, some of which we're still eating.",
          "Учитель отменил экзамен, что всех обрадовало. Мы пригласили сорок человек, большинство пришло. Они принесли много еды, часть которой мы ещё едим.",
          "Which может относиться к событию; most of whom — к людям; some of which — к еде."
        ]
      ]
    },
    "97": {
      "g": [
        [
          "Who's the man talking to Kate?",
          "Кто этот мужчина, разговаривающий с Кейт?",
          "Talking сокращает who is talking; действие выполняет сам мужчина."
        ],
        [
          "The boy injured in the accident is in hospital.",
          "Мальчик, пострадавший в аварии, находится в больнице.",
          "Injured сокращает who was injured и имеет пассивный смысл."
        ],
        [
          "Most of the goods made in this factory are exported.",
          "Большинство товаров, произведённых на этой фабрике, экспортируют.",
          "Made сокращает which are made: товары получают действие, не производят сами."
        ],
        [
          "The road connecting the two villages is narrow.",
          "Дорога, соединяющая две деревни, узкая.",
          "Connecting имеет активный смысл: дорога соединяет деревни."
        ],
        [
          "I was woken up by a bell ringing.",
          "Меня разбудил звон колокола.",
          "Ringing показывает действие самого колокола, сокращая which was ringing."
        ],
        [
          "The window broken by the storm has been repaired.",
          "Окно, разбитое бурей, починили.",
          "Broken — пассивная третья форма: окно было разбито, не разбивает само."
        ],
        [
          "People living in big cities often feel stressed.",
          "Люди, живущие в больших городах, часто испытывают стресс.",
          "Living сокращает who live/are living и имеет активный смысл."
        ],
        [
          "There are a lot of houses built in the 1960s here.",
          "Здесь много домов, построенных в шестидесятые.",
          "Built — третья форма с пассивным смыслом which were built."
        ]
      ],
      "e": [
        [
          "The girl dancing with Tom is my sister.",
          "Девушка, танцующая с Томом, — моя сестра.",
          "Dancing — активное сокращение who is dancing; danced выглядело бы пассивным, не передавало танец."
        ],
        [
          "The man standing at the bus stop was my neighbour.",
          "Мужчина на автобусной остановке был моим соседом.",
          "Standing сокращает who was standing; stood не используется для такого активного оборота."
        ],
        [
          "Cars produced in Germany are expensive.",
          "Машины, произведённые в Германии, дорогие.",
          "Produced имеет пассивный смысл; producing означало бы, что машины что-то производят сами."
        ]
      ],
      "t": [
        [
          "The man waiting for the bus was reading a newspaper.",
          "Мужчина, ожидавший автобус, читал газету.",
          "Waiting сокращает who was waiting и уточняет мужчину активным действием."
        ],
        [
          "The museum built in 1850 is now a hotel.",
          "Музей, построенный в 1850 году, теперь стал отелем.",
          "Built сокращает which was built и сохраняет пассивный смысл."
        ]
      ],
      "w": [
        [
          "In the photo you can see a girl sitting on a bench. The man standing next to her is holding a dog. There's a bike left against a tree and a car parked in the street.",
          "На фото девушка сидит на скамейке. Мужчина рядом держит собаку. У дерева оставлен велосипед, а на улице припаркована машина.",
          "Sitting/standing — активные процессы; left/parked — сокращённые пассивные описания предметов."
        ]
      ]
    },
    "98": {
      "g": [
        [
          "The film was very boring. I almost fell asleep.",
          "Фильм был очень скучным. Я чуть не уснул.",
          "Boring описывает то, что вызывает скуку; bored — состояние того, кому скучно."
        ],
        [
          "I was bored, so I went for a walk.",
          "Мне было скучно, поэтому я пошёл гулять.",
          "Bored — моё чувство; boring означало бы, что я сам скучный для других."
        ],
        [
          "Are you interested in art?",
          "Ты интересуешься искусством?",
          "Interested описывает испытываемый интерес; interesting — то, что вызывает его."
        ],
        [
          "It was an exciting match.",
          "Матч был захватывающим.",
          "Exciting описывает событие, вызывающее волнение; excited обычно описывает переживающего человека."
        ],
        [
          "She was surprised to see me.",
          "Она удивилась, увидев меня.",
          "Surprised — её чувство; surprising означало бы, что она сама вызывает удивление."
        ],
        [
          "The news was really shocking.",
          "Новость была шокирующей.",
          "Shocking — источник чувства; shocked описывало бы того, кто испытал шок."
        ],
        [
          "I'm tired after a long day at work.",
          "Я устал после долгого рабочего дня.",
          "Tired — состояние человека; tiring — то, что утомляет."
        ],
        [
          "This job is very tiring.",
          "Эта работа очень утомительная.",
          "Tiring вызывает усталость; tired обозначает состояние уставшего."
        ]
      ],
      "e": [
        [
          "I'm very interested in history.",
          "Я очень интересуюсь историей.",
          "Interested in — испытываю интерес; interesting описывало бы меня как интересного человека."
        ],
        [
          "The lesson was boring.",
          "Урок был скучным.",
          "Boring вызывает скуку; bored — чувство человека, не характеристика урока."
        ],
        [
          "I was so excited about the trip.",
          "Я очень радовался предстоящей поездке.",
          "Excited — испытываемое волнение; exciting — то, что его вызывает."
        ]
      ],
      "t": [
        [
          "The book was very interesting.",
          "Книга была очень интересной.",
          "Interesting характеризует источник интереса, а не чувство читателя."
        ],
        [
          "Everybody was surprised.",
          "Все удивились.",
          "Surprised описывает состояние людей, на которых повлияли результаты."
        ]
      ],
      "w": [
        [
          "I was really excited about the trip, but the first day was disappointing. The weather was depressing and I was bored. Then we found an amazing museum and I was fascinated.",
          "Я очень ждал поездку, но первый день разочаровал. Погода была угнетающей, и мне было скучно. Потом мы нашли потрясающий музей, и я был очарован.",
          "Excited/bored/fascinated — чувства; disappointing/depressing/amazing — то, что их вызывает."
        ]
      ]
    },
    "99": {
      "g": [
        [
          "She bought a beautiful red dress.",
          "Она купила красивое красное платье.",
          "Оценка beautiful обычно стоит перед цветом red; наречие beautifully не описывает существительное dress так."
        ],
        [
          "We stayed in a lovely old hotel.",
          "Мы остановились в чудесном старом отеле.",
          "Оценка lovely идёт перед возрастом old."
        ],
        [
          "You look tired. Are you OK?",
          "Ты выглядишь уставшим. Всё хорошо?",
          "Look описывает состояние подлежащего, поэтому прилагательное tired, не наречие tiredly."
        ],
        [
          "This soup smells good.",
          "Суп приятно пахнет.",
          "Smell как глагол-связка принимает прилагательное good для свойства супа."
        ],
        [
          "He has a big black dog.",
          "У него большая чёрная собака.",
          "Размер big обычно стоит перед цветом black."
        ],
        [
          "That sounds interesting.",
          "Звучит интересно.",
          "Sound как связка принимает прилагательное interesting, не наречие interestingly."
        ],
        [
          "It's a small wooden box.",
          "Это маленькая деревянная коробка.",
          "Размер small обычно идёт перед материалом wooden."
        ],
        [
          "The first two days were great.",
          "Первые два дня были прекрасными.",
          "Порядковое first ставится перед количественным two."
        ]
      ],
      "e": [
        [
          "She has a big black car.",
          "У неё большая чёрная машина.",
          "Обычный порядок: размер big, затем цвет black."
        ],
        [
          "This cake tastes delicious.",
          "Этот торт очень вкусный.",
          "Taste как связка описывает торт прилагательным delicious; deliciously описывало бы способ действия."
        ],
        [
          "The first two weeks were difficult.",
          "Первые две недели были трудными.",
          "Обычный порядок числительных first two, не two first."
        ]
      ],
      "t": [
        [
          "an old round wooden table",
          "Старый круглый деревянный стол.",
          "Порядок: возраст old, форма round, материал wooden."
        ],
        [
          "The music sounds nice.",
          "Музыка звучит приятно.",
          "После sound как связки используется прилагательное nice."
        ]
      ],
      "w": [
        [
          "My favourite thing is a lovely old brown leather bag. It looks a bit dirty, but it feels soft. Today I feel happy because the weather looks great.",
          "Любимая вещь — чудесная старая коричневая кожаная сумка. Выглядит немного грязной, но мягкая на ощупь. Сегодня я счастлив, потому что погода прекрасная.",
          "Lovely/old/brown/leather следуют обычному порядку; look/feel принимают прилагательные, описывающие состояние."
        ]
      ]
    },
    "100": {
      "g": [
        [
          "He's a careful driver.",
          "Он осторожный водитель.",
          "Careful описывает существительное driver, поэтому прилагательное."
        ],
        [
          "He drives carefully.",
          "Он водит осторожно.",
          "Carefully описывает способ действия drives, поэтому наречие; в написании сохраняются два l."
        ],
        [
          "Please speak slowly. I can't understand.",
          "Говори, пожалуйста, медленно. Не понимаю.",
          "В нейтральной учебной форме действие speak описывает наречие slowly; slowlly — неправильное написание."
        ],
        [
          "The exam was unbelievably difficult.",
          "Экзамен был невероятно трудным.",
          "Unbelievably усиливает прилагательное difficult, поэтому используется наречие."
        ],
        [
          "She sings beautifully.",
          "Она прекрасно поёт.",
          "Beautifully описывает действие sings; beautiful описывало бы существительное или состояние."
        ],
        [
          "I was badly injured in the accident.",
          "Я сильно пострадал в аварии.",
          "Badly описывает степень injured; bad — прилагательное, не наречие степени."
        ],
        [
          "Our holiday was too short. The time passed very quickly.",
          "Отпуск был слишком коротким. Время пролетело быстро.",
          "Quickly описывает действие passed; quicker выражало бы сравнение с другим случаем."
        ],
        [
          "Listen carefully to the instructions.",
          "Внимательно слушай инструкции.",
          "Carefully описывает, как слушать; careful само по себе прилагательное."
        ]
      ],
      "e": [
        [
          "He speaks English very well.",
          "Он очень хорошо говорит по-английски.",
          "Действие speaks описывает наречие well; good обычно описывает существительное."
        ],
        [
          "She worked very carefully.",
          "Она работала очень аккуратно.",
          "Worked требует наречие способа carefully, а не прилагательное careful."
        ],
        [
          "It's a terribly cold day.",
          "День ужасно холодный.",
          "Terribly усиливает прилагательное cold; terrible описывало бы существительное непосредственно."
        ]
      ],
      "t": [
        [
          "She runs quickly.",
          "Она быстро бегает.",
          "Прилагательное quick перед runner заменяется наречием quickly после runs."
        ],
        [
          "He sings badly.",
          "Он плохо поёт.",
          "Bad перед singer превращается в наречие badly после sings."
        ]
      ],
      "w": [
        [
          "My brother drives fast but carefully. My teacher speaks slowly and clearly. My mum cooks brilliantly, but she always works too hard in the kitchen.",
          "Брат водит быстро, но осторожно. Учитель говорит медленно и ясно. Мама прекрасно готовит, но слишком много трудится на кухне.",
          "Fast — наречие без -ly; carefully, slowly, clearly и brilliantly описывают способы действий."
        ]
      ]
    },
    "101": {
      "g": [
        [
          "She plays the piano very well.",
          "Она очень хорошо играет на пианино.",
          "Действие plays описывает наречие well; good — обычно прилагательное."
        ],
        [
          "He works very hard.",
          "Он очень усердно работает.",
          "Hard — наречие «усердно»; hardly означает «едва, почти не»."
        ],
        [
          "I hardly know him. We've met only once.",
          "Я его почти не знаю. Мы встречались один раз.",
          "Hardly означает «почти не»; hard не передаёт отрицательный смысл."
        ],
        [
          "The train arrived late.",
          "Поезд прибыл поздно.",
          "Late — наречие «поздно»; lately означает «в последнее время»."
        ],
        [
          "Have you seen Tom lately?",
          "Ты видел Тома в последнее время?",
          "Lately — недавний период до сейчас; late обозначает опоздание или поздний час."
        ],
        [
          "Don't drive so fast.",
          "Не езжай так быстро.",
          "Fast само является наречием; стандартной формы fastly нет."
        ],
        [
          "I'm not feeling well today. I think I've got flu.",
          "Сегодня я плохо себя чувствую. Кажется, грипп.",
          "Well обычно описывает здоровье; good тоже возможно после feel, с более общим смыслом самочувствия.",
          [
            "good"
          ]
        ],
        [
          "There's hardly any milk left.",
          "Молока почти не осталось.",
          "Hardly any означает «почти никакого»; hard не имеет этого отрицательного значения."
        ]
      ],
      "e": [
        [
          "She speaks French well.",
          "Она хорошо говорит по-французски.",
          "Well — наречие способа после speaks; good обычно описывает качество предмета."
        ],
        [
          "He works hard every day.",
          "Он усердно работает каждый день.",
          "Hard означает усердно; hardly меняло бы смысл на «почти не работает»."
        ],
        [
          "I got up late this morning.",
          "Сегодня утром я поздно встал.",
          "Late обозначает позднее время; lately — недавний период, не час подъёма."
        ]
      ],
      "t": [
        [
          "She swims well.",
          "Она хорошо плавает.",
          "Good перед swimmer заменяется наречием well после swims."
        ],
        [
          "There was hardly any food.",
          "Еды почти не было.",
          "Hardly any передаёт почти нулевое количество."
        ]
      ],
      "w": [
        [
          "I speak English quite well, but I hardly ever speak it at work. I work hard during the week. Lately I've been going to bed late, so I'm always tired.",
          "Говорю по-английски довольно хорошо, но на работе почти не использую его. В будни усердно работаю. В последнее время поздно ложусь и постоянно устаю.",
          "Well — хорошо; hardly ever — почти никогда; hard — усердно; lately — в последнее время; late — поздно."
        ]
      ]
    },
    "102": {
      "g": [
        [
          "It was such nice weather that we went to the beach.",
          "Погода была такой хорошей, что мы поехали на пляж.",
          "Such + nice weather: есть существительное weather, оно неисчисляемое, поэтому без a."
        ],
        [
          "The film was so boring.",
          "Фильм был таким скучным.",
          "Перед отдельным прилагательным boring используется so; such требует существительное."
        ],
        [
          "She's such a good teacher.",
          "Она такой хороший учитель.",
          "Such a + good teacher: существительное исчисляемое единственное, поэтому нужен a."
        ],
        [
          "I'm so tired I could sleep for a week.",
          "Я так устал, что мог бы спать неделю.",
          "So усиливает отдельное прилагательное tired; that перед результатом здесь можно опустить."
        ],
        [
          "They are such nice people.",
          "Они такие приятные люди.",
          "Such + nice people: существительное множественное, поэтому без a."
        ],
        [
          "Why are you driving so fast?",
          "Почему ты так быстро едешь?",
          "So усиливает наречие fast; such потребовало бы существительное."
        ],
        [
          "There were so many people that we couldn't get in.",
          "Людей было так много, что мы не смогли войти.",
          "Перед количеством many используется so many, не such many."
        ],
        [
          "It was such a long journey.",
          "Это была такая долгая поездка.",
          "Such a + long journey: существительное в единственном числе требует a."
        ]
      ],
      "e": [
        [
          "It was such a good film.",
          "Это был такой хороший фильм.",
          "С существительным — such a good film; без него — the film was so good."
        ],
        [
          "He's such a nice man.",
          "Он такой приятный человек.",
          "Such a nice man: после so нельзя просто добавить существительное man в этой конструкции."
        ],
        [
          "I've never seen such a big house.",
          "Я никогда не видел такого большого дома.",
          "House исчисляемое единственное: such a big house."
        ]
      ],
      "t": [
        [
          "The book was so interesting that I read it in one day.",
          "Книга была такой интересной, что я прочитал её за день.",
          "So + interesting + that связывает степень признака с результатом."
        ],
        [
          "It was such a lovely day that we went for a walk.",
          "День был таким прекрасным, что мы пошли гулять.",
          "Such a + lovely day + that: степень выражается при наличии существительного."
        ]
      ],
      "w": [
        [
          "It was such a beautiful morning that I decided to walk to work. The air was so fresh! But the evening was so cold that I had to take a taxi home.",
          "Утро было таким прекрасным, что я пошёл на работу пешком. Воздух был таким свежим! Но вечером стало так холодно, что пришлось брать такси.",
          "Such a beautiful morning — с существительным; so fresh/cold — отдельные прилагательные."
        ]
      ]
    },
    "103": {
      "g": [
        [
          "She's not old enough to drive.",
          "Она ещё недостаточно взрослая для вождения.",
          "Enough ставится после прилагательного old; not old enough выражает недостаточную степень."
        ],
        [
          "I haven't got enough money to buy it.",
          "Мне не хватает денег это купить.",
          "Enough стоит перед существительным money."
        ],
        [
          "This coffee is too hot to drink.",
          "Кофе слишком горячий, чтобы пить.",
          "Too hot to drink означает, что степень мешает действию; enough обычно стоит после прилагательного."
        ],
        [
          "The box was too heavy for me to carry.",
          "Коробка была слишком тяжёлой, чтобы я её нёс.",
          "Исполнитель инфинитива вводится for me, затем to carry."
        ],
        [
          "He didn't run fast enough to win.",
          "Он бежал недостаточно быстро для победы.",
          "Enough ставится после наречия fast и показывает достаточность для результата."
        ],
        [
          "There aren't enough chairs for everybody.",
          "Стульев на всех не хватает.",
          "Enough стоит перед существительным chairs."
        ],
        [
          "It's too cold to go swimming.",
          "Слишком холодно для плавания.",
          "Too cold to go выражает чрезмерную степень, мешающую действию."
        ],
        [
          "Is the water warm enough to swim in?",
          "Вода достаточно тёплая для купания?",
          "Enough после warm показывает нужную степень; to swim in сохраняет предлог in."
        ]
      ],
      "e": [
        [
          "I'm not tall enough to reach it.",
          "Я недостаточно высокий, чтобы дотянуться.",
          "После прилагательного tall ставится enough, не перед ним."
        ],
        [
          "This bag is too heavy for me to carry.",
          "Эта сумка слишком тяжёлая, чтобы я её нёс.",
          "Too heavy прямо выражает невозможность носить; very heavy только усиливает тяжесть без этого вывода."
        ],
        [
          "We have enough time.",
          "У нас достаточно времени.",
          "Перед существительным: enough time, обычный нейтральный порядок."
        ]
      ],
      "t": [
        [
          "This tea is too hot to drink.",
          "Этот чай слишком горячий, чтобы его пить.",
          "Too hot to drink связывает чрезмерную температуру с невозможностью действия."
        ],
        [
          "He isn't old enough to join the army.",
          "Он недостаточно взрослый, чтобы пойти в армию.",
          "Not old enough to join выражает недостаточную степень; enough после old."
        ]
      ],
      "w": [
        [
          "My flat isn't big enough for a party. The kitchen is too small to have dinner in. I'd like to move, but houses here are too expensive for me to buy.",
          "Квартира недостаточно большая для вечеринки. Кухня слишком маленькая для ужина. Хочу переехать, но жильё здесь слишком дорогое.",
          "Not big enough — недостаток; too small/expensive — превышение подходящего уровня; enough после прилагательного."
        ]
      ]
    },
    "104": {
      "g": [
        [
          "The film was quite good. I enjoyed it.",
          "Фильм был довольно хорошим. Мне понравился.",
          "Quite усиливает прилагательное good; a не нужен без последующего существительного."
        ],
        [
          "It's quite a nice day.",
          "День довольно приятный.",
          "Обычный британский порядок quite a + nice day."
        ],
        [
          "I'm quite sure I locked the door. (= completely)",
          "Я совершенно уверен, что запер дверь.",
          "С sure в значении полной уверенности quite означает «совершенно», не только «довольно»."
        ],
        [
          "The exam was rather difficult. I'm not sure I passed.",
          "Экзамен был довольно трудным. Не уверен, что сдал.",
          "Rather усиливает difficult, часто с неприятным или неожиданным оттенком; a без существительного не нужен."
        ],
        [
          "You're quite right. I was wrong.",
          "Ты совершенно прав. Я ошибался.",
          "Quite right означает полную правильность; a перед отдельным right не нужен."
        ],
        [
          "She speaks English pretty well.",
          "Она довольно хорошо говорит по-английски.",
          "Pretty усиливает наречие well; артикль a здесь не требуется."
        ],
        [
          "It's rather a long way to walk.",
          "Пешком идти довольно далеко.",
          "Rather a + long way: после a идёт существительное way с определением."
        ],
        [
          "I quite like jazz, but I prefer rock.",
          "Мне довольно нравится джаз, но рок предпочитаю.",
          "Quite может усиливать глагол like; артикль a перед ним не используется."
        ]
      ],
      "e": [
        [
          "It's quite a good film.",
          "Это довольно хороший фильм.",
          "В обычном британском порядке quite a good film; fairly/pretty стоят после a."
        ],
        [
          "I quite agree with you.",
          "Я полностью с тобой согласен.",
          "Agree — глагол, поэтому I quite agree без am."
        ],
        [
          "She's quite an intelligent woman, but rather lazy.",
          "Она довольно умная женщина, но довольно ленивая.",
          "Quite an стоит перед существительным woman; после rather lazy отдельного a нет, потому что существительного нет."
        ]
      ],
      "t": [
        [
          "The restaurant was quite good.",
          "Ресторан был довольно хорошим.",
          "Quite good выражает умеренно положительную оценку; это не обязательно «отличный»."
        ],
        [
          "I'm quite sure.",
          "Я совершенно уверен.",
          "Quite sure/certain может означать полную, стопроцентную уверенность."
        ]
      ],
      "w": [
        [
          "The film was pretty good, but rather long. The book I'm reading is quite interesting. The new restaurant was fairly expensive, and the service was rather slow.",
          "Фильм был довольно хорошим, но длинноватым. Книга достаточно интересная. Новый ресторан дороговат, а обслуживание медленное.",
          "Pretty/quite/fairly/rather выражают степень; rather часто подчёркивает нежелательное или неожиданное."
        ]
      ]
    },
    "105": {
      "g": [
        [
          "This car is cheaper than that one.",
          "Эта машина дешевле той.",
          "У короткого cheap сравнительная форма cheaper, без дополнительного more."
        ],
        [
          "Russian is more difficult than English.",
          "Русский сложнее английского.",
          "Для длинного difficult сравнительная форма more difficult, без окончания -er."
        ],
        [
          "My brother is older than me.",
          "Мой брат старше меня.",
          "Older используется в сравнении с than; elder обычно перед существительным для родственных отношений."
        ],
        [
          "The weather today is worse than yesterday.",
          "Сегодня погода хуже, чем вчера.",
          "У bad неправильная сравнительная форма worse, не badder."
        ],
        [
          "Can you speak more slowly, please?",
          "Можешь говорить помедленнее?",
          "У наречия slowly сравнительная форма more slowly."
        ],
        [
          "Your English is better than mine.",
          "Твой английский лучше моего.",
          "У good неправильная сравнительная форма better."
        ],
        [
          "This box is heavier than that one.",
          "Эта коробка тяжелее той.",
          "Heavy меняет y на i перед -er: heavier."
        ],
        [
          "It's more expensive to live in London than in Leeds.",
          "В Лондоне жить дороже, чем в Лидсе.",
          "Длинное expensive сравниваем через more expensive."
        ]
      ],
      "e": [
        [
          "My house is bigger than yours.",
          "Мой дом больше твоего.",
          "Big удваивает конечную g перед -er: bigger, без more."
        ],
        [
          "This test is easier than the last one.",
          "Этот тест легче предыдущего.",
          "Easy меняет y на i: easier."
        ],
        [
          "He is taller than his father.",
          "Он выше своего отца.",
          "Taller уже является сравнительной степенью; дополнительный more не нужен."
        ]
      ],
      "t": [
        [
          "A bike is cheaper than a car.",
          "Велосипед дешевле машины.",
          "Cheap → cheaper; than вводит вторую сторону сравнения."
        ],
        [
          "Paris is further from Moscow than Berlin.",
          "Париж дальше от Москвы, чем Берлин.",
          "Для расстояния допустимы further и farther; than вводит сравнение."
        ]
      ],
      "w": [
        [
          "Moscow is bigger and more expensive than my home town. The air in my town is cleaner and life is quieter. But in Moscow the public transport is better.",
          "Москва больше и дороже моего города. У нас чище воздух и тише жизнь, но в Москве лучше общественный транспорт.",
          "Bigger/cleaner/quieter — -er; more expensive — more; better — неправильная форма."
        ]
      ]
    },
    "106": {
      "g": [
        [
          "This hotel is much better than the last one.",
          "Этот отель намного лучше предыдущего.",
          "Сравнительную better усиливает much; very обычно не ставится прямо перед сравнительной степенью."
        ],
        [
          "Can you walk a bit faster?",
          "Можешь идти чуть быстрее?",
          "A bit усиливает faster и означает небольшую разницу; a few требует исчисляемое существительное."
        ],
        [
          "It's getting colder and colder.",
          "Становится всё холоднее.",
          "Повтор comparative and comparative: colder and colder показывает нарастающее изменение."
        ],
        [
          "The more I study, the more I learn.",
          "Чем больше занимаюсь, тем больше узнаю.",
          "Связанное изменение: the more..., the more...; the необходимо в обеих частях."
        ],
        [
          "Is your headache any better?",
          "Голова болит хоть немного меньше?",
          "Any better спрашивает о любой степени улучшения."
        ],
        [
          "The sooner we leave, the sooner we'll arrive.",
          "Чем раньше уедем, тем раньше приедем.",
          "The sooner..., the sooner... связывает два изменяющихся результата."
        ],
        [
          "Her English is getting better and better.",
          "Её английский становится всё лучше.",
          "Better and better — повтор неправильной сравнительной формы good."
        ],
        [
          "The new phone is far more expensive than the old one.",
          "Новый телефон намного дороже старого.",
          "Far усиливает сравнительную more expensive; это не дополнительное сравнение через very."
        ]
      ],
      "e": [
        [
          "This is much better than before.",
          "Это намного лучше прежнего.",
          "Much/a lot/far усиливают better; very better — неверное стандартное сочетание."
        ],
        [
          "Life is getting more and more expensive.",
          "Жизнь становится всё дороже.",
          "Для длинного прилагательного повторяем more: more and more expensive."
        ],
        [
          "The more you practise, the better you get.",
          "Чем больше практикуешься, тем лучше получается.",
          "В обеих связанных сравнительных частях используется the."
        ]
      ],
      "t": [
        [
          "Traffic is getting worse and worse.",
          "Дорожная ситуация всё хуже.",
          "Worse and worse выражает постепенное усиление плохого состояния."
        ],
        [
          "The earlier you get up, the more you can do.",
          "Чем раньше встаёшь, тем больше успеваешь.",
          "The earlier..., the more... связывает ранний подъём с объёмом действий."
        ]
      ],
      "w": [
        [
          "My English is getting better and better. Prices are getting higher and higher. The more I read, the more I want to read. The older I get, the less I worry.",
          "Английский становится всё лучше, цены растут. Чем больше читаю, тем больше хочется. Чем старше становлюсь, тем меньше переживаю.",
          "Better and better/higher and higher — нарастание; the more/older..., the more/less... — взаимосвязь."
        ]
      ]
    },
    "107": {
      "g": [
        [
          "My sister is as tall as me.",
          "Моя сестра такого же роста, как я.",
          "Равенство: as + tall + as; than используется для сравнительной степени."
        ],
        [
          "This film isn't as good as the book.",
          "Фильм не так хорош, как книга.",
          "Not as good as выражает неравенство через отрицание конструкции as... as."
        ],
        [
          "Your phone is the same as mine.",
          "Твой телефон такой же, как мой.",
          "Устойчивое the same as, не same like или than."
        ],
        [
          "He's taller than me.",
          "Он выше меня.",
          "Сравнительная taller требует than, а не as."
        ],
        [
          "I can't run as fast as you.",
          "Я не могу бегать так быстро, как ты.",
          "As fast as — равенство скорости; после первого as в этой конструкции нужен второй as."
        ],
        [
          "It's not as cold today as it was yesterday.",
          "Сегодня не так холодно, как вчера.",
          "Not as cold as: обычная форма отрицательного сравнения равенства."
        ],
        [
          "She earns twice as much as I do.",
          "Она зарабатывает вдвое больше меня.",
          "Twice as much as выражает кратность; обе связи строятся через as."
        ],
        [
          "Your bag is similar to mine.",
          "Твоя сумка похожа на мою.",
          "Устойчивое similar to; the same as — другая конструкция."
        ]
      ],
      "e": [
        [
          "She's as old as me.",
          "Она моего возраста.",
          "As old as, не as old than; me и I am допустимы как окончания сравнения."
        ],
        [
          "My car is the same as yours.",
          "Моя машина такая же, как твоя.",
          "После the same используется as."
        ],
        [
          "He's not as clever as his brother.",
          "Он не так умён, как его брат.",
          "Отрицательные not as/so clever as допустимы; than здесь не используется."
        ]
      ],
      "t": [
        [
          "Tom is as tall as Ann.",
          "Том такого же роста, как Энн.",
          "Одинаковый рост выражается as tall as."
        ],
        [
          "The train isn't as cheap as the bus.",
          "Поезд не такой дешёвый, как автобус.",
          "Not as cheap as передаёт, что поезд дороже; прилагательное cheap не меняется в comparative."
        ]
      ],
      "w": [
        [
          "I'm not as tall as my brother, but I'm as strong as him. My eyes are the same colour as my mother's. My hobbies are very different from my sister's.",
          "Я ниже брата, но такой же сильный. Цвет глаз как у мамы. Увлечения сильно отличаются от сестриных.",
          "As... as — равенство; not as... as — неравенство; the same as и different from — устойчивые связи."
        ]
      ]
    },
    "108": {
      "g": [
        [
          "It's the longest river in the world.",
          "Это самая длинная река в мире.",
          "Превосходная форма короткого long — the longest, не most long."
        ],
        [
          "This is the most interesting book I've ever read.",
          "Это самая интересная книга, которую я читал.",
          "Длинное interesting: the most interesting; the выделяет верхнюю степень среди группы."
        ],
        [
          "He's the best player in the team.",
          "Он лучший игрок команды.",
          "Перед группой обычно in the team, не of the team."
        ],
        [
          "It was the happiest day of my life.",
          "Это был самый счастливый день моей жизни.",
          "С периодом my life обычно of; in используется для места или группы."
        ],
        [
          "What's the worst film you've ever seen?",
          "Какой худший фильм ты видел?",
          "У bad неправильная превосходная форма the worst."
        ],
        [
          "That was the best meal I've ever had.",
          "Это была лучшая еда, которую я когда-либо пробовал.",
          "Ever расширяет сравнение на весь опыт до сейчас; never означало бы отсутствие опыта."
        ],
        [
          "Everest is the highest mountain in the world.",
          "Эверест — самая высокая гора мира.",
          "Короткое high образует the highest; higher только сравнивает два уровня."
        ],
        [
          "She's one of the richest women in the country.",
          "Она одна из богатейших женщин страны.",
          "После one of the используется превосходная richest и множественное women."
        ]
      ],
      "e": [
        [
          "It's the cheapest hotel in town.",
          "Это самый дешёвый отель города.",
          "Короткое cheap образует the cheapest; most cheap не является обычной учебной формой."
        ],
        [
          "She's the tallest girl in the class.",
          "Она самая высокая девочка в классе.",
          "Для группы или места сравнения используется in the class."
        ],
        [
          "This is the best day of my life.",
          "Это лучший день моей жизни.",
          "The best — превосходная форма; better только сравнительная и не выделяет максимум всей жизни."
        ]
      ],
      "t": [
        [
          "Russia is the biggest country in the world.",
          "Россия — самая большая страна мира.",
          "Big → biggest с удвоением g; the выделяет максимум, in the world задаёт группу."
        ],
        [
          "It's the best film I've ever seen.",
          "Это лучший фильм, который я когда-либо видел.",
          "The best + Present perfect I've ever seen сравнивает со всем опытом до сейчас."
        ]
      ],
      "w": [
        [
          "The most beautiful place I've ever been to is Lake Baikal. The best book I've ever read is 'The Master and Margarita'. The worst day of my life was my first driving test.",
          "Самое красивое место, где я был, — Байкал. Лучшая прочитанная книга — «Мастер и Маргарита». Худший день был на первом экзамене по вождению.",
          "The most beautiful — длинное прилагательное; the best/worst — неправильные формы; ever сравнивает со всем опытом."
        ]
      ]
    },
    "109": {
      "g": [
        [
          "I like football very much.",
          "Мне очень нравится футбол.",
          "Нейтральный порядок: like + football, затем very much. Обычно дополнение не отделяют от like."
        ],
        [
          "She speaks English well.",
          "Она хорошо говорит по-английски.",
          "Обычный порядок: speaks + English, затем наречие well."
        ],
        [
          "We went to the cinema last night.",
          "Вчера вечером мы ходили в кино.",
          "Обычно место to the cinema ставится перед временем last night; иной порядок может менять акцент."
        ],
        [
          "I lost my keys again.",
          "Я снова потерял ключи.",
          "В обычном порядке my keys стоит сразу после lost, затем again."
        ],
        [
          "He goes to work every day.",
          "Он каждый день ходит на работу.",
          "Нейтральный порядок обстоятельств: место to work, затем время every day."
        ],
        [
          "Did you read the newspaper carefully?",
          "Ты внимательно прочитал газету?",
          "Обычно read и короткое дополнение the newspaper идут вместе, затем carefully."
        ],
        [
          "I'll be at home this evening.",
          "Сегодня вечером я буду дома.",
          "Обычный нейтральный порядок: место at home, затем время this evening."
        ],
        [
          "We arrived in Rome on Monday.",
          "Мы приехали в Рим в понедельник.",
          "Обычно место in Rome предшествует времени on Monday; обратный порядок тоже возможен для акцента.",
          [
            "We arrived on Monday in Rome."
          ]
        ]
      ],
      "e": [
        [
          "I like chocolate very much.",
          "Мне очень нравится шоколад.",
          "Обычно like и chocolate стоят вместе; very much в конце или really перед like."
        ],
        [
          "She came to work late yesterday.",
          "Вчера она опоздала на работу.",
          "Нейтральный порядок: came to work, затем late и yesterday."
        ],
        [
          "Tom plays the piano every day.",
          "Том каждый день играет на пианино.",
          "Обычно plays и the piano не разделяются; every day ставится после дополнения."
        ]
      ],
      "t": [
        [
          "I always leave my phone at home.",
          "Я всегда оставляю телефон дома.",
          "Always — перед основным глаголом; my phone — после leave; at home — место в конце."
        ],
        [
          "We went to the theatre last week.",
          "На прошлой неделе мы ходили в театр.",
          "Нейтральный порядок: глагол went, место to the theatre, время last week."
        ]
      ],
      "w": [
        [
          "I got up at seven and went to the office at eight. I answered emails all morning. I met my friends in a café at lunchtime. I got home late in the evening.",
          "Я встал в семь и в восемь пошёл в офис. Всё утро отвечал на письма. В обед встретился с друзьями в кафе. Вечером поздно вернулся домой.",
          "Глагол и дополнение обычно рядом; место предшествует времени, когда оба обстоятельства стоят в конце."
        ]
      ]
    },
    "110": {
      "g": [
        [
          "I always get up at seven.",
          "Я всегда встаю в семь.",
          "Always обычно перед основным get up; порядок I always get up нейтральный."
        ],
        [
          "She is always late.",
          "Она всегда опаздывает.",
          "С be обычная позиция always после is; always is тоже возможно при усилении is.",
          [
            "always is"
          ]
        ],
        [
          "I have never been to Spain.",
          "Я никогда не был в Испании.",
          "Обычная позиция never — после первого вспомогательного have; never have been возможно с иным акцентом.",
          [
            "never have been"
          ]
        ],
        [
          "We usually go out on Fridays.",
          "По пятницам мы обычно куда-нибудь выходим.",
          "Usually обычно ставится перед основным go out."
        ],
        [
          "Tom can never remember my name.",
          "Том никак не может запомнить моё имя.",
          "Обычная позиция never после can; never can тоже возможно при усилении невозможности.",
          [
            "never can"
          ]
        ],
        [
          "I will probably be late.",
          "Вероятно, я опоздаю.",
          "Probably обычно после will; probably will be тоже допустимо с другим акцентом.",
          [
            "probably will be"
          ]
        ],
        [
          "They both live in Moscow.",
          "Они оба живут в Москве.",
          "Both обычно ставится перед основным live; lives не согласуется с they."
        ],
        [
          "We were all very tired.",
          "Мы все очень устали.",
          "С be обычный порядок were all; we all were тоже грамматически возможен.",
          [
            "all were"
          ]
        ]
      ],
      "e": [
        [
          "I always go to bed late.",
          "Я всегда поздно ложусь.",
          "Always обычно ставится перед основным go, а не после него."
        ],
        [
          "She has never been to Paris.",
          "Она никогда не была в Париже.",
          "Never обычно после первого вспомогательного has, перед been."
        ],
        [
          "He is usually very busy.",
          "Он обычно очень занят.",
          "Нейтральная позиция usually — после is; перед is возможно при усилении."
        ]
      ],
      "t": [
        [
          "We often go to the cinema.",
          "Мы часто ходим в кино.",
          "Often обычно перед основным go."
        ],
        [
          "I have already done my homework.",
          "Я уже сделал домашнее задание.",
          "Already обычно после have и перед done; I've — сокращённое I have."
        ]
      ],
      "w": [
        [
          "I usually wake up early, but I'm always tired. I never drink coffee after six. I have sometimes been late for work, but my boss has never complained.",
          "Обычно я рано просыпаюсь, но всегда уставший. После шести кофе никогда не пью. Иногда опаздывал на работу, но начальник никогда не жаловался.",
          "Usually/never — перед основным глаголом; always — после am; sometimes/never — после первого have/has."
        ]
      ]
    },
    "111": {
      "g": [
        [
          "It's 10 o'clock and Tom is still in bed.",
          "Уже десять часов, а Том всё ещё в постели.",
          "Still показывает продолжающееся состояние; already означало бы, что он уже лёг раньше ожидания."
        ],
        [
          "Have you finished your homework yet?",
          "Ты уже закончил домашнее задание?",
          "Yet в конце спрашивает о результате к сейчас; already тоже возможно с удивлением более раннему завершению.",
          [
            "already"
          ]
        ],
        [
          "I've already seen this film. Let's watch something else.",
          "Я уже видел фильм. Давай посмотрим другой.",
          "Already сообщает о состоявшемся действии; yet обычно используется в вопросе или отрицании."
        ],
        [
          "I haven't decided yet.",
          "Я ещё не решил.",
          "Yet в конце отрицания означает, что результат пока не достигнут."
        ],
        [
          "She doesn't live here any more.",
          "Она больше здесь не живёт.",
          "Doesn't... any more выражает прекращение; no more добавило бы второе отрицание."
        ],
        [
          "He no longer works for us.",
          "Он больше на нас не работает.",
          "No longer уже отрицательно по смыслу; works остаётся положительной формой."
        ],
        [
          "I still haven't received the letter.",
          "Я всё ещё не получил письмо.",
          "Still перед отрицанием подчёркивает продолжающееся отсутствие результата."
        ],
        [
          "Is it still raining? — Yes, it hasn't stopped.",
          "Дождь всё ещё идёт? — Да, не прекратился.",
          "Still спрашивает о продолжении процесса; already обозначало бы неожиданное начало."
        ]
      ],
      "e": [
        [
          "Have you finished your work yet?",
          "Ты уже закончил работу?",
          "Yet обычно в конце; already перед finished подчёркивает удивление раннему результату."
        ],
        [
          "I don't work there any longer.",
          "Я больше там не работаю.",
          "Либо don't... any longer/more, либо no longer + положительный глагол."
        ],
        [
          "He still lives with his parents.",
          "Он всё ещё живёт с родителями.",
          "Still показывает продолжающееся состояние; yet не ставится так перед lives."
        ]
      ],
      "t": [
        [
          "Tom doesn't live in Paris any more.",
          "Том больше не живёт в Париже.",
          "Doesn't live... any more сообщает о прекращении прежней ситуации."
        ],
        [
          "The film has already started.",
          "Фильм уже начался.",
          "Already подчёркивает результат раньше ожидания; обычная позиция после has."
        ]
      ],
      "w": [
        [
          "I still live in the same city, but I no longer work at the bank. I don't smoke any more. I've already visited ten countries, but I haven't been to Asia yet.",
          "Я всё ещё живу в том же городе, но больше не работаю в банке и не курю. Уже посетил десять стран, но в Азии ещё не был.",
          "Still — продолжение; no longer/not any more — прекращение; already — результат; yet — пока не достигнутый результат."
        ]
      ]
    },
    "112": {
      "g": [
        [
          "Everybody came to the party, even Tom, who never goes out.",
          "На вечеринку пришли все, даже Том, который никогда никуда не выходит.",
          "Even выделяет неожиданный случай; also просто добавляло бы ещё участника."
        ],
        [
          "He didn't even say goodbye.",
          "Он даже не попрощался.",
          "Not even подчёркивает отсутствие минимально ожидаемого действия; ever означает «когда-либо»."
        ],
        [
          "The hotel was great, and the food was even better.",
          "Отель был прекрасным, а еда ещё лучше.",
          "Even усиливает сравнительную better; even good не передаёт дополнительное сравнение."
        ],
        [
          "I'll go even if it rains.",
          "Я пойду, даже если будет дождь.",
          "Even if вводит условие, которое не изменит решение."
        ],
        [
          "She can't even boil an egg.",
          "Она даже яйцо сварить не умеет.",
          "Not even подчёркивает, что не получается и простое действие."
        ],
        [
          "Even though it was cold, we went swimming.",
          "Хотя было холодно, мы пошли плавать.",
          "Even though вводит реальный факт вопреки результату; even if — возможное условие."
        ],
        [
          "It's hot today, but tomorrow will be even hotter.",
          "Сегодня жарко, а завтра будет ещё жарче.",
          "Even усиливает сравнительную hotter."
        ],
        [
          "Nobody knows the answer — even the teacher doesn't know.",
          "Никто не знает ответ: даже учитель.",
          "Even подчёркивает неожиданность именно для учителя."
        ]
      ],
      "e": [
        [
          "He didn't even call me.",
          "Он даже не позвонил мне.",
          "Нейтральный порядок didn't even call; even стоит после вспомогательного didn't."
        ],
        [
          "I'll finish it even if it takes all night.",
          "Я закончу, даже если это займёт всю ночь.",
          "Для условия нужен союз even if, не одиночный even перед предложением."
        ],
        [
          "Even though she was tired, she kept working.",
          "Хотя она устала, продолжала работать.",
          "Even though вводит реальную уступку; одиночный even не соединяет эти части."
        ]
      ],
      "t": [
        [
          "He even speaks Chinese.",
          "Он даже говорит по-китайски.",
          "Even выделяет неожиданный навык среди множества языков."
        ],
        [
          "The book was even better.",
          "Книга была ещё лучше.",
          "Even better усиливает уже сравнительную оценку."
        ]
      ],
      "w": [
        [
          "My grandfather is amazing. He's 90, but he even goes swimming in winter. He doesn't even wear glasses. Even when it snows, he walks five kilometres every day.",
          "Дедушка удивительный: ему девяносто, а он даже зимой плавает. Даже очки не носит. Даже когда идёт снег, ежедневно проходит пять километров.",
          "Even выделяет неожиданный факт; not even усиливает отрицание; even when — неожиданное условие времени."
        ]
      ]
    },
    "113": {
      "g": [
        [
          "Although it was raining, we went out.",
          "Хотя шёл дождь, мы вышли.",
          "Although вводит полное предложение it was raining; despite потребовало бы существительное или -ing."
        ],
        [
          "Despite the rain, we went out.",
          "Несмотря на дождь, мы вышли.",
          "Despite стоит перед существительным the rain; although требовало бы полного предложения."
        ],
        [
          "In spite of being tired, she finished the work.",
          "Несмотря на усталость, она закончила работу.",
          "Устойчивое in spite of + being tired; of не опускается."
        ],
        [
          "I didn't get the job although I had all the qualifications.",
          "Я не получил работу, хотя имел все нужные квалификации.",
          "Although вводит полное I had; despite не соединяет так два предложения."
        ],
        [
          "She went to work despite feeling ill.",
          "Она пошла на работу, хотя плохо себя чувствовала.",
          "Despite + feeling — предлог и -ing; although потребовало бы she felt."
        ],
        [
          "The house isn't very nice. I like the garden though.",
          "Дом не очень хороший. Зато сад мне нравится.",
          "Though может стоять в конце со значением «однако»; although так обычно не используется."
        ],
        [
          "Even though I was hungry, I didn't eat anything.",
          "Хотя я был голоден, ничего не ел.",
          "Even though вводит полное предложение и усиливает уступку."
        ],
        [
          "We enjoyed the trip in spite of the bad weather.",
          "Поездка понравилась несмотря на плохую погоду.",
          "После in spite of нужна именная группа the bad weather, не самостоятельное предложение."
        ]
      ],
      "e": [
        [
          "Although it was cold, we went swimming.",
          "Хотя было холодно, мы плавали.",
          "Although + it was cold или despite + the cold; разные типы дополнения после связок."
        ],
        [
          "Although she is rich, she isn't happy.",
          "Хотя она богата, не счастлива.",
          "Although вводит she is rich; in spite of/despite требуют being rich."
        ],
        [
          "Despite the traffic, we arrived on time.",
          "Несмотря на пробки, мы приехали вовремя.",
          "Despite без of; of требуется только в in spite of."
        ]
      ],
      "t": [
        [
          "Although I was tired, I couldn't sleep.",
          "Хотя я устал, не мог заснуть.",
          "Although связывает два полных предложения с уступительным смыслом."
        ],
        [
          "Despite the terrible weather, we had a good time.",
          "Несмотря на ужасную погоду, мы хорошо провели время.",
          "Despite требует именную группу the terrible weather."
        ]
      ],
      "w": [
        [
          "Although I was very nervous, I gave a presentation in English. Despite a few mistakes, everybody understood me. In spite of being tired, I felt really proud.",
          "Хотя я сильно нервничал, выступил на английском. Несмотря на ошибки, все поняли. Хоть и устал, очень гордился собой.",
          "Although — предложение; despite — существительное; in spite of — существительное или -ing."
        ]
      ]
    },
    "114": {
      "g": [
        [
          "Take an umbrella in case it rains.",
          "Возьми зонт на случай дождя.",
          "In case означает подготовиться заранее; if означало бы брать зонт только при выполнении условия."
        ],
        [
          "I'll write down the address in case I forget it.",
          "Я запишу адрес на случай, если забуду.",
          "In case объясняет предупредительное действие до возможной проблемы."
        ],
        [
          "Take some money in case you need it.",
          "Возьми деньги, если понадобятся.",
          "После in case о будущем используем Present simple need, без will."
        ],
        [
          "I'll call you if I need help. (= only when I need it)",
          "Я позвоню, если понадобится помощь.",
          "If означает действие только при условии необходимости; in case означало бы предупредительный звонок заранее."
        ],
        [
          "I took my phone in case somebody called.",
          "Я взял телефон на случай, если кто-то позвонит.",
          "In case вводит возможную ситуацию, ради которой заранее взят телефон."
        ],
        [
          "We bought extra food in case more people came.",
          "Мы купили лишнюю еду на случай большего числа гостей.",
          "После прошлого bought в этом контексте используется came для возможного последующего события."
        ],
        [
          "Let's leave early in case there is a lot of traffic.",
          "Давай выйдем рано на случай пробок.",
          "После in case о будущем используем there is, без will."
        ],
        [
          "I'll give you my number in case you want to contact me.",
          "Дам тебе номер на случай, если захочешь связаться.",
          "In case объясняет заранее сделанную подготовку, не условный запрет unless."
        ]
      ],
      "e": [
        [
          "Take a coat in case it's cold.",
          "Возьми пальто на случай холода.",
          "После in case о будущем используем it's/is/gets cold, без will."
        ],
        [
          "I'll buy a map in case we get lost.",
          "Я куплю карту на случай, если заблудимся.",
          "Союзная конструкция in case используется без the."
        ],
        [
          "I took my keys in case my sister was out.",
          "Я взял ключи на случай, если сестры не будет.",
          "Прошлая подготовка took сочетается с was out; will относилось бы к настоящей будущей точке."
        ]
      ],
      "t": [
        [
          "Take an umbrella in case it rains.",
          "Возьми зонт на случай дождя.",
          "In case it rains — предупредительная мера; rains в Present simple с будущим значением."
        ],
        [
          "I'll stay at home in case Tom calls.",
          "Я останусь дома на случай звонка Тома.",
          "In case Tom calls объясняет подготовку заранее; Tom требует calls с -s."
        ]
      ],
      "w": [
        [
          "I always take a phone charger in case my battery dies. I pack a warm jumper in case it gets cold. I also take some medicine in case I feel ill.",
          "Всегда беру зарядку на случай разрядки телефона. Кладу тёплый свитер на случай холода. Ещё беру лекарства на случай болезни.",
          "In case объясняет запасную подготовку; dies, gets и feel стоят в Present simple для будущих возможностей."
        ]
      ]
    },
    "115": {
      "g": [
        [
          "I'll go to the beach unless it rains.",
          "Я пойду на пляж, если не будет дождя.",
          "Unless означает if not; отрицание уже содержится в союзе."
        ],
        [
          "You can borrow my car as long as you drive carefully.",
          "Можешь взять машину при условии осторожного вождения.",
          "As long as задаёт необходимое условие разрешения."
        ],
        [
          "Don't call me unless it's an emergency.",
          "Не звони, если это не срочно.",
          "Unless it's an emergency разрешает исключение только для чрезвычайного случая."
        ],
        [
          "We'll play tennis provided the weather is good.",
          "Сыграем в теннис при условии хорошей погоды.",
          "Provided вводит необходимое положительное условие; unless означало бы «если не»."
        ],
        [
          "I won't go unless you come with me.",
          "Я не пойду, если ты не пойдёшь со мной.",
          "Unless you come = if you don't come; второе отрицание в unless-части не нужно."
        ],
        [
          "You can stay as long as you don't make a noise.",
          "Можешь остаться, если не будешь шуметь.",
          "As long as задаёт условие разрешения, а не предупредительную меру in case."
        ],
        [
          "Unless you hurry, you'll miss the train.",
          "Если не поторопишься, пропустишь поезд.",
          "Unless hurry уже означает if you don't hurry; дополнительное don't изменило бы смысл."
        ],
        [
          "Providing that we leave now, we'll be on time.",
          "Если выйдем сейчас, успеем.",
          "После providing that о будущем используется leave без will."
        ]
      ],
      "e": [
        [
          "I'll be there unless I'm ill.",
          "Я приду, если не заболею.",
          "Unless I'm ill = if I'm not ill; won't добавлять нельзя в этом обычном условии."
        ],
        [
          "Unless you study, you won't pass.",
          "Если не будешь заниматься, не сдашь.",
          "Unless you study уже означает if you don't study; дополнительное don't переворачивает условие."
        ],
        [
          "You can go out as long as you're home by ten.",
          "Можешь выйти, если вернёшься к десяти.",
          "После as long as о будущем — are home, без will."
        ]
      ],
      "t": [
        [
          "Unless you hurry, you'll be late.",
          "Если не поторопишься, опоздаешь.",
          "Unless you hurry заменяет if you don't hurry без двойного отрицания."
        ],
        [
          "You can watch TV as long as you finish your homework first.",
          "Можно смотреть телевизор, если сначала сделаешь уроки.",
          "As long as задаёт условие разрешения; после него Present simple finish."
        ]
      ],
      "w": [
        [
          "You can have friends over as long as you tell me first. Don't play loud music unless I'm out. You can use my bike provided that you bring it back by six.",
          "Можешь приглашать друзей, если заранее скажешь. Не включай громкую музыку, если я дома. Можешь взять велосипед, если вернёшь к шести.",
          "As long as/provided that — необходимые условия; unless — исключение с отрицательным смыслом."
        ]
      ]
    },
    "116": {
      "g": [
        [
          "As I was walking home, I saw an accident.",
          "Когда я шёл домой, увидел аварию.",
          "As вводит полное предложение об одновременном действии; like обычно используется для сравнения."
        ],
        [
          "We all waved goodbye as the train left.",
          "Мы махали на прощание, когда поезд тронулся.",
          "As связывает одновременно происходящие события; during потребовало бы существительное."
        ],
        [
          "As it was a holiday, the shops were closed.",
          "Магазины были закрыты, потому что был праздник.",
          "As здесь означает «так как», вводя причину."
        ],
        [
          "The phone rang just as I was leaving the house.",
          "Телефон зазвонил как раз, когда я выходил.",
          "Was leaving — процесс в тот момент; just as связывает его с коротким событием rang."
        ],
        [
          "As I didn't have any money, I stayed at home.",
          "У меня не было денег, поэтому я остался дома.",
          "As вводит причину полным предложением; because of требовало бы именную группу."
        ],
        [
          "As the day went on, the weather got worse.",
          "По мере того как день проходил, погода ухудшалась.",
          "As связывает постепенные изменения; went согласуется с прошлым got worse."
        ],
        [
          "I slipped as I was getting off the bus.",
          "Я поскользнулся, выходя из автобуса.",
          "As связывает короткое slipped с процессом was getting off."
        ],
        [
          "As she was feeling ill, she went to bed early.",
          "Она плохо себя чувствовала и рано легла.",
          "As здесь передаёт причину её решения, а не сравнение like."
        ]
      ],
      "e": [
        [
          "As it was late, we went home.",
          "Было поздно, поэтому мы ушли домой.",
          "Для причины в нейтральной форме as/because, не сравнительное like."
        ],
        [
          "As I was walking home, it started to rain.",
          "Когда я шёл домой, начался дождь.",
          "Was walking — процесс; started to rain/started raining — событие, начавшееся в его ходе."
        ],
        [
          "As I'm tired, I'll go to bed.",
          "Я устал, поэтому пойду спать.",
          "As уже вводит причинную связь; дополнительное so перед I'll обычно не нужно."
        ]
      ],
      "t": [
        [
          "As we were tired, we stopped.",
          "Мы устали, поэтому остановились.",
          "As we were tired вводит причину в начале предложения."
        ],
        [
          "My phone rang just as I was getting into the car.",
          "Телефон зазвонил именно когда я садился в машину.",
          "Just as подчёркивает точное совпадение события с процессом was getting into."
        ]
      ],
      "w": [
        [
          "As I was leaving the house, it started to snow. As it was so cold, I decided to take a taxi. Just as I got into the taxi, my friend called to cancel our meeting!",
          "Когда я выходил, пошёл снег. Из-за холода решил взять такси. Как только сел, друг позвонил отменить встречу.",
          "As/just as — одновременность; as it was cold — причина. Значение определяется контекстом."
        ]
      ]
    },
    "117": {
      "g": [
        [
          "She works as a nurse in a hospital.",
          "Она работает медсестрой в больнице.",
          "As a nurse обозначает реальную роль или профессию, не сходство like."
        ],
        [
          "He sings like a professional.",
          "Он поёт как профессионал.",
          "Like a professional сравнивает качество; это не утверждение, что он работает профессиональным певцом."
        ],
        [
          "As your teacher, I must tell you that you need to work harder.",
          "Как твой учитель я должен сказать: тебе нужно больше заниматься.",
          "As your teacher обозначает мою реальную роль, а не сходство с учителем."
        ],
        [
          "Do as I tell you!",
          "Делай, как я говорю!",
          "As вводит полное предложение I tell you; like в такой связи возможно разговорно, но здесь нейтральный as.",
          [
            "like"
          ]
        ],
        [
          "This house looks like a castle.",
          "Дом похож на замок.",
          "Like + существительное выражает сходство; as обозначало бы роль или функцию."
        ],
        [
          "As usual, Tom was late.",
          "Как обычно, Том опоздал.",
          "As usual — устойчивое выражение, без like."
        ],
        [
          "I used my coat as a pillow.",
          "Я использовал пальто как подушку.",
          "As a pillow означает функцию, которую пальто реально выполняло."
        ],
        [
          "It's raining again. It's just like last summer.",
          "Снова дождь. Совсем как прошлым летом.",
          "Like last summer сравнивает две ситуации."
        ]
      ],
      "e": [
        [
          "He works as a waiter in a café.",
          "Он работает официантом в кафе.",
          "As a waiter — профессия; like a waiter означало бы сходство, а не работу."
        ],
        [
          "She looks like her mother.",
          "Она похожа на маму.",
          "Look like + существительное или местоимение выражает сходство."
        ],
        [
          "As I said before, it's not possible.",
          "Как я уже говорил, это невозможно.",
          "As I said — нейтральная связь с полным предложением; like I said тоже распространено разговорно."
        ]
      ],
      "t": [
        [
          "I work as an English teacher.",
          "Я работаю преподавателем английского.",
          "Work as обозначает настоящую профессию."
        ],
        [
          "She swims like a fish.",
          "Она плавает как рыба.",
          "Like a fish выражает сравнение, не буквальную роль."
        ]
      ],
      "w": [
        [
          "My brother works as a chef in a hotel. He looks like our father but sounds like our mother. As usual, he's cooking for the whole family this weekend.",
          "Брат работает поваром в отеле. Внешне похож на отца, голосом — на маму. Как обычно, на выходных готовит для всей семьи.",
          "As a chef — роль; looks/sounds like — сходство; as usual — устойчивое выражение."
        ]
      ]
    },
    "118": {
      "g": [
        [
          "It looks as if it's going to rain.",
          "Похоже, собирается дождь.",
          "As if вводит целое предложение it's going to rain после looks."
        ],
        [
          "You look as if you haven't slept.",
          "Выглядишь так, будто не спал.",
          "As if связывает looks с полным you haven't slept."
        ],
        [
          "That sounds like a good idea.",
          "Звучит как хорошая идея.",
          "Like стоит перед именной группой a good idea, не отдельным предложением."
        ],
        [
          "He talks as if he knew everything — but he doesn't.",
          "Он говорит так, будто знает всё, хотя это не так.",
          "После as if Past simple knew подчёркивает нереальность знания сейчас."
        ],
        [
          "I feel as if I'm going to faint.",
          "Мне кажется, я сейчас потеряю сознание.",
          "As if вводит полное предложение I'm going to faint."
        ],
        [
          "She acted as though nothing had happened.",
          "Она вела себя так, будто ничего не случилось.",
          "As though вводит предполагаемую ситуацию; had happened предшествует прошлому acted."
        ],
        [
          "It feels like spring today.",
          "Сегодня ощущается весна.",
          "Like + существительное spring выражает сходство впечатления."
        ],
        [
          "Why are you looking at me as if I were crazy?",
          "Почему ты смотришь так, будто я сумасшедший?",
          "Were после as if подчёркивает нереальное состояние; относится к настоящему, не к прошлому."
        ]
      ],
      "e": [
        [
          "It looks as if it will snow.",
          "Похоже, пойдёт снег.",
          "Либо as if + предложение, либо разговорное like + предложение; like as смешивает конструкции."
        ],
        [
          "You sound like a teacher.",
          "Ты звучишь как учитель.",
          "Like a teacher выражает сходство; as a teacher обозначало бы реальную роль."
        ],
        [
          "He behaves as if he were the boss — but he isn't.",
          "Он ведёт себя как начальник, хотя им не является.",
          "Were/was после as if подчёркивает нереальность; is могло бы оставлять вопрос истинности открытым."
        ]
      ],
      "t": [
        [
          "Tom looks as if he's tired.",
          "Том выглядит уставшим.",
          "Looks as if/as though + he's tired — полное предложение с предположением."
        ],
        [
          "That sounds like a good plan.",
          "Звучит как хороший план.",
          "Sounds like + именная группа a good plan."
        ]
      ],
      "w": [
        [
          "The sky looks as if it's going to snow. My neighbour sounds like he's moving furniture. My cat looks as though she owns the flat — and maybe she does.",
          "По небу похоже, что пойдёт снег. Сосед словно двигает мебель. Кошка ведёт себя так, будто квартира принадлежит ей — возможно, так и есть.",
          "As if/as though вводят предложения; разговорное like тоже возможно перед предложением; контекст задаёт степень реальности."
        ]
      ]
    },
    "119": {
      "g": [
        [
          "I fell asleep during the film.",
          "Я уснул во время фильма.",
          "During стоит перед существительным the film; while потребовало бы полное предложение."
        ],
        [
          "We waited for two hours.",
          "Мы ждали два часа.",
          "For + two hours показывает длительность, не событие-период during."
        ],
        [
          "My phone rang while I was in the shower.",
          "Телефон зазвонил, пока я принимал душ.",
          "While вводит полное предложение I was in the shower."
        ],
        [
          "It rained during the night.",
          "Ночью шёл дождь.",
          "During the night — событие внутри периода, выраженного существительным."
        ],
        [
          "I lived in Spain for three years.",
          "Я прожил в Испании три года.",
          "For three years сообщает длительность."
        ],
        [
          "Somebody called while you were out.",
          "Кто-то звонил, пока тебя не было.",
          "While вводит полное you were out; during не ставится так перед подлежащим."
        ],
        [
          "Nobody spoke during the meal.",
          "Во время еды никто не говорил.",
          "During + the meal — предлог и существительное."
        ],
        [
          "While we were on holiday, our house was broken into.",
          "Пока мы были в отпуске, в наш дом проникли.",
          "While вводит целое предложение we were on holiday."
        ]
      ],
      "e": [
        [
          "I met her during my holiday.",
          "Я встретил её во время отпуска.",
          "During my holiday — существительное; while I was on holiday — полное предложение."
        ],
        [
          "We stayed in Paris for a week.",
          "Мы пробыли в Париже неделю.",
          "For a week сообщает длительность; during относится к конкретному событию или периоду."
        ],
        [
          "While I was asleep, someone took my bag.",
          "Пока я спал, кто-то взял сумку.",
          "While вводит I was asleep; during требует существительное."
        ]
      ],
      "t": [
        [
          "Tom called while I was having lunch.",
          "Том позвонил, пока я обедал.",
          "While + I was having lunch связывает событие с продолжающимся процессом."
        ],
        [
          "Kate spoke a lot during the lesson.",
          "Кейт много говорила на уроке.",
          "During the lesson обозначает событие, в ходе которого что-то произошло."
        ]
      ],
      "w": [
        [
          "During the flight I watched two films. We stayed in Rome for ten days. While we were walking in the old town, we met a man who had lived there for fifty years.",
          "В полёте посмотрел два фильма. В Риме мы провели десять дней. Гуляя по старому городу, встретили человека, прожившего там пятьдесят лет.",
          "During — событие-период; for — длительность; while — предложение о процессе."
        ]
      ]
    },
    "120": {
      "g": [
        [
          "Please finish this report by Friday.",
          "Пожалуйста, закончи отчёт к пятнице.",
          "By Friday — предельный срок завершения; until означало бы продолжать действие до пятницы."
        ],
        [
          "I'll wait for you until six o'clock.",
          "Я буду ждать тебя до шести.",
          "Until указывает конец продолжающегося ожидания; by обозначало бы срок результата."
        ],
        [
          "By the time we got to the station, the train had left.",
          "К нашему приходу на станцию поезд уже ушёл.",
          "By the time связывает более поздний прошлый момент с предшествующим had left."
        ],
        [
          "I'm going to stay in bed until ten.",
          "Я собираюсь лежать в постели до десяти.",
          "Until ten — конец продолжающегося состояния."
        ],
        [
          "The letter should arrive by Monday.",
          "Письмо должно прийти не позднее понедельника.",
          "By Monday задаёт крайний срок отдельного события arrive."
        ],
        [
          "We have to wait until the rain stops.",
          "Нужно ждать, пока дождь не прекратится.",
          "Until задаёт конец ожидания; stops в Present simple относится к будущему."
        ],
        [
          "By the time you read this, I'll be in Paris.",
          "Когда ты прочтёшь это, я уже буду в Париже.",
          "By the time задаёт будущую точку, к которой состояние уже будет достигнуто."
        ],
        [
          "The shop is open until 9 p.m.",
          "Магазин открыт до девяти вечера.",
          "Until показывает конец периода работы, не срок достижения результата."
        ]
      ],
      "e": [
        [
          "I'll be home by 7. Don't worry.",
          "Не волнуйся, я буду дома к семи.",
          "По условию «не позднее» нужен by; until означало бы находиться дома лишь до семи."
        ],
        [
          "I worked until midnight last night.",
          "Вчера я работал до полуночи.",
          "Until/till обозначает конец продолжающейся работы; by — предельный срок результата."
        ],
        [
          "By the time I got there, everyone had gone.",
          "К моему приходу все ушли.",
          "By the time задаёт прошлую точку, до которой произошло had gone."
        ]
      ],
      "t": [
        [
          "You must return the book by Tuesday.",
          "Книгу нужно вернуть не позднее вторника.",
          "By Tuesday задаёт дедлайн отдельного действия return."
        ],
        [
          "I'll stay here until the shop closes.",
          "Я останусь здесь до закрытия магазина.",
          "Until задаёт конец продолжающегося пребывания."
        ]
      ],
      "w": [
        [
          "I have to finish my project by Friday. I'll work until late every evening. By the time the holidays start, I'll be exhausted, so I'll sleep until noon!",
          "Нужно закончить проект к пятнице. Каждый вечер буду работать допоздна. К началу каникул устану, поэтому буду спать до полудня.",
          "By — срок результата; until — конец процесса; by the time — точка отсчёта другого события."
        ]
      ]
    },
    "121": {
      "g": [
        [
          "The film starts at 8 o'clock.",
          "Фильм начинается в восемь.",
          "At используется с точным временем на часах."
        ],
        [
          "I was born in 1998.",
          "Я родился в 1998 году.",
          "In используется с годами; on — с днями и полными датами."
        ],
        [
          "See you on Monday!",
          "До понедельника!",
          "On используется с днём недели."
        ],
        [
          "We usually go on holiday in August.",
          "Обычно мы берём отпуск в августе.",
          "In используется с месяцем, без указания конкретного дня."
        ],
        [
          "I don't like walking alone at night.",
          "Не люблю гулять один ночью.",
          "At night — стандартное выражение, в отличие от in the morning."
        ],
        [
          "Her birthday is on 12 March.",
          "Её день рождения двенадцатого марта.",
          "Конкретная дата требует on."
        ],
        [
          "I'll call you in the morning.",
          "Я позвоню утром.",
          "In the morning — обычная конструкция для части дня."
        ],
        [
          "The course finishes in two weeks. (= two weeks from now)",
          "Курс заканчивается через две недели.",
          "In two weeks означает время от сейчас до события; for означало бы длительность курса."
        ]
      ],
      "e": [
        [
          "I'll see you on Friday.",
          "Увидимся в пятницу.",
          "Перед днём недели нужен on, не in."
        ],
        [
          "We met in 2015.",
          "Мы встретились в 2015 году.",
          "Перед годом используется in."
        ],
        [
          "I'll be back in a few minutes.",
          "Я вернусь через несколько минут.",
          "In a few minutes задаёт будущий промежуток от настоящего."
        ]
      ],
      "t": [
        [
          "It's on 3 May.",
          "Мой день рождения третьего мая.",
          "Перед полной датой используется on; the third of May — другой способ чтения даты."
        ],
        [
          "What do you do at the weekend?",
          "Что ты делаешь на выходных?",
          "В британском варианте обычно at the weekend; в американском распространено on the weekend."
        ]
      ],
      "w": [
        [
          "I start work at nine in the morning. On Fridays I finish early. In July I always go to the sea, and at Christmas I visit my parents. My birthday is on 14 October.",
          "Работу начинаю в девять утра. По пятницам заканчиваю рано. В июле езжу к морю, на Рождество навещаю родителей. День рождения четырнадцатого октября.",
          "At — часы и праздник; in — месяц или часть дня; on — дни и даты."
        ]
      ]
    },
    "122": {
      "g": [
        [
          "The train left exactly on time.",
          "Поезд отправился точно по расписанию.",
          "On time — в запланированный момент; in time — достаточно рано, чтобы успеть."
        ],
        [
          "We got to the cinema just in time to see the start of the film.",
          "Мы успели в кино прямо к началу фильма.",
          "In time to see — успели сделать действие, не обязательно прибыли по собственному расписанию."
        ],
        [
          "At the end of the film, everybody cried.",
          "В конце фильма все плакали.",
          "At the end of — момент окончания конкретного события; in the end — итог истории."
        ],
        [
          "We couldn't decide where to go. In the end we stayed at home.",
          "Не смогли решить, куда идти. В итоге остались дома.",
          "In the end означает окончательное решение после обсуждений."
        ],
        [
          "Please be on time for the meeting at 9.",
          "Приходи на совещание вовремя, к девяти.",
          "On time означает пунктуальность относительно назначенных девяти часов."
        ],
        [
          "I'm paid at the end of each month.",
          "Мне платят в конце каждого месяца.",
          "At the end указывает момент внутри календарного периода; by the end задавало бы крайний срок."
        ],
        [
          "He nearly missed the plane, but he arrived in time.",
          "Он чуть не опоздал на самолёт, но успел.",
          "In time означает достаточно рано для посадки, не строго по расписанию."
        ],
        [
          "It was a difficult exam, but in the end I passed.",
          "Экзамен был трудным, но в итоге я сдал.",
          "In the end обозначает итог после сложностей."
        ]
      ],
      "e": [
        [
          "I'll see you at the end of the week.",
          "Увидимся в конце недели.",
          "Конец конкретного периода: at the end of the week."
        ],
        [
          "The meeting started on time at 10 exactly.",
          "Встреча началась точно в десять, вовремя.",
          "Точное соответствие расписанию — on time."
        ],
        [
          "In the end, we decided to buy the red car.",
          "В итоге мы решили купить красную машину.",
          "Итог принятия решения — in the end; at the end потребовало бы события или периода."
        ]
      ],
      "t": [
        [
          "The bus came on time.",
          "Автобус пришёл по расписанию.",
          "On time означает точно в запланированный момент."
        ],
        [
          "In the end we found the hotel.",
          "В итоге мы нашли гостиницу.",
          "In the end передаёт окончательный результат после проблем."
        ]
      ],
      "w": [
        [
          "My flight was at 6 a.m. and the taxi was late. We got to the airport just in time. The plane didn't leave on time, but in the end we arrived safely.",
          "Рейс был в шесть утра, такси опоздало. В аэропорт успели в последний момент. Самолёт вылетел не по расписанию, но в итоге мы благополучно прибыли.",
          "In time — успеть; on time — по расписанию; in the end — окончательный результат."
        ]
      ]
    },
    "123": {
      "g": [
        [
          "There's some milk in the fridge.",
          "В холодильнике есть молоко.",
          "In показывает нахождение внутри холодильника."
        ],
        [
          "Who's that man standing at the door?",
          "Кто мужчина у двери?",
          "At the door обозначает точку возле входа; on означало бы поверхность двери."
        ],
        [
          "There's a picture on the wall.",
          "На стене висит картина.",
          "On — контакт с поверхностью стены."
        ],
        [
          "The children are playing in the garden.",
          "Дети играют в саду.",
          "In the garden — внутри ограниченной территории."
        ],
        [
          "Turn left at the traffic lights.",
          "У светофора поверни налево.",
          "At рассматривает светофор как точку маршрута."
        ],
        [
          "I left my keys on the kitchen table.",
          "Я оставил ключи на кухонном столе.",
          "On обозначает расположение на поверхности; in — внутри."
        ],
        [
          "Wait for me at the bus stop.",
          "Подожди меня на автобусной остановке.",
          "At the bus stop — место как точка встречи."
        ],
        [
          "There are lots of fish in this river.",
          "В этой реке много рыбы.",
          "In обозначает нахождение в воде, не на её поверхности."
        ]
      ],
      "e": [
        [
          "Your coat is on the floor.",
          "Пальто лежит на полу.",
          "On the floor — на поверхности, не внутри пола."
        ],
        [
          "He's waiting at the bus stop.",
          "Он ждёт на автобусной остановке.",
          "At the bus stop обозначает точку ожидания, не физическую поверхность остановки."
        ],
        [
          "There's a fly in my soup!",
          "В супе муха!",
          "In my soup — внутри жидкости; at обозначало бы точку рядом."
        ]
      ],
      "t": [
        [
          "The cat is on the sofa.",
          "Кот на диване.",
          "On the sofa — на поверхности мебели."
        ],
        [
          "They're in the swimming pool.",
          "Дети в бассейне.",
          "In the swimming pool по условию означает нахождение в воде."
        ]
      ],
      "w": [
        [
          "My desk is by the window. There's a lamp on the desk and some books in the drawer. A big map of the world is on the wall. My cat is usually sleeping on the bed.",
          "Стол у окна. На столе лампа, в ящике книги. На стене большая карта мира. Кот обычно спит на кровати.",
          "On — поверхности; in — внутреннее пространство; by the window — рядом."
        ]
      ]
    },
    "124": {
      "g": [
        [
          "Who is the woman in this photo?",
          "Кто эта женщина на фотографии?",
          "Для изображения людей используется in this photo; on может описывать физическую поверхность снимка."
        ],
        [
          "Look at the map on page 20.",
          "Посмотри карту на двадцатой странице.",
          "Для страницы используется on page 20."
        ],
        [
          "Our flat is on the third floor.",
          "Наша квартира на третьем этаже.",
          "Для этажа используется on the third floor."
        ],
        [
          "Write your name at the top of the page.",
          "Напиши имя наверху страницы.",
          "At the top of обозначает конкретную позицию верхнего края."
        ],
        [
          "The post office is on the left.",
          "Почта слева.",
          "On the left — устойчивое обозначение стороны."
        ],
        [
          "I always sit at the back of the class.",
          "Я всегда сижу в конце класса.",
          "At the back обозначает положение в задней части помещения."
        ],
        [
          "There wasn't a cloud in the sky.",
          "В небе не было ни облачка.",
          "In the sky — обычное выражение о расположении в небесном пространстве."
        ],
        [
          "It's the tallest building in the world.",
          "Это самое высокое здание в мире.",
          "In the world задаёт область сравнения."
        ]
      ],
      "e": [
        [
          "I read it in a newspaper.",
          "Я прочитал это в газете.",
          "Информация содержится in a newspaper; on a page относится к конкретной странице."
        ],
        [
          "She lives on the second floor.",
          "Она живёт на втором этаже.",
          "On the second floor — стандартная конструкция для этажа."
        ],
        [
          "Sign your name at the bottom of the form.",
          "Подпишись внизу формы.",
          "At the bottom of обозначает позицию у нижнего края."
        ]
      ],
      "t": [
        [
          "It's on the right.",
          "Банк справа.",
          "On the right — устойчивое обозначение направления или стороны."
        ],
        [
          "It's at the top of the list.",
          "Моё имя вверху списка.",
          "At the top of the list обозначает верхнюю позицию."
        ]
      ],
      "w": [
        [
          "In this photo you can see my family. My parents are in the middle and my sister is on the left. I'm at the back. You can see the sea in the background.",
          "На фото моя семья. Родители в центре, сестра слева. Я сзади. На заднем плане видно море.",
          "In the photo/middle/background — пространство изображения; on the left — сторона; at the back — позиция."
        ]
      ]
    },
    "125": {
      "g": [
        [
          "I'll be at home all evening.",
          "Я весь вечер буду дома.",
          "At home — устойчивое выражение местонахождения."
        ],
        [
          "We met at a party.",
          "Мы познакомились на вечеринке.",
          "At a party рассматривает событие как место присутствия."
        ],
        [
          "She's in hospital with a broken leg.",
          "Она в больнице со сломанной ногой.",
          "In hospital в британском варианте означает находиться там пациентом."
        ],
        [
          "I read a book on the train.",
          "Я читал книгу в поезде.",
          "On the train — стандартное выражение о поездке общественным транспортом."
        ],
        [
          "Get in the car. We're late.",
          "Садись в машину. Мы опаздываем.",
          "In the car обозначает внутреннее пространство машины; on означало бы на её поверхности."
        ],
        [
          "I'll meet you at the station.",
          "Встретимся на станции.",
          "At the station — место как точка встречи."
        ],
        [
          "Were you at Kate's house yesterday?",
          "Ты вчера был у Кейт?",
          "At Kate's house обозначает посещение её дома."
        ],
        [
          "He's still in bed. He's not well.",
          "Он всё ещё в постели. Ему нездоровится.",
          "In bed обычно означает лежать или спать; on the bed — на поверхности кровати."
        ]
      ],
      "e": [
        [
          "I left my bag on the bus.",
          "Я оставил сумку в автобусе.",
          "При нахождении в общественном транспорте обычно on the bus."
        ],
        [
          "She works at home on Fridays.",
          "По пятницам она работает дома.",
          "At home — местонахождение; from home подчёркивает работу из дома."
        ],
        [
          "We arrived at the airport at 6.",
          "Мы приехали в аэропорт в шесть.",
          "Arrive at используется с аэропортом как точкой; arrive to здесь не подходит."
        ]
      ],
      "t": [
        [
          "I was at a concert.",
          "Вчера вечером я был на концерте.",
          "At a concert означает присутствие на событии."
        ],
        [
          "He's in a taxi.",
          "Он в такси.",
          "В машине или такси обычно in; on используется для поездок на автобусе или поезде."
        ]
      ],
      "w": [
        [
          "On Monday I was at work all day. On Tuesday I was at a concert. On Wednesday I spent two hours on the train. On Thursday I was ill, so I stayed in bed.",
          "В понедельник весь день был на работе. Во вторник — на концерте. В среду два часа провёл в поезде. В четверг заболел и лежал в постели.",
          "At — работа или событие; on — поезд; in bed — постель как состояние."
        ]
      ]
    },
    "126": {
      "g": [
        [
          "We're going to London next week.",
          "На следующей неделе мы едем в Лондон.",
          "Движение к месту: go to London; in обозначало бы положение внутри города."
        ],
        [
          "What time did you arrive in Paris?",
          "Во сколько ты приехал в Париж?",
          "Arrive in используется с городом или страной."
        ],
        [
          "We arrived at the hotel late at night.",
          "Мы приехали в гостиницу поздно ночью.",
          "Arrive at используется с конкретным зданием или точкой."
        ],
        [
          "I'm going home now.",
          "Я сейчас иду домой.",
          "После go home не нужны to или at: home само обозначает направление."
        ],
        [
          "She walked into the room and sat down.",
          "Она вошла в комнату и села.",
          "Into обозначает движение снаружи внутрь; at не передаёт пересечение границы."
        ],
        [
          "I've never been to Japan.",
          "Я никогда не был в Японии.",
          "Have been to означает опыт посещения места, а не только нахождение внутри."
        ],
        [
          "Get into the car!",
          "Садись в машину!",
          "Get into обозначает движение внутрь машины; on — на поверхность или в общественный транспорт."
        ],
        [
          "When did you get back to work after your holiday?",
          "Когда ты вернулся на работу после отпуска?",
          "Get back to work обозначает возвращение к месту или деятельности."
        ]
      ],
      "e": [
        [
          "When did you arrive in Moscow?",
          "Когда ты приехал в Москву?",
          "Arrive in используется с городом, не arrive to."
        ],
        [
          "Let's go home.",
          "Пойдём домой.",
          "Go home — без to."
        ],
        [
          "We arrived at the airport two hours early.",
          "Мы приехали в аэропорт на два часа раньше.",
          "Arrive at используется с аэропортом как конкретной точкой."
        ]
      ],
      "t": [
        [
          "Tom went into the kitchen.",
          "Том вошёл на кухню.",
          "Went into подчёркивает пересечение границы и вход внутрь."
        ],
        [
          "Have you ever been to Italy?",
          "Ты когда-нибудь был в Италии?",
          "Have you ever been to спрашивает об опыте посещения страны."
        ]
      ],
      "w": [
        [
          "Last year we went to Spain. We arrived in Barcelona at night and got into a taxi. When we arrived at the hotel, we went into the restaurant for dinner.",
          "В прошлом году ездили в Испанию. В Барселону приехали ночью и сели в такси. Добравшись до гостиницы, зашли поужинать в ресторан.",
          "Go to — направление; arrive in — город; arrive at — отель; into — движение внутрь."
        ]
      ]
    },
    "127": {
      "g": [
        [
          "Don't stand in the rain. You'll get wet.",
          "Не стой под дождём. Промокнешь.",
          "In the rain — стандартное выражение нахождения под дождём."
        ],
        [
          "Are you here on holiday or on business?",
          "Ты здесь отдыхаешь или по работе?",
          "On holiday и on business — устойчивые выражения о цели пребывания."
        ],
        [
          "What's the word for this in English?",
          "Как это называется по-английски?",
          "In English обозначает язык, на котором выражается мысль."
        ],
        [
          "I saw the news on TV.",
          "Я видел новости по телевизору.",
          "On TV — стандартная связь с телевещанием."
        ],
        [
          "She left school at the age of 16.",
          "Она закончила школу в шестнадцать лет.",
          "At the age of обозначает возраст события."
        ],
        [
          "The house is on fire! Call 112!",
          "Дом горит! Звоните 112!",
          "On fire — устойчивое «горит»; in fire не заменяет эту конструкцию."
        ],
        [
          "Sorry, I didn't do it on purpose.",
          "Извини, я сделал это не нарочно.",
          "On purpose означает намеренное действие; отрицание перед did меняет смысл на случайность."
        ],
        [
          "In my opinion, the film was too long.",
          "По-моему, фильм был слишком длинным.",
          "In my opinion — устойчивое вступление к мнению."
        ]
      ],
      "e": [
        [
          "We went there on foot.",
          "Мы пошли туда пешком.",
          "On foot — устойчивое выражение; by используется с транспортом, но не здесь."
        ],
        [
          "Write your answers in pencil.",
          "Пиши ответы карандашом.",
          "In pencil обозначает материал записи; on относилось бы к поверхности."
        ],
        [
          "He was driving at 150 km an hour.",
          "Он ехал со скоростью 150 километров в час.",
          "At используется с числовым значением скорости."
        ]
      ],
      "t": [
        [
          "He's on the phone.",
          "Он разговаривает по телефону.",
          "On the phone — телефонный разговор; не буквальное расположение на аппарате."
        ],
        [
          "In my opinion, this plan is bad.",
          "По-моему, этот план плохой.",
          "In my opinion вводит личную оценку."
        ]
      ],
      "w": [
        [
          "Last summer we were on holiday in Greece. We went everywhere on foot and spent hours lying in the sun. In my opinion, it's the best place in Europe.",
          "Прошлым летом отдыхали в Греции. Везде ходили пешком и часами лежали на солнце. По-моему, это лучшее место Европы.",
          "On holiday/foot — устойчивые выражения; in the sun — на солнце; in my opinion — мнение."
        ]
      ]
    },
    "128": {
      "g": [
        [
          "I usually go to work by bus.",
          "Обычно я езжу на работу на автобусе.",
          "By bus описывает способ поездки без артикля; on the bus — нахождение в конкретном автобусе."
        ],
        [
          "We went there on foot.",
          "Мы пошли туда пешком.",
          "On foot — исключение из транспортного шаблона by car/bus."
        ],
        [
          "This picture was painted by Picasso.",
          "Эту картину написал Пикассо.",
          "By в пассиве вводит исполнителя действия."
        ],
        [
          "Can I pay by credit card?",
          "Можно заплатить кредитной картой?",
          "By credit card описывает способ оплаты; без артикля перед названием способа."
        ],
        [
          "I took your umbrella by mistake. Sorry!",
          "Я по ошибке взял твой зонт. Извини!",
          "By mistake — устойчивое «по ошибке»."
        ],
        [
          "Come and sit by the fire.",
          "Иди, садись у огня.",
          "By означает рядом с; on означало бы на поверхности, другой смысл."
        ],
        [
          "We met by chance in the street.",
          "Мы случайно встретились на улице.",
          "By chance — устойчивое «случайно»."
        ],
        [
          "I came in my brother's car.",
          "Я приехал на машине брата.",
          "С конкретным владельцем: in my brother's car; by car — способ без определителя."
        ]
      ],
      "e": [
        [
          "I came by car.",
          "Я приехал на машине.",
          "Способ поездки by car без the; in the car обозначало бы конкретную машину."
        ],
        [
          "The book was written by Tolstoy.",
          "Книгу написал Толстой.",
          "By вводит автора или исполнителя в пассивной конструкции."
        ],
        [
          "We went there in my car.",
          "Мы поехали на моей машине.",
          "Для конкретной my car используется in; by car не принимает my в этом шаблоне."
        ]
      ],
      "t": [
        [
          "I go by train.",
          "Я езжу на работу поездом.",
          "By train обозначает способ передвижения без артикля."
        ],
        [
          "It was written by Shakespeare.",
          "«Гамлета» написал Шекспир.",
          "Пассив was written, затем by Shakespeare — автор действия."
        ]
      ],
      "w": [
        [
          "I go to work by metro and sometimes on foot. I usually pay by card. Last week I met my old teacher by chance, and then I took the wrong bus by mistake!",
          "Езжу на работу на метро, иногда хожу пешком. Обычно плачу картой. На прошлой неделе случайно встретил учителя, а потом по ошибке сел не на тот автобус!",
          "By — способ или устойчивые by chance/mistake; on foot — пешком, исключение."
        ]
      ]
    },
    "129": {
      "g": [
        [
          "What was the reason for the delay?",
          "Почему произошла задержка?",
          "Устойчивое сочетание reason for: for вводит объясняемую ситуацию."
        ],
        [
          "Nobody knows the cause of the fire.",
          "Никто не знает причину пожара.",
          "Устойчивое сочетание cause of: of связывает причину с событием."
        ],
        [
          "There's no easy solution to this problem.",
          "Простого решения этой проблемы нет.",
          "После solution обычно to, обозначая проблему, которая решается."
        ],
        [
          "There has been a big increase in prices.",
          "Цены сильно выросли.",
          "Increase in prices обозначает рост показателя; of может вводить величину роста."
        ],
        [
          "Thank you for the invitation to your wedding.",
          "Спасибо за приглашение на свадьбу.",
          "Invitation to обозначает событие, куда приглашают."
        ],
        [
          "Have you got the key to this door?",
          "У тебя есть ключ от этой двери?",
          "Key to the door — обычное сочетание связи ключа с замком."
        ],
        [
          "The storm caused a lot of damage to the roof.",
          "Буря сильно повредила крышу.",
          "Damage to обозначает пострадавший объект."
        ],
        [
          "He has a good relationship with his parents.",
          "У него хорошие отношения с родителями.",
          "Relationship with связывает участников отношений."
        ]
      ],
      "e": [
        [
          "What's the answer to question 3?",
          "Какой ответ на третий вопрос?",
          "Устойчивое сочетание answer to a question."
        ],
        [
          "There's a big demand for English teachers.",
          "Учителя английского очень востребованы.",
          "Demand for обозначает то, на что есть спрос."
        ],
        [
          "The reason for my visit is business.",
          "Я приехал по делам.",
          "Reason for my visit — причина визита, стандартный предлог for."
        ]
      ],
      "t": [
        [
          "There was a rise in prices.",
          "Произошёл рост цен.",
          "Rise in prices — выросший показатель; rise of 10% добавляет величину."
        ],
        [
          "What was the cause of the accident?",
          "Что стало причиной аварии?",
          "Cause of связывает причину с произошедшим событием."
        ]
      ],
      "w": [
        [
          "The main problem in my city is traffic. The cause of it is the huge increase in the number of cars. One solution to the problem is better public transport.",
          "Главная проблема города — дорожное движение. Причина — резкий рост числа машин. Одно из решений — улучшить общественный транспорт.",
          "Cause of — причина события; increase in — рост показателя; solution to — решение проблемы."
        ]
      ]
    },
    "130": {
      "g": [
        [
          "It was very kind of you to help me.",
          "Очень любезно с твоей стороны помочь.",
          "Kind of you оценивает поступок человека; for обычно задаёт участника или пользу."
        ],
        [
          "She's always very nice to me.",
          "Она всегда очень добра ко мне.",
          "Nice to someone описывает отношение к человеку."
        ],
        [
          "Why are you angry with me?",
          "Почему ты злишься на меня?",
          "Angry with someone — стандартное сочетание для адресата злости."
        ],
        [
          "I'm excited about the trip.",
          "Я очень жду поездку.",
          "Excited about вводит событие, вызывающее радостное волнение."
        ],
        [
          "We were shocked by the news.",
          "Новость нас потрясла.",
          "Shocked by показывает причину чувства; shocked at тоже возможно."
        ],
        [
          "I'm fed up with this weather.",
          "Мне надоела эта погода.",
          "Fed up with — устойчивое выражение раздражения или пресыщения."
        ],
        [
          "Are you worried about the exam?",
          "Ты переживаешь из-за экзамена?",
          "Worried about вводит предмет беспокойства."
        ],
        [
          "I was very impressed by her English.",
          "Её английский произвёл на меня впечатление.",
          "Impressed by/with обозначает то, что вызвало впечатление."
        ]
      ],
      "e": [
        [
          "It was nice of you to call.",
          "Было приятно, что ты позвонил.",
          "Nice of you оценивает поступок конкретного человека."
        ],
        [
          "Don't be angry with me.",
          "Не злись на меня.",
          "Angry with me — обычное сочетание; on здесь не используется."
        ],
        [
          "I'm bored with waiting.",
          "Мне надоело ждать.",
          "Bored with/of или tired of требуют waiting с -ing после предлога, не to wait."
        ]
      ],
      "t": [
        [
          "Tom was rude to the waiter.",
          "Том грубо разговаривал с официантом.",
          "Rude to someone описывает поведение по отношению к человеку."
        ],
        [
          "I was annoyed with Kate.",
          "Я был раздражён Кейт.",
          "Annoyed with someone указывает человека, вызвавшего раздражение; because добавляет причину."
        ]
      ],
      "w": [
        [
          "I'm really excited about my holiday next month. I'm fed up with the cold weather. I'm a bit worried about my exam, and I'm angry with myself for not studying more.",
          "Очень жду отпуск в следующем месяце. Холодная погода надоела. Немного переживаю об экзамене и злюсь на себя за недостаточную подготовку.",
          "Excited/worried about — события; fed up with — раздражитель; angry with — человек, for — причина."
        ]
      ]
    },
    "131": {
      "g": [
        [
          "I'm afraid of spiders.",
          "Я боюсь пауков.",
          "Afraid of вводит объект страха."
        ],
        [
          "She's very good at maths.",
          "Она очень хорошо знает математику.",
          "Good at обозначает область способности; in не используется в этом стандартном сочетании."
        ],
        [
          "He's married to a doctor.",
          "Он женат на враче.",
          "Married to вводит супруга или супругу; with здесь не заменяет to."
        ],
        [
          "I'm proud of my daughter.",
          "Я горжусь дочерью.",
          "Proud of вводит человека или результат, вызывающий гордость."
        ],
        [
          "Are you interested in photography?",
          "Ты интересуешься фотографией?",
          "Interested in — стандартная связь с областью интереса."
        ],
        [
          "This bottle is full of water.",
          "Бутылка полна воды.",
          "Full of обозначает содержимое; filled with — другая конструкция."
        ],
        [
          "Your phone is similar to mine.",
          "Твой телефон похож на мой.",
          "Similar to — стандартное сочетание; as используется после the same."
        ],
        [
          "Who is responsible for this mess?",
          "Кто отвечает за этот беспорядок?",
          "Responsible for вводит то, за что человек отвечает."
        ]
      ],
      "e": [
        [
          "He's very good at football.",
          "Он очень хорошо играет в футбол.",
          "Good at football — стандартная связь со способностью."
        ],
        [
          "She is married to a Frenchman.",
          "Она замужем за французом.",
          "Married to обозначает супруга; не married with."
        ],
        [
          "I'm keen on learning languages.",
          "Мне очень нравится учить языки.",
          "Keen on + learning: после предлога on используется -ing."
        ]
      ],
      "t": [
        [
          "I'm afraid of the dark.",
          "Я боюсь темноты.",
          "Afraid of the dark сохраняет смысл scared of."
        ],
        [
          "Tom is good at playing the guitar.",
          "Том хорошо играет на гитаре.",
          "Good at + playing описывает способность; после предлога at требуется -ing."
        ]
      ],
      "w": [
        [
          "I'm good at languages but bad at maths. I'm afraid of heights. I'm proud of my little brother, and I'm very keen on cooking Asian food.",
          "Я силён в языках, но плохо знаю математику. Боюсь высоты, горжусь младшим братом и увлекаюсь азиатской кухней.",
          "Good/bad at — способности; afraid/proud of — чувство; keen on — увлечение."
        ]
      ]
    },
    "132": {
      "g": [
        [
          "Who were you talking to on the phone?",
          "С кем ты говорил по телефону?",
          "Talk to someone — обычная связь с собеседником; to остаётся в конце вопроса."
        ],
        [
          "Listen to me!",
          "Послушай меня!",
          "Listen требует to перед объектом; hear, в отличие от него, обычно без to."
        ],
        [
          "Why are you looking at me like that?",
          "Почему ты так на меня смотришь?",
          "Look at вводит объект взгляда; look to может иметь другой смысл обращения за помощью."
        ],
        [
          "Can you explain this word to me?",
          "Можешь объяснить мне это слово?",
          "Explain + предмет + to me указывает получателя объяснения."
        ],
        [
          "What happened to your car?",
          "Что случилось с твоей машиной?",
          "Happen to вводит человека или предмет, с которым произошло событие."
        ],
        [
          "Don't laugh at me!",
          "Не смейся надо мной!",
          "Laugh at someone выражает смех, направленный на человека."
        ],
        [
          "He threw the ball to me and I caught it.",
          "Он бросил мне мяч, и я его поймал.",
          "Throw to — бросить для ловли; throw at — целиться и пытаться попасть."
        ],
        [
          "She shouted at her children because they were naughty.",
          "Она кричала на детей, потому что они шалили.",
          "Shout at обычно означает сердитый крик; shout to — громко обратиться, чтобы услышали."
        ]
      ],
      "e": [
        [
          "Can you explain this rule to me?",
          "Можешь объяснить мне правило?",
          "Explain принимает предмет напрямую, а получателя через to: explain this rule to me."
        ],
        [
          "I like listening to music.",
          "Мне нравится слушать музыку.",
          "Listen to music: to перед объектом обязательно."
        ],
        [
          "Look at this photo!",
          "Посмотри на это фото!",
          "Look at вводит объект взгляда."
        ]
      ],
      "t": [
        [
          "What happened to Tom yesterday?",
          "Что вчера случилось с Томом?",
          "What — подлежащее happened; to Tom указывает участника события, дополнительный did не нужен."
        ],
        [
          "Tom shouted to his friend.",
          "Том громко позвал друга.",
          "Shout to означает позвать, чтобы услышали; at обычно выражало бы сердитый крик."
        ]
      ],
      "w": [
        [
          "Yesterday my boss shouted at me in front of everyone. Later he came to my desk, explained the problem to me and apologised to me. Now we laugh at it.",
          "Вчера начальник накричал на меня при всех. Потом подошёл, объяснил проблему и извинился. Теперь мы над этим смеёмся.",
          "Shout at — гнев; explain something to и apologise to — адресат; laugh at — объект смеха."
        ]
      ]
    },
    "133": {
      "g": [
        [
          "We were talking about our holiday.",
          "Мы говорили о своём отпуске.",
          "Talk about вводит тему разговора; talk to — собеседника."
        ],
        [
          "I'm waiting for the bus.",
          "Я жду автобус.",
          "Wait for указывает ожидаемый объект; wait без for не принимает bus напрямую."
        ],
        [
          "Can you look after my cat while I'm away?",
          "Присмотришь за котом, пока меня нет?",
          "Look after означает заботиться; look for — искать; look at — смотреть."
        ],
        [
          "I'm looking for my glasses. Have you seen them?",
          "Я ищу очки. Ты их не видел?",
          "Look for означает искать, а не присматривать look after."
        ],
        [
          "She asked me for some money.",
          "Она попросила у меня денег.",
          "Ask someone for something — попросить что-то у человека."
        ],
        [
          "Who's going to pay for the tickets?",
          "Кто оплатит билеты?",
          "Pay for вводит приобретаемую вещь; pay someone — получателя денег."
        ],
        [
          "I've applied for a new job.",
          "Я подал заявку на новую работу.",
          "Apply for a job — претендовать на должность; apply to обычно вводит организацию."
        ],
        [
          "Tomorrow I leave for Paris.",
          "Завтра я уезжаю в Париж.",
          "Leave for указывает пункт назначения; leave Paris означало бы уехать из Парижа."
        ]
      ],
      "e": [
        [
          "I've been waiting for you for an hour.",
          "Я жду тебя уже час.",
          "Wait for you требует for перед объектом; have been waiting выражает длительность до сейчас."
        ],
        [
          "Let's talk about our plans.",
          "Давай поговорим о планах.",
          "Talk about plans — обычная связь с темой разговора."
        ],
        [
          "I paid for the tickets — they were expensive.",
          "Я оплатил билеты: они были дорогими.",
          "Pay for tickets — платить за вещь; pay tickets напрямую здесь не подходит."
        ]
      ],
      "t": [
        [
          "I'm looking for my keys.",
          "Я ищу ключи.",
          "Look for заменяет try to find, обозначая поиск."
        ],
        [
          "Grandma looks after the children every Friday.",
          "Бабушка присматривает за детьми каждую пятницу.",
          "Look after означает заботиться, равнозначно take care of."
        ]
      ],
      "w": [
        [
          "I'm looking for a new flat at the moment. I've asked my friends for advice and I've applied for a mortgage. Now I'm waiting for the bank to answer.",
          "Сейчас ищу новую квартиру. Попросил друзей совета и подал заявку на ипотеку. Теперь жду ответа банка.",
          "Look for — поиск; ask for — просьба; apply for — заявка; wait for — ожидание."
        ]
      ]
    },
    "134": {
      "g": [
        [
          "Have you heard from Tom recently? He hasn't called.",
          "В последнее время от Тома были новости? Он не звонил.",
          "Hear from — получить сообщение от человека; hear of — знать о его существовании."
        ],
        [
          "Who's Pete Simmons? I've never heard of him.",
          "Кто такой Пит Симмонс? Никогда о нём не слышал.",
          "Hear of — знать о существовании; from означало бы получить сообщение от него."
        ],
        [
          "Did you hear about the accident yesterday?",
          "Ты слышал о вчерашней аварии?",
          "Hear about вводит новость или подробности события."
        ],
        [
          "What do you think of my new haircut?",
          "Как тебе моя новая стрижка?",
          "Think of спрашивает мнение или впечатление; from не используется в этой связи."
        ],
        [
          "This song reminds me of my childhood.",
          "Эта песня напоминает мне детство.",
          "Remind of вызывает ассоциацию; remind about напоминает о нужном деле или событии."
        ],
        [
          "Thanks for reminding me about the meeting.",
          "Спасибо, что напомнил о встрече.",
          "Remind about — напомнить предстоящее дело; remind of чаще вызывает ассоциацию."
        ],
        [
          "I'm thinking about changing my job. I haven't decided.",
          "Подумываю сменить работу. Пока не решил.",
          "Think about/of changing рассматривает вариант; после предлога глагол с -ing."
        ],
        [
          "They complained about the noise.",
          "Они жаловались на шум.",
          "Complain about — предмет жалобы; complain to — получатель жалобы."
        ]
      ],
      "e": [
        [
          "I dreamt about you last night.",
          "Ты приснился мне прошлой ночью.",
          "Dream about someone означает видеть во сне; dream with не является обычным сочетанием здесь."
        ],
        [
          "What do you think of my new car?",
          "Как тебе моя новая машина?",
          "Think of/about — спросить мнение; think from не используется."
        ],
        [
          "She reminds me of my sister — they look so alike.",
          "Она напоминает мне сестру: они похожи.",
          "Remind of — сходство и ассоциация; about — напоминание о деле."
        ]
      ],
      "t": [
        [
          "I haven't heard from Anna.",
          "От Анны нет писем или сообщений.",
          "Haven't heard from означает отсутствие полученных вестей."
        ],
        [
          "Remind me to buy milk.",
          "Напомни мне купить молоко.",
          "Remind me to buy — напомнить действие; remind me about the milk — напомнить предмет дела."
        ]
      ],
      "w": [
        [
          "The smell of apple pie reminds me of my grandmother. I often dream of living by the sea. I think of my city as a friendly place, but I complain about the traffic.",
          "Запах яблочного пирога напоминает бабушку. Мечтаю жить у моря. Считаю город дружелюбным, но жалуюсь на пробки.",
          "Remind of — ассоциация; dream of — мечта; think of... as — оценка; complain about — жалоба."
        ]
      ]
    },
    "135": {
      "g": [
        [
          "The police accused him of stealing a car.",
          "Полиция обвинила его в краже машины.",
          "Accuse someone of + stealing; of вводит обвиняемое действие."
        ],
        [
          "This cake consists of flour, eggs and sugar.",
          "Торт состоит из муки, яиц и сахара.",
          "Consist of вводит состав; consist with/from в этом смысле не используется."
        ],
        [
          "Don't blame me for your problems!",
          "Не вини меня в своих проблемах!",
          "Blame someone for something — возложить вину за проблему."
        ],
        [
          "Sunglasses protect your eyes from the sun.",
          "Солнечные очки защищают глаза от солнца.",
          "Protect someone/something from вводит источник воздействия."
        ],
        [
          "It depends on the weather.",
          "Это зависит от погоды.",
          "Depend on — устойчивое сочетание; of/from не передают эту связь."
        ],
        [
          "I can't concentrate on my work. It's too noisy.",
          "Не могу сосредоточиться на работе: слишком шумно.",
          "Concentrate on вводит объект внимания."
        ],
        [
          "She suffers from headaches.",
          "Она страдает от головных болей.",
          "Suffer from обозначает проблему или заболевание."
        ],
        [
          "How much money do you spend on food every week?",
          "Сколько ты тратишь на еду каждую неделю?",
          "Spend money on вводит покупку или расход."
        ]
      ],
      "e": [
        [
          "It depends on you.",
          "Это зависит от тебя.",
          "Depend on someone, не depend of."
        ],
        [
          "I borrowed some money from my friend.",
          "Я одолжил деньги у друга.",
          "Borrow from указывает, у кого взяли; lend to указывало бы, кому дали."
        ],
        [
          "He congratulated me on my new job.",
          "Он поздравил меня с новой работой.",
          "Congratulate someone on something — стандартная связь с поводом поздравления."
        ]
      ],
      "t": [
        [
          "Tom accused Ann of taking his phone.",
          "Том обвинил Энн в том, что она взяла его телефон.",
          "Accused Ann of taking; после of используется -ing, his меняется при пересказе."
        ],
        [
          "I thanked Kate for helping me.",
          "Я поблагодарил Кейт за помощь.",
          "Thanked Kate for helping; после for нужна форма -ing."
        ]
      ],
      "w": [
        [
          "I spend most of my money on rent and travel. My plans for the summer depend on my job. I can always rely on my sister — she has never let me down.",
          "Большинство денег трачу на жильё и поездки. Летние планы зависят от работы. Всегда могу положиться на сестру: она ни разу не подвела.",
          "Spend on — расход; depend on — зависимость; rely on — доверие и опора."
        ]
      ]
    },
    "136": {
      "g": [
        [
          "Do you believe in ghosts?",
          "Ты веришь в привидения?",
          "Believe in обозначает веру в существование; believe someone — доверие словам человека."
        ],
        [
          "She succeeded in finding a job.",
          "Ей удалось найти работу.",
          "Succeed in + finding; после in нужна форма -ing."
        ],
        [
          "He drove into a tree.",
          "Он врезался в дерево на машине.",
          "Drive into обозначает столкновение; in не передаёт движение до удара."
        ],
        [
          "Can you translate this into Russian?",
          "Можешь перевести это на русский?",
          "Translate into указывает язык результата; in — язык уже имеющегося выражения."
        ],
        [
          "Fill the glass with water.",
          "Наполни стакан водой.",
          "Fill something with указывает, чем заполняется предмет."
        ],
        [
          "I prefer tea to coffee.",
          "Я предпочитаю чай кофе.",
          "Prefer A to B сравнивает предпочтения; than используется после rather."
        ],
        [
          "The school provides students with books.",
          "Школа выдаёт студентам книги.",
          "Provide someone with something; вариант provide something for someone имеет другой порядок."
        ],
        [
          "The doctor specialises in children's diseases.",
          "Врач специализируется на детских заболеваниях.",
          "Specialise in вводит область специализации."
        ]
      ],
      "e": [
        [
          "I don't believe in luck.",
          "Я не верю в удачу.",
          "Believe in — вера в понятие или существование."
        ],
        [
          "The car crashed into a wall.",
          "Машина врезалась в стену.",
          "Crash into передаёт столкновение с объектом."
        ],
        [
          "They provided us with food.",
          "Они обеспечили нас едой.",
          "Provide us with food или provide food for us: нужно выбрать один из двух порядков."
        ]
      ],
      "t": [
        [
          "Somebody broke into the house.",
          "Кто-то проник в дом.",
          "Break into означает проникнуть со взломом; into связывает действие с местом."
        ],
        [
          "Translate 'cat' into Russian.",
          "Переведи слово cat на русский.",
          "Translate into Russian обозначает язык результата; cat переводится «кот» или «кошка»."
        ]
      ],
      "w": [
        [
          "I believe in hard work and a little luck. Last year I succeeded in passing my driving test. I prefer the mountains to the sea, and I prefer books to films.",
          "Верю в усердную работу и немного удачи. В прошлом году удалось сдать экзамен по вождению. Предпочитаю горы морю, а книги фильмам.",
          "Believe in — вера; succeed in — успех; prefer A to B — предпочтение."
        ]
      ]
    },
    "137": {
      "g": [
        [
          "It's dark. Can you turn the light on?",
          "Темно. Можешь включить свет?",
          "Turn the light on: существительное может стоять между глаголом и частицей; с it нужен turn it on."
        ],
        [
          "Here's your coat. Put it on.",
          "Вот пальто. Надень его.",
          "Местоимение it ставится между put и on, не после on."
        ],
        [
          "The plane took off at 10 o'clock.",
          "Самолёт взлетел в десять.",
          "Take off у самолёта означает взлететь, не «снять»; значение зависит от предмета."
        ],
        [
          "I gave the money back. I gave it back.",
          "Я вернул деньги. Я вернул их.",
          "Местоимение it ставится перед back: give it back."
        ],
        [
          "Please sit down. The lesson is starting.",
          "Пожалуйста, садись. Урок начинается.",
          "Sit down — сесть; sit up — выпрямиться сидя, другой смысл."
        ],
        [
          "My car broke down on the way to work.",
          "По пути на работу машина сломалась.",
          "Break down означает перестать работать; другие частицы образуют другие значения."
        ],
        [
          "These are my old shoes. I'm going to throw them away.",
          "Это старые туфли. Собираюсь их выбросить.",
          "Throw them away — выбросить; местоимение them ставится перед away."
        ],
        [
          "When I got home, I took off my shoes.",
          "Придя домой, я снял обувь.",
          "Take off my shoes — снять; с существительным возможно также take my shoes off."
        ]
      ],
      "e": [
        [
          "I found the key and picked it up.",
          "Я нашёл ключ и поднял его.",
          "После pick местоимение it ставится перед up: picked it up."
        ],
        [
          "Turn it off, please.",
          "Выключи это, пожалуйста.",
          "Местоимение между turn и off: turn it off."
        ],
        [
          "She took her coat off.",
          "Она сняла пальто.",
          "Либо took her coat off, либо took off her coat; второе it дублировало бы дополнение."
        ]
      ],
      "t": [
        [
          "Fill it in.",
          "Заполни её.",
          "Form заменяется местоимением it, которое ставится перед in: fill it in."
        ],
        [
          "Turn it down.",
          "Сделай её тише.",
          "Music заменяется it; местоимение между turn и down."
        ]
      ],
      "w": [
        [
          "I wake up at seven, but I get up at quarter past. I turn on the radio, put on my clothes and pick up my bag. I go out at eight and come back at six.",
          "Просыпаюсь в семь, встаю в 7:15. Включаю радио, одеваюсь и беру сумку. Выхожу в восемь, возвращаюсь в шесть.",
          "Wake up, get up, turn on, put on, pick up, go out и come back — отдельные устойчивые значения."
        ]
      ]
    },
    "138": {
      "g": [
        [
          "Come in! The door is open.",
          "Заходи! Дверь открыта.",
          "Come in — войти; out означало бы направление наружу."
        ],
        [
          "We usually eat out on Saturdays.",
          "По субботам обычно едим вне дома.",
          "Eat out — поесть в кафе или ресторане; eat in — дома."
        ],
        [
          "Please fill in this form.",
          "Пожалуйста, заполни форму.",
          "Fill in и fill out оба допустимы для заполнения формы; чаще различаются региональным употреблением."
        ],
        [
          "We moved in last week. Do you like our new flat?",
          "Мы заселились на прошлой неделе. Нравится новая квартира?",
          "Move in — начать жить в новом месте; не просто двигаться внутри комнаты."
        ],
        [
          "What time do we have to check out of the hotel?",
          "Во сколько нужно выписаться из гостиницы?",
          "Check out of — завершить пребывание; check in — зарегистрироваться при приезде."
        ],
        [
          "Get in! I'll drive you home.",
          "Садись! Я отвезу тебя домой.",
          "Get in относится к входу в машину; get on обычно к автобусу или поезду."
        ],
        [
          "Drop in any time you're in the area.",
          "Заходи в гости, когда будешь поблизости.",
          "Drop in — ненадолго зайти, часто без заранее назначенной встречи."
        ],
        [
          "Don't be taken in by his smile. He's dishonest.",
          "Не обманывайся его улыбкой. Он нечестный.",
          "Be taken in означает быть обманутым, а не буквально занесённым внутрь."
        ]
      ],
      "e": [
        [
          "We checked out of the hotel at noon.",
          "Мы выписались из отеля в полдень.",
          "Check out of the hotel: out связан с завершением пребывания, of вводит отель."
        ],
        [
          "Let's go out tonight.",
          "Давай сегодня куда-нибудь выйдем, в ресторан.",
          "Go out — выйти из дома; go in означало бы войти внутрь места."
        ],
        [
          "Fill in the form, please.",
          "Заполни форму, пожалуйста.",
          "Fill in или fill out — два варианта; соединять частицы in и out вместе не нужно."
        ]
      ],
      "t": [
        [
          "We checked in.",
          "Мы зарегистрировались в гостинице.",
          "Check in — оформить прибытие; check out — выезд."
        ],
        [
          "Tom moved in yesterday.",
          "Вчера Том заселился.",
          "Move in — начать проживание в новом месте; move into a flat явно добавляет объект."
        ]
      ],
      "w": [
        [
          "We arrived at the hotel late and checked in. I filled in a long form. The next day we went out to explore and ate out in a small restaurant. We checked out on Sunday.",
          "Поздно приехали в отель и зарегистрировались. Заполнил длинную форму. На следующий день вышли погулять и поели в ресторане. Выписались в воскресенье.",
          "Check in/out — прибытие и выезд; fill in — заполнение; go/eat out — выход из дома и еда вне дома."
        ]
      ]
    },
    "139": {
      "g": [
        [
          "We've run out of milk. Can you buy some?",
          "Молоко закончилось. Можешь купить?",
          "Run out of — исчерпать запас; of вводит то, что закончилось."
        ],
        [
          "Can you find out what time the train leaves?",
          "Можешь узнать время отправления поезда?",
          "Find out — получить информацию, не просто найти предмет."
        ],
        [
          "The fire went out because there was no wood.",
          "Огонь погас, потому что дров не осталось.",
          "Go out у огня означает погаснуть; значение отличается от go out о человеке."
        ],
        [
          "I can't work out how to use this app.",
          "Не могу разобраться, как пользоваться приложением.",
          "Work out означает понять или найти решение по размышлению."
        ],
        [
          "The weather turned out nice in the end.",
          "В итоге погода оказалась хорошей.",
          "Turn out описывает обнаружившийся итог, иногда неожиданный."
        ],
        [
          "Tom and Kate fell out and haven't spoken since.",
          "Том и Кейт поссорились и с тех пор не разговаривали.",
          "Fall out означает поссориться, а не буквальное падение."
        ],
        [
          "Let's try out the new restaurant.",
          "Давай попробуем новый ресторан.",
          "Try out — испытать или опробовать, чтобы оценить."
        ],
        [
          "He pointed out that I had made a mistake.",
          "Он указал, что я ошибся.",
          "Point out — обратить внимание на факт или проблему."
        ]
      ],
      "e": [
        [
          "We ran out of petrol on the way.",
          "По дороге у нас кончился бензин.",
          "Run out of petrol — закончить запас; прошлое run меняется на ran."
        ],
        [
          "I found out the truth yesterday.",
          "Вчера я узнал правду.",
          "Find out — узнать информацию; прошедшая форма found."
        ],
        [
          "Can you work the answer out?",
          "Можешь найти решение?",
          "Work out the answer или work the answer out; up не даёт нужного значения."
        ]
      ],
      "t": [
        [
          "We've run out of coffee.",
          "Кофе закончился.",
          "Have run out of coffee сообщает нынешний результат исчерпания запаса."
        ],
        [
          "The party turned out better than I expected.",
          "Вечеринка оказалась лучше ожиданий.",
          "Turned out (to be) описывает фактический итог после ожидания."
        ]
      ],
      "w": [
        [
          "We ran out of petrol in the middle of nowhere. We couldn't work out where we were. Finally we found out there was a village nearby. It turned out to be a great day!",
          "В глуши закончился бензин. Не могли понять, где мы. Наконец узнали, что рядом деревня. В итоге день оказался прекрасным!",
          "Run out of — запас; work out — разобраться; find out — узнать; turn out — оказаться."
        ]
      ]
    },
    "140": {
      "g": [
        [
          "Don't forget to turn off the lights.",
          "Не забудь выключить свет.",
          "Turn off означает выключить; turn out the lights тоже допустимо. Down обычно уменьшает яркость или уровень.",
          [
            "out"
          ]
        ],
        [
          "It's cold. Put on your coat.",
          "Холодно. Надень пальто.",
          "Put on — надеть одежду; take off — снять."
        ],
        [
          "The plane took off on time.",
          "Самолёт взлетел вовремя.",
          "Take off у самолёта означает взлететь."
        ],
        [
          "The match was called off because of the rain.",
          "Матч отменили из-за дождя.",
          "Call off — отменить событие; пассив was called off сообщает об отмене."
        ],
        [
          "We've put off the meeting until next week.",
          "Мы перенесли встречу на следующую неделю.",
          "Put off — отложить действие или событие, а не убрать вещь put away."
        ],
        [
          "Get off the bus at the next stop.",
          "Выходи из автобуса на следующей остановке.",
          "Get off используется для выхода из автобуса; get out of — обычно из машины."
        ],
        [
          "Please take off your shoes when you come in.",
          "Сними обувь, когда войдёшь.",
          "Take off — снять одежду или обувь."
        ],
        [
          "Can you switch on the TV? The news is starting.",
          "Можешь включить телевизор? Начинаются новости.",
          "Switch on — включить устройство; switch off — выключить."
        ]
      ],
      "e": [
        [
          "Switch off the light, please.",
          "Выключи свет, пожалуйста.",
          "Switch/turn off — выключить; существительное можно поставить перед или после off."
        ],
        [
          "We put off the meeting until Friday.",
          "Мы отложили встречу до пятницы.",
          "Put off — перенести событие; put away означает убрать вещь на место."
        ],
        [
          "I got off the bus at the wrong stop.",
          "Я вышел из автобуса не на той остановке.",
          "Get off the bus — выход из общественного транспорта."
        ]
      ],
      "t": [
        [
          "The concert was called off.",
          "Концерт отменили.",
          "Call off — отмена, не просто перенос; пассив was called off сохраняет результат."
        ],
        [
          "Don't put it off.",
          "Не откладывай.",
          "Put it off: местоимение it между глаголом и частицей."
        ]
      ],
      "w": [
        [
          "When I get home, I take off my shoes and switch on the kettle. I put on my old jumper and turn on some music. I keep putting off cleaning the windows.",
          "Вернувшись домой, снимаю обувь, включаю чайник, надеваю старый свитер и включаю музыку. Мытьё окон постоянно откладываю.",
          "Take off/put on — одежда; switch/turn on — устройства; put off — откладывать действие."
        ]
      ]
    },
    "141": {
      "g": [
        [
          "Don't stop! Carry on. You're doing well.",
          "Не останавливайся! Продолжай, всё хорошо получается.",
          "Carry on означает продолжать; off не передаёт этот смысл."
        ],
        [
          "Hold on a minute. I'll be right back.",
          "Подожди минуту, сейчас вернусь.",
          "Hold on — подожди; это устойчивое разговорное выражение."
        ],
        [
          "Do you get on well with your neighbours?",
          "Ты хорошо ладишь с соседями?",
          "Get on with someone — иметь хорошие отношения."
        ],
        [
          "We set off early to avoid the traffic.",
          "Мы отправились рано, чтобы избежать пробок.",
          "Set off — начать поездку, отправиться."
        ],
        [
          "The alarm went off at 6 a.m.",
          "Будильник сработал в шесть утра.",
          "Go off у сигнала означает сработать, хотя off в других сочетаниях может означать выключение."
        ],
        [
          "We went to the airport to see her off.",
          "Мы приехали в аэропорт проводить её.",
          "See someone off — проводить уезжающего; off стоит после her."
        ],
        [
          "He's always showing off about his new car.",
          "Он постоянно хвастается новой машиной.",
          "Show off — демонстративно хвастаться или привлекать внимание."
        ],
        [
          "The teacher told me off for being late.",
          "Учитель отругал меня за опоздание.",
          "Tell someone off — отругать; это не обычное «рассказать»."
        ]
      ],
      "e": [
        [
          "Please go on — I'm listening.",
          "Пожалуйста, продолжай, я слушаю.",
          "Go on — продолжить речь; go off имело бы другое значение."
        ],
        [
          "I don't get on with my boss.",
          "Я не лажу с начальником.",
          "Get on with — отношения между людьми."
        ],
        [
          "We set off at 5 a.m.",
          "Мы отправились в пять утра.",
          "Set off — начало пути; set on не передаёт это значение."
        ]
      ],
      "t": [
        [
          "We set off at 7.",
          "Мы отправились в семь.",
          "Set off заменяет left on our journey."
        ],
        [
          "Tom gets on well with his brother.",
          "Том хорошо ладит с братом.",
          "Get on well with someone передаёт хорошие отношения."
        ]
      ],
      "w": [
        [
          "My parents came to the station to see me off. We set off at six. I didn't get on with one of my fellow travellers — he showed off all the time. But we carried on and had fun.",
          "Родители пришли проводить меня на станцию. Отправились в шесть. С одним попутчиком не поладил: он всё хвастался. Но продолжили путь и хорошо провели время.",
          "See off — проводы; set off — отправление; get on — отношения; show off — хвастовство; carry on — продолжение."
        ]
      ]
    },
    "142": {
      "g": [
        [
          "Can you turn the music down? It's too loud.",
          "Сделай музыку потише, она слишком громкая.",
          "Turn down — уменьшить громкость; turn up — увеличить."
        ],
        [
          "Please write down the address.",
          "Запиши адрес, пожалуйста.",
          "Write down означает зафиксировать информацию письменно."
        ],
        [
          "I'm trying to cut down on sugar.",
          "Я стараюсь есть меньше сахара.",
          "Cut down on — уменьшить употребление; on вводит сокращаемый предмет."
        ],
        [
          "Calm down! There's no need to shout.",
          "Успокойся! Кричать не нужно.",
          "Calm down — успокоиться, уменьшить возбуждение."
        ],
        [
          "I offered him a job, but he turned it down.",
          "Я предложил ему работу, но он отказался.",
          "Turn down предложение означает отклонить, не уменьшить громкость."
        ],
        [
          "Slow down! You're driving too fast.",
          "Помедленнее! Ты слишком быстро едешь.",
          "Slow down — снизить скорость."
        ],
        [
          "Can you pick up that box for me?",
          "Можешь поднять эту коробку?",
          "Pick up — поднять или взять; put down — положить."
        ],
        [
          "I promised to help him. I can't let him down.",
          "Я обещал помочь и не могу его подвести.",
          "Let someone down означает разочаровать, не выполнить ожидания."
        ]
      ],
      "e": [
        [
          "Turn up the volume — I can't hear anything!",
          "Сделай громче: ничего не слышно!",
          "Turn up увеличивает громкость; down уменьшает её и противоречит причине."
        ],
        [
          "Sit down, please, and open your books.",
          "Садитесь и откройте книги.",
          "Sit down — сесть; sit up обычно означает выпрямиться сидя."
        ],
        [
          "My car broke down on the motorway.",
          "Машина сломалась на автомагистрали.",
          "Break down — перестать работать; break up обычно разделиться или расстаться."
        ]
      ],
      "t": [
        [
          "I've cut down on chocolate.",
          "Я сократил употребление шоколада.",
          "Cut down on означает уменьшить количество, не обязательно отказаться полностью."
        ],
        [
          "She turned down the job offer.",
          "Она отказалась от предложения работы.",
          "Turn down — отклонить; it ставится перед down, существительное допускает обе позиции."
        ]
      ],
      "w": [
        [
          "I want to cut down on coffee and slow down a bit at work. I've turned down two big projects this month. I'm trying to calm down and not let my family down.",
          "Хочу пить меньше кофе и немного сбавить темп работы. В этом месяце отказался от двух проектов. Стараюсь успокоиться и не подвести семью.",
          "Cut down on — сократить; slow/calm down — снизить темп или напряжение; turn down — отказ; let down — подвести."
        ]
      ]
    },
    "143": {
      "g": [
        [
          "Where did you grow up?",
          "Где ты вырос?",
          "Grow up — провести детство и стать взрослым."
        ],
        [
          "I've decided to take up yoga.",
          "Я решил заняться йогой.",
          "Take up — начать хобби или занятие; не надеть одежду put on."
        ],
        [
          "He gave up smoking ten years ago.",
          "Он бросил курить десять лет назад.",
          "Give up — отказаться от привычки; после него действие smoking с -ing."
        ],
        [
          "She set up her own company in 2020.",
          "В 2020 году она основала компанию.",
          "Set up — создать организацию или систему."
        ],
        [
          "We waited for an hour, but he didn't turn up.",
          "Мы ждали час, но он не пришёл.",
          "Turn up — появиться или прийти; это не только увеличение громкости в другом контексте."
        ],
        [
          "Prices have gone up again.",
          "Цены снова выросли.",
          "Go up — увеличить уровень; prices — показатель, который растёт."
        ],
        [
          "That's not true! You made it up.",
          "Это неправда! Ты всё выдумал.",
          "Make up — придумать историю; местоимение it ставится перед up."
        ],
        [
          "She was brought up by her grandparents.",
          "Её воспитали бабушка и дедушка.",
          "Bring up — воспитать; пассив was brought up указывает, кто получил воспитание."
        ]
      ],
      "e": [
        [
          "I grew up in a small village.",
          "Я вырос в маленькой деревне.",
          "Grow up означает вырасти; прошедшая форма grew."
        ],
        [
          "He gave up his job last month.",
          "В прошлом месяце он оставил работу.",
          "Give up — отказаться или бросить; gave — прошедшая форма."
        ],
        [
          "She didn't show up at the party.",
          "Она не пришла на вечеринку.",
          "Show up и turn up оба означают появиться."
        ]
      ],
      "t": [
        [
          "I took up tennis last year.",
          "В прошлом году я начал играть в теннис.",
          "Take up tennis означает начать заниматься этим видом спорта; took — прошлое."
        ],
        [
          "Tom gave up eating meat.",
          "Том перестал есть мясо.",
          "Give up + eating meat или meat означает отказаться от привычки."
        ]
      ],
      "w": [
        [
          "I grew up in a small town by the sea. When I was twelve, I took up swimming. I gave up chocolate last year, and one day I'd like to set up my own café.",
          "Я вырос в маленьком городе у моря. В двенадцать начал плавать. В прошлом году отказался от шоколада, а когда-нибудь хочу открыть кафе.",
          "Grow up — вырасти; take up — начать занятие; give up — бросить; set up — основать."
        ]
      ]
    },
    "144": {
      "g": [
        [
          "Can you help me tidy up the room?",
          "Поможешь убрать комнату?",
          "Tidy up — привести в порядок; up усиливает завершённость уборки."
        ],
        [
          "We've used up all the paper.",
          "Мы израсходовали всю бумагу.",
          "Use up — использовать запас полностью."
        ],
        [
          "I don't know this word. I'll look it up.",
          "Не знаю это слово. Посмотрю в словаре.",
          "Look up — найти информацию в справочнике; местоимение it перед up."
        ],
        [
          "Cheer up! It's not so bad.",
          "Не унывай! Всё не так плохо.",
          "Cheer up — приободриться или поднять настроение."
        ],
        [
          "Who's going to wash up after dinner?",
          "Кто будет мыть посуду после ужина?",
          "Wash up в британском употреблении обычно означает мыть посуду."
        ],
        [
          "We got lost and ended up in a different town.",
          "Мы заблудились и оказались в другом городе.",
          "End up — прийти к итоговой, часто незапланированной ситуации."
        ],
        [
          "Sorry I'm late. I was held up in traffic.",
          "Извини за опоздание. Меня задержали пробки.",
          "Be held up — быть задержанным; это пассив фразового hold up."
        ],
        [
          "I always mix up the twins. They look the same.",
          "Я постоянно путаю близнецов: они похожи.",
          "Mix up — перепутать людей или предметы."
        ]
      ],
      "e": [
        [
          "Tom and Kate split up last year.",
          "В прошлом году Том и Кейт расстались.",
          "Split up — закончить отношения; split out не имеет здесь нужного значения."
        ],
        [
          "I'll look up the word in a dictionary.",
          "Я найду слово в словаре.",
          "Look up the word или look the word up; местоимение it ставится только перед up."
        ],
        [
          "We ended up staying at home.",
          "В итоге мы остались дома.",
          "End up + staying выражает конечный результат; после end up действие с -ing."
        ]
      ],
      "t": [
        [
          "I was held up by the traffic.",
          "Меня задержали пробки.",
          "Held up by/in traffic — задержка из-за дорожного движения."
        ],
        [
          "Look up this word in a dictionary.",
          "Найди это слово в словаре.",
          "Look up — поиск справочной информации; look it up с местоимением между частями."
        ]
      ],
      "w": [
        [
          "We planned to go to the beach, but we were held up by traffic and ended up in a village café. I mixed up the dates of our hotel, but my friends cheered me up.",
          "Хотели на пляж, но пробки задержали, и в итоге оказались в деревенском кафе. Я перепутал даты гостиницы, но друзья меня подбодрили.",
          "Hold up — задержать; end up — оказаться; mix up — перепутать; cheer up — подбодрить."
        ]
      ]
    },
    "145": {
      "g": [
        [
          "Go away! I want to be alone.",
          "Уходи! Хочу побыть один.",
          "Go away — уйти прочь; go back — вернуться в прежнее место."
        ],
        [
          "Please put your toys away before dinner.",
          "Убери игрушки до ужина, пожалуйста.",
          "Put away — убрать на хранение; put back подчёркивало бы возвращение на прежнее место."
        ],
        [
          "Don't throw away those boxes. I might need them.",
          "Не выбрасывай коробки. Они могут понадобиться.",
          "Throw away — избавиться от вещи; back — бросить обратно, другой смысл."
        ],
        [
          "I'm busy now. Can I call you back?",
          "Сейчас занят. Можно перезвонить?",
          "Call back — позвонить в ответ или позже."
        ],
        [
          "When will you pay me back? You borrowed the money a month ago.",
          "Когда вернёшь долг? Ты занял деньги месяц назад.",
          "Pay back — вернуть ранее одолженные деньги."
        ],
        [
          "The shoes were too small, so I took them back to the shop.",
          "Туфли были малы, поэтому я вернул их в магазин.",
          "Take back — вернуть вещь туда, откуда её взяли."
        ],
        [
          "She gave away all her old clothes to charity.",
          "Она отдала всю старую одежду на благотворительность.",
          "Give away — отдать бесплатно; give back — вернуть владельцу."
        ],
        [
          "What time did you get back last night?",
          "Во сколько ты вчера вернулся?",
          "Get back — вернуться, не уехать away."
        ]
      ],
      "e": [
        [
          "I'll call you back later.",
          "Я перезвоню позже.",
          "Call back — повторный или ответный звонок."
        ],
        [
          "He threw away his old phone. It didn't work.",
          "Он выбросил старый телефон: тот не работал.",
          "Throw away — избавиться; throw back — бросить обратно, иной смысл."
        ],
        [
          "Can you pay back the money I lent you?",
          "Можешь вернуть деньги, которые я одолжил?",
          "Pay back — вернуть долг; получателя можно указать pay me back."
        ]
      ],
      "t": [
        [
          "Tom got back from holiday yesterday.",
          "Том вчера вернулся из отпуска.",
          "Get back from — вернуться откуда-то; got — прошедшая форма."
        ],
        [
          "Call her back later.",
          "Перезвони ей позже.",
          "Call her back: местоимение her ставится между глаголом и back."
        ]
      ],
      "w": [
        [
          "Last weekend I cleaned my flat. I threw away old magazines and gave away some clothes. I put my books away and took back a jacket I had never worn to the shop.",
          "В прошлые выходные убрал квартиру. Выбросил старые журналы и отдал часть одежды. Убрал книги и вернул в магазин куртку, которую ни разу не носил.",
          "Throw/give away — избавиться или отдать; put away — убрать; take back — вернуть в магазин."
        ]
      ]
    }
  },
  "lab": {
    "ed": {
      "worked": [
        "worked",
        "работал",
        "Перед -ed звук /k/ глухой, поэтому окончание /t/, без дополнительного слога."
      ],
      "stopped": [
        "stopped",
        "остановился",
        "После глухого /p/ окончание -ed звучит /t/; отдельного гласного между ними нет."
      ],
      "watched": [
        "watched",
        "смотрел",
        "После глухого /tʃ/ окончание -ed звучит /t/, не /ɪd/."
      ],
      "washed": [
        "washed",
        "мыл",
        "После глухого /ʃ/ окончание -ed звучит /t/."
      ],
      "laughed": [
        "laughed",
        "смеялся",
        "В laugh последние gh звучат /f/. После глухого /f/ добавляется /t/."
      ],
      "finished": [
        "finished",
        "закончил",
        "Finish оканчивается глухим /ʃ/, поэтому -ed произносится /t/."
      ],
      "kissed": [
        "kissed",
        "поцеловал",
        "После глухого /s/ окончание -ed звучит /t/, без нового слога."
      ],
      "looked": [
        "looked",
        "посмотрел",
        "После глухого /k/ окончание -ed произносится /t/."
      ],
      "helped": [
        "helped",
        "помог",
        "Help заканчивается глухим /p/, поэтому -ed звучит /t/."
      ],
      "danced": [
        "danced",
        "танцевал",
        "Dance заканчивается звуком /s/, а не произносимым e; -ed звучит /t/."
      ],
      "asked": [
        "asked",
        "спросил",
        "Последний звук ask — глухой /k/, поэтому добавляется /t/."
      ],
      "cooked": [
        "cooked",
        "готовил",
        "После глухого /k/ окончание -ed звучит /t/, без гласного."
      ],
      "missed": [
        "missed",
        "пропустил; скучал",
        "После глухого /s/ окончание -ed звучит /t/."
      ],
      "hoped": [
        "hoped",
        "надеялся",
        "Hope заканчивается звуком /p/, конечное e не читается; окончание звучит /t/."
      ],
      "played": [
        "played",
        "играл",
        "Play заканчивается гласным /eɪ/, поэтому -ed звучит /d/."
      ],
      "lived": [
        "lived",
        "жил",
        "После звонкого /v/ окончание -ed звучит /d/."
      ],
      "opened": [
        "opened",
        "открыл",
        "Open заканчивается звонким /n/, поэтому добавляется /d/, без нового слога."
      ],
      "called": [
        "called",
        "позвонил; назвал",
        "После звонкого /l/ окончание -ed звучит /d/."
      ],
      "cleaned": [
        "cleaned",
        "убрал; очистил",
        "После звонкого /n/ окончание -ed произносится /d/."
      ],
      "tried": [
        "tried",
        "попробовал",
        "Try заканчивается гласным /aɪ/, поэтому окончание звучит /d/."
      ],
      "stayed": [
        "stayed",
        "остался",
        "После гласного /eɪ/ окончание -ed звучит /d/."
      ],
      "changed": [
        "changed",
        "изменил",
        "Change заканчивается звонким /dʒ/, поэтому -ed звучит /d/."
      ],
      "listened": [
        "listened",
        "слушал",
        "В listen буква t не читается. Последний звук /n/ звонкий, поэтому добавляется /d/."
      ],
      "arrived": [
        "arrived",
        "прибыл",
        "После звонкого /v/ окончание -ed звучит /d/."
      ],
      "loved": [
        "loved",
        "любил",
        "Love заканчивается звонким /v/, поэтому добавляется /d/."
      ],
      "used": [
        "used",
        "использовал",
        "Глагол use заканчивается звонким /z/, поэтому -ed звучит /d/."
      ],
      "moved": [
        "moved",
        "переехал; передвинул",
        "После звонкого /v/ окончание -ed произносится /d/."
      ],
      "enjoyed": [
        "enjoyed",
        "получил удовольствие",
        "Enjoy заканчивается гласным /ɔɪ/, поэтому -ed звучит /d/."
      ],
      "wanted": [
        "wanted",
        "хотел",
        "Want заканчивается на /t/, поэтому -ed добавляет отдельный слог /ɪd/."
      ],
      "needed": [
        "needed",
        "нуждался",
        "После /d/ окончание -ed звучит /ɪd/, создавая дополнительный слог."
      ],
      "started": [
        "started",
        "начал",
        "После конечного /t/ в start окончание -ed звучит /ɪd/."
      ],
      "decided": [
        "decided",
        "решил",
        "Decide заканчивается звуком /d/, поэтому окончание -ed — /ɪd/."
      ],
      "visited": [
        "visited",
        "посетил",
        "Visit заканчивается на /t/, поэтому -ed добавляет слог /ɪd/."
      ],
      "waited": [
        "waited",
        "ждал",
        "После /t/ окончание -ed произносится /ɪd/, не просто /t/."
      ],
      "ended": [
        "ended",
        "закончилось",
        "End заканчивается на /d/, поэтому -ed добавляет слог /ɪd/."
      ],
      "invited": [
        "invited",
        "пригласил",
        "Invite заканчивается звуком /t/, поэтому окончание произносится /ɪd/."
      ],
      "hated": [
        "hated",
        "ненавидел",
        "Hate заканчивается звуком /t/, поэтому -ed добавляет /ɪd/."
      ],
      "painted": [
        "painted",
        "покрасил",
        "После конечного /t/ в paint окончание звучит /ɪd/."
      ],
      "added": [
        "added",
        "добавил",
        "Add заканчивается на /d/, поэтому окончание -ed произносится /ɪd/."
      ],
      "created": [
        "created",
        "создал",
        "Create заканчивается звуком /t/, поэтому -ed создаёт слог /ɪd/."
      ],
      "landed": [
        "landed",
        "приземлился",
        "После /d/ в land окончание -ed добавляет слог /ɪd/."
      ],
      "shouted": [
        "shouted",
        "крикнул",
        "Shout заканчивается на /t/, поэтому окончание -ed звучит /ɪd/."
      ]
    },
    "s": {
      "works": [
        "works",
        "работает; работы",
        "После глухого /k/ окончание -s звучит /s/."
      ],
      "cats": [
        "cats",
        "кошки",
        "Cat заканчивается глухим /t/, поэтому множественное -s звучит /s/."
      ],
      "stops": [
        "stops",
        "останавливается; остановки",
        "После глухого /p/ окончание -s произносится /s/."
      ],
      "books": [
        "books",
        "книги",
        "Book заканчивается глухим /k/, поэтому окончание -s — /s/."
      ],
      "laughs": [
        "laughs",
        "смеётся",
        "Laugh заканчивается звуком /f/, поэтому -s звучит /s/."
      ],
      "shops": [
        "shops",
        "магазины",
        "Shop заканчивается глухим /p/, поэтому -s звучит /s/."
      ],
      "writes": [
        "writes",
        "пишет",
        "Write заканчивается звуком /t/; после него -s звучит /s/."
      ],
      "likes": [
        "likes",
        "нравится; любит",
        "После глухого /k/ в like окончание -s звучит /s/."
      ],
      "helps": [
        "helps",
        "помогает",
        "После глухого /p/ в help окончание -s произносится /s/."
      ],
      "students": [
        "students",
        "студенты",
        "Последний звук student — /t/, поэтому -s звучит /s/."
      ],
      "walks": [
        "walks",
        "гуляет; прогулки",
        "Walk заканчивается /k/, буква l обычно не читается; окончание -s звучит /s/."
      ],
      "maps": [
        "maps",
        "карты",
        "После глухого /p/ окончание множественного числа -s звучит /s/."
      ],
      "plays": [
        "plays",
        "играет; пьесы",
        "После гласного /eɪ/ окончание -s звучит /z/."
      ],
      "dogs": [
        "dogs",
        "собаки",
        "После звонкого /g/ окончание -s произносится /z/."
      ],
      "lives": [
        "lives",
        "живёт; жизни",
        "И у глагола live, и у множественного life перед -s звонкий /v/, поэтому окончание /z/."
      ],
      "goes": [
        "goes",
        "идёт",
        "Go заканчивается гласным, поэтому -es произносится /z/, без дополнительного слога."
      ],
      "cars": [
        "cars",
        "машины",
        "В британском произношении car заканчивается гласным /ɑː/, поэтому -s звучит /z/."
      ],
      "friends": [
        "friends",
        "друзья",
        "Friend заканчивается звонким /d/, поэтому -s звучит /z/."
      ],
      "sings": [
        "sings",
        "поёт",
        "После звонкого /ŋ/ окончание -s звучит /z/."
      ],
      "reads": [
        "reads",
        "читает",
        "После звонкого /d/ в read окончание -s звучит /z/."
      ],
      "tries": [
        "tries",
        "пытается; попытки",
        "Try заканчивается гласным /aɪ/, поэтому окончание звучит /z/, несмотря на написание -ies."
      ],
      "days": [
        "days",
        "дни",
        "После гласного /eɪ/ окончание -s произносится /z/."
      ],
      "calls": [
        "calls",
        "звонит; звонки",
        "После звонкого /l/ окончание -s звучит /z/."
      ],
      "trains": [
        "trains",
        "поезда; тренируется",
        "После звонкого /n/ окончание -s звучит /z/."
      ],
      "watches": [
        "watches",
        "смотрит; наручные часы",
        "После /tʃ/ добавляется отдельный слог /ɪz/, не только /s/."
      ],
      "buses": [
        "buses",
        "автобусы",
        "После конечного /s/ в bus окончание -es добавляет слог /ɪz/."
      ],
      "washes": [
        "washes",
        "моет",
        "После /ʃ/ в wash окончание -es звучит /ɪz/."
      ],
      "pages": [
        "pages",
        "страницы",
        "После /dʒ/ в page окончание -s добавляет слог /ɪz/."
      ],
      "boxes": [
        "boxes",
        "коробки",
        "Box заканчивается звуком /s/ в сочетании /ks/, поэтому окончание -es звучит /ɪz/."
      ],
      "dances": [
        "dances",
        "танцует; танцы",
        "Dance заканчивается /s/, поэтому -s добавляет слог /ɪz/."
      ],
      "changes": [
        "changes",
        "меняет; изменения",
        "После /dʒ/ окончание -s звучит /ɪz/."
      ],
      "misses": [
        "misses",
        "пропускает; скучает",
        "После /s/ окончание -es добавляет отдельный слог /ɪz/."
      ],
      "places": [
        "places",
        "места",
        "Place заканчивается /s/, поэтому окончание -s звучит /ɪz/."
      ],
      "teaches": [
        "teaches",
        "преподаёт",
        "После /tʃ/ в teach окончание -es произносится /ɪz/."
      ],
      "uses": [
        "uses",
        "использует; применения",
        "После /z/ у глагола или /s/ у существительного окончание добавляет слог /ɪz/."
      ],
      "languages": [
        "languages",
        "языки",
        "Language заканчивается звуком /dʒ/, поэтому -s произносится /ɪz/."
      ]
    },
    "contr": {
      "I'll go to work.": [
        "I'll go to work.",
        "Я пойду на работу.",
        "I'll — I will, будущее действие. В I go отсутствует will и обычно выражается привычка."
      ],
      "I go to work.": [
        "I go to work.",
        "Я хожу на работу.",
        "Present simple описывает обычное, регулярное действие; сокращённого will здесь нет."
      ],
      "I'd like coffee.": [
        "I'd like coffee.",
        "Я хотел бы кофе.",
        "I'd здесь означает I would: вежливое желание, а не обычное предпочтение I like."
      ],
      "I like coffee.": [
        "I like coffee.",
        "Мне нравится кофе.",
        "Like без would сообщает вкус или предпочтение, а не вежливый заказ сейчас."
      ],
      "She's working today.": [
        "She's working today.",
        "Она сегодня работает.",
        "She's здесь сокращает she is: процесс или временная ситуация; was звучит отдельным словом."
      ],
      "She was working today.": [
        "She was working today.",
        "Она сегодня работала.",
        "Was working описывает прошлый процесс; это не сокращение she's, то есть she is."
      ],
      "We've finished.": [
        "We've finished.",
        "Мы закончили.",
        "We've — we have: Present perfect связывает результат с настоящим."
      ],
      "We'd finished.": [
        "We'd finished.",
        "Мы уже закончили к тому моменту.",
        "We'd перед finished означает we had: завершение до другой прошлой точки."
      ],
      "I can come tomorrow.": [
        "I can come tomorrow.",
        "Я могу прийти завтра.",
        "Can выражает возможность; в связной речи часто звучит слабо /kən/, без отрицательного t."
      ],
      "I can't come tomorrow.": [
        "I can't come tomorrow.",
        "Я не могу прийти завтра.",
        "Can't — отрицание can; в обычном британском произношении /kɑːnt/ с долгим гласным."
      ],
      "He's gone home.": [
        "He's gone home.",
        "Он ушёл домой.",
        "He's перед gone означает he has: уход связан с настоящим."
      ],
      "He'd gone home.": [
        "He'd gone home.",
        "К тому времени он ушёл домой.",
        "He'd перед gone означает he had: уход раньше другого прошлого момента."
      ],
      "They're late.": [
        "They're late.",
        "Они опаздывают.",
        "They're — they are; сообщается нынешнее состояние."
      ],
      "They were late.": [
        "They were late.",
        "Они опоздали.",
        "Were относит состояние к прошлому; это не сокращение they're."
      ],
      "I've lived here for years.": [
        "I've lived here for years.",
        "Я живу здесь много лет.",
        "I've — I have: период продолжается до настоящего."
      ],
      "I lived here for years.": [
        "I lived here for years.",
        "Я жил здесь много лет.",
        "Past simple обычно описывает законченный период; вспомогательного have нет."
      ],
      "You'll love it.": [
        "You'll love it.",
        "Тебе это очень понравится.",
        "You'll — you will: прогноз будущего впечатления."
      ],
      "You love it.": [
        "You love it.",
        "Тебе это очень нравится.",
        "Love в Present simple описывает нынешнее чувство; will отсутствует."
      ],
      "We'd better go.": [
        "We'd better go.",
        "Нам лучше идти.",
        "We'd здесь означает we had: had better + инфинитив — совет с возможными последствиями."
      ],
      "We'd rather go.": [
        "We'd rather go.",
        "Мы предпочли бы пойти.",
        "We'd здесь означает we would: would rather выражает предпочтение."
      ],
      "She can swim.": [
        "She can swim.",
        "Она умеет плавать.",
        "Can выражает умение; обычно произносится слабо /kən/ в связной речи."
      ],
      "She can't swim.": [
        "She can't swim.",
        "Она не умеет плавать.",
        "Can't отрицает умение; в британском образце отличается долгим гласным и конечным t."
      ],
      "It's raining.": [
        "It's raining.",
        "Идёт дождь.",
        "It's здесь означает it is: процесс в настоящем."
      ],
      "It was raining.": [
        "It was raining.",
        "Шёл дождь.",
        "Was raining описывает процесс в прошлом; was — отдельный вспомогательный глагол."
      ],
      "I'd seen it before.": [
        "I'd seen it before.",
        "Я уже видел это раньше к тому моменту.",
        "I'd перед seen означает I had: Past perfect."
      ],
      "I've seen it before.": [
        "I've seen it before.",
        "Я уже видел это раньше.",
        "I've означает I have: Present perfect, опыт до настоящего."
      ],
      "He'll call you.": [
        "He'll call you.",
        "Он тебе позвонит.",
        "He'll — he will: будущее действие."
      ],
      "He'd call you.": [
        "He'd call you.",
        "Он бы тебе позвонил.",
        "He'd перед call означает he would; это условное действие или будущее из прошлого, по контексту."
      ],
      "I used to play tennis.": [
        "I used to play tennis.",
        "Раньше я играл в теннис.",
        "Used to + play — прежняя привычка, а не нынешнее привыкание."
      ],
      "I'm used to playing tennis.": [
        "I'm used to playing tennis.",
        "Я привык играть в теннис.",
        "Be used to + playing означает привычность; to здесь предлог, поэтому -ing."
      ],
      "We're going to win.": [
        "We're going to win.",
        "Мы собираемся победить.",
        "We're — we are: намерение или прогноз из настоящего."
      ],
      "We were going to win.": [
        "We were going to win.",
        "Мы собирались победить.",
        "Were going to относит намерение или ожидание к прошлому; were не сокращается как we're."
      ]
    },
    "words": {
      "Wednesday": [
        "Wednesday",
        "среда",
        "Обычно /ˈwenzdeɪ/: буква d в середине не произносится, ударение на первом слоге."
      ],
      "comfortable": [
        "comfortable",
        "удобный",
        "Часто /ˈkʌmftəbl/, с сокращёнными безударными слогами; ударение на первом слоге."
      ],
      "vegetable": [
        "vegetable",
        "овощ",
        "Обычно /ˈvedʒtəbl/: в середине нет отдельного полного звука e."
      ],
      "clothes": [
        "clothes",
        "одежда",
        "Обычно /kləʊðz/: th — звонкий /ð/, затем /z/, без дополнительного слога."
      ],
      "island": [
        "island",
        "остров",
        "/ˈaɪlənd/: буква s не читается; первый гласный — /aɪ/."
      ],
      "receipt": [
        "receipt",
        "квитанция; чек",
        "/rɪˈsiːt/: p не читается, ударение на втором слоге."
      ],
      "chocolate": [
        "chocolate",
        "шоколад",
        "Часто /ˈtʃɒklət/, с сокращением середины; ударение в начале, не на последнем слоге."
      ],
      "interesting": [
        "interesting",
        "интересный",
        "Ударение на первом слоге; средний безударный гласный может сокращаться, число слогов варьируется."
      ],
      "temperature": [
        "temperature",
        "температура",
        "Ударение на первом слоге; безударная середина часто сокращается, а ture звучит /tʃə/."
      ],
      "different": [
        "different",
        "другой; различный",
        "Ударение на первом слоге; середина часто сокращается: /ˈdɪfrənt/."
      ],
      "world": [
        "world",
        "мир",
        "Британский образец /wɜːld/: долгий /ɜː/, не два отдельных слога."
      ],
      "thought": [
        "thought",
        "мысль; думал",
        "/θɔːt/: th — глухой /θ/, gh не читается, гласный долгий."
      ],
      "through": [
        "through",
        "через; сквозь",
        "/θruː/: th — глухой /θ/, gh не читается, в конце долгий /uː/."
      ],
      "though": [
        "though",
        "хотя",
        "/ðəʊ/: th — звонкий /ð/, gh не читается; отличается от through отсутствием r."
      ],
      "thorough": [
        "thorough",
        "тщательный",
        "Британский образец /ˈθʌrə/: два слога, начальный th глухой; не путайте с through."
      ],
      "cupboard": [
        "cupboard",
        "шкаф",
        "/ˈkʌbəd/: p не читается, ударение на первом слоге."
      ],
      "answer": [
        "answer",
        "ответ; отвечать",
        "Британский образец /ˈɑːnsə/: буква w не читается."
      ],
      "listen": [
        "listen",
        "слушать",
        "/ˈlɪsən/: буква t не читается; безударный конец произносится слабо."
      ],
      "castle": [
        "castle",
        "замок",
        "В британском образце /ˈkɑːsəl/: t не читается."
      ],
      "foreign": [
        "foreign",
        "иностранный",
        "/ˈfɒrən/: g не читается, ударение на первом слоге."
      ],
      "necessary": [
        "necessary",
        "необходимый",
        "Ударение на первом слоге; c перед e звучит /s/, безударные гласные сокращаются."
      ],
      "library": [
        "library",
        "библиотека",
        "Ударение на первом слоге с /aɪ/; не добавляйте ударение на среднюю часть слова."
      ],
      "February": [
        "February",
        "февраль",
        "Ударение на первом слоге; первое r может произноситься или опускаться в распространённых вариантах."
      ],
      "business": [
        "business",
        "бизнес; дело",
        "/ˈbɪznəs/: обычно два слога, а не произношение каждой написанной гласной."
      ],
      "knowledge": [
        "knowledge",
        "знание",
        "/ˈnɒlɪdʒ/: начальная k не читается, конец -dge звучит /dʒ/."
      ],
      "heard": [
        "heard",
        "слышал",
        "Британский образец /hɜːd/: ear здесь даёт /ɜː/, не звук из слова hear."
      ],
      "bought": [
        "bought",
        "купил",
        "Британский образец /bɔːt/: gh не читается, гласный долгий."
      ],
      "colleague": [
        "colleague",
        "коллега",
        "/ˈkɒliːɡ/: ударение в начале, долгий /iː/ во втором слоге."
      ],
      "height": [
        "height",
        "высота; рост",
        "/haɪt/: gh не читается, гласный /aɪ/; не путайте с weight."
      ],
      "weight": [
        "weight",
        "вес",
        "/weɪt/: gh не читается, гласный /eɪ/, в отличие от height."
      ]
    },
    "grammar": {
      "I've been waiting for ages.": [
        "I've been waiting for ages.",
        "Я жду уже целую вечность.",
        "I've — I have; been waiting показывает длительность до сейчас, for ages — «очень долго»."
      ],
      "If I'd known, I would have told you.": [
        "If I'd known, I would have told you.",
        "Если бы я знал, я бы сказал тебе.",
        "I'd перед known — I had; would have told — нереальный прошлый результат."
      ],
      "She's used to getting up early.": [
        "She's used to getting up early.",
        "Она привыкла рано вставать.",
        "She's — she is; be used to + getting означает привычность, а to здесь предлог."
      ],
      "You'd better not be late again.": [
        "You'd better not be late again.",
        "Тебе лучше больше не опаздывать.",
        "You'd — you had в had better; not стоит перед инфинитивом be."
      ],
      "He must have forgotten about it.": [
        "He must have forgotten about it.",
        "Должно быть, он об этом забыл.",
        "Must have + forgotten — уверенный вывод о прошлом; forgotten — третья форма forget."
      ],
      "We should've left a bit earlier.": [
        "We should've left a bit earlier.",
        "Нам стоило уйти немного раньше.",
        "Should've — should have; left выражает оценку уже прошедшего действия."
      ],
      "What would you do if you won the lottery?": [
        "What would you do if you won the lottery?",
        "Что бы ты сделал, если бы выиграл в лотерею?",
        "Won после if задаёт воображаемое условие; would you do — его результат."
      ],
      "By this time next year, I'll have finished.": [
        "By this time next year, I'll have finished.",
        "К этому времени в следующем году я закончу.",
        "I'll have finished — Future perfect: завершение раньше будущего срока by this time."
      ],
      "It's the first time I've ever been here.": [
        "It's the first time I've ever been here.",
        "Я здесь впервые.",
        "После it's the first time используется Present perfect I've been; ever подчёркивает весь опыт."
      ],
      "I wish I could speak English fluently.": [
        "I wish I could speak English fluently.",
        "Хотелось бы свободно говорить по-английски.",
        "Wish + could выражает отсутствующее сейчас желаемое умение."
      ],
      "Have you ever thought about moving abroad?": [
        "Have you ever thought about moving abroad?",
        "Ты когда-нибудь думал о переезде за границу?",
        "Have ever thought — опыт; после предлога about используется moving с -ing."
      ],
      "Neither of them could have done it.": [
        "Neither of them could have done it.",
        "Ни один из них не мог этого сделать.",
        "Neither of them отрицает оба варианта; could have done относится к возможному прошлому действию."
      ]
    }
  }
};
  if(typeof module!=='undefined'&&module.exports)module.exports=data;else root.EGIUNotesData=data;
})(typeof window==='undefined'?globalThis:window);
