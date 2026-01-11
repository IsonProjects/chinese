const grammars = new Map();
const grammarTemplate = document.querySelector(".templates .grammar");
const exampleTemplate = document.querySelector(".templates .example");

grammars.set("thing_in_space", ["Предмет в пространстве", ["Предлоги", "Место"], [
    ["сущ. + 在 + место + предлог", "书在桌子上", "Книга на столе"]]]);
grammars.set("go_by_transport", ["Добираться на транспорте", ["Глагол", "Место"], [
    ["坐 + транспорт + 去 + гл.", "我坐地铁去上班", "Я добираюсь на работу на метро"]]]);
grammars.set("moving_verbs", ["Глаголы движения", ["Глагол", "Движение"], [
    ["上 + сущ.", "上车", "Садиться в машину"], 
    ["下 + сущ.", "下车", "Выходить из машины"]]]);
grammars.set("order_numbers", ["Порядковые номера", ["Числа", "Порядок"], [
    ["第 + число", "第三", "Третий"]]]);
grammars.set("regularity_of_repetion", ["Регулярность повторения", ["Регулярность", "Повтор"], [
    ["每 + 天/年/课", "每天", "Каждый день"], 
    ["天/年/课 * 2", "年年", "Каждый год"], 
    ["每个 + сущ.", "每个人", "Каждый человек"]]]);
grammars.set("prepositions_of_the_place", ["Предлоги места", ["Предлоги", "Место"], [
    ["место + предлог", "家里", "В доме"]]]);
grammars.set("past_tense", ["Прошедшее время", ["Прошлое", "Глагол", "Времена"], [
    ["гл. + 过", "做过作业", "Сделал домашнее задание"],
    ["没 + гл. + 过", "没做过作业", "Не сделал домашнее задание"],
    ["过 + праздник", "过生日", "Праздновать день рождения"]]]);
grammars.set("a_little_bit", ["Немного, чуть-чуть", ["Немного", "Глагол", "Прилагательное"], [
    ["гл./Adj. + 一点儿", "买一点儿", "Купить немного"]]]);
grammars.set("gei", ["Давать, дательный падеж", ["Глагол", "Падеж"], [
    ["A + 给 + B + доп. инфо", "我给妈妈苹果", "Я дал маме яблоко"], 
    ["A + 给 + B + гл.", "我给朋友打电话", "Я позвонил другу"]]]);
grammars.set("again", ["Опять, снова", ["Повторение", "Глагол"], [
    ["再 + гл.", "明天我再去踢足球", "Завтра я опять пойду играть в футбол (буд.)"], 
    ["又 + гл.", "我又吃苹果", "Я опять съел яблоко (прошл.)"]]]);
grammars.set("le", ["Завершенность и изменение ситуации", ["Завершение", "Изменение", "Частица"], [
    ["了 + гл.", "今早我吃了早饭", "Сегодня утром я позавтракал (заверш.)"], 
    ["предложение + 了", "下雨了", "Пошёл дождь (изменение)"]]]);
grammars.set("action_duration", ["Продолжительность действия (ПД)", ["Глагол", "Длительность"], [
    ["гл. + ПД", "我洗脸三分钟", "Я умываю лицо три минуты"], 
    ["гл. + ПД + 的 + Доп.", "我唱五分钟的歌", "Я пою песню пять минут"]]]);
grammars.set("synchronism", ["Два действия одновременно", ["Глагол", "Одновременность"], [
    ["гл. + 的时候 + гл.", "他走路的时候听音乐", "Он шёл и слушал музыку"], 
    ["Время/Возраст/... + 的时候 + гл.", "昨天的时候下雨", "Вчера шёл дождь"]]]);
grammars.set("in_process", ["Быть в процессе, длиться", ["Длительность", "Глагол"], [
    ["(正)(在) + гл. + (呢)", "昨天下午我正在学习呢", "Вчера днём я учился"]]]);
grammars.set("together", ["Вместе", ["Глагол"], [
    ["A + 跟 + B + 一起 + гл.", "我跟朋友一起跑步", "Я бегу вместе с другом"]]]);
grammars.set("do_quick", ["Недолго, быстро сделать", ["Глагол", "Длительность"], [
    ["гл. + 一下", "看一下", "Взгляни"]]]);
grammars.set("sequence_of_events", ["Последовательность событий", ["Глагол", "Порядок"], [
    ["гл. + 以后 + гл.", "我考考试以后去图书馆", "Я написал экзамен и пошёл в библиотеку"]]]);
grammars.set("dui", ["\"Вспомнил\", влияние", ["Глагол"], [
    ["对了! ...", "对了! 我要去商店", "Вспомнил! Мне же надо пойти в магазин"], 
    ["гл./сущ. + 对 + сущ. + нар.", "走路对身体很好", "Гулять полезно для здоровья"]]]);
