import { findToneChar, toneChars } from "../utils.ts";

export const categories: Category[] = [];
export const words: Word[] = [];
const wordTranslationRegex = new RegExp("[А-Я0-9][А-Яа-я0-9- ]*");



export interface Category {
    id: string;
    name: string;
}

export interface Word {
    id: string;
    category: string;
    character: string;
    pinyin: string;
    translations: string[];
    partsOfSpeech: PartOfSpeech[];
    note?: string;
    examples?: WordExampleSentence[];
}

export interface WordExampleSentence {
    sentence: string;
    translation: string;
}

export const PartOfSpeech = {
    "noun": "Существительное",
    "pronoun": "Местоимение",
    "adjective": "Прилагательное",
    "numeral": "Числительное",
    "verb": "Глагол",
    "adverb": "Наречие",
    "preposition": "Предлог",
    "conjunction": "Союз",
    "particle": "Частица",
    "interjection": "Междометие",
    "counting_word": "Счётное слово"
};

export type PartOfSpeech = keyof typeof PartOfSpeech;



export function filterWords(value: string): Word[] {
    if (value === "") return words;
    const filteredWords: Word[] = [];

    for (const word of words) {
        if (word.id.split("_")[0].includes(value) ||
            word.translations.some(translation => translation.toLowerCase().replaceAll(" ", "").includes(value)) ||
            word.partsOfSpeech.some(partOfSpeech => PartOfSpeech[partOfSpeech].toLowerCase().replaceAll(" ", "").includes(value))) {
            filteredWords.push(word);
        }
    }

    if (filteredWords.length === 0) {
        for (const word of words) {
            if (word.id.split("_")[0].replaceAll(/[0-9]/g, "").includes(value)) {
                filteredWords.push(word);
            }
        }
    }

    return filteredWords;
}



export type InvalidToken = { valid: false, word: string };
export type ValidToken = { valid: true, word: Word };
export type Token = InvalidToken | ValidToken;

export function parseSentence(sentence: string): Token[] {
    const tokens: Token[] = [];

    for (let i = 0; i < sentence.length; i++) {
        const string = sentence.substring(i);
        let token: ValidToken | null = null;

        for (const word of words) {
            if (string.match("^" + word.character) != null) {
                const end = word.character.length;
                const matched = string.substring(0, end);

                if (token == null || token.word.character.length < matched.length) {
                    token = {
                        word: word,
                        valid: true
                    };
                }
            }
        }

        if (token != null) {
            i += token.word.character.length - 1;
            tokens.push(token);
        }
        else {
            const char = sentence.charAt(i);

            if (char !== " " && char !== "." && char !== "," && char !== "!" && char !== "?") {
                console.warn(`Unresolved character ${char} at position ${i + 1} inside sentence ${sentence}`);
            }

            tokens.push({
                word: char,
                valid: false
            });
        }
    }

    return tokens;
}



function addCategory(id: string, name: string) {
    categories.push({
        id: id,
        name: name
    });
}

function addWord(
    id: string, category: string, character: string, pinyin: string, translations: string | string[], partsOfSpeech: PartOfSpeech | PartOfSpeech[],
    info?: { note?: string; examples?: WordExampleSentence[]; }
) {
    if (typeof translations === "string") {
        if (translations.includes(",")) {
            console.warn(`Word with id "${id}" has deprecated translation`);
        }

        translations = [translations];
    }

    if (typeof partsOfSpeech === "string") {
        partsOfSpeech = [partsOfSpeech];
    }

    const word = {
        id: id,
        category: category,
        character: character,
        pinyin: pinyin,
        translations: translations,
        partsOfSpeech: partsOfSpeech,
        note: info?.note,
        examples: info?.examples,
    };

    if (verifyWord(word)) words.push(word);
}

function verifyWord(word: Word): boolean {
    if (!categories.some(category => category.id === word.category)) {
        console.error(`Word with id "${word.id}" has unknown category "${word.category}"`);
        return false;
    }

    if (words.some(otherWord => otherWord.id === word.id)) {
        console.error(`Duplicate word id "${word.id}"`);
        return false;
    }

    const pinyin = word.pinyin.split(" ").map(tone => {
        const char = findToneChar(tone)!;

        for (const chars of toneChars) {
            if (chars.includes(char)) {
                const index = chars.indexOf(char);
                return tone.replace(char, chars[0]).replace("ü", "u") + (index == 0 ? "" : index);
            }
        }

        return tone;
    }).join("");

    if (pinyin != word.id.split("_")[0]) {
        console.warn(`Word with id "${word.id}" has mismatched pinyin ${pinyin}`);
    }

    if (word.translations.some(translation => !wordTranslationRegex.test(translation))) {
        console.warn(`Word with id "${word.id}" has incorrect translation`);
    }

    if ((new Set(word.partsOfSpeech)).size !== word.partsOfSpeech.length) {
        console.warn(`Word with id "${word.id}" has duplicate part of speech`);
    }

    return true;
}





addCategory("pronouns", "Местоимения");
addCategory("numbers", "Числа");
addCategory("colors", "Цвета");
addCategory("verbs", "Глаголы");
addCategory("adjectives", "Прилагательные");
addCategory("talking", "Общение");
addCategory("school", "Школа");
addCategory("office_supplies", "Канцелярские принадлежности");
addCategory("events", "Мероприятия");
addCategory("clothes", "Одежда и аксессуары");
addCategory("appearance", "Внешность");
addCategory("health", "Здоровье");
addCategory("nature", "Природа");
addCategory("animals", "Животные");
addCategory("food", "Еда");
addCategory("fruits_and_vegetables", "Фрукты и овощи");
addCategory("drinks", "Напитки");
addCategory("interior", "Интерьер");
addCategory("family", "Семья");
addCategory("personal_info", "Личная информация");
addCategory("schedule", "Распорядок дня");
addCategory("time", "Время");
addCategory("weather", "Погода");
addCategory("transport", "Транспорт");
addCategory("travelling", "Путешествие");
addCategory("countries", "Города и страны");
addCategory("shop", "Магазин");
addCategory("work", "Работа");
addCategory("hobby", "Хобби");
addCategory("sport", "Спорт");
addCategory("books", "Книги");
addCategory("counting_words", "Счётные слова");
addCategory("location", "Указания места");
addCategory("questions", "Вопросы");
addCategory("summarize", "Обобщения, союзы");
addCategory("other", "Другое");



addWord("wo3", "pronouns", "我", "wǒ", "Я", "pronoun");
addWord("wo3men", "pronouns", "我们", "wǒ men", "Мы", "pronoun");
addWord("ni3", "pronouns", "你", "nǐ", "Ты", "pronoun");
addWord("nin2", "pronouns", "您", "nín", "Вы", "pronoun", { note: "Уважительное обращение к одному человеку" });
addWord("ni3men", "pronouns", "你们", "nǐ men", "Вы", "pronoun", { note: "Множественное число слова \"ты\"" });
addWord("ta1_1", "pronouns", "他", "tā", "Он", "pronoun");
addWord("ta1_2", "pronouns", "她", "tā", "Она", "pronoun");
addWord("ta1_3", "pronouns", "它", "tā", "Оно", "pronoun");
addWord("ta1men", "pronouns", "他们", "tā men", "Они", "pronoun");

addWord("ling2", "numbers", "零", "líng", "Ноль", "numeral");
addWord("yi1", "numbers", "一", "yī", "Один", "numeral");
addWord("er4", "numbers", "二", "èr", "Два", "numeral");
addWord("liang3", "numbers", "两", "liǎng", "Два", "numeral", { note: "Используется только для указания количества перед счётными словами" });
addWord("san1", "numbers", "三", "sān", "Три", "numeral");
addWord("si4", "numbers", "四", "sì", "Четыре", "numeral");
addWord("wu3", "numbers", "五", "wǔ", "Пять", "numeral");
addWord("liu4_1", "numbers", "六", "liù", "Шесть", "numeral");
addWord("qi1", "numbers", "七", "qī", "Семь", "numeral");
addWord("ba1", "numbers", "八", "bā", "Восемь", "numeral");
addWord("jiu3", "numbers", "九", "jiǔ", "Девять", "numeral");
addWord("shi2", "numbers", "十", "shí", "Десять", "numeral");
addWord("bai3", "numbers", "百", "bǎi", "Сто", "numeral");
addWord("qian1", "numbers", "千", "qiān", "Тысяча", "numeral");
addWord("zuo3you4", "numbers", "左右", "zuǒ yòu", ["Примерно", "Около"], "adverb");
addWord("ci4", "numbers", "次", "cì", "Раз", "counting_word");

addWord("yan2se4", "colors", "颜色", "yán sè", "Цвет", "noun");
addWord("hong2se4", "colors", "红色", "hóng sè", "Красный цвет", ["adjective", "noun"]);
addWord("huang2se4", "colors", "黄色", "huáng sè", "Жёлтый цвет", ["adjective", "noun"]);
addWord("lan2se4", "colors", "蓝色", "lán sè", "Синий цвет", ["adjective", "noun"]);
addWord("lu4se4", "colors", "绿色", "lǜ sè", "Зелёный цвет", ["adjective", "noun"]);
addWord("bai2se4", "colors", "白色", "bái sè", "Белый цвет", ["adjective", "noun"]);
addWord("hei1se4", "colors", "黑色", "hēi sè", "Чёрный цвет", ["adjective", "noun"]);
addWord("cheng2se4", "colors", "橙色", "chéng sè", "Оранжевый цвет", ["adjective", "noun"]);
addWord("zong1se4", "colors", "棕色", "zōng sè", "Коричневый цвет", ["adjective", "noun"]);
addWord("hui1se4", "colors", "灰色", "huī sè", "Серый цвет", ["adjective", "noun"]);
addWord("fen3hong2se4", "colors", "粉红色", "fěn hóng sè", "Розовый цвет", ["adjective", "noun"]);
addWord("zi3se4", "colors", "紫色", "zǐ sè", "Фиолетовый цвет", ["adjective", "noun"]);
addWord("qian3", "colors", "浅", "qiǎn", "Светлый", "adjective");
addWord("shen1", "colors", "深", "shēn", "Тёмный", "adjective");
addWord("liang4", "colors", "亮", "liàng", ["Яркий", "Засветиться"], ["adjective", "verb"]);

