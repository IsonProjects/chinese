const grammars = [];

function addGrammar(id, name, examples) {
    grammars.push({
        id: id,
        name: name,
        examples: examples
    });
}



addGrammar("thing_in_space", "Предмет в пространстве", [
    { construction: "Существительное + 在 + место + предлог", sentence: "书在桌子上", translation: "Книга на столе" }
]);

addGrammar("go_by_transport", "Добираться на транспорте", [
    { construction: "坐 + транспорт + 去 + глагол", sentence: "我坐地铁去上班", translation: "Я добираюсь на работу на метро" }
]);

addGrammar("moving_verbs", "Глаголы движения", [
    { construction: "上 + существительное", sentence: "上车", translation: "Садиться в машину" },
    { construction: "下 + существительное", sentence: "下车", translation: "Выходить из машины" }
]);

addGrammar("order_numbers", "Порядковые номера", [
    { construction: "第 + число", sentence: "第三", translation: "Третий" }
]);

addGrammar("regularity_of_repetition", "Регулярность повторения", [
    { construction: "每 + 天/年/课", sentence: "每天", translation: "Каждый день" },
    { construction: "天/年/课 * 2", sentence: "年年", translation: "Каждый год" },
    { construction: "每个 + существительное", sentence: "每个人", translation: "Каждый человек" }
]);

addGrammar("prepositions_of_the_place", "Предлоги места", [
    { construction: "Место + предлог", sentence: "家里", translation: "В доме" }
]);

addGrammar("past_tense", "Прошедшее время", [
    { construction: "Глагол + 过", sentence: "做过作业", translation: "Сделал домашнее задание" },
    { construction: "没 + глагол + 过", sentence: "没做过作业", translation: "Не сделал домашнее задание" },
    { construction: "过 + праздник", sentence: "过生日", translation: "Праздновать день рождения" }
]);

addGrammar("a_little_bit", "Немного, чуть-чуть", [
    { construction: "Глагол + 一点儿", sentence: "买一点儿", translation: "Купить немного" },
    { construction: "Прилагательное + 一点儿", sentence: "贵一点儿", translation: "Немного дорогой" }
]);

addGrammar("gei", "Давать, дательный падеж", [
    { construction: "A + 给 + B + существительное", sentence: "我给妈妈苹果", translation: "Я дал маме яблоко" },
    { construction: "A + 给 + B + глагол", sentence: "我给朋友打电话", translation: "Я позвонил другу" }
]);

addGrammar("again", "Опять, снова", [
    { construction: "再 + глагол", sentence: "明天我再去踢足球", translation: "Завтра я опять пойду играть в футбол (буд.)" },
    { construction: "又 + глагол", sentence: "我又吃苹果", translation: "Я опять съел яблоко (прошл.)" }
]);

addGrammar("le", "Завершённость и изменение ситуации", [
    { construction: "Глагол + 了", sentence: "今早我吃了早饭", translation: "Сегодня утром я позавтракал (завершённость)" },
    { construction: "Предложение + 了", sentence: "下雨了", translation: "Пошёл дождь (изменение)" }
]);

addGrammar("action_duration", "Продолжительность действия", [
    { construction: "Глагол + длительность", sentence: "我洗脸三分钟", translation: "Я умываю лицо три минуты" },
    { construction: "Глагол + длительность + 的 + дополнение", sentence: "我唱五分钟的歌", translation: "Я пою песню пять минут" }
]);

addGrammar("synchronism", "Два действия одновременно", [
    { construction: "Глагол + 的时候 + глагол", sentence: "他走路的时候听音乐", translation: "Он шёл и слушал музыку" },
    { construction: "Время/Возраст/... + 的时候 + глагол", sentence: "昨天的时候下雨", translation: "Вчера шёл дождь" }
]);

addGrammar("be_in_process", "Быть в процессе, длиться", [
    { construction: "正在 + глагол", sentence: "昨天下午我正在学习", translation: "Вчера днём я учился" },
    { construction: "在 + глагол", sentence: "我今天凌晨在睡觉", translation: "Сегодня ночью я спал" },
    { construction: "Глагол + 呢", sentence: "我今天早上做早饭呢", translation: "Сегодня утром я готовил завтрак" }
]);

