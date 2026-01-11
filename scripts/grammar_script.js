const grammars = [];

function addGrammar(id, name, examples) {
    grammars.push({
        id: id,
        name: name,
        examples: examples
    });
}



addGrammar("thing_in_space", "Предмет в пространстве", [
    { construction: "сущ. + 在 + место + предлог", sentence: "书在桌子上", translation: "Книга на столе" }
]);

addGrammar("go_by_transport", "Добираться на транспорте", [
    { construction: "坐 + транспорт + 去 + гл.", sentence: "我坐地铁去上班", translation: "Я добираюсь на работу на метро" }
]);

addGrammar("moving_verbs", "Глаголы движения", [
    { construction: "上 + сущ.", sentence: "上车", translation: "Садиться в машину" },
    { construction: "下 + сущ.", sentence: "下车", translation: "Выходить из машины" }
]);

addGrammar("order_numbers", "Порядковые номера", [
    { construction: "第 + число", sentence: "第三", translation: "Третий" }
]);

addGrammar("regularity_of_repetion", "Регулярность повторения", [
    { construction: "每 + 天/年/课", sentence: "每天", translation: "Каждый день" },
    { construction: "天/年/课 * 2", sentence: "年年", translation: "Каждый год" },
    { construction: "每个 + сущ.", sentence: "每个人", translation: "Каждый человек" }
]);

addGrammar("prepositions_of_the_place", "Предлоги места", [
    { construction: "Место + предлог", sentence: "家里", translation: "В доме" }
]);

addGrammar("past_tense", "Прошедшее время", [
    { construction: "гл. + 过", sentence: "做过作业", translation: "Сделал домашнее задание" },
    { construction: "没 + гл. + 过", sentence: "没做过作业", translation: "Не сделал домашнее задание" },
    { construction: "过 + праздник", sentence: "过生日", translation: "Праздновать день рождения" }
]);

addGrammar("a_little_bit", "Немного, чуть-чуть", [
    { construction: "гл./Adj. + 一点儿", sentence: "买一点儿", translation: "Купить немного" }
]);

addGrammar("gei", "Давать, дательный падеж", [
    { construction: "A + 给 + B + доп. инфо", sentence: "我给妈妈苹果", translation: "Я дал маме яблоко" },
    { construction: "A + 给 + B + гл.", sentence: "我给朋友打电话", translation: "Я позвонил другу" }
]);

addGrammar("again", "Опять, снова", [
    { construction: "再 + гл.", sentence: "明天我再去踢足球", translation: "Завтра я опять пойду играть в футбол (буд.)" },
    { construction: "又 + гл.", sentence: "我又吃苹果", translation: "Я опять съел яблоко (прошл.)" }
]);

addGrammar("le", "Завершенность и изменение ситуации", [
    { construction: "了 + гл.", sentence: "今早我吃了早饭", translation: "Сегодня утром я позавтракал (заверш.)" },
    { construction: "предложение + 了", sentence: "下雨了", translation: "Пошёл дождь (изменение)" }
]);

addGrammar("action_duration", "Продолжительность действия (ПД)", [
    { construction: "гл. + ПД", sentence: "我洗脸三分钟", translation: "Я умываю лицо три минуты" },
    { construction: "гл. + ПД + 的 + Доп.", sentence: "我唱五分钟的歌", translation: "Я пою песню пять минут" }
]);

addGrammar("synchronism", "Два действия одновременно", [
    { construction: "гл. + 的时候 + гл.", sentence: "他走路的时候听音乐", translation: "Он шёл и слушал музыку" },
    { construction: "Время/Возраст/... + 的时候 + гл.", sentence: "昨天的时候下雨", translation: "Вчера шёл дождь" }
]);

addGrammar("in_process", "Быть в процессе, длиться", [
    { construction: "(正)(在) + гл. + (呢)", sentence: "昨天下午我正在学习呢", translation: "Вчера днём я учился" }
]);

addGrammar("together", "Вместе", [
    { construction: "A + 跟 + B + 一起 + гл.", sentence: "我跟朋友一起跑步", translation: "Я бегу вместе с другом" }
]);

addGrammar("do_quick", "Недолго, быстро сделать", [
    { construction: "гл. + 一下", sentence: "看一下", translation: "Взгляни" }
]);