addWord("xi3huan", "verbs", "喜欢", "xǐ huan", "Нравиться", "verb");
addWord("ai4", "verbs", "爱", "ài", "Любить", "verb");
addWord("shi4", "verbs", "是", "shì", ["Быть", "Являться"], "verb");
addWord("zai4_1", "verbs", "在", "zài", "Находиться", "verb");
addWord("deng3", "verbs", "等", "děng", "Ждать", "verb");
addWord("qu4", "verbs", "去", "qù", ["Идти", "Перемещаться"], "verb");
addWord("zou3lu4", "verbs", "走路", "zǒu lù", "Ходить пешком", "verb");
addWord("dai4_1", "verbs", "带", "dài", "Брать с собой", "verb");
addWord("kan4", "verbs", "看", "kàn", ["Смотреть", "Видеть", "Читать"], "verb");
addWord("kai1shi3", "verbs", "开始", "kāi shǐ", "Начинать", "verb");
addWord("hui4", "verbs", "会", "huì", "Уметь", "verb");
addWord("yao4_1", "verbs", "要", "yào", ["Хотеть", "Надо"], "verb");
addWord("xiang3", "verbs", "想", "xiǎng", ["Думать", "Мечтать", "Хотеть", "Желать"], "verb");
addWord("xiang1xin4", "verbs", "相信", "xiāng xìn", "Верить", "verb");
addWord("kao3lu4", "verbs", "考虑", "kǎo lǜ", ["Думать", "Подумать", "Обдумать"], "verb");
addWord("jin4_1", "verbs", "进", "jìn", "Входить", "verb");
addWord("zuo4_1", "verbs", "坐", "zuò", "Сидеть", "verb");
addWord("zhan4", "verbs", "站", "zhàn", "Стоять", "verb");
addWord("qi3lai2", "verbs", "起来", "qǐ lái", "Вставать", "verb");
addWord("xie3", "verbs", "写", "xiě", "Писать", "verb");
addWord("zuo4_2", "verbs", "做", "zuò", "Делать", "verb");
addWord("gei3", "verbs", "给", "gěi", "Давать", "verb");
addWord("lai2", "verbs", "来", "lái", "Приходить", "verb");
addWord("hui2", "verbs", "回", "huí", "Возвращаться", "verb");
addWord("jian4", "verbs", "见", "jiàn", ["Встречаться", "Видеть"], "verb");
addWord("zhi1dao4", "verbs", "知道", "zhī dào", "Знать", "verb");
addWord("da3", "verbs", "打", "dǎ", ["Бить", "Ударять", "Играть"], "verb");
addWord("tiao4", "verbs", "跳", "tiào", "Прыгать", "verb");
addWord("xiu1xi1", "verbs", "休息", "xiū xī", "Отдыхать", "verb");
addWord("song4", "verbs", "送", "sòng", "Доставлять", "verb");
addWord("bei4", "verbs", "背", "bèi", "Нести", "verb");
addWord("fang4", "verbs", "放", "fàng", ["Класть", "Добавлять"], "verb");
addWord("shi4he2", "verbs", "适合", "shì hé", ["Подходить", "Пригодный"], ["verb", "adjective"]);
addWord("fang4song1", "verbs", "放松", "fàng sōng", ["Расслабляться", "Расслабление"], ["verb", "noun"]);
addWord("gai1", "verbs", "该", "gāi", ["Нужно", "Пришло время"], "verb");
addWord("ying4gai1", "verbs", "应该", "yìng gāi", ["Следует", "Должен"], "verb");
addWord("shan4chang2", "verbs", "擅长", "shàn cháng", ["Силён", "Хорош"], "verb", { note: "Имеется в виду \"Быть сильным в чём-то\"" });
addWord("hai4pa4", "verbs", "害怕", "hài pà", "Бояться", "verb");
addWord("ting1qi3lai2", "verbs", "听起来", "tīng qǐ lái", ["Звучать", "Звучать как", "Казаться"], "verb");
addWord("wang4", "verbs", "忘", "wàng", "Забыть", "verb");
addWord("na2", "verbs", "拿", "ná", "Держать", "verb");
addWord("nan2guo4", "verbs", "难过", "nán guò", ["Огорчаться", "Расстраиваться"], "verb");
addWord("ku1", "verbs", "哭", "kū", "Плакать", "verb");
addWord("san4bu4", "verbs", "散步", "sàn bù", "Гулять", "verb");
addWord("qi1dai4", "verbs", "期待", "qī dài", "Ожидать", "verb");
addWord("diu1", "verbs", "丟", "diū", "Потерять", "verb");
addWord("zhao3", "verbs", "找", "zhǎo", ["Искать", "Находить"], "verb");
addWord("xiu1", "verbs", "修", "xiū", ["Чинить", "Ремонтировать"], "verb");
addWord("jue2de2", "verbs", "觉得", "jué dé", ["Чувствовать", "Считать"], "verb");
addWord("kai1", "verbs", "开", "kāi", "Открывать", "verb");
addWord("guan1", "verbs", "关", "guān", "Закрывать", "verb");
addWord("xuan3", "verbs", "选", "xuǎn", "Выбирать", "verb");
addWord("chang2_1", "verbs", "尝", "cháng", "Пробовать", "verb");
addWord("fen1xiang3", "verbs", "分享", "fēn xiǎng", "Делиться", "verb");
addWord("qie4", "verbs", "切", "qiè", ["Резать", "Нарезать"], "verb");
addWord("xi2guan4", "verbs", "习惯", "xí guàn", ["Привыкнуть", "Привыкать"], "verb");
addWord("chu1lai2", "verbs", "出来", "chū lái", "Выходить", "verb");
addWord("zou3", "verbs", "走", "zǒu", ["Уйти", "Уходить"], "verb");
addWord("ao2ye4", "verbs", "熬夜", "áo yè", ["Засиживаться допоздна", "Не спать"], "verb");
addWord("wan2cheng2", "verbs", "完成", "wán chéng", "Завершать", "verb");
addWord("cha2_1", "verbs", "查", "chá", ["Проверять", "Искать", "Заглядывать"], "verb");
addWord("ji4de2", "verbs", "记得", "jì dé", ["Помнить", "Не забывать"], "verb");

addWord("xiao3", "adjectives", "小", "xiǎo", "Маленький", "adjective");
addWord("da4", "adjectives", "大", "dà", "Большой", "adjective");
addWord("duan3", "adjectives", "短", "duǎn", "Короткий", "adjective");
addWord("chang2_2", "adjectives", "长", "cháng", "Длинный", "adjective");
addWord("kuai4_1", "adjectives", "快", "kuài", "Быстрый", "adjective");
addWord("man4", "adjectives", "慢", "màn", "Медленный", "adjective");
addWord("duo1", "adjectives", "多", "duō", "Много", "adverb");
addWord("shao3", "adjectives", "少", "shǎo", "Мало", "adverb");
addWord("zui4", "adjectives", "最", "zuì", "Самый", "adjective");
addWord("bi3jiao4", "adjectives", "比较", "bǐ jiào", ["Сравнительно", "Более"], "adverb");
addWord("te4bie2", "adjectives", "特别", "tè bié", ["Особенный", "Особенно"], ["adjective", "adverb"]);
addWord("hen3", "adjectives", "很", "hěn", "Очень", "adverb", { note: "Очень редко подразумевается как \"очень\" и чаще всего используется как связка" });
addWord("fei1chang2", "adjectives", "非常", "fēi cháng", "Очень", "adverb", { note: "Более сильное \"очень\" по сравнению с 很" });
addWord("ting3", "adjectives", "挺", "tǐng", "Очень", "adverb", { note: "Что-то среднее между 很 и 非常" });
addWord("tai4", "adjectives", "太", "tài", "Слишком", "adverb");
addWord("hao3", "adjectives", "好", "hǎo", ["Хороший", "Хорошо"], ["adjective", "adverb"]);
addWord("cha1", "adjectives", "差", "chā", ["Плохой", "Плохо"], ["adjective", "adverb"]);
addWord("qing1", "adjectives", "轻", "qīng", "Лёгкий", "adjective");
addWord("zhong4", "adjectives", "重", "zhòng", "Тяжёлый", "adjective");
addWord("fang1bian4", "adjectives", "方便", "fāng biàn", "Удобный", "adjective");
addWord("kai1xin1", "adjectives", "开心", "kāi xīn", "Весёлый", "adjective");
addWord("gao1xing4", "adjectives", "高兴", "gāo xìng ", "Радостный", "adjective");
addWord("kai1lang3", "adjectives", "开朗", "kāi lǎng ", "Жизнерадостный", "adjective");
addWord("wan2mei3", "adjectives", "完美", "wán měi", "Идеальный", "adjective");
addWord("lang4man4", "adjectives", "浪漫", "làng màn", "Романтичный", "adjective");
addWord("gan3ren2", "adjectives", "感人", "gǎn rén", "Трогательный", "adjective");
addWord("cong1ming2", "adjectives", "聪明", "cōng míng", "Умный", "adjective");
addWord("xing4yun4", "adjectives", "幸运", "xìng yùn", "Везучий", "adjective");
addWord("xing4fu2", "adjectives", "幸福", "xìng fú", "Счастливый", "adjective");
addWord("qing1chu3", "adjectives", "清楚", "qīng chǔ", ["Ясный", "Ясно"], ["adjective", "adverb"]);
addWord("bang4", "adjectives", "棒", "bàng", ["Классный", "Крутой", "Отличный"], "adjective");
addWord("jing1cai3", "adjectives", "精彩", "jīng cǎi", ["Замечательный", "Чудесный"], "adjective");
addWord("li4hai4", "adjectives", "厉害", "lì hài", ["Впечатляющий", "Невероятный"], "adjective");
addWord("you3qu4", "adjectives", "有趣", "yǒu qù", "Интересный", "adjective");
addWord("wu2liao2", "adjectives", "无聊", "wú liáo", "Скучный", "adjective");
addWord("yan2ge2", "adjectives", "严格", "yán gé", "Строгий", "adjective");
addWord("wei1xian3", "adjectives", "危险", "wēi xiǎn", "Опасный", "adjective");
addWord("jian3dan1", "adjectives", "简单", "jiǎn dān", "Простой", "adjective");
addWord("nan2", "adjectives", "难", "nán", ["Сложный", "Сложно"], ["adjective", "adverb"]);
addWord("yi1yang4", "adjectives", "一样", "yī yàng", ["Одинаковый", "Такой же", "Похожий"], ["adjective", "adverb"]);
addWord("gou4", "adjectives", "够", "gòu", "Достаточно", ["adverb", "adjective", "verb"]);
addWord("fan2", "adjectives", "烦", "fán", ["Надоедливый", "Раздражительный"], ["adjective", "adverb"]);

addWord("jiao4_1", "talking", "叫", "jiào", "Звать", "verb");
addWord("ting1", "talking", "听", "tīng", "Слушать", "verb");
addWord("shuo1", "talking", "说", "shuō", "Говорить", "verb");
addWord("jue2de", "talking", "觉得", "jué de", "Предполагать", "verb");
addWord("shuo1hua4", "talking", "说话", "shuō huà", "Разговаривать", "verb");
addWord("gao4su4", "talking", "告诉", "gào sù", "Сообщить", "verb");
addWord("ren4shi2", "talking", "认识", "rèn shí", ["Знать", "Быть знакомым"], "verb");
addWord("jie4shao4", "talking", "介绍", "jiè shào", ["Знакомить", "Представлять"], "verb");
addWord("jie1", "talking", "接", "jiē", "Отвечать", "verb", { note: "Имеется в виду \"Отвечать на телефонный звонок\"" });
addWord("qing3", "talking", "请", "qǐng", "Просить", "verb");
addWord("wen4ti2", "talking", "问题", "wèn tí", "Вопрос", "noun");
addWord("qing3wen4", "talking", "请问", "qǐng wèn", "Можно спросить?", "interjection");
addWord("na3yi1wei4", "talking", "哪一位", "nǎ yī wèi", "С кем я говорю?", "interjection");
addWord("ni3hao3", "talking", "你好", "nǐ hǎo", "Привет", "interjection");
addWord("hai1", "talking", "嗨", "hāi", "Привет", "interjection", { note: "Разговорное выражение" });
addWord("nin2hao3", "talking", "您好", "nín hǎo", "Здравствуйте", "interjection");
addWord("zai4jian4", "talking", "再见", "zài jiàn", ["До свидания", "Пока"], "interjection");
addWord("hao3jiu3bu4jian4", "talking", "好久不见", "hǎo jiǔ bù jiàn", "Давно не виделись", "interjection");
addWord("dui4bu4qi3", "talking", "对不起", "duì bù qǐ", "Извините", "interjection", { note: "Используется, когда человек признаёт свою вину" });
addWord("bao4qian4", "talking", "抱歉", "bào qiàn", "Извините", "interjection", { note: "Более формальное по сравнению с 对不起, подразумевается сожаление" });
addWord("mei2guan1xi4", "talking", "没关系", "méi guān xì", "Ничего страшного", "interjection");
addWord("xie4xie4", "talking", "谢谢", "xiè xiè", "Спасибо", "interjection");
addWord("bu2yong4xie4", "talking", "不用谢", "bú yòng xiè", "Пожалуйста", "interjection");
addWord("bu2ke4qi4", "talking", "不客气", "bú kè qì", "Всегда пожалуйста", "interjection");
addWord("mei2wen4ti2", "talking", "没问题", "méi wèn tí", "Без проблем", "interjection");
addWord("bu2cuo4", "talking", "不错", "bú cuò", "Неплохо", "adverb");
addWord("guan1xi4", "talking", "关系", "guān xì", "Отношение", "noun");
addWord("liao2tian1", "talking", "聊天", "liáo tiān", ["Разговаривать", "Болтать", "Болтовня"], ["verb", "noun"]);
addWord("jian4yi4", "talking", "建议", "jiàn yì", ["Предложение", "Совет"], "noun");
addWord("li4zi", "talking", "例子", "lì zi", ["Пример", "Случай"], "noun");
addWord("ai1ya1", "talking", "哎呀", "āi yā", ["Ай-ай", "Ой"], "interjection");
addWord("wa1", "talking", "哇", "wā", ["Вау", "Ого"], "interjection");
addWord("ne", "talking", "呢", "ne", "А", "conjunction");
addWord("hao3xiang4", "talking", "好像", "hǎo xiàng", "Кажется", "particle");