addGrammar("together", "Вместе", [
    { construction: "A + 跟 + B + 一起 + глагол", sentence: "我跟朋友一起跑步", translation: "Я бегу вместе с другом" }
]);

addGrammar("do_quick", "Недолго, быстро сделать", [
    { construction: "Глагол + 一下", sentence: "看一下", translation: "Взгляни" }
]);

addGrammar("sequence_of_events", "Последовательность событий", [
    { construction: "Глагол + 以后 + глагол", sentence: "我考考试以后去图书馆", translation: "Я написал экзамен и пошёл в библиотеку" }
]);

addGrammar("dui", "\"Вспомнил\", влияние", [
    { construction: "对了! ...", sentence: "对了! 我要去商店", translation: "Вспомнил! Мне же надо пойти в магазин" },
    { construction: "Глагол/существительное + 对 + существительное + наречие", sentence: "走路对身体很好", translation: "Гулять полезно для здоровья" }
]);

addGrammar("causal_relationships", "Причинно-следственные связи", [
    { construction: "因为 + глагол + 所以 + глагол", sentence: "因为昨天我生病所以今天没去学校", translation: "Я вчера заболел, поэтому сегодня не пошёл в школу" }
]);

addGrammar("from_and_to", "\"От\" и \"до\"", [
    { construction: "A + 离 + B + 远/近", sentence: "我家离游泳池不远", translation: "От моего дома до бассейна недалеко" }
]);

addGrammar("de_de_de", "Разные частицы de", [
    { construction: "Существительное/прилагательное + 的 + существительное", sentence: "红色的书", translation: "Красная книга" },
    { construction: "Глагол + 得 + прилагательное", sentence: "他读得快", translation: "Он читает быстро" },
    { construction: "Глагол + дополнение + глагол + 得 + прилагательное", sentence: "他跑步跑得慢", translation: "Он бегает медленно" }
]);

addGrammar("cong", "Когда начал делать, от чего-то до чего-то", [
    { construction: "从 + время/место + 开始 + глагол", sentence: "我从明天开始跑步", translation: "С завтрашнего дня я начну бегать" },
    { construction: "从 + время/место + 到 + время/место + глагол", sentence: "我从八点到十二点在学校上课", translation: "С восьми до двенадцати я учусь в школе" }
]);

addGrammar("effective_morphemes", "Результативные морфемы", [
    { construction: "Глагол + 完 + дополнение", sentence: "找完衣服", translation: "Закончил искать одежду" },
    { construction: "Глагол + 到 + дополнение", sentence: "买到东西", translation: "Купил вещи" },
    { construction: "Глагол + 懂 + дополнение", sentence: "听懂", translation: "Услышал и понял" },
    { construction: "没 + глагол + РМ + дополнение", sentence: "我没做完考试题", translation: "Я не полностью решил экзамен" }
]);



let grammarsNode;

document.addEventListener("DOMContentLoaded", () => {
    grammarsNode = document.querySelector(".grammars_section .grammars");

    const grammarTemplate = document.querySelector(".templates .grammar");
    const exampleTemplate = document.querySelector(".templates .example");

    for (const grammar of grammars) {
        const grammarNode = grammarTemplate.cloneNode(true);
        grammarNode.style.display = "block";
        grammarNode.classList.add("grammar_" + grammar.id);

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

        grammarsNode.appendChild(grammarNode);
    }

    const grammarsSearch = document.querySelector(".search .grammars_search");
    grammarsSearch.addEventListener("input", filterGrammars);
});

function filterGrammars(e) {
    const searchValue = e.target.value.toLowerCase().replaceAll(" ", "");
    let filteredGrammars;

    if (searchValue === "") filteredGrammars = grammars.map(grammar => grammar.id);
    else {
        filteredGrammars = [];

        for (const grammar of grammars) {
            if (grammar.name.toLowerCase().replaceAll(" ", "").includes(searchValue)) {
                filteredGrammars.push(grammar.id);
            }
        }
    }

    grammarsNode.classList.add("not_found");

    for (const grammar of grammars) {
        const grammarNode = grammarsNode.querySelector(".grammar_" + grammar.id);

        if (filteredGrammars.includes(grammar.id)) {
            grammarNode.style.display = "";
            grammarsNode.classList.remove("not_found");
        }
        else grammarNode.style.display = "none";
    }
}