grammars.set("causal_relationships", ["Причинно-следственные связи", ["Глагол"], [
    ["因为 + гл. + 所以 + гл.", "因为昨天我生病所以今天没去学校", "Я вчера заболел, поэтому сегодня не пошёл в школу"]]]);
grammars.set("from_and_to", ["\"От\" и \"до\"", ["Место", "Предлоги"], [
    ["A + 离 + B + 远/近", "我家离游泳池不远", "От моего дома до бассейна недалеко"]]]);
grammars.set("de_de_de", ["Разные частицы de", ["Частицы"], [
    ["сущ./прил. + 的 + сущ.", "红色的书", "Красная книга"],
    ["гл. + 得 + прил.", "他读得快", "Он читает быстро"],
    ["гл. + доп. + гл. + 得 + прил.", "他跑步跑得慢", "Он бегает медленно"]]]);
grammars.set("cong", ["Когда начал делать, от чего-то до чего-то", ["Предлоги", "Место", "Глагол"], [
    ["从 + время/место + 开始 + гл.", "我从明天开始跑步", "С завтрашнего дня я начну бегать"],
    ["从 + время/место + 到 + время/место + доп. инфо", "我从八点到十二点在学校上课", "С восьми до двенадцати я учусь в школе"]]]);
grammars.set("effective_morphemes", ["Результативные морфемы", ["Частицы", "Глагол"], [
    ["гл. + 完 + доп. инфо", "找完衣服", "Закончил искать одежду"],
    ["гл. + 到 + доп. инфо", "买到东西", "Купил вещи"],
    ["гл. + 懂 + доп. инфо", "听懂", "Услышал и понял"],
    ["没 + гл. + РМ + доп. инфо", "我没做完考试题", "Я не полностью решил экзамен"]]]);

for (const [key, value] of grammars) {
    const grammarNode = grammarTemplate.cloneNode(true);
    grammarNode.style.display = "block";
    grammarNode.classList.add(key);

    grammarNode.querySelector(".name").innerText = value[0];
    grammarNode.querySelector(".categories").innerText = (value[1] + "").replaceAll(",", ", ");

    loadExamples(value, grammarNode);

    document.querySelector(".grammars").appendChild(grammarNode);
}

function loadExamples(value, grammar) {
    value[2].forEach((grammarexample) => {
        const exampleNode = exampleTemplate.cloneNode(true);
        exampleNode.style.display = "block";

        exampleNode.querySelector(".construction").innerText = grammarexample[0];
        exampleNode.querySelector(".sentence").innerText = grammarexample[1];
        exampleNode.querySelector(".translation").innerText = grammarexample[2];

        exampleNode.addEventListener("click", () => pronounce(grammarexample[1]));

        grammar.querySelector(".examples").appendChild(exampleNode);
    });
}



let allowedGrammarsName = Array.from(grammars.keys());
let allowedGrammarsCategory = Array.from(grammars.keys());

const nameSearch = document.querySelector(".search .name_search");
const categorySearch = document.querySelector(".search .category_search");

nameSearch.addEventListener("input", () => {
    if (nameSearch.value == "") {
        allowedGrammarsName = Array.from(grammars.keys());
    }
    else {
        allowedGrammarsName = [];
        for (const [key, value] of grammars) {
            if (value[0].toLowerCase().replaceAll(" ", "").includes(nameSearch.value.toLowerCase().replaceAll(" ", ""))) {
                allowedGrammarsName.push(key);
            }
        }
    }
    updateGrammarList();
});
categorySearch.addEventListener("input", () => {
    if (categorySearch.value == "") {
        allowedGrammarsCategory = Array.from(grammars.keys());
    }
    else {
        allowedGrammarsCategory = [];
        for (const [key, value] of grammars) {
            // value[1].forEach((categories) => {
            //     if (categories.toLowerCase().replaceAll(" ", "").includes(categorySearch.value.toLowerCase().replaceAll(" ", ""))) {
            //         allowedGrammarsCategory.push(key);
            //     }
            // });
            const searches = Array.from(categorySearch.value.toLowerCase().split(" "));
            const categories = [];
            value[1].forEach((category) => {
                categories.push(category.toLowerCase());
            });
            console.log(searches + " " + categories + " " + checker(categories, searches));

            if (checker(categories, searches)) {
                allowedGrammarsCategory.push(key);
            }
        }
    }
    updateGrammarList();
});

function updateGrammarList() {
    for (const [key, value] of grammars) {
        let grammar = document.querySelector("." + key);
        if (allowedGrammarsName.includes(key) && allowedGrammarsCategory.includes(key)) {
            grammar.style.display = "block";
        }
        else {
            grammar.style.display = "none";
        }
    } 
}

function checker(arr, target) {
    return target.every(v => arr.some(y => y.includes(v)));
}