addWord("xue2xiao4", "school", "学校", "xué xiào", "Школа", "noun");
addWord("da4xue2", "school", "大学", "dà xué", "Университет", "noun");
addWord("yan2jiu1sheng1", "school", "研究生", "yán jiū shēng", "Аспирантура", "noun");
addWord("shang4xue2", "school", "上学", "shàng xué", "Ходить в школу", "verb");
addWord("xue2xi2", "school", "学习", "xué xí", "Учиться", "verb");
addWord("fang4xue2", "school", "放学", "fàng xué", "Заканчивать занятия", "verb");
addWord("fang4jia3", "school", "放假", "fàng jiǎ", ["Уходить на каникулы", "Уходить в отпуск"], "verb");
addWord("nian2ji2", "school", "年级", "nián jí", "Класс обучения", "noun");
addWord("xue2qi1", "school", "学期", "xué qī", "Семестр", "noun");
addWord("xiao4fu2", "school", "校服", "xiào fú", "Школьная форма", "noun");
addWord("nan2sheng1", "school", "男生", "nán shēng", "Ученик", "noun");
addWord("nu3sheng1", "school", "女生", "nǚ shēng", "Ученица", "noun");
addWord("xiao3xue2sheng1", "school", "小学生", "xiǎo xué shēng", "Ученик начальной школы", "noun");
addWord("zhong1xue2sheng1", "school", "中学生", "zhōng xué shēng", "Ученик средней школы", "noun");
addWord("gao1zhong1sheng1", "school", "高中生", "gāo zhōng shēng", "Ученик старшей школы", "noun");
addWord("da4xue2sheng1", "school", "大学生", "dà xué shēng", "Студент", "noun");
addWord("liu2xue2sheng1", "school", "留学生", "liú xué shēng", "Студент-иностранец", "noun");
addWord("tong2xue2", "school", "同学", "tóng xué", "Одноклассник", "noun");
addWord("peng2you3", "school", "朋友", "péng yǒu", "Друг", "noun");
addWord("ban1", "school", "班", "bān", "Класс", "noun", { note: "Имеются в виду люди" });
addWord("zuo4ye4", "school", "作业", "zuò yè", "Домашнее задание", "noun");
addWord("ke4_1", "school", "课", "kè", ["Урок", "Занятие"], "noun");
addWord("han4yu3", "school", "汉语", "hàn yǔ", "Китайский язык", "noun");
addWord("ying1yu3", "school", "英语", "yīng yǔ", "Английский язык", "noun");
addWord("shu4xue2", "school", "数学", "shù xué", "Математика", "noun");
addWord("ke1xue2", "school", "科学", "kē xué", ["Окружающий мир", "Наука"], "noun");
addWord("mei3shu4", "school", "美术", "měi shù", ["ИЗО", "Рисование"], "noun");
addWord("ti3yu4", "school", "体育", "tǐ yù", "Физкультура", "noun");
addWord("yin1yue4ke4", "school", "音乐课", "yīn yuè kè", "Урок музыки", "noun");
addWord("e2yu3", "school", "俄语", "é yǔ", "Русский язык", "noun");
addWord("de2yu3", "school", "德语", "dé yǔ", "Немецкий язык", "noun");
addWord("li4shi3", "school", "历史", "lì shǐ", "История", "noun");
addWord("di4li3", "school", "地理", "dì lǐ", "География", "noun");
addWord("sheng1wu4", "school", "生物", "shēng wù", "Биология", "noun");
addWord("wu4li3", "school", "物理", "wù lǐ", "Физика", "noun");
addWord("hua4xue2", "school", "化学", "huà xué", "Химия", "noun");
addWord("xi4ju4", "school", "戏剧", "xì jù", "Театральный кружок", "noun");
addWord("shu1fa3", "school", "书法", "shū fǎ", "Каллиграфия", "noun");
addWord("cao1chang3", "school", "操场", "cāo chǎng", "Спортивная площадка", "noun");
addWord("li3tang2", "school", "礼堂", "lǐ táng", "Актовый зал", "noun");
addWord("ti3yu4guan3", "school", "体育馆", "tǐ yù guǎn", "Спортзал", "noun");
addWord("jian4shen1fang2", "school", "健身房", "jiàn shēn fáng", "Тренажёрный зал", "noun");
addWord("tu2shu1guan3", "school", "图书馆", "tú shū guǎn", "Библиотека", "noun");
addWord("jiao4shi4", "school", "教室", "jiào shì", "Аудитория", "noun");
addWord("mei3shu4shi4", "school", "美术室", "měi shù shì", ["Кабинет ИЗО", "Кабинет рисования"], "noun");
addWord("yin1yue4shi4", "school", "音乐室", "yīn yuè shì", "Кабинет музыки", "noun");
addWord("you2yong3chi2", "school", "游泳池", "yóu yǒng chí", "Бассейн", "noun");
addWord("xiao3mai4bu4", "school", "小卖部", "xiǎo mài bù", "Буфет", "noun");
addWord("shu1bao1", "school", "书包", "shū bāo", "Портфель", "noun");
addWord("ben3zi", "school", "本子", "běn zi", "Тетрадь", "noun");
addWord("ri4ji4ben3", "school", "日记本", "rì jì běn", "Дневник", "noun");
addWord("wen2ju4he2", "school", "文具盒", "wén jù hé", "Пенал", "noun");
addWord("ke4ben3", "school", "课本", "kè běn", "Учебник", "noun");
addWord("lian4xi2ben3", "school", "练习本", "liàn xí běn", "Рабочая тетрадь", "noun");
addWord("cuo4", "school", "错", "cuò", "Ошибка", "noun");
addWord("mei2cuo4", "school", "没错", "méi cuò", ["Правильный", "Верный"], "adjective");
addWord("da2an4", "school", "答案", "dá àn", "Ответ", "noun");
addWord("cheng2ji4", "school", "成绩", "chéng jì", "Оценка", "noun");
addWord("kao3", "school", "考", "kǎo", "Сдавать", "verb");
addWord("kao3shi4", "school", "考试", "kǎo shì", "Экзамен", "noun");
addWord("tong1guo4", "school", "通过", "tōng guò", "Сдать экзамен", "verb");
addWord("ti2", "school", "题", "tí", ["Вопрос", "Задача"], "noun");
addWord("jiao4_2", "school", "教", "jiào", ["Преподавать", "Учить"], "verb");
addWord("fu4xi2", "school", "复习", "fù xí", ["Повторять", "Запоминать"], "verb");
addWord("nian4", "school", "念", "niàn", ["Обучаться", "Учиться"], "verb");
addWord("jiang3xue2jin1", "school", "奖学金", "jiǎng xué jīn", "Стипендия", "noun");
addWord("xue2fei4", "school", "学费", "xué fèi", "Плата за обучение", "noun");
addWord("shi2yan4shi4", "school", "实验室", "shí yàn shì", "Лаборатория", "noun");
addWord("lun4wen2", "school", "论文", "lùn wén", "Диссертация", "noun");
addWord("jiao4shou4", "school", "教授", "jiào shòu", "Профессор", "noun");
addWord("shen1qing3", "school", "申请", "shēn qǐng", ["Заявка", "Подавать заявку"], ["noun", "verb"]);
addWord("tui1jian4xin4", "school", "推荐信", "tuī jiàn xìn", "Рекомендательное письмо", "noun");
addWord("yan2jiu1", "school", "研究", "yán jiū", ["Исследовать", "Изучать"], "verb");
addWord("jiao1", "school", "交", "jiāo", "Сдавать", "verb");

addWord("qian1bi3", "office_supplies", "铅笔", "qiān bǐ", "Карандаш", "noun");
addWord("cai3se4bi3", "office_supplies", "彩色笔", "cǎi sè bǐ", "Цветной карандаш", "noun");
addWord("la4bi3", "office_supplies", "蜡笔", "là bǐ", "Восковой мелок", "noun");
addWord("chi3zi", "office_supplies", "尺子", "chǐ zi", "Линейка", "noun");
addWord("xiang4pi2", "office_supplies", "橡皮", "xiàng pí", "Ластик", "noun");
addWord("juan3bi3dao1", "office_supplies", "卷笔刀", "juǎn bǐ dāo", "Точилка", "noun");
addWord("jian3dao1", "office_supplies", "剪刀", "jiǎn dāo", "Ножницы", "noun");
addWord("gu4ti3jiao1", "office_supplies", "固体胶", "gù tǐ jiāo", "Клей-карандаш", "noun");
addWord("jiao1shui3", "office_supplies", "胶水", "jiāo shuǐ", "Клей", "noun", { note: "Имеется в виду жидкий клей" });

addWord("huo2dong4", "events", "活动", "huó dòng", "Мероприятие", "noun");
addWord("wan3hui4", "events", "晚会", "wǎn huì", "Вечеринка", "noun");
addWord("can1jia1", "events", "参加", "cān jiā", ["Участвовать", "Принимать участие"], "verb");
addWord("jia1ru4", "events", "加入", "jiā rù", "Присоединиться", "verb");
addWord("ju3xing2", "events", "举行", "jǔ xíng", ["Проводить", "Устраивать"], "verb");
addWord("xiang3shou4", "events", "享受", "xiǎng shòu", "Наслаждаться", "verb");
addWord("biao3yan3", "events", "表演", "biǎo yǎn", "Выступать", "verb");
addWord("yan3chu1", "events", "演出", "yǎn chū", "Выступление", "noun");
addWord("wu3tai2", "events", "舞台", "wǔ tái", ["Сцена", "Арена"], "noun");
addWord("zhan4tai2", "events", "站台", "zhàn tái", "Платформа", "noun");
addWord("yin1yue4", "events", "音乐", "yīn yuè", "Музыка", "noun");
addWord("yao2gun3yin1yue4", "events", "摇滚音乐", "yáo gǔn yīn yuè", "Рок музыка", "noun");
addWord("yin1yue4jie2", "events", "音乐节", "yīn yuè jié", "Музыкальный фестиваль", "noun");
addWord("yue4dui4", "events", "乐队", "yuè duì", "Музыкальная группа", "noun");
addWord("yue4qi4", "events", "乐器", "yuè qì", "Музыкальные инструменты", "noun");
addWord("ge1", "events", "歌", "gē", "Песня", "noun");
addWord("sheng1yin1", "events", "声音", "shēng yīn", "Звук", "noun");
addWord("piao4", "events", "票", "piào", "Билет", "noun");
addWord("gu3zhang3", "events", "鼓掌", "gǔ zhǎng", "Аплодировать", "noun");
addWord("qi4fen1", "events", "气氛", "qì fēn", "Атмосфера", "noun");
addWord("la1ji1tong3", "events", "垃圾桶", "lā jī tǒng", "Мусорное ведро", "noun");
addWord("shou4huo4ji1", "events", "售货机", "shòu huò jī", "Торговый автомат", "noun");
addWord("xing1qu4", "events", "兴趣", "xīng qù", "Интерес", "noun");
addWord("you3xing1qu4", "events", "有兴趣", "yǒu xīng qù", ["Заинтересованный", "Быть заинтересованным"], "verb");