addGrammar("sequence_of_events", "Последовательность событий", [
    { construction: "гл. + 以后 + гл.", sentence: "我考考试以后去图书馆", translation: "Я написал экзамен и пошёл в библиотеку" }
]);

addGrammar("dui", "\"Вспомнил\", влияние", [
    { construction: "对了! ...", sentence: "对了! 我要去商店", translation: "Вспомнил! Мне же надо пойти в магазин" },
    { construction: "гл./сущ. + 对 + сущ. + нар.", sentence: "走路对身体很好", translation: "Гулять полезно для здоровья" }
]);

addGrammar("causal_relationships", "Причинно-следственные связи", [
    { construction: "因为 + гл. + 所以 + гл.", sentence: "因为昨天我生病所以今天没去学校", translation: "Я вчера заболел, поэтому сегодня не пошёл в школу" }
]);

addGrammar("from_and_to", "\"От\" и \"до\"", [
    { construction: "A + 离 + B + 远/近", sentence: "我家离游泳池不远", translation: "От моего дома до бассейна недалеко" }
]);

addGrammar("de_de_de", "Разные частицы de", [
    { construction: "сущ./прил. + 的 + сущ.", sentence: "红色的书", translation: "Красная книга" },
    { construction: "гл. + 得 + прил.", sentence: "他读得快", translation: "Он читает быстро" },
    { construction: "гл. + доп. + гл. + 得 + прил.", sentence: "他跑步跑得慢", translation: "Он бегает медленно" }
]);

addGrammar("cong", "Когда начал делать, от чего-то до чего-то", [
    { construction: "从 + время/место + 开始 + гл.", sentence: "我从明天开始跑步", translation: "С завтрашнего дня я начну бегать" },
    { construction: "从 + время/место + 到 + время/место + доп. инфо", sentence: "我从八点到十二点在学校上课", translation: "С восьми до двенадцати я учусь в школе" }
]);

addGrammar("effective_morphemes", "Результативные морфемы", [
    { construction: "гл. + 完 + доп. инфо", sentence: "找完衣服", translation: "Закончил искать одежду" },
    { construction: "гл. + 到 + доп. инфо", sentence: "买到东西", translation: "Купил вещи" },
    { construction: "гл. + 懂 + доп. инфо", sentence: "听懂", translation: "Услышал и понял" },
    { construction: "没 + гл. + РМ + доп. инфо", sentence: "我没做完考试题", translation: "Я не полностью решил экзамен" }
]);



const grammarTemplate = document.querySelector(".templates .grammar");
const exampleTemplate = document.querySelector(".templates .example");

for (const grammar of grammars) {
    const grammarNode = grammarTemplate.cloneNode(true);
    grammarNode.style.display = "block";
    grammarNode.classList.add(grammar.id);

    const nameNode = grammarNode.querySelector(".name");
    nameNode.innerHTML = grammar.name;

    grammar.examples.forEach(example => {
        const exampleNode = exampleTemplate.cloneNode(true);
        exampleNode.addEventListener("click", () => pronounce(example.sentence));

        exampleNode.querySelector(".construction").innerHTML = example.construction;
        exampleNode.querySelector(".sentence").innerHTML = example.sentence;
        exampleNode.querySelector(".translation").innerHTML = example.translation;

        grammarNode.querySelector(".examples").appendChild(exampleNode);
    });

    document.querySelector(".grammars").appendChild(grammarNode);
}



const grammarsSearch = document.querySelector(".search .grammars_search");
let filteredGrammars = grammars.map(grammar => grammar.id);

grammarsSearch.addEventListener("input", () => {
    const searchValue = grammarsSearch.value.toLowerCase().replaceAll(" ", "");

    if (searchValue === "") filteredGrammars = grammars.map(grammar => grammar.id);
    else {
        filteredGrammars = [];

        for (const grammar of grammars) {
            if (grammar.name.toLowerCase().replaceAll(" ", "").includes(searchValue)) {
                filteredGrammars.push(grammar.id);
            }
        }
    }

    for (const grammar of grammars) {
        const grammarNode = document.querySelector("." + grammar.id);

        if (filteredGrammars.includes(grammar.id)) grammarNode.style.display = "";
        else grammarNode.style.display = "none";
    }
});