addWord("chuan1", "clothes", "穿", "chuān", ["Надевать", "Носить"], "verb");
addWord("yi1fu2", "clothes", "衣服", "yī fú", "Одежда", "noun");
addWord("dai4_2", "clothes", "戴", "dài", ["Надевать аксессуары", "Носить аксессуары"], "verb");
addWord("chen4shan1", "clothes", "衬衫", "chèn shān", "Рубашка", "noun");
addWord("han4shan1", "clothes", "汗衫", "hàn shān", "Футболка", "noun");
addWord("qun2zi", "clothes", "裙子", "qún zi", "Юбка", "noun");
addWord("lian2yi1qun2", "clothes", "连衣裙", "lián yī qún", "Платье", "noun");
addWord("ku4zi", "clothes", "裤子", "kù zi", "Брюки", "noun");
addWord("niu2zai3ku4", "clothes", "牛仔裤", "niú zǎi kù", "Джинсы", "noun");
addWord("mao2yi1", "clothes", "毛衣", "máo yī", "Свитер", "noun");
addWord("da4yi1", "clothes", "大衣", "dà yī", "Пальто", "noun");
addWord("wai4tao4", "clothes", "外套", "wài tào", "Куртка", "noun");
addWord("xie2zi", "clothes", "鞋子", "xié zi", "Обувь", "noun");
addWord("xue1zi", "clothes", "靴子", "xuē zi", "Сапог", "noun");
addWord("mao4zi", "clothes", "帽子", "mào zi", "Шапка", "noun");
addWord("wei2jin1", "clothes", "围巾", "wéi jīn", "Шарф", "noun");
addWord("shou3tao4", "clothes", "手套", "shǒu tào", "Перчатки", "noun");
addWord("yan3jing4", "clothes", "眼镜", "yǎn jìng", "Очки", "noun");
addWord("shou3biao3", "clothes", "手表", "shǒu biǎo", "Наручные часы", "noun");
addWord("pai2zi", "clothes", "牌子", "pái zi", ["Бренд", "Марка"], "noun");

addWord("tou2", "appearance", "头", "tóu", "Голова", "noun");
addWord("nao3", "appearance", "脑", "nǎo", "Мозг", "noun");
addWord("lian3", "appearance", "脸", "liǎn", "Лицо", "noun");
addWord("yan3jing1", "appearance", "眼睛", "yǎn jīng", "Глаза", "noun");
addWord("bi2zi", "appearance", "鼻子", "bí zi", "Нос", "noun");
addWord("zui3ba1", "appearance", "嘴巴", "zuǐ bā", "Рот", "noun");
addWord("ya2chi3", "appearance", "牙齿", "yá chǐ", "Зубы", "noun");
addWord("er3duo3", "appearance", "耳朵", "ěr duǒ", "Ухо", "noun");
addWord("tou2fa1", "appearance", "头发", "tóu fā", "Волосы", "noun");
addWord("shou3", "appearance", "手", "shǒu", "Рука", "noun");
addWord("shou3zhi3", "appearance", "手指", "shǒu zhǐ", "Палец", "noun");
addWord("du4zi", "appearance", "肚子", "dù zi", "Живот", "noun");
addWord("tui3", "appearance", "腿", "tuǐ", "Нога", "noun");
addWord("jiao3", "appearance", "脚", "jiǎo", "Ступня", "noun");
addWord("shou4", "appearance", "瘦", "shòu", "Худой", "adjective");
addWord("pang4", "appearance", "胖", "pàng", "Толстый", "adjective");
addWord("ge4zi", "appearance", "个子", "gè zi", "Рост", "noun");
addWord("nian2ling2", "appearance", "年龄", "nián líng", "Возраст", "noun");
addWord("xing4ge2", "appearance", "性格", "xìng gé", "Характер", "noun");
addWord("ai3", "appearance", "矮", "ǎi", "Низкий", "adjective");
addWord("gao1", "appearance", "高", "gāo", "Высокий", "adjective");
addWord("yuan2_1", "appearance", "圆", "yuán", "Круглый", "adjective");
addWord("piao4liang", "appearance", "漂亮", "piào liang", "Красивый", "adjective", { note: "Может применяться и к женщинам, и к детям, и к предметам, но не к мужчинам" });
addWord("shuai4", "appearance", "帅", "shuài", "Красивый", "adjective", { note: "В большинстве случаев применяется к мужчинам" });
addWord("ke3ai4", "appearance", "可爱", "kě ài", "Милый", "adjective");
addWord("nian2qing1", "appearance", "年轻", "nián qīng", "Молодой", "adjective");
addWord("shan4liang2", "appearance", "善良", "shàn liáng", "Добрый", "adjective");
addWord("shi2shang4", "appearance", "时尚", "shí shàng", "Модный", "adjective");
addWord("ke3pa4", "appearance", "可怕", "kě pà", "Страшный", "adjective");
addWord("kun4", "appearance", "困", "kùn", "Сонный", "adjective");
addWord("lei3", "appearance", "累", "lěi", "Уставший", "adjective");
addWord("xiang4", "appearance", "像", "xiàng", "Быть похожим", "verb");

addWord("shen1ti3", "health", "身体", "shēn tǐ", ["Тело", "Здоровье"], "noun");
addWord("jian4kang1", "health", "健康", "jiàn kāng", "Здоровый", "adjective");
addWord("sheng1bing4", "health", "生病", "shēng bìng", ["Заболеть", "Болезнь"], "verb");
addWord("fa1shao1", "health", "发烧", "fā shāo", ["Иметь температуру", "Иметь жар"], "verb");
addWord("ke2sou", "health", "咳嗽", "ké sou", "Иметь кашель", "verb");
addWord("tou2tong4", "health", "头痛", "tóu tòng", "Болит голова", "verb");
addWord("yan3jing1teng2", "health", "眼睛疼", "yǎn jīng téng", "Болят глаза", "verb");
addWord("sang3ziteng2", "health", "嗓子疼", "sǎng zi téng", "Болит горло", "verb");
addWord("du4ziteng2", "health", "肚子疼", "dù zi téng", "Болит живот", "verb");
addWord("jiao3teng2", "health", "脚疼", "jiǎo téng", "Болит нога", "verb");
addWord("shou3teng2", "health", "手疼", "shǒu téng", "Болит рука", "verb");
addWord("gan3mao4", "health", "感冒", "gǎn mào", "Простудиться", "verb");
addWord("yao4_2", "health", "药", "yào", "Таблетки", "noun");
addWord("yi1sheng1", "health", "医生", "yī shēng", "Доктор", "noun");
addWord("yi1yuan4", "health", "医院", "yī yuàn", "Больница", "noun");
addWord("zhu4yuan4", "health", "住院", "zhù yuàn", "Лежать в больнице", "verb");
addWord("chu1yuan4", "health", "出院", "chū yuàn", "Выписываться из больницы", "verb");
addWord("shu1fu2", "health", "舒服", "shū fú", "Комфортный", "adjective");

addWord("hua1", "nature", "花", "huā", "Цветок", "noun");
addWord("shu4", "nature", "树", "shù", "Дерево", "noun");
addWord("mei2gui1", "nature", "玫瑰", "méi guī", "Роза", "noun");
addWord("hua1yuan2", "nature", "花园", "huā yuán", "Сад", "noun");
addWord("he2_2", "nature", "河", "hé", "Река", "noun");

addWord("dong4wu4", "animals", "动物", "dòng wù", "Животные", "noun");
addWord("chong3wu4", "animals", "宠物", "chǒng wù", "Домашние животные", "noun");
addWord("dong4wu4yuan2", "animals", "动物园", "dòng wù yuán", "Зоопарк", "noun");
addWord("mao1", "animals", "猫", "māo", "Кошка", "noun");
addWord("gou3", "animals", "狗", "gǒu", "Собака", "noun");
addWord("tu4zi", "animals", "兔子", "tù zi", "Кролик", "noun");
addWord("niu2", "animals", "牛", "niú", "Корова", "noun");
addWord("yang2", "animals", "羊", "yáng", "Овца", "noun");
addWord("ji1", "animals", "鸡", "jī", "Курица", "noun");
addWord("zhu1", "animals", "猪", "zhū", "Свинья", "noun");
addWord("ma3", "animals", "马", "mǎ", "Лошадь", "noun");
addWord("niao3", "animals", "鸟", "niǎo", "Птица", "noun");
addWord("yu2", "animals", "鱼", "yú", "Рыба", "noun");
addWord("shi1zi", "animals", "狮子", "shī zi", "Лев", "noun");
addWord("lao3hu3", "animals", "老虎", "lǎo hǔ", "Тигр", "noun");
addWord("da4xiang4", "animals", "大象", "dà xiàng", "Слон", "noun");
addWord("wu1gui1", "animals", "乌龟", "wū guī", "Черепаха", "noun");
addWord("xiong2", "animals", "熊", "xióng", "Медведь", "noun");
addWord("zhi1zhu1", "animals", "蜘蛛", "zhī zhū", "Паук", "noun");
addWord("she2", "animals", "蛇", "shé", "Змея", "noun");
addWord("hou2", "animals", "猴", "hóu", "Обезьяна", "noun");
addWord("shu3_1", "animals", "鼠", "shǔ", "Крыса", "noun");
addWord("xiong2mao1", "animals", "熊猫", "xióng māo", "Панда", "noun");
addWord("chang2jing3lu4", "animals", "长颈鹿", "cháng jǐng lù", "Жираф", "noun");
addWord("da4xing1xing1", "animals", "大猩猩", "dà xīng xīng", "Горилла", "noun");
addWord("he2ma3", "animals", "河马", "hé mǎ", "Бегемот", "noun");
addWord("ban1ma3", "animals", "斑马", "bān mǎ", "Зебра", "noun");
addWord("long2", "animals", "龙", "lóng", "Дракон", "noun");
addWord("yang3", "animals", "养", "yǎng", ["Выращивать", "Держать животных"], "verb");
addWord("liu4_2", "animals", "遛", "liù", "Выгуливать", "verb");

addWord("chi1", "food", "吃", "chī", "Есть", "verb", { note: "Имеется в виду \"Принимать пищу\"" });
addWord("fan4", "food", "饭", "fàn", "Еда", "noun");
addWord("cai4pu3", "food", "菜谱", "cài pǔ", "Рецепт", "noun");
addWord("wei4dao4", "food", "味道", "wèi dào", "Вкус", "noun");
addWord("hao3chi1", "food", "好吃", "hǎo chī", "Вкусный", "adjective");
addWord("nan2chi1", "food", "难吃", "nán chī", "Невкусный", "adjective");
addWord("ku3", "food", "苦", "kǔ", "Горький", "adjective");
addWord("la4", "food", "辣", "là", "Острый", "adjective");
addWord("suan1", "food", "酸", "suān", "Кислый", "adjective");
addWord("tian2", "food", "甜", "tián", "Сладкий", "adjective");
addWord("xian2", "food", "咸", "xián", "Солёный", "adjective");
addWord("bao3", "food", "饱", "bǎo", "Сытый", "adjective");
addWord("hao3le", "food", "好了", "hǎo le", ["Готов", "Доведён до готовности"], ["adjective", "verb"]);
addWord("kuai4can1", "food", "快餐", "kuài cān", "Фаст фуд", "noun");
addWord("re4gou3", "food", "热狗", "rè gǒu", "Хот-дог", "noun");
addWord("han4bao3bao1", "food", "汉堡包", "hàn bǎo bāo", "Гамбургер", "noun");
addWord("ling2shi2", "food", "零食", "líng shí", "Закуски", "noun");
addWord("san1ming2zhi4", "food", "三明治", "sān míng zhì", "Сэндвич", "noun");
addWord("shu3tiao2", "food", "薯条", "shǔ tiáo", "Картошка фри", "noun");
addWord("shu3pian4", "food", "薯片", "shǔ piàn", "Чипсы", "noun");
addWord("mian4bao1", "food", "面包", "miàn bāo", "Хлеб", "noun");
addWord("qiao3ke4li4", "food", "巧克力", "qiǎo kè lì", "Шоколад", "noun");
addWord("bing1qi2lin2", "food", "冰淇淋", "bīng qí lín", "Мороженое", "noun");
addWord("tang2guo3", "food", "糖果", "táng guǒ", "Конфета", "noun");
addWord("mi3fan4", "food", "米饭", "mǐ fàn", "Варёный рис", "noun");
addWord("chao3fan4", "food", "炒饭", "chǎo fàn", "Жареный рис", "noun");
addWord("chao3cai4", "food", "炒菜", "chǎo cài", ["Жареное блюдо", "Жареные овощи"], "noun");
addWord("ji1dan4", "food", "鸡蛋", "jī dàn", "Яйцо", "noun");
addWord("tang1", "food", "汤", "tāng", "Суп", "noun");
addWord("mian4tiao2", "food", "面条", "miàn tiáo", "Лапша", "noun");
addWord("rou4", "food", "肉", "ròu", "Мясо", "noun");
addWord("niu2rou4", "food", "牛肉", "niú ròu", "Говядина", "noun");
addWord("yang2rou4", "food", "羊肉", "yáng ròu", "Баранина", "noun");
addWord("zhu1rou4", "food", "猪肉", "zhū ròu", "Свинина", "noun");
addWord("ji1rou4", "food", "鸡肉", "jī ròu", "Курятина", "noun");
addWord("yi4da4li4mian4", "food", "意大利面", "yì dà lì miàn", ["Макароны", "Спагетти"], "noun");
addWord("xiang1chang2", "food", "香肠", "xiāng cháng", "Сосиски", "noun");
addWord("bi3sa4bing3", "food", "比萨饼", "bǐ sà bǐng", "Пицца", "noun");
addWord("yan2", "food", "盐", "yán", "Соль", "noun");
addWord("tang2", "food", "糖", "táng", "Сахар", "noun");
addWord("suan1nai3", "food", "酸奶", "suān nǎi", "Йогурт", "noun");
addWord("tian2dian3", "food", "甜点", "tián diǎn", "Десерт", "noun");
addWord("shou4si1", "food", "寿司", "shòu sī", "Суши", "noun");
addWord("kuai4zi", "food", "筷子", "kuài zi", "Палочки для еды", "noun");
addWord("guo3jiang4", "food", "果酱", "guǒ jiàng", "Джем", "noun");
addWord("you2", "food", "油", "yóu", "Масло", "noun");
addWord("nai3you2", "food", "奶油", "nǎi yóu", ["Сливочное масло", "Сливки", "Крем"], "noun");
addWord("jiang4you2", "food", "酱油", "jiàng yóu", "Соевый соус", "noun");
addWord("ye4xiao1", "food", "夜宵", "yè xiāo", "Ночной перекус", "noun");
addWord("ke4_2", "food", "克", "kè", "Грамм", "noun");
addWord("jin1", "food", "斤", "jīn", ["Полкило", "Полкилограмма"], "noun");
addWord("shao2", "food", "勺", "sháo", "Ложка", "noun");
addWord("guo1", "food", "锅", "guō", "Кастрюля", "noun");
addWord("wan3", "food", "碗", "wǎn", ["Миска", "Тарелка", "Посуда"], "noun");
addWord("zhu3", "food", "煮", "zhǔ", "Варить", "verb");
addWord("chao3", "food", "炒", "chǎo", "Жарить", "verb");
addWord("guo4qi1", "food", "过期", "guò qī", ["Просрочить", "Просрочиться"], "verb");

addWord("shui3guo3", "fruits_and_vegetables", "水果", "shuǐ guǒ", "Фрукты", "noun");
addWord("ping2guo3", "fruits_and_vegetables", "苹果", "píng guǒ", "Яблоко", "noun");
addWord("xiang1jiao1", "fruits_and_vegetables", "香蕉", "xiāng jiāo", "Банан", "noun");
addWord("cheng2zi", "fruits_and_vegetables", "橙子", "chéng zi", "Апельсин", "noun");
addWord("cao3mei2", "fruits_and_vegetables", "草莓", "cǎo méi", "Клубника", "noun");
addWord("ning2meng2", "fruits_and_vegetables", "柠檬", "níng méng", "Лимон", "noun");
addWord("pu2tao", "fruits_and_vegetables", "葡萄", "pú tao", "Виноград", "noun");
addWord("xi1gua1", "fruits_and_vegetables", "西瓜", "xī guā", "Арбуз", "noun");
addWord("shu1cai4", "fruits_and_vegetables", "蔬菜", "shū cài", "Овощи", "noun");
addWord("hu2luo2bo", "fruits_and_vegetables", "胡萝卜", "hú luó bo", "Морковь", "noun");
addWord("huang2gua1", "fruits_and_vegetables", "黄瓜", "huáng guā", "Огурец", "noun");
addWord("xi1hong2shi4", "fruits_and_vegetables", "西红柿", "xī hóng shì", "Помидор", "noun");
addWord("tu3dou4", "fruits_and_vegetables", "土豆", "tǔ dòu", "Картошка", "noun");
addWord("luo2bo", "fruits_and_vegetables", "萝卜", "luó bo", "Редиска", "noun");
addWord("yang2cong1", "fruits_and_vegetables", "洋葱", "yáng cōng", "Лук", "noun");
addWord("da4suan4", "fruits_and_vegetables", "大蒜", "dà suàn", "Чеснок", "noun");
addWord("yu4mi3", "fruits_and_vegetables", "玉米", "yù mǐ", "Кукуруза", "noun");
addWord("qing1cai4", "fruits_and_vegetables", "青菜", "qīng cài", ["Зелень", "Китайская листовая капуста"], "noun", { note: "В переводе указаны два значения: широкое и узкое (наиболее частое)" });
addWord("sheng1cai4", "fruits_and_vegetables", "生菜", "shēng cài", "Салатные листья", "noun");
addWord("bai2cai4", "fruits_and_vegetables", "白菜", "bái cài", ["Китайская капуста", "Пекинская капуста"], "noun");
addWord("hu2jiao1fen3", "fruits_and_vegetables", "胡椒粉", "hú jiāo fěn", "Перец", "noun");
addWord("la4jiao1", "fruits_and_vegetables", "辣椒", "là jiāo", "Перец чили", "noun");
addWord("xin1xian1", "fruits_and_vegetables", "新鲜", "xīn xiān", "Свежий", "adjective");
addWord("cui4", "fruits_and_vegetables", "脆", "cuì", "Хрустящий", "adjective");

addWord("he1", "drinks", "喝", "hē", "Пить", "verb");
addWord("ke3", "drinks", "渴", "kě", ["Испытывать жажду", "Хотеть пить"], "verb");
addWord("hao3he1", "drinks", "好喝", "hǎo hē", "Вкусный", "adjective");
addWord("yin3liao4", "drinks", "饮料", "yǐn liào", "Напиток", "noun");
addWord("bei1zi", "drinks", "杯子", "bēi zi", ["Стакан", "Кружка"], "noun");
addWord("ping2zi", "drinks", "瓶子", "píng zi", "Бутылка", "noun");
addWord("shui3", "drinks", "水", "shuǐ", "Вода", "noun");
addWord("cha2_2", "drinks", "茶", "chá", "Чай", "noun");
addWord("ka1fei1", "drinks", "咖啡", "kā fēi", "Кофе", "noun");
addWord("niu2nai3", "drinks", "牛奶", "niú nǎi", "Молоко", "noun");
addWord("guo3zhi1", "drinks", "果汁", "guǒ zhī", "Сок", "noun");
addWord("ke3le4", "drinks", "可乐", "kě lè", "Кока-кола", "noun");
addWord("pi2jiu3", "drinks", "啤酒", "pí jiǔ", "Пиво", "noun");

addWord("zhu4", "interior", "住", "zhù", "Жить", "verb");
addWord("fang2zi", "interior", "房子", "fáng zi", "Дом", "noun");
addWord("gong1yu4", "interior", "公寓", "gōng yù", "Квартира", "noun");
addWord("zu1jin1", "interior", "租金", "zū jīn", "Арендная плата", "noun");
addWord("men2", "interior", "门", "mén", ["Дверь", "Ворота", "Вход"], "noun");
addWord("ru4kou3", "interior", "入口", "rù kǒu", "Вход", "noun");
addWord("chu1kou3", "interior", "出口", "chū kǒu", "Выход", "noun");
addWord("dian4hua4", "interior", "电话", "diàn huà", "Телефон", "noun");
addWord("shou3ji1", "interior", "手机", "shǒu jī", "Мобильный телефон", "noun");
addWord("hao4ma3", "interior", "号码", "hào mǎ", "Номер", "noun");
addWord("fang2jian1", "interior", "房间", "fáng jiān", "Комната", "noun");
addWord("wo4shi4", "interior", "卧室", "wò shì", "Спальня", "noun");
addWord("ke4ting1", "interior", "客厅", "kè tīng", "Гостиная", "noun");
addWord("yu4shi4", "interior", "浴室", "yù shì", "Ванная", "noun");
addWord("chu2fang2", "interior", "厨房", "chú fáng", "Кухня", "noun");
addWord("shu1fang2", "interior", "书房", "shū fáng", "Кабинет", "noun");
addWord("ce4suo3", "interior", "厕所", "cè suǒ", "Туалет", "noun");
addWord("yang2tai2", "interior", "阳台", "yáng tái", "Балкон", "noun");
addWord("can1ting1", "interior", "餐厅", "cān tīng", "Столовая", "noun");
addWord("yi1gui4", "interior", "衣柜", "yī guì", ["Шкаф", "Гардероб"], "noun");
addWord("chuang2", "interior", "床", "chuáng", "Кровать", "noun");
addWord("zhuo1zi", "interior", "桌子", "zhuō zi", "Стол", "noun");
addWord("yi3zi", "interior", "椅子", "yǐ zi", "Стул", "noun");
addWord("dian4nao3", "interior", "电脑", "diàn nǎo", "Компьютер", "noun");
addWord("dian4shi4", "interior", "电视", "diàn shì", "Телевизор", "noun");
addWord("sha1fa1", "interior", "沙发", "shā fā", "Диван", "noun");
addWord("shu1jia4", "interior", "书架", "shū jià", "Книжная полка", "noun");
addWord("chuang2tou2gui4", "interior", "床头柜", "chuáng tóu guì", "Тумбочка", "noun");
addWord("kong1tiao2", "interior", "空调", "kōng tiáo", "Кондиционер", "noun");
addWord("tai2deng1", "interior", "台灯", "tái dēng", "Настольная лампа", "noun");
addWord("bing1xiang1", "interior", "冰箱", "bīng xiāng", "Холодильник", "noun");

addWord("ren2", "family", "人", "rén", "Человек", "noun");
addWord("jia1", "family", "家", "jiā", ["Дом", "Семья"], "noun");
addWord("xiao3qu1", "family", "小区", "xiǎo qū", "Жилой комплекс", "noun");
addWord("jia1ren2", "family", "家人", "jiā rén", "Член семьи", "noun");
addWord("ma1ma1", "family", "妈妈", "mā mā", "Мама", "noun");
addWord("ba4ba4", "family", "爸爸", "bà bà", "Папа", "noun");
addWord("hai2zi", "family", "孩子", "hái zi", "Ребёнок", "noun");
addWord("er2zi", "family", "儿子", "ér zi", "Сын", "noun");
addWord("nu3er2", "family", "女儿", "nǚ ér", "Дочь", "noun");
addWord("nai3nai3", "family", "奶奶", "nǎi nǎi", "Бабушка со стороны папы", "noun");
addWord("wai4po2", "family", "外婆", "wài pó", "Бабушка со стороны мамы", "noun");
addWord("ye2ye2", "family", "爷爷", "yé yé", "Дедушка со стороны папы", "noun");
addWord("wai4gong1", "family", "外公", "wài gōng", "Дедушка со стороны мамы", "noun");
addWord("mei4mei4", "family", "妹妹", "mèi mèi", "Младшая сестра", "noun");
addWord("jie3jie3", "family", "姐姐", "jiě jiě", "Старшая сестра", "noun");
addWord("jie3mei4", "family", "姐妹", "jiě mèi", "Сёстры", "noun");
addWord("biao3mei4", "family", "表妹", "biǎo mèi", "Двоюродная младшая сестра", "noun");
addWord("biao3jie3", "family", "表姐", "biǎo jiě", "Двоюродная старшая сестра", "noun");
addWord("di4di4", "family", "弟弟", "dì dì", "Младший брат", "noun");
addWord("ge1ge1", "family", "哥哥", "gē gē", "Старший брат", "noun");
addWord("xiong1di4", "family", "兄弟", "xiōng dì", "Братья", "noun");
addWord("biao3di4", "family", "表弟", "biǎo dì", "Двоюродный младший брат", "noun");
addWord("biao3ge1", "family", "表哥", "biǎo gē", "Двоюродный старший брат", "noun");
addWord("xiao3jie3", "family", "小姐", "xiǎo jiě", "Девушка", "noun");
addWord("xian1sheng", "family", "先生", "xiān sheng", ["Господин", "Супруг"], "noun");
addWord("yi2ma1", "family", "姨妈", "yí mā", "Тётя со стороны мамы", "noun");
addWord("gu1gu1", "family", "姑姑", "gū gū", "Тётя со стороны папы", "noun");
addWord("jiu4jiu4", "family", "舅舅", "jiù jiù", "Дядя со стороны мамы", "noun");
addWord("shu1shu1", "family", "叔叔", "shū shū", "Дядя со стороны папы", "noun");
addWord("a1yi2", "family", "阿姨", "ā yí", "Тётя", "noun", { note: "Используется для обращения к незнакомой женщине на улице" });
addWord("sheng1huo2", "family", "生活", "shēng huó", "Жизнь", "noun");
addWord("sheng1", "family", "生", "shēng", ["Рожать", "Родить"], "verb");
addWord("jie2hun1", "family", "结婚", "jié hūn", ["Вступить в брак", "Жениться", "Выйти замуж"], "verb");
addWord("ban1jia1", "family", "搬家", "bān jiā", "Переезжать", "verb");

addWord("xin4xi1", "personal_info", "信息", "xìn xī", "Информация", "noun");
addWord("sheng1ri4", "personal_info", "生日", "shēng rì", "День рождения", "noun");
addWord("chu1sheng1", "personal_info", "出生", "chū shēng", "Родиться", "verb");
addWord("shu3_2", "personal_info", "属", "shǔ", "Родиться", "verb", { note: "Используется для обозначения знака зодиака по годам" });
//todo аккаунт
addWord("mi4ma3", "personal_info", "密码", "mì mǎ", "Пароль", "noun");

addWord("qi3chuang2", "schedule", "起床", "qǐ chuáng", "Вставать с кровати", "verb");
addWord("xi3zao3", "schedule", "洗澡", "xǐ zǎo", ["Принимать душ", "Принимать ванну"], "verb");
addWord("xi3lian3", "schedule", "洗脸", "xǐ liǎn", "Умываться", "verb");
addWord("xi3shou3", "schedule", "洗手", "xǐ shǒu", "Мыть руки", "verb");
addWord("shua1ya2", "schedule", "刷牙", "shuā yá", "Чистить зубы", "verb");
addWord("zao3fan4", "schedule", "早饭", "zǎo fàn", "Завтрак", "noun");
addWord("wu3fan4", "schedule", "午饭", "wǔ fàn", "Обед", "noun");
addWord("wan3fan4", "schedule", "晚饭", "wǎn fàn", "Ужин", "noun");
addWord("shui4jiao4", "schedule", "睡觉", "shuì jiào", "Спать", "verb");

addWord("shi2jian1", "time", "时间", "shí jiān", "Время", "noun");
addWord("ri4", "time", "日", "rì", "День", "noun");
addWord("hao4", "time", "号", "hào", ["Число", "День"], "noun");
addWord("xing1qi1", "time", "星期", "xīng qī", "Неделя", "noun");
addWord("yue4", "time", "月", "yuè", "Месяц", "noun");
addWord("nian2", "time", "年", "nián", "Год", "noun");
addWord("qu4nian2", "time", "去年", "qù nián", "Прошлый год", ["noun", "adverb"]);
addWord("ming2nian2", "time", "明年", "míng nián", "Следующий год", ["noun", "adverb"]);
addWord("jin1tian1", "time", "今天", "jīn tiān", "Сегодня", "adverb");
addWord("zuo2tian1", "time", "昨天", "zuó tiān", "Вчера", "adverb");
addWord("ming2tian1", "time", "明天", "míng tiān", "Завтра", "adverb");
addWord("xian4zai4", "time", "现在", "xiàn zài", "Сейчас", "adverb");
addWord("dian3", "time", "点", "diǎn", ["Час", "Заказывать"], ["adverb", "verb"]);
addWord("fen1", "time", "分", "fēn", "Минута", "noun", { note: "Используется для указания времени на часах" });
addWord("fen1zhong1", "time", "分钟", "fēn zhōng", "Минута", "noun", { note: "Используется для указания длительности" });
addWord("ke4_3", "time", "刻", "kè", ["15 минут", "Четверть часа"], "adverb");
addWord("ban4", "time", "半", "bàn", ["30 минут", "Полчаса", "Половина"], ["adverb", "noun"]);
addWord("zao3shang4", "time", "早上", "zǎo shàng", "Утро", "adverb");
addWord("shang4wu3", "time", "上午", "shàng wǔ", ["Первая половина дня", "Утро"], "adverb");
addWord("zhong1wu3", "time", "中午", "zhōng wǔ", "Полдень", "adverb");
addWord("xia4wu3", "time", "下午", "xià wǔ", ["Вторая половина дня", "День"], "adverb");
addWord("wan3shang4", "time", "晚上", "wǎn shàng", "Вечер", "adverb");
addWord("ling2chen2", "time", "凌晨", "líng chén", "Ночь", "adverb");
addWord("jin1zao3", "time", "今早", "jīn zǎo", ["Сегодня утром", "Этим утром"], "adverb");
addWord("xiao3shi2hou4", "time", "小时候", "xiǎo shí hòu", "Детство", "adverb");
addWord("mei3tian1", "time", "每天", "měi tiān", "Каждый день", "adverb");
addWord("yi1huir4", "time", "一会儿", "yī huìr", "Недолго", "adverb");
addWord("cong2lai2", "time", "从来", "cóng lái", "Никогда", "adverb");
addWord("you3shi2hou", "time", "有时候", "yǒu shí hou", "Иногда", "adverb");
addWord("chang2chang2", "time", "常常", "cháng cháng", "Часто", "adverb");
addWord("yi1ban1", "time", "一般", "yī bān", ["Обычно", "Обычный"], ["adverb", "adjective"]);
addWord("ping2shi2", "time", "平时", "píng shí", "Обычно", "adverb");
addWord("zui4jin4", "time", "最近", "zuì jìn", "В последнее время", "adverb");
addWord("zai4_2", "time", "再", "zài", ["Опять", "Снова"], "adverb");
addWord("yi3hou4", "time", "以后", "yǐ hòu", "После", "preposition");
addWord("yi3jing1", "time", "已经", "yǐ jīng", "Уже", "adverb");
addWord("gang1gang1", "time", "刚刚", "gāng gāng", "Только что", "adverb", { note: "Указывает на событие, произошедшее только что. Может стоять только перед глаголом" });
addWord("gang1cai2", "time", "刚才", "gāng cái", "Только что", "adverb", { note: "Указывает на событие в ближайшем прошлом (5-10 минут назад)" });
addWord("ye3xu3", "time", "也许", "yě xǔ", "Возможно", "adverb");
addWord("zhong1yu2", "time", "终于", "zhōng yú", "Наконец", "adverb");
addWord("dang1shi2", "time", "当时", "dāng shí", ["Тогда", "В тот момент"], "adverb");
addWord("zhe4ji3nian2", "time", "这几年", "zhè jǐ nián", "В последние годы", "adverb");
addWord("deshi2hou4", "time", "的时候", "de shí hòu", ["В то время как", "Пока", "Когда", "Параллельно"], "particle", { note: "Является грамматической конструкцией, наиболее схожей с союзом \"когда\"" });

addWord("tian1qi4", "weather", "天气", "tiān qì", "Погода", "noun");
addWord("leng3", "weather", "冷", "lěng", "Холодно", "adverb");
addWord("re4", "weather", "热", "rè", ["Жарко", "Горячо"], "adverb");
addWord("qing2tian1", "weather", "晴天", "qíng tiān", "Солнечно", "noun");
addWord("yin1tian1", "weather", "阴天", "yīn tiān", "Пасмурно", "noun");
addWord("duo1yun2", "weather", "多云", "duō yún", "Облачно", "adjective");
addWord("gua1feng1", "weather", "刮风", "guā fēng", "Дует ветер", "verb");
addWord("gua1tai2feng1", "weather", "刮台风", "guā tái fēng", "Тайфун", "verb");
addWord("xia4mao2mao2yu3", "weather", "下毛毛雨", "xià máo máo yǔ", "Моросит", "verb");
addWord("xia4xiao3yu3", "weather", "下小雨", "xià xiǎo yǔ", "Идёт небольшой дождь", "verb");
addWord("xia4yu3", "weather", "下雨", "xià yǔ", "Идёт дождь", "verb");
addWord("xia4xue3", "weather", "下雪", "xià xuě", "Идёт снег", "verb");
addWord("qi4wen1", "weather", "气温", "qì wēn", "Температура воздуха", "noun");
addWord("du4", "weather", "度", "dù", "Градус", "noun");
addWord("ling2shang4", "weather", "零上", "líng shàng", "Выше нуля", "noun");
addWord("ling2xia4", "weather", "零下", "líng xià", "Ниже нуля", "noun");
addWord("ji4jie2", "weather", "季节", "jì jié", ["Сезон", "Время года"], "noun");
addWord("dong1tian1", "weather", "冬天", "dōng tiān", "Зима", ["noun", "adverb"]);
addWord("chun1tian1", "weather", "春天", "chūn tiān", "Весна", ["noun", "adverb"]);
addWord("xia4tian1", "weather", "夏天", "xià tiān", "Лето", ["noun", "adverb"]);
addWord("qiu1tian1", "weather", "秋天", "qiū tiān", "Осень", ["noun", "adverb"]);

addWord("jiao1tong1", "transport", "交通", "jiāo tōng", "Транспорт", "noun");
addWord("qi2", "transport", "骑", "qí", "Кататься", "verb");
addWord("ting2", "transport", "停", "tíng", "Останавливать", "verb");
addWord("lu4", "transport", "路", "lù", ["Улица", "Дорога"], "noun");
addWord("du3che1", "transport", "堵车", "dǔ chē", "Иметь пробки", "verb");
addWord("che1", "transport", "车", "chē", "Машина", "noun");
addWord("kai1che1", "transport", "开车", "kāi chē", "Водить машину", "verb");
addWord("zi4xing2che1", "transport", "自行车", "zì xíng chē", "Велосипед", "noun");
addWord("fei1ji1", "transport", "飞机", "fēi jī", "Самолёт", "noun");
addWord("chu1zu1che1", "transport", "出租车", "chū zū chē", "Такси", "noun");
addWord("da3che1", "transport", "打车", "dǎ chē", "Заказать такси", "verb");
addWord("du4chuan2", "transport", "渡船", "dù chuán", "Катер", "noun");
addWord("di4tie3", "transport", "地铁", "dì tiě", "Метро", "noun");
addWord("dian4che1", "transport", "电车", "diàn chē", "Трамвай", "noun");
addWord("gong1gong4qi4che1", "transport", "公共汽车", "gōng gòng qì chē", "Автобус", "noun");
addWord("xiao4che1", "transport", "校车", "xiào chē", "Школьный автобус", "noun");
addWord("gong1jiao1zhan4", "transport", "公交站", "gōng jiāo zhàn", "Автобусная остановка", "noun");
addWord("huo3che1", "transport", "火车", "huǒ chē", "Поезд", "noun");
addWord("huo3che1zhan4", "transport", "火车站", "huǒ chē zhàn", "Железнодорожный вокзал", "noun");
addWord("lou2", "transport", "楼", "lóu", "Этаж", "noun");
addWord("lou2ti1", "transport", "楼梯", "lóu tī", "Лестница", "noun");
addWord("dian4ti1", "transport", "电梯", "diàn tī", "Лифт", "noun");

addWord("di4fang1", "travelling", "地方", "dì fāng", "Место", "noun");
addWord("shi4zhong1xin1", "travelling", "市中心", "shì zhōng xīn", "Центр города", "noun");
addWord("fan4dian4", "travelling", "饭店", "fàn diàn", ["Ресторан", "Отель", "Гостиница"], "noun");
addWord("jiu3dian4", "travelling", "酒店", "jiǔ diàn", "Отель", "noun");
addWord("ka1fei1guan3", "travelling", "咖啡馆", "kā fēi guǎn", "Кафе", "noun");
addWord("jiu3ba1", "travelling", "酒吧", "jiǔ bā", "Бар", "noun");
addWord("bo2wu4guan3", "travelling", "博物馆", "bó wù guǎn", "Музей", "noun");
addWord("huar4", "travelling", "画儿", "huàr", "Картина", "noun");
addWord("hua4zhan3", "travelling", "画展", "huà zhǎn", "Выставка", "noun");
addWord("hai3", "travelling", "海", "hǎi", "Море", "noun");
addWord("hai3tan1", "travelling", "海滩", "hǎi tān", "Пляж", "noun");
addWord("feng1jing3", "travelling", "风景", "fēng jǐng", "Пейзаж", "noun");
addWord("chang2cheng2", "travelling", "长城", "cháng chéng", "Великая Китайская стена", "noun");
addWord("shan1", "travelling", "山", "shān", "Гора", "noun");
addWord("pa2shan1", "travelling", "爬山", "pá shān", "Подниматься на гору", "verb");
addWord("xia4shan1", "travelling", "下山", "xià shān", "Спускаться с горы", "verb");
addWord("shan1ding3", "travelling", "山顶", "shān dǐng", "Вершина горы", "noun");
addWord("xiang1ji1", "travelling", "相机", "xiāng jī", "Камера", "noun");
addWord("zhao4pian4", "travelling", "照片", "zhào piàn", "Фотография", "noun");
addWord("pai1zhao4pian4", "travelling", "拍照片", "pāi zhào piàn", "Снимать фотографию", "verb");
addWord("ming2xin4pian4", "travelling", "明信片", "míng xìn piàn", "Открытка", "noun");
addWord("ji4nian4pin3", "travelling", "纪念品", "jì niàn pǐn", "Сувенир", "noun");
addWord("you2le4chang3", "travelling", "游乐场", "yóu lè chǎng", "Парк аттракционов", "noun");
addWord("huan2jing4", "travelling", "环境", "huán jìng", ["Окружающая среда", "Окружение", "Обстановка"], "noun");
addWord("ting2che1chang3", "travelling", "停车场", "tíng chē chǎng", "Парковка", "noun");
addWord("bao1", "travelling", "包", "bāo", "Сумка", "noun");
addWord("bei4bao1", "travelling", "背包", "bèi bāo", "Рюкзак", "noun");
addWord("gong1li3", "travelling", "公里", "gōng lǐ", "Километр", "noun");
addWord("guo2wai4", "travelling", "国外", "guó wài", "За границей", "noun");
addWord("wen2hua4", "travelling", "文化", "wén huà", "Культура", "noun");

addWord("guo2jia1", "countries", "国家", "guó jiā", "Страна", "noun");
addWord("e2luo2si1", "countries", "俄罗斯", "é luó sī", "Россия", "noun");
addWord("mei3guo2", "countries", "美国", "měi guó", "Америка", "noun");
addWord("jia1na2da4", "countries", "加拿大", "jiā ná dà", "Канада", "noun");
addWord("zhong1guo2", "countries", "中国", "zhōng guó", "Китай", "noun");
addWord("ri4ben3", "countries", "日本", "rì běn", "Япония", "noun");
addWord("han2guo2", "countries", "韩国", "hán guó", "Корея", "noun");
addWord("ao4da4li4ya4", "countries", "澳大利亚", "ào dà lì yà", "Австралия", "noun");
addWord("ying1guo2", "countries", "英国", "yīng guó", "Англия", "noun");
addWord("fa3guo2", "countries", "法国", "fǎ guó", "Франция", "noun");
addWord("ba1li2", "countries", "巴黎", "bā lí", "Париж", "noun");
addWord("de2guo2", "countries", "德国", "dé guó", "Германия", "noun");
addWord("yi4da4li4", "countries", "意大利", "yì dà lì", "Италия", "noun");
addWord("xi1ban1ya2", "countries", "西班牙", "xī bān yá", "Испания", "noun");
addWord("pu2taoya2", "countries", "葡萄牙", "pú tao yá", "Португалия", "noun");
addWord("ba1xi1", "countries", "巴西", "bā xī", "Бразилия", "noun");
addWord("tai4guo2", "countries", "泰国", "tài guó", "Таиланд", "noun");
addWord("xin1jia1po1", "countries", "新加坡", "xīn jiā pō", "Сингапур", "noun");
addWord("ou1zhou1", "countries", "欧洲", "ōu zhōu", "Европа", "noun");
addWord("ya4zhou1", "countries", "亚洲", "yà zhōu", "Азия", "noun");
addWord("bei3jing1", "countries", "北京", "běi jīng", "Пекин", "noun");
addWord("shang4hai3", "countries", "上海", "shàng hǎi", "Шанхай", "noun");
addWord("xiang1gang3", "countries", "香港", "xiāng gǎng", "Гонконг", "noun");
addWord("guang3zhou1", "countries", "广州", "guǎng zhōu", "Гуанчжоу", "noun");
addWord("guang3dong1", "countries", "广东", "guǎng dōng", "Гуандун", "noun");
addWord("si4chuan1", "countries", "四川", "sì chuān", "Сычуань", "noun");

addWord("shang1dian4", "shop", "商店", "shāng diàn", "Магазин", "noun");
addWord("chao1shi4", "shop", "超市", "chāo shì", "Супермаркет", "noun");
addWord("cai4shi4chang3", "shop", "菜市场", "cài shì chǎng", "Рынок", "noun");
addWord("mai3", "shop", "买", "mǎi", "Покупать", "verb");
addWord("mai4", "shop", "卖", "mài", "Продавать", "verb");
addWord("dong1xi1", "shop", "东西", "dōng xī", ["Предмет", "Вещь"], "noun");
addWord("qian2", "shop", "钱", "qián", "Деньги", "noun");
addWord("xian4jin1", "shop", "现金", "xiàn jīn", "Наличные", "noun");
addWord("kuai4_2", "shop", "块", "kuài", ["Валюта", "Кусок"], "noun");
addWord("yuan2_2", "shop", "元", "yuán", ["Китайская валюта", "Юань"], "noun");
addWord("te4jia4", "shop", "特价", "tè jià", ["Специальное предложение", "Особая цена"], "noun");
addWord("da3zhe2", "shop", "打折", "dǎ zhé", ["Действует скидка", "По скидке"], "verb");
addWord("dai4_3", "shop", "袋", "dài", "Мешок", "noun");
addWord("su4liao4dai4", "shop", "塑料袋", "sù liào dài", "Пластиковый пакет", "noun");
addWord("bu2yong4le", "shop", "不用了", "bú yòng le", "Не нужно", "interjection");
addWord("yi1dianr3", "shop", "一点儿", "yī diǎnr", "Немного", "adverb");
addWord("gui4", "shop", "贵", "guì", "Дорогой", "adjective");
addWord("pian2yi", "shop", "便宜", "pián yi", "Дешёвый", "adjective");

addWord("gong1zuo4", "work", "工作", "gōng zuò", ["Работа", "Работать"], ["noun", "verb"]);
addWord("dang1", "work", "当", "dāng", ["Стать", "Работать"], "verb", { note: "Обязательно должна быть указана профессия" });
addWord("shang4ban1", "work", "上班", "shàng bān", "Идти на работу", "verb");
addWord("xia4ban1", "work", "下班", "xià bān", "Заканчивать работу", "verb");
addWord("jia1ban1", "work", "加班", "jiā bān", "Работать сверхурочно", "verb");
addWord("ci2zhi2", "work", "辞职", "cí zhí", ["Увольняться", "Уволиться"], "verb");
addWord("jia3qi1", "work", "假期", "jiǎ qī", "Отпуск", "noun");
addWord("zuo4zhe3", "work", "作者", "zuò zhě", "Автор", "noun");
addWord("yan3yuan2", "work", "演员", "yǎn yuán", "Актёр", "noun");
addWord("ge1shou3", "work", "歌手", "gē shǒu", "Певец", "noun");
addWord("lu4shi1", "work", "律师", "lǜ shī", "Адвокат", "noun");
addWord("xin1li3xue2", "work", "心理学", "xīn lǐ xué", "Психология", "noun");
addWord("gong1cheng2", "work", "工程", "gōng chéng", "Инженерия", "noun");
addWord("gong1cheng2shi1", "work", "工程师", "gōng chéng shī", "Инженер", "noun");
addWord("ke4fu2", "work", "客服", "kè fú", "Служба поддержки клиентов", "noun");
addWord("zhuan1ye4", "work", "专业", "zhuān yè", ["Специальность", "Профессия"], "noun");
addWord("mian4shi4", "work", "面试", "miàn shì", "Собеседование", "noun");
addWord("shi2xi2", "work", "实习", "shí xí", "Стажировка", "noun");
addWord("lao3ban3", "work", "老板", "lǎo bǎn", "Босс", "noun");
addWord("jing1li3", "work", "经理", "jīng lǐ", "Менеджер", "noun");
addWord("kai1hui4", "work", "开会", "kāi huì", "Проводить совещание", "verb");
addWord("ban4gong1shi4", "work", "办公室", "bàn gōng shì", "Офис", "noun");
addWord("wang3shang4", "work", "网上", "wǎng shàng", "Онлайн", "adverb");

addWord("ai4hao3", "hobby", "爱好", "ài hǎo", "Хобби", "noun");
addWord("dian4ying3", "hobby", "电影", "diàn yǐng", "Фильм", "noun");
addWord("qiu2", "hobby", "球", "qiú", "Мяч", "noun");
addWord("ti1zu2qiu2", "hobby", "踢足球", "tī zú qiú", "Играть в футбол", "verb");
addWord("hua2bing1", "hobby", "滑冰", "huá bīng", "Кататься на коньках", "verb");
addWord("hua2xue3", "hobby", "滑雪", "huá xuě", "Кататься на лыжах", "verb");
addWord("tan2gang1qin2", "hobby", "弹钢琴", "tán gāng qín", "Играть на фортепиано", "verb");
addWord("la1xiao3ti2qin2", "hobby", "拉小提琴", "lā xiǎo tí qín", "Играть на скрипке", "verb");
addWord("tiao4wu3", "hobby", "跳舞", "tiào wǔ", "Танцевать", "verb");
addWord("chang4", "hobby", "唱", "chàng", "Петь", "verb");
addWord("chang4ge1", "hobby", "唱歌", "chàng gē", ["Петь", "Петь песню"], "verb");
addWord("hua4huar4", "hobby", "画画儿", "huà huàr", "Рисовать картину", "verb");
addWord("wanr2", "hobby", "玩儿", "wánr", "Играть", "verb");
addWord("you2xi4", "hobby", "游戏", "yóu xì", "Игра", "noun");
addWord("diao4yu2", "hobby", "钓鱼", "diào yú", "Ловить рыбу", "verb");

addWord("yun4dong4", "sport", "运动", "yùn dòng", "Спорт", "noun");
addWord("jian4shen1", "sport", "健身", "jiàn shēn", "Тренироваться", "verb");
addWord("pao3", "sport", "跑", "pǎo", ["Бегать", "Бежать"], "verb");
addWord("pao3bu4", "sport", "跑步", "pǎo bù", ["Бегать", "Бежать"], "verb");
addWord("you2yong3", "sport", "游泳", "yóu yǒng", "Плавать", "verb");
addWord("tiao4shui3", "sport", "跳水", "tiào shuǐ", "Прыжки в воду", "noun");
addWord("wang3qiu2", "sport", "网球", "wǎng qiú", "Теннис", "noun");
addWord("lan2qiu2", "sport", "篮球", "lán qiú", "Баскетбол", "noun");
addWord("pai2qiu2", "sport", "排球", "pái qiú", "Волейбол", "noun");
addWord("fen3si1", "sport", "粉丝", "fěn sī", "Фанат", "noun");
addWord("dui4_1", "sport", "队", "duì", "Команда", "noun");
addWord("bi3sai4", "sport", "比赛", "bǐ sài", "Соревнование", "noun");
addWord("ao4yun4hui4", "sport", "奥运会", "ào yùn huì", "Олимпийские игры", "noun");

addWord("shu1", "books", "书", "shū", "Книга", "noun");
addWord("za2zhi4", "books", "杂志", "zá zhì", "Журнал", "noun");
addWord("bao4zhi3", "books", "报纸", "bào zhǐ", "Газета", "noun");
addWord("ye4", "books", "页", "yè", "Страница", "noun");
addWord("gu4shi4", "books", "故事", "gù shì", ["История", "Рассказ"], "noun");
addWord("xiao3shuo1", "books", "小说", "xiǎo shuō", "Рассказ", "noun");
addWord("qing2jie2", "books", "情节", "qíng jié", "Сюжет", "noun");
addWord("jie2ju2", "books", "结局", "jié jú", ["Финал", "Конец"], "noun");
addWord("du2", "books", "读", "dú", "Читать вслух", "verb");
addWord("ci2", "books", "词", "cí", "Слово", "noun");
addWord("ju4zi", "books", "句子", "jù zi", ["Предложение", "Фраза"], "noun");
addWord("ci2dian3", "books", "词典", "cí diǎn", "Словарь", "noun");
addWord("han4zi4", "books", "汉字", "hàn zì", "Иероглиф", "noun");

addWord("ge4", "counting_words", "个", "gè", "Счётное слово", "counting_word");
addWord("jian1", "counting_words", "间", "jiān", "Счётное слово для комнат", "counting_word");
addWord("tiao2", "counting_words", "条", "tiáo", "Счётное слово для рыб", "counting_word");
addWord("zhi3", "counting_words", "只", "zhǐ", "Счётное слово для котов/собак", "counting_word");
addWord("ke1", "counting_words", "颗", "kē", "Счётное слово для зубов", "counting_word");
addWord("feng1", "counting_words", "封", "fēng", "Счётное слово для писем", "counting_word");
addWord("dao4_1", "counting_words", "道", "dào", "Порция", "counting_word");
addWord("di4", "counting_words", "第", "dì", "Порядковый номер", "numeral", { note: "Является служебным префиксом, который связан с образованием порядковых числительных" });

addWord("zhe4", "location", "这", "zhè", "Это", "pronoun");
addWord("na4", "location", "那", "nà", "То", "pronoun");
addWord("zhe4li3", "location", "这里", "zhè lǐ", "Здесь", "adverb");
addWord("na4li3", "location", "那里", "nà lǐ", "Там", "adverb");
addWord("shang4", "location", "上", "shàng", ["На", "Сверху"], ["adverb", "preposition"]);
addWord("zhong1", "location", "中", "zhōng", ["Середина", "Посередине"], ["adverb", "preposition"]);
addWord("xia4", "location", "下", "xià", ["Под", "Снизу"], ["adverb", "preposition"]);
addWord("li3", "location", "里", "lǐ", ["В", "Внутри"], ["adverb", "preposition"]);
addWord("qian2mian4", "location", "前面", "qián miàn", ["Перед", "Спереди"], ["adverb", "preposition"]);
addWord("hou4mian4", "location", "后面", "hòu miàn", ["Зад", "Сзади"], ["adverb", "preposition"]);
addWord("fu4jin4", "location", "附近", "fù jìn", "Рядом", ["adverb", "preposition"]);
addWord("zuo3", "location", "左", "zuǒ", ["Лево", "Слева"], ["noun", "adverb"]);
addWord("you4_1", "location", "右", "yòu", ["Право", "Справа"], ["noun", "adverb"]);
addWord("jin4_2", "location", "近", "jìn", "Близко", ["adjective", "adverb"]);
addWord("yuan3", "location", "远", "yuǎn", "Далеко", ["adjective", "adverb"]);
addWord("li2", "location", "离", "lí", ["От", "До"], "preposition");
addWord("cong2", "location", "从", "cóng", ["Из", "С", "До"], "preposition");
addWord("dao4_2", "location", "到", "dào", ["До", "Добираться", "Прибыть"], ["verb", "preposition"]);

addWord("shen2me", "questions", "什么", "shén me", "Что", "pronoun");
addWord("shen2meshi2hou", "questions", "什么时候", "shén me shí hou", "Когда", "pronoun");
addWord("shei2", "questions", "谁", "shéi", "Кто", "pronoun");
addWord("na3", "questions", "哪", "nǎ", "Который", "pronoun", { note: "Используется, когда у собеседника есть выбор" });
addWord("na3li3", "questions", "哪里", "nǎ lǐ", ["Где", "Куда"], "pronoun");
addWord("ji3", "questions", "几", "jǐ", ["Сколько", "Несколько"], "pronoun");
addWord("duo1shao3", "questions", "多少", "duō shǎo", "Сколько", "pronoun");
addWord("yi1xie1", "questions", "一些", "yī xiē", "Несколько", "pronoun");
addWord("zen3me", "questions", "怎么", "zěn me", "Как", "pronoun");
addWord("zen3meyang4", "questions", "怎么样", "zěn me yàng", "Какой", "pronoun");
addWord("wei2shen2me", "questions", "为什么", "wéi shén me", "Почему", "pronoun");

addWord("de_1", "summarize", "的", "de", "Притяжательная частица", "particle");
addWord("de_2", "summarize", "得", "de", "Оценочная частица", "particle");
addWord("dong3", "summarize", "懂", "dǒng", "Понимать", "verb");
addWord("wan2", "summarize", "完", "wán", "Закончить", "verb");
addWord("he2_1", "summarize", "和", "hé", "И", "conjunction");
addWord("hai2", "summarize", "还", "hái", ["Ещё", "И"], "conjunction", { note: "В качестве \"и\" используется только для глаголов" });
addWord("you4_2", "summarize", "又", "yòu", "И", "conjunction", { note: "Используется как парный союз (\"и это, и то\")" });
addWord("huo4", "summarize", "或", "huò", "Или", "conjunction");
addWord("gen1", "summarize", "跟", "gēn", "С", "conjunction");
addWord("yi4qi3", "summarize", "一起", "yì qǐ", "Вместе", "adverb");
addWord("ye3", "summarize", "也", "yě", "Тоже", "adverb");
addWord("mei3", "summarize", "每", "měi", "Каждый", "pronoun");
addWord("suo3you3", "summarize", "所有", "suǒ yǒu", "Все", "pronoun", { note: "Определяет множество каких-то объектов" });
addWord("dou1", "summarize", "都", "dōu", "Все", "adverb", { note: "Выбирает все объекты из множества" });
addWord("you3de", "summarize", "有的", "yǒu de", "Некоторый", "pronoun");
addWord("zhe4me", "summarize", "这么", "zhè me", "Такой", "pronoun");
addWord("cha1bu4duo1", "summarize", "差不多", "chā bù duō", "Почти", "adverb");
addWord("zhong3", "summarize", "种", "zhǒng", ["Вид", "Тип"], "noun");
addWord("mei2", "summarize", "没", "méi", "Не", "particle");
addWord("bu4", "summarize", "不", "bù", "Не", "particle");
addWord("sui1ran2", "summarize", "虽然", "suī rán", "Хотя", "conjunction");
addWord("dan4shi4", "summarize", "但是", "dàn shì", "Но", "conjunction");
addWord("yin1wei2", "summarize", "因为", "yīn wéi", ["Так как", "Потому что"], "conjunction");
addWord("suo3yi3", "summarize", "所以", "suǒ yǐ", ["Так что", "Поэтому"], "conjunction");

addWord("zheng4zai4", "other", "正在", "zhèng zài", ["Быть в процессе", "Длиться"], "adverb");
addWord("guo4", "other", "过", "guò", ["Праздновать", "Частица прошедшего времени"], "particle");
addWord("le", "other", "了", "le", "Частица изменения", "particle");
addWord("dui4_2", "other", "对", "duì", ["Верно", "Для", "Влиять"], ["adverb", "preposition"]);
addWord("zhu3yi4", "other", "主意", "zhǔ yì", "Идея", "noun");
addWord("meng4xiang3", "other", "梦想", "mèng xiǎng", "Мечта", "noun");
addWord("jiang3", "other", "奖", "jiǎng", "Награда", "noun");
addWord("chou1yan1", "other", "抽烟", "chōu yān", "Курить", "verb");
addWord("bao4jing3", "other", "报警", "bào jǐng", "Вызвать полицию", "verb");