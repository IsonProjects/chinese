const words = [];
const categories = [];

function addCategory(id, name) {
    categories.push({
        id: id,
        name: name
    });
}

function addWord(id, categoryId, character, pinyin, translation) {
    if (!categories.some(category => category.id === categoryId)) {
        console.error(`Unknown category "${categoryId}" word id "${id}"`);
        return;
    }

    if (words.some(word => word.id === id)) {
        console.error(`Duplicate word id "${id}"`);
        return;
    }

    if (typeof translation === "string") {
        if (translation.includes(",")) {
            console.warn(`Word with id "${id}" has deprecated translation`);
        }

        translation = [translation];
    }

    if (translation.some(el => {
        const ch = el.charAt(0);
        if (ch !== ch.toUpperCase()) return true;
        return el.includes(",");
    })) {
        console.warn(`Word with id "${id}" has invalid translation`);
    }

    words.push({
        id: id,
        category: categoryId,
        character: character,
        pinyin: pinyin,
        translation: translation
    });
}



addCategory("pronouns", "Местоимения");
addCategory("numbers", "Числа");
addCategory("colors", "Цвета");
addCategory("verbs", "Глаголы");
addCategory("adjectives", "Прилагательные");
addCategory("talking", "Общение");
addCategory("school", "Школа");
addCategory("office_supplies", "Канцелярские принадлежности");
addCategory("clothes", "Одежда");
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
addCategory("countries", "Страны");
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



addWord("wo3", "pronouns", "我", "wǒ", "Я");
addWord("wo3men", "pronouns", "我们", "wǒ men", "Мы");
addWord("ni3", "pronouns", "你", "nǐ", "Ты");
addWord("nin2", "pronouns", "您", "nín", "Вы");
addWord("ni3men", "pronouns", "你们", "nǐ men", "Вы");
addWord("ta1_1", "pronouns", "他", "tā", "Он");
addWord("ta1_2", "pronouns", "她", "tā", "Она");
addWord("ta1_3", "pronouns", "它", "tā", "Оно");
addWord("ta1men", "pronouns", "他们", "tā men", "Они");

addWord("ling2", "numbers", "零", "líng", "Ноль");
addWord("yi1", "numbers", "一", "yī", "Один");
addWord("er4", "numbers", "二", "èr", "Два");
addWord("liang3", "numbers", "两", "liǎng", "Два (количество)");
addWord("san1", "numbers", "三", "sān", "Три");
addWord("si4", "numbers", "四", "sì", "Четыре");
addWord("wu3", "numbers", "五", "wǔ", "Пять");
addWord("liu4", "numbers", "六", "liù", "Шесть");
addWord("qi1", "numbers", "七", "qī", "Семь");
addWord("ba1", "numbers", "八", "bā", "Восемь");
addWord("jiu3", "numbers", "九", "jiǔ", "Девять");
addWord("shi2", "numbers", "十", "shí", "Десять");
addWord("bai3", "numbers", "百", "bǎi", "Сто");
addWord("qian1", "numbers", "千", "qiān", "Тысяча");
addWord("zuo3you4", "numbers", "左右", "zuǒ yòu", ["Примерно", "Около"]);
addWord("ci4", "numbers", "次", "cì", "Раз");

addWord("yan2se4", "colors", "颜色", "yán sè", "Цвет");
addWord("hong2se4", "colors", "红色", "hóng sè", "Красный цвет");
addWord("huang2se4", "colors", "黄色", "huáng sè", "Жёлтый цвет");
addWord("lan2se4", "colors", "蓝色", "lán sè", "Синий цвет");
addWord("lu4se4", "colors", "绿色", "lǜ sè", "Зелёный цвет");
addWord("bai2se4", "colors", "白色", "bái sè", "Белый цвет");
addWord("hei1se4", "colors", "黑色", "hēi sè", "Чёрный цвет");
addWord("cheng2se4", "colors", "橙色", "chéng sè", "Оранжевый цвет");
addWord("zong1se4", "colors", "棕色", "zōng sè", "Коричневый цвет");
addWord("hui1se4", "colors", "灰色", "huī sè", "Серый цвет");
addWord("fen3se4", "colors", "粉红色", "fěn hóng sè", "Розовый цвет");
addWord("zi3se4", "colors", "紫色", "zǐ sè", "Фиолетовый цвет");
addWord("qian3", "colors", "浅", "qiǎn", "Светлый");
addWord("shen1", "colors", "深", "shēn", "Тёмный");

addWord("xi3huan", "verbs", "喜欢", "xǐ huan", "Нравиться");
addWord("ai4", "verbs", "爱", "ài", "Любить");
addWord("shi4", "verbs", "是", "shì", ["Быть", "Являться"]);
addWord("zai4", "verbs", "在", "zài", "Находиться");
addWord("deng3", "verbs", "等", "děng", "Ждать");
addWord("qu4", "verbs", "去", "qù", ["Идти", "Перемещаться"]);
addWord("zou3lu4", "verbs", "走路", "zǒu lù", "Ходить пешком");
addWord("dai4_1", "verbs", "带", "dài", "Брать с собой");
addWord("kan4", "verbs", "看", "kàn", ["Смотреть", "Видеть"]);
addWord("hui4", "verbs", "会", "huì", "Уметь");
addWord("yao4_1", "verbs", "要", "yào", ["Хотеть", "Надо"]);
addWord("xiang3", "verbs", "想", "xiǎng", ["Думать", "Мечтать", "Хотеть", "Желать"]);
addWord("xiang1xin4", "verbs", "相信", "xiāng xìn", "Верить");
addWord("kao3lu4", "verbs", "考虑", "kǎo lǜ", ["Думать", "Подумать", "Обдумать"]);
addWord("jin4", "verbs", "进", "jìn", "Входить");
addWord("zuo4_1", "verbs", "坐", "zuò", "Сидеть");
addWord("zhan4", "verbs", "站", "zhàn", "Стоять");
addWord("qi3lai2", "verbs", "起来", "qǐ lái", "Вставать");
addWord("xie3", "verbs", "写", "xiě", "Писать");
addWord("zuo4_2", "verbs", "做", "zuò", "Делать");
addWord("gei3", "verbs", "给", "gěi", "Давать");
addWord("lai2", "verbs", "来", "lái", "Приходить");
addWord("hui2", "verbs", "回", "huí", "Возвращаться");
addWord("jian4", "verbs", "见", "jiàn", ["Встречаться", "Видеть"]);
addWord("zhi1dao4", "verbs", "知道", "zhī dào", "Знать");
addWord("da3", "verbs", "打", "dǎ", ["Бить", "Ударять", "Играть"]);
addWord("tiao4", "verbs", "跳", "tiào", "Прыгать");
addWord("xiu1xi1", "verbs", "休息", "xiū xī", "Отдыхать");
addWord("song4", "verbs", "送", "sòng", "Доставлять");
addWord("bei4", "verbs", "背", "bèi", "Нести");
addWord("fang4", "verbs", "放", "fàng", ["Класть", "Добавлять"]);
addWord("shi4he2", "verbs", "适合", "shì hé", ["Подходить", "Пригодный"]);
addWord("fang4song1", "verbs", "放松", "fàng sōng", ["Расслабление", "Расслабляться"]);
addWord("ying4gai1", "verbs", "应该", "yìng gāi", ["Следует", "Должен"]);
addWord("shan4chang2", "verbs", "擅长", "shàn cháng", "Быть сильным в чём-то");
addWord("hai4pa4", "verbs", "害怕", "hài pà", "Бояться");
addWord("ting1qi3lai2", "verbs", "听起来", "tīng qǐ lái", ["Звучать", "Звучать как", "Казаться"]);
addWord("wang4", "verbs", "忘", "wàng", "Забыть");
addWord("na2", "verbs", "拿", "ná", "Держать");
addWord("nan2guo4", "verbs", "难过", "nán guò", ["Огорчаться", "Расстраиваться"]);
addWord("san4bu4", "verbs", "散步", "sàn bù", "Гулять");
addWord("qi1dai4", "verbs", "期待", "qī dài", "Ожидать");
addWord("diu1", "verbs", "丟", "diū", "Потерять");
addWord("zhao3", "verbs", "找", "zhǎo", ["Искать", "Находить"]);
addWord("xiu1", "verbs", "修", "xiū", ["Чинить", "Ремонтировать"]);
addWord("jue2de2", "verbs", "觉得", "jué dé", ["Чувствовать", "Считать"]);
addWord("kai1", "verbs", "开", "kāi", ["Начинать", "Открывать"]);
addWord("guan1", "verbs", "关", "guān", "Закрывать");
addWord("hao3xiang4", "verbs", "好像", "hǎo xiàng", "Кажется");

addWord("xiao3", "adjectives", "小", "xiǎo", "Маленький");
addWord("da4", "adjectives", "大", "dà", "Большой");
addWord("duan3", "adjectives", "短", "duǎn", "Короткий");
addWord("chang2", "adjectives", "长", "cháng", "Длинный");
addWord("duo1", "adjectives", "多", "duō", "Много");
addWord("shao3", "adjectives", "少", "shǎo", "Мало");
addWord("zui4", "adjectives", "最", "zuì", "Самый");
addWord("te4bie2", "adjectives", "特别", "tè bié", ["Особенный", "Особенно"]);
addWord("hen3", "adjectives", "很", "hěn", "Очень");
addWord("fei1chang2", "adjectives", "非常", "fēi cháng", "Очень");
addWord("ting3de", "adjectives", "挺的", "tǐng de", "Очень");
addWord("tai4le", "adjectives", "太了", "tài le", "Слишком");
addWord("hao3", "adjectives", "好", "hǎo", ["Хорошо", "Хороший"]);
addWord("cha1", "adjectives", "差", "chā", ["Плохо", "Плохой"])
addWord("qing1", "adjectives", "轻", "qīng", "Лёгкий");
addWord("zhong4", "adjectives", "重", "zhòng", "Тяжёлый");
addWord("kai1xin1", "adjectives", "开心", "kāi xīn", "Весёлый");
addWord("gao1xing4", "adjectives", "高兴", "gāo xìng ", "Радостный");
addWord("kai1lang3", "adjectives", "开朗", "kāi lǎng ", "Жизнерадостный");
addWord("lang4man4", "adjectives", "浪漫", "làng màn", "Романтичный");
addWord("gan3ren2", "adjectives", "感人", "gǎn rén", "Трогательный");
addWord("cong1ming2", "adjectives", "聪明", "cōng míng", "Умный");
addWord("xing4yun4", "adjectives", "幸运", "xìng yùn", "Везучий");
addWord("xing4fu2", "adjectives", "幸福", "xìng fú", "Счастливый");
addWord("qing1chu3", "adjectives", "清楚", "qīng chǔ", ["Ясный", "Ясно"]);
addWord("bang4", "adjectives", "棒", "bàng", ["Классный", "Крутой", "Отличный"]);
addWord("jing1cai3", "adjectives", "精彩", "jīng cǎi", "Замечательный", "Чудесный");
addWord("li4hai4", "adjectives", "厉害", "lì hài", ["Впечатляющий", "Невероятный"]);
addWord("you3qu4", "adjectives", "有趣", "yǒu qù", "Интересный");
addWord("wu2liao2", "adjectives", "无聊", "wú liáo", "Скучный");
addWord("yan2ge2", "adjectives", "严格", "yán gé", "Строгий");

addWord("jiao4_1", "talking", "叫", "jiào", "Звать");
addWord("ting1", "talking", "听", "tīng", "Слушать");
addWord("shuo1", "talking", "说", "shuō", "Говорить");
addWord("jue2de", "talking", "觉得", "jué de", "Предполагать");
addWord("shuo1hua4", "talking", "说话", "shuō huà", "Разговаривать");
addWord("gao4su4", "talking", "告诉", "gào sù", "Сообщить");
addWord("ren4shi2", "talking", "认识", "rèn shí", ["Знать", "Быть знакомым"]);
addWord("jie4shao4", "talking", "介绍", "jiè shào", ["Знакомить", "Представлять"]);
addWord("jie1", "talking", "接", "jiē", "Отвечать на телефонный звонок");
addWord("qing3", "talking", "请", "qǐng", "Просить");
addWord("wen4ti2", "talking", "问题", "wèn tí", "Вопрос");
addWord("qing3wen4", "talking", "请问", "qǐng wèn", "Можно спросить?");
addWord("na3yi1wei4", "talking", "哪一位", "nǎ yī wèi", "С кем я говорю?");
addWord("ni3hao3", "talking", "你好", "nǐ hǎo", "Привет");
addWord("hai1", "talking", "嗨", "hāi", "Привет");
addWord("nin2hao3", "talking", "您好", "nín hǎo", "Здравствуйте");
addWord("zai4jian4", "talking", "再见", "zài jiàn", ["До свидания", "Пока"]);
addWord("dui4bu4qi3", "talking", "对不起", "duì bù qǐ", "Извините");
addWord("mei2guan1xi4", "talking", "没关系", "méi guān xì", "Ничего страшного");
addWord("xie4xie4", "talking", "谢谢", "xiè xiè", "Спасибо");
addWord("bu2yong4xie4", "talking", "不用谢", "bú yòng xiè", "Пожалуйста");
addWord("bu2ke4qi4", "talking", "不客气", "bú kè qì", "Всегда пожалуйста");
addWord("mei2wen4ti2", "talking", "没问题", "méi wèn tí", "Без проблем");
addWord("bu2cuo4", "talking", "不错", "bú cuò", "Всё хорошо");
addWord("guan1xi4", "talking", "关系", "guān xì", "Отношение");
addWord("liao2tian1", "talking", "聊天", "liáo tiān", ["Разговаривать", "Болтать", "Болтовня"]);
addWord("jian4yi4", "talking", "建议", "jiàn yì", ["Предложение", "Совет"]);

addWord("xue2xiao4", "school", "学校", "xué xiào", "Школа");
addWord("da4xue2", "school", "大学", "dà xué", "Университет");
addWord("shang4xue2", "school", "上学", "shàng xué", "Ходить в школу");
addWord("fang4xue2", "school", "放学", "fàng xué", "Заканчивать занятия");
addWord("nian2ji2", "school", "年级", "nián jí", "Класс обучения");
addWord("xue2qi1", "school", "学期", "xué qī", "Семестр");
addWord("xiao4fu2", "school", "校服", "xiào fú", "Школьная форма");
addWord("nan2sheng1", "school", "男生", "nán shēng", "Ученик");
addWord("nu3sheng1", "school", "女生", "nǚ shēng", "Ученица");
addWord("xiao3xue2sheng1", "school", "小学生", "xiǎo xué shēng", "Ученик начальной школы");
addWord("zhong1xue2sheng1", "school", "中学生", "zhōng xué shēng", "Ученик средней школы");
addWord("gao1zhong2sheng1", "school", "高中生", "gāo zhōng shēng", "Ученик старшей школы");
addWord("da4xue2sheng1", "school", "大学生", "dà xué shēng", "Студент");
addWord("tong2xue2", "school", "同学", "tóng xué", "Одноклассник");
addWord("peng2you3", "school", "朋友", "péng yǒu", "Друг");
addWord("ban1", "school", "班", "bān", "Класс (люди)");
addWord("zuo4ye4", "school", "作业", "zuò yè", "Домашнее задание");
addWord("han4yu3", "school", "汉语", "hàn yǔ", "Китайский язык");
addWord("ying1yu3", "school", "英语", "yīng yǔ", "Английский язык");
addWord("shu4xue2", "school", "数学", "shù xué", "Математика");
addWord("ke1xue2", "school", "科学", "kē xué", ["Окружающий мир", "Наука"]);
addWord("mei3shu4", "school", "美术", "měi shù", "ИЗО");
addWord("ti3yu4", "school", "体育", "tǐ yù", "Физкультура");
addWord("yin1yue4", "school", "音乐", "yīn yuè", "Музыка");
addWord("e2yu3", "school", "俄语", "é yǔ", "Русский язык");
addWord("li4shi3", "school", "历史", "lì shǐ", "История");
addWord("di4li3", "school", "地理", "dì lǐ", "География");
addWord("sheng1wu4", "school", "生物", "shēng wù", "Биология");
addWord("wu4li3", "school", "物理", "wù lǐ", "Физика");
addWord("hua4xue2", "school", "化学", "huà xué", "Химия");
addWord("xi4ju4", "school", "戏剧", "xì jù", "Театральный кружок");
addWord("shu1fa3", "school", "书法", "shū fǎ", "Каллиграфия");
addWord("cao1chang3", "school", "操场", "cāo chǎng", "Спортивная площадка");
addWord("li3tang2", "school", "礼堂", "lǐ táng", "Актовый зал");
addWord("ti3yu4guan3", "school", "体育馆", "tǐ yù guǎn", "Спортзал");
addWord("jian4shen1fang2", "school", "健身房", "jiàn shēn fáng", "Тренажёрный зал");
addWord("tu2shu1guan3", "school", "图书馆", "tú shū guǎn", "Библиотека");
addWord("jiao4shi4", "school", "教室", "jiào shì", "Аудитория");
addWord("lou2", "school", "楼", "lóu", "Этаж");
addWord("mei3shu4shi4", "school", "美术室", "měi shù shì", "Кабинет ИЗО");
addWord("yin1yue4shi4", "school", "音乐室", "yīn yuè shì", "Кабинет музыки");
addWord("you2yong3chi2", "school", "游泳池", "yóu yǒng chí", "Бассейн");
addWord("xiao3mai4bu4", "school", "小卖部", "xiǎo mài bù", "Буфет");
addWord("shu1bao1", "school", "书包", "shū bāo", "Портфель");
addWord("ben3zi", "school", "本子", "běn zi", "Тетрадь");
addWord("ri4ji4ben3", "school", "日记本", "rì jì běn", "Дневник");
addWord("wen2ju4he2", "school", "文具盒", "wén jù hé", "Пенал");
addWord("ke4ben3", "school", "课本", "kè běn", "Учебник");
addWord("lian4xi2ben3", "school", "练习本", "liàn xí běn", "Рабочая тетрадь");
addWord("cai3se4bi3", "school", "彩色笔", "cǎi sè bǐ", "Цветной карандаш");
addWord("cuo4", "school", "错", "cuò", "Ошибка");
addWord("mei2cuo4", "school", "没错", "méi cuò", "Нет ошибок");
addWord("da2an4", "school", "答案", "dá àn", "Ответ");
addWord("cheng2ji4", "school", "成绩", "chéng jì", "Оценка");
addWord("kao3shi4", "school", "考试", "kǎo shì", "Экзамен");
addWord("tong1guo4", "school", "通过", "tōng guò", "Сдать экзамен");
addWord("jiao4_2", "school", "教", "jiào", "Преподавать");
addWord("fu4xi", "school", "复习", "fù xí", ["Повторять", "Запоминать"]);
addWord("huo2dong4", "school", "活动", "huó dòng", "Мероприятие");
addWord("wan3hui4", "school", "晚会", "wǎn huì", "Вечеринка");

addWord("qian1bi3", "office_supplies", "铅笔", "qiān bǐ", "Карандаш");
addWord("la4bi3", "office_supplies", "蜡笔", "là bǐ", "Восковой мелок");
addWord("chi3zi", "office_supplies", "尺子", "chǐ zi", "Линейка");
addWord("xiang4pi2", "office_supplies", "橡皮", "xiàng pí", "Ластик");
addWord("juan3bi3dao1", "office_supplies", "卷笔刀", "juǎn bǐ dāo", "Точилка");
addWord("jian3dao1", "office_supplies", "剪刀", "jiǎn dāo", "Ножницы");
addWord("gu4ti3jiao1", "office_supplies", "固体胶", "gù tǐ jiāo", "Клей-карандаш");
addWord("jiao1shui3", "office_supplies", "胶水", "jiāo shuǐ", "Жидкий клей");

addWord("chuan1", "clothes", "穿", "chuān", "Надевать");
addWord("dai4_2", "clothes", "戴", "dài", "Надевать аксессуары");
addWord("chen4shan1", "clothes", "衬衫", "chèn shān", "Рубашка");
addWord("han4shan1", "clothes", "汗衫", "hàn shān", "Футболка");
addWord("qun2zi", "clothes", "裙子", "qún zi", "Юбка");
addWord("lian2yi1qun2", "clothes", "连衣裙", "lián yī qún", "Платье");
addWord("ku4zi", "clothes", "裤子", "kù zi", "Брюки");
addWord("niu2zai3ku4", "clothes", "牛仔裤", "niú zǎi kù", "Джинсы");
addWord("mao2yi1", "clothes", "毛衣", "máo yī", "Свитер");
addWord("da4yi1", "clothes", "大衣", "dà yī", "Пальто");
addWord("wai4tao4", "clothes", "外套", "wài tào", "Куртка");
addWord("xie2zi", "clothes", "鞋子", "xié zi", "Обувь");
addWord("xue1zi", "clothes", "靴子", "xuē zi", "Сапог");
addWord("mao4zi", "clothes", "帽子", "mào zi", "Шапка");
addWord("wei2jin1", "clothes", "围巾", "wéi jīn", "Шарф");
addWord("shou3tao4", "clothes", "手套", "shǒu tào", "Перчатки");
addWord("yan3jing4", "clothes", "眼镜", "yǎn jìng", "Очки");

addWord("tou2", "appearance", "头", "tóu", "Голова");
addWord("nao3", "appearance", "脑", "nǎo", "Мозг");
addWord("lian3", "appearance", "脸", "liǎn", "Лицо");
addWord("yan3jing1", "appearance", "眼睛", "yǎn jīng", "Глаза");
addWord("bi2zi", "appearance", "鼻子", "bí zi", "Нос");
addWord("zui3ba1", "appearance", "嘴巴", "zuǐ bā", "Рот");
addWord("ya2chi3", "appearance", "牙齿", "yá chǐ", "Зубы");
addWord("er3duo3", "appearance", "耳朵", "ěr duǒ", "Ухо");
addWord("tou2fa1", "appearance", "头发", "tóu fā", "Волосы");
addWord("shou3", "appearance", "手", "shǒu", "Рука");
addWord("shou3zhi3", "appearance", "手指", "shǒu zhǐ", "Палец");
addWord("du4zi", "appearance", "肚子", "dù zi", "Живот");
addWord("tui3", "appearance", "腿", "tuǐ", "Нога");
addWord("jiao3", "appearance", "脚", "jiǎo", "Ступня");
addWord("shou4", "appearance", "瘦", "shòu", "Худой");
addWord("pang4", "appearance", "胖", "pàng", "Толстый");
addWord("ge4zi", "appearance", "个子", "gè zi", "Рост");
addWord("nian2ling2", "appearance", "年龄", "nián líng", "Возраст");
addWord("xing4ge2", "appearance", "性格", "xìng gé", "Характер");
addWord("ai3", "appearance", "矮", "ǎi", "Низкий");
addWord("gao1", "appearance", "高", "gāo", "Высокий");
addWord("yuan2_1", "appearance", "圆", "yuán", "Круглый");
addWord("piao4liang", "appearance", "漂亮", "piào liang", "Красивый");
addWord("shuai4", "appearance", "帅", "shuài", "Красивый");
addWord("ke3ai4", "appearance", "可爱", "kě ài", "Милый");
addWord("nian2qing1", "appearance", "年轻", "nián qīng", "Молодой");
addWord("shan4liang2", "appearance", "善良", "shàn liáng", "Добрый");
addWord("ke3pa4", "appearance", "可怕", "kě pà", "Страшный");
addWord("kun4", "appearance", "困", "kùn", "Сонный");
addWord("xiang4", "appearance", "像", "xiàng", "Быть похожим");

addWord("jian4kang1", "health", "健康", "jiàn kāng", "Здоровье");
addWord("sheng1bing4", "health", "生病", "shēng bìng", ["Заболеть", "Болезнь"]);
addWord("fa1shao1", "health", "发烧", "fā shāo", ["Иметь температуру", "Иметь жар"]);
addWord("ke2sou", "health", "咳嗽", "ké sou", "Иметь кашель");
addWord("tou2tong4", "health", "头痛", "tóu tòng", "Болит голова");
addWord("yan3jing1teng2", "health", "眼睛疼", "yǎn jīng téng", "Болят глаза");
addWord("sang3ziteng2", "health", "嗓子疼", "sǎng zi téng", "Болит горло");
addWord("du4ziteng2", "health", "肚子疼", "dù zi téng", "Болит живот");
addWord("jiao3teng2", "health", "脚疼", "jiǎo téng", "Болит нога");
addWord("shou3teng2", "health", "手疼", "shǒu téng", "Болит рука");
addWord("gan3mao4", "health", "感冒", "gǎn mào", "Простудиться");
addWord("yao4_2", "health", "药", "yào", "Таблетки");
addWord("yi1sheng1", "health", "医生", "yī shēng", "Доктор");
addWord("yi1yuan4", "health", "医院", "yī yuàn", "Больница");
addWord("zhu4yuan4", "health", "住院", "zhù yuàn", "Лежать в больнице");
addWord("chu1yuan4", "health", "出院", "chū yuàn", "Выписываться из больницы");
addWord("shu1fu2", "health", "舒服", "shū fú", ["Комфортный", "Приятный"]);

addWord("hua1", "nature", "花", "huā", "Цветок");
addWord("shu4", "nature", "树", "shù", "Дерево");
addWord("mei2gui1", "nature", "玫瑰", "méi guī", "Роза");
addWord("hua1yuan2", "nature", "花园", "huā yuán", "Сад");
addWord("he2_2", "nature", "河", "hé", "Река");

addWord("dong4wu4", "animals", "动物", "dòng wù", "Животные");
addWord("chong3wu4", "animals", "宠物", "chǒng wù", "Домашние животные");
addWord("dong4wu4yuan2", "animals", "动物园", "dòng wù yuán", "Зоопарк");
addWord("mao1", "animals", "猫", "māo", "Кошка");
addWord("gou3", "animals", "狗", "gǒu", "Собака");
addWord("tu4zi", "animals", "兔子", "tù zi", "Кролик");
addWord("niu2", "animals", "牛", "niú", "Корова");
addWord("yang2", "animals", "羊", "yáng", "Овца");
addWord("ji1", "animals", "鸡", "jī", "Курица");
addWord("zhu1", "animals", "猪", "zhū", "Свинья");
addWord("ma3", "animals", "马", "mǎ", "Лошадь");
addWord("niao3", "animals", "鸟", "niǎo", "Птица");
addWord("yu2", "animals", "鱼", "yú", "Рыба");
addWord("shi1zi", "animals", "狮子", "shī zi", "Лев");
addWord("lao3hu3", "animals", "老虎", "lǎo hǔ", "Тигр");
addWord("da4xiang4", "animals", "大象", "dà xiàng", "Слон");
addWord("wu1gui1", "animals", "乌龟", "wū guī", "Черепаха");
addWord("xiong2", "animals", "熊", "xióng", "Медведь");
addWord("zhi1zhu1", "animals", "蜘蛛", "zhī zhū", "Паук");
addWord("she2", "animals", "蛇", "shé", "Змея");
addWord("hou2", "animals", "猴", "hóu", "Обезьяна");
addWord("shu3_1", "animals", "鼠", "shǔ", "Крыса");
addWord("xiong2mao1", "animals", "熊猫", "xióng māo", "Панда");
addWord("chang2jing3lu4", "animals", "长颈鹿", "cháng jǐng lù", "Жираф");
addWord("da4xing1xing1", "animals", "大猩猩", "dà xīng xīng", "Горилла");
addWord("he2ma3", "animals", "河马", "hé mǎ", "Бегемот");
addWord("ban1ma3", "animals", "斑马", "bān mǎ", "Зебра");
addWord("long2", "animals", "龙", "lóng", "Дракон");
addWord("yang3", "animals", "养", "yǎng", ["Выращивать", "Держать животных"]);

addWord("chi1", "food", "吃", "chī", ["Есть", "Кушать"]);
addWord("fan4", "food", "饭", "fàn", "Еда");
addWord("wei4dao4", "food", "味道", "wèi dào", "Вкус");
addWord("hao3chi1", "food", "好吃", "hǎo chī", "Вкусный");
addWord("nan2chi1", "food", "难吃", "nán chī", "Невкусный");
addWord("ku3", "food", "苦", "kǔ", "Горький");
addWord("la4", "food", "辣", "là", "Острый");
addWord("suan1", "food", "酸", "suān", "Кислый");
addWord("tian2", "food", "甜", "tián", "Сладкий");
addWord("kuai4can1", "food", "快餐", "kuài cān", "Фаст фуд");
addWord("re4gou3", "food", "热狗", "rè gǒu", "Хот дог");
addWord("han4bao3bao1", "food", "汉堡包", "hàn bǎo bāo", "Гамбургер");
addWord("ling2shi2", "food", "零食", "líng shí", "Закуски");
addWord("san1ming2zhi4", "food", "三明治", "sān míng zhì", "Сэндвич");
addWord("shu3tiao2", "food", "薯条", "shǔ tiáo", "Картошка фри");
addWord("shu3pian4", "food", "薯片", "shǔ piàn", "Чипсы");
addWord("mian4bao1", "food", "面包", "miàn bāo", "Хлеб");
addWord("qiao3ke4li4", "food", "巧克力", "qiǎo kè lì", "Шоколад");
addWord("bing1qi2lin2", "food", "冰淇淋", "bīng qí lín", "Мороженое");
addWord("tang2guo3", "food", "糖果", "táng guǒ", "Конфета");
addWord("mi3fan4", "food", "米饭", "mǐ fàn", "Варёный рис");
addWord("chao3fan4", "food", "炒饭", "chǎo fàn", "Жареный рис");
addWord("chao3cai4", "food", "炒菜", "chǎo cài", "Жареная еда");
addWord("ji1dan4", "food", "鸡蛋", "jī dàn", "Яйцо");
addWord("tang1", "food", "汤", "tāng", "Суп");
addWord("mian4tiao2", "food", "面条", "miàn tiáo", "Лапша");
addWord("niu2rou4", "food", "牛肉", "niú ròu", "Говядина");
addWord("yang2rou4", "food", "羊肉", "yáng ròu", "Баранина");
addWord("zhu1rou4", "food", "猪肉", "zhū ròu", "Свинина");
addWord("ji1rou4", "food", "鸡肉", "jī ròu", "Курятина");
addWord("yi4da4li4mian4", "food", "意大利面", "yì dà lì miàn", ["Макароны", "Спагетти"]);
addWord("xiang1chang2", "food", "香肠", "xiāng cháng", "Сосиски");
addWord("bi3sa4bing3", "food", "比萨饼", "bǐ sà bǐng", "Пицца");
addWord("yan2", "food", "盐", "yán", "Соль");
addWord("suan1nai3", "food", "酸奶", "suān nǎi", "Йогурт");
addWord("tian2dian3", "food", "甜点", "tián diǎn", "Десерт");
addWord("nai3you2", "food", "奶油", "nǎi yóu", "Крем");
addWord("shou4si1", "food", "寿司", "shòu sī", "Суши");
addWord("kuai4zi", "food", "筷子", "kuài zi", "Палочки для еды");
addWord("guo3jiang4", "food", "果酱", "guǒ jiàng", "Джем");
addWord("jin1", "food", "斤", "jīn", ["Полкило", "Полкилограмма"]);

addWord("shui3guo3", "fruits_and_vegetables", "水果", "shuǐ guǒ", "Фрукты");
addWord("ping2guo3", "fruits_and_vegetables", "苹果", "píng guǒ", "Яблоко");
addWord("xiang1jiao1", "fruits_and_vegetables", "香蕉", "xiāng jiāo", "Банан");
addWord("cheng2zi", "fruits_and_vegetables", "橙子", "chéng zi", "Апельсин");
addWord("cao3mei2", "fruits_and_vegetables", "草莓", "cǎo méi", "Клубника");
addWord("ning2meng2", "fruits_and_vegetables", "柠檬", "níng méng", "Лимон");
addWord("pu2tao", "fruits_and_vegetables", "葡萄", "pú tao", "Виноград");
addWord("xi1gua1", "fruits_and_vegetables", "西瓜", "xī guā", "Арбуз");
addWord("shu1cai4", "fruits_and_vegetables", "蔬菜", "shū cài", "Овощи");
addWord("hu2luo2bo", "fruits_and_vegetables", "胡萝卜", "hú luó bo", "Морковь");
addWord("huang2gua1", "fruits_and_vegetables", "黄瓜", "huáng guā", "Огурец");
addWord("xi1hong2shi4", "fruits_and_vegetables", "西红柿", "xī hóng shì", "Помидор");
addWord("tu3dou4", "fruits_and_vegetables", "土豆", "tǔ dòu", "Картошка");
addWord("luo4bo", "fruits_and_vegetables", "萝卜", "luó bo", "Редиска");
addWord("yang2cong1", "fruits_and_vegetables", "洋葱", "yáng cōng", "Лук");
addWord("yu4mi3", "fruits_and_vegetables", "玉米", "yù mǐ", "Кукуруза");
addWord("qing1cai4", "fruits_and_vegetables", "青菜", "qīng cài", "Салатные листья");
addWord("bai2cai4", "fruits_and_vegetables", "白菜", "bái cài", "Китайская капуста");
addWord("la4jiao1", "fruits_and_vegetables", "辣椒", "là jiāo", "Перец чили");
addWord("xin1xian1", "fruits_and_vegetables", "新鲜", "xīn xiān", "Свежий");
addWord("cui4", "fruits_and_vegetables", "脆", "cuì", "Хрустящий");

addWord("he1", "drinks", "喝", "hē", "Пить");
addWord("hao3he1", "drinks", "好喝", "hǎo hē", "Вкусный");
addWord("yin3liao4", "drinks", "饮料", "yǐn liào", "Напиток");
addWord("bei1zi", "drinks", "杯子", "bēi zi", ["Стакан", "Кружка"]);
addWord("shui3", "drinks", "水", "shuǐ", "Вода");
addWord("cha2", "drinks", "茶", "chá", "Чай");
addWord("ka1fei1", "drinks", "咖啡", "kā fēi", "Кофе");
addWord("niu2nai3", "drinks", "牛奶", "niú nǎi", "Молоко");
addWord("guo3zhi1", "drinks", "果汁", "guǒ zhī", "Сок");
addWord("ke3le4", "drinks", "可乐", "kě lè", "Кока-кола");
addWord("pi2jiu3", "drinks", "啤酒", "pí jiǔ", "Пиво");

addWord("zhu4", "interior", "住", "zhù", "Жить");
addWord("lu4", "interior", "路", "lù", ["Улица", "Дорога"]);
addWord("fang2zi", "interior", "房子", "fáng zi", "Дом");
addWord("gong1yu4", "interior", "公寓", "gōng yù", "Квартира");
addWord("men2", "interior", "门", "mén", ["Дверь", "Ворота", "Вход"]);
addWord("dian4hua4", "interior", "电话", "diàn huà", "Телефон");
addWord("shou3ji1", "interior", "手机", "shǒu jī", "Мобильный телефон");
addWord("hao4ma3", "interior", "号码", "hào mǎ", "Номер");
addWord("fang2jian1", "interior", "房间", "fáng jiān", "Комната");
addWord("wo4shi4", "interior", "卧室", "wò shì", "Спальня");
addWord("ke4ting1", "interior", "客厅", "kè tīng", "Гостиная");
addWord("yu4shi4", "interior", "浴室", "yù shì", "Ванная");
addWord("chu2fang2", "interior", "厨房", "chú fáng", "Кухня");
addWord("shu1fang2", "interior", "书房", "shū fáng", "Кабинет");
addWord("ce4suo3", "interior", "厕所", "cè suǒ", "Туалет");
addWord("yang2tai2", "interior", "阳台", "yáng tái", "Балкон");
addWord("can1ting1", "interior", "餐厅", "cān tīng", "Столовая");
addWord("yi1gui4", "interior", "衣柜", "yī guì", ["Шкаф", "Гардероб"]);
addWord("chuang2", "interior", "床", "chuáng", "Кровать");
addWord("zhuo1zi", "interior", "桌子", "zhuō zi", "Стол");
addWord("yi3zi", "interior", "椅子", "yǐ zi", "Стул");
addWord("dian4nao3", "interior", "电脑", "diàn nǎo", "Компьютер");
addWord("dian4shi4", "interior", "电视", "diàn shì", "Телевизор");
addWord("sha1fa1", "interior", "沙发", "shā fā", "Диван");
addWord("shu1jia4", "interior", "书架", "shū jià", "Книжная полка");
addWord("chuang2tou2gui4", "interior", "床头柜", "chuáng tóu guì", "Тумбочка");
addWord("kong1tiao2", "interior", "空调", "kōng tiáo", "Кондиционер");
addWord("tai2deng1", "interior", "台灯", "tái dēng", "Настольная лампа");
addWord("bing1xiang1", "interior", "冰箱", "bīng xiāng", "Холодильник");

addWord("ren2", "family", "人", "rén", "Человек");
addWord("jia1", "family", "家", "jiā", ["Дом", "Семья"]);
addWord("jia1ren2", "family", "家人", "jiā rén", "Член семьи");
addWord("ma1ma1", "family", "妈妈", "mā mā", "Мама");
addWord("ba4ba4", "family", "爸爸", "bà bà", "Папа");
addWord("nai3nai3", "family", "奶奶", "nǎi nǎi", "Бабушка со стороны папы");
addWord("wai4po2", "family", "外婆", "wài pó", "Бабушка со стороны мамы");
addWord("ye2ye2", "family", "爷爷", "yé yé", "Дедушка со стороны папы");
addWord("wai4gong1", "family", "外公", "wài gōng", "Дедушка со стороны мамы");
addWord("mei4mei4", "family", "妹妹", "mèi mèi", "Младшая сестра");
addWord("jie3jie3", "family", "姐姐", "jiě jiě", "Старшая сестра");
addWord("jie3mei4", "family", "姐妹", "jiě mèi", "Сёстры");
addWord("biao3mei4", "family", "表妹", "biǎo mèi", "Двоюродная младшая сестра");
addWord("biao3jie3", "family", "表姐", "biǎo jiě", "Двоюродная старшая сестра");
addWord("di4di4", "family", "弟弟", "dì dì", "Младший брат");
addWord("ge1ge1", "family", "哥哥", "gē gē", "Старший брат");
addWord("xiong1di4", "family", "弟们", "xiōng dì", "Братья");
addWord("biao3di4", "family", "表弟", "biǎo dì", "Двоюродный младший брат");
addWord("biao3ge1", "family", "表哥", "biǎo gē", "Двоюродный старший брат");
addWord("xiao3jie3", "family", "小姐", "xiǎo jiě", "Девушка");
addWord("xian1sheng", "family", "先生", "xiān sheng", "Мужчина");
addWord("yi4ma1", "family", "姨妈", "yí mā", "Тётя со стороны мамы");
addWord("jiu4jiu4", "family", "舅舅", "jiù jiù", "Дядя со стороны мамы");
addWord("shu1shu1", "family", "叔叔", "shū shū", "Дядя со стороны папы");

addWord("sheng1ri4", "personal_info", "生日", "shēng rì", "День рождения");
addWord("chu1sheng1", "personal_info", "出生", "chū shēng", "Родиться");
addWord("shu3_2", "personal_info", "属", "shǔ", "Родиться (знаки зодиака)");

addWord("qi3chuang1", "schedule", "起床", "qǐ chuáng", "Вставать с кровати");
addWord("xi3zao3", "schedule", "洗澡", "xǐ zǎo", ["Принимать душ", "Принимать ванну"]);
addWord("xi3lian3", "schedule", "洗脸", "xǐ liǎn", "Умываться");
addWord("xi3shou3", "schedule", "洗手", "xǐ shǒu", "Мыть руки");
addWord("shua1ya2", "schedule", "刷牙", "shuā yá", "Чистить зубы");
addWord("zao3fan4", "schedule", "早饭", "zǎo fàn", "Завтрак");
addWord("wu3fan4", "schedule", "午饭", "wǔ fàn", "Обед");
addWord("wan3fan4", "schedule", "晚饭", "wǎn fàn", "Ужин");
addWord("shui4jiao4", "schedule", "睡觉", "shuì jiào", "Спать");

addWord("shi2jian1", "time", "时间", "shí jiān", "Время");
addWord("ri4", "time", "日", "rì", "День");
addWord("hao4", "time", "号", "hào", ["Число", "День"]);
addWord("xing1qi1", "time", "星期", "xīng qī", "Неделя");
addWord("yue4", "time", "月", "yuè", "Месяц");
addWord("nian2", "time", "年", "nián", "Год");
addWord("qu4nian2", "time", "去年", "qù nián", "Прошлый год");
addWord("ming2nian2", "time", "明年", "míng nián", "Следующий год");
addWord("jin1tian1", "time", "今天", "jīn tiān", "Сегодня");
addWord("zuo2tian1", "time", "昨天", "zuó tiān", "Вчера");
addWord("ming2tian1", "time", "明天", "míng tiān", "Завтра");
addWord("xian4zai4", "time", "现在", "xiàn zài", "Сейчас");
addWord("dian3", "time", "点", "diǎn", ["Час", "Заказывать"]);
addWord("fen1", "time", "分", "fēn", "Минута");
addWord("ke4", "time", "刻", "kè", ["15 минут", "Четверть часа"]);
addWord("ban4", "time", "半", "bàn", ["30 минут", "Полчаса"]);
addWord("zao3shang4", "time", "早上", "zǎo shàng", "Утро");
addWord("shang4wu3", "time", "上午", "shàng wǔ", ["Первая половина дня", "Утро"]);
addWord("zhong1wu3", "time", "中午", "zhōng wǔ", "Полдень");
addWord("xia4wu3", "time", "下午", "xià wǔ", ["Вторая половина дня", "День"]);
addWord("wan3shang4", "time", "晚上", "wǎn shàng", "Вечер");
addWord("ling2chen2", "time", "凌晨", "líng chén", "Ночь");
addWord("xiao3shi2hou4", "time", "小时候", "xiǎo shí hòu", "Детство");
addWord("mei3tian1", "time", "每天", "měi tiān", "Каждый день");
addWord("yi1huir4", "time", "一会儿", "yī huìr", "Недолго");
addWord("cong2lai2", "time", "从来", "cóng lái", "Никогда");
addWord("you3shi2hou", "time", "有时候", "yǒu shí hou", "Иногда");
addWord("chang2chang2", "time", "常常", "cháng cháng", "Часто");
addWord("yi1ban1", "time", "一般", "yī bān", "Обычно");
addWord("ping2shi2", "time", "平时", "píng shí", "Обычно");
addWord("zui4jin4", "time", "最近", "zuì jìn", "В последнее время");
addWord("yi3jing1", "time", "已经", "yǐ jīng", "Уже");
addWord("gang1gang1", "time", "刚刚", "gāng gāng", "Только что");
addWord("ye3xu3", "time", "也许", "yě xǔ", "Возможно");

addWord("tian1qi4", "weather", "天气", "tiān qì", "Погода");
addWord("leng3", "weather", "冷", "lěng", "Холодно");
addWord("re4", "weather", "热", "rè", ["Жарко", "Горячо"]);
addWord("qing2tian1", "weather", "晴天", "qíng tiān", "Солнечно");
addWord("yin1tian1", "weather", "阴天", "yīn tiān", "Пасмурно");
addWord("duo1yun2", "weather", "多云", "duō yún", "Облачно");
addWord("gua1feng1", "weather", "刮风", "guā fēng", "Дует ветер");
addWord("gua1tai2feng1", "weather", "刮台风", "guā tái fēng", "Тайфун");
addWord("xia4mao2mao2yu3", "weather", "下毛毛雨", "xià máo máo yǔ", "Моросит");
addWord("xia4xiao3yu3", "weather", "下小雨", "xià xiǎo yǔ", "Идёт небольшой дождь");
addWord("xia4yu3", "weather", "下雨", "xià yǔ", "Идёт дождь");
addWord("xia4xue3", "weather", "下雪", "xià xuě", "Идёт снег");
addWord("qi4wen1", "weather", "气温", "qì wēn", "Температура воздуха");
addWord("du4", "weather", "度", "dù", "Градус");
addWord("ling2shang4", "weather", "零上", "líng shàng", "Выше нуля");
addWord("ling2xia4", "weather", "零下", "líng xià", "Ниже нуля");
addWord("ji4jie2", "weather", "季节", "jì jié", ["Сезон", "Время года"]);
addWord("dong1tian1", "weather", "冬天", "dōng tiān", "Зима");
addWord("chun1tian1", "weather", "春天", "chūn tiān", "Весна");
addWord("xia4tian1", "weather", "夏天", "xià tiān", "Лето");
addWord("qiu1tian1", "weather", "秋天", "qiū tiān", "Осень");

addWord("qi2", "transport", "骑", "qí", "Кататься");
addWord("ting2", "transport", "停", "tíng", "Останавливать");
addWord("che1", "transport", "车", "chē", "Машина");
addWord("kai1che1", "transport", "开车", "kāi chē", "Водить машину");
addWord("zi4xing2che1", "transport", "自行车", "zì xíng chē", "Велосипед");
addWord("fei1ji1", "transport", "飞机", "fēi jī", "Самолёт");
addWord("chu1zu1che1", "transport", "出租车", "chū zū chē", "Такси");
addWord("da3che1", "transport", "打车", "dǎ chē", "Заказать такси");
addWord("du4chuan2", "transport", "渡船", "dù chuán", "Катер");
addWord("di4tie3", "transport", "地铁", "dì tiě", "Метро");
addWord("dian4che1", "transport", "电车", "diàn chē", "Трамвай");
addWord("gong1gong4qi4che1", "transport", "公共汽车", "gōng gòng qì chē", "Автобус");
addWord("xiao4che1", "transport", "校车", "xiào chē", "Школьный автобус");
addWord("huo3che1", "transport", "火车", "huǒ chē", "Поезд");
addWord("huo3che1zhan4", "transport", "火车站", "huǒ chē zhàn", "Железнодорожный вокзал");

addWord("di4fang1", "travelling", "地方", "dì fāng", "Место");
addWord("shi4zhong1xin1", "travelling", "市中心", "shì zhōng xīn", "Центр города");
addWord("fan4dian4", "travelling", "饭店", "fàn diàn", ["Ресторан", "Отель", "Гостиница"]);
addWord("jiu3dian4", "travelling", "酒店", "jiǔ diàn", "Отель");
addWord("ka1fei1guan3", "travelling", "咖啡馆", "kā fēi guǎn", "Кафе");
addWord("jiu3ba1", "travelling", "酒吧", "jiǔ bā", "Бар");
addWord("bo2wu4guan3", "travelling", "博物馆", "bó wù guǎn", "Музей");
addWord("huar4", "travelling", "画儿", "huàr", "Картина");
addWord("hua4zhan3", "travelling", "画展", "huà zhǎn", "Выставка");
addWord("hai3", "travelling", "海", "hǎi", "Море");
addWord("hai3tan1", "travelling", "海滩", "hǎi tān", "Пляж");
addWord("feng1jing3", "travelling", "风景", "fēng jǐng", "Пейзаж");
addWord("chang2cheng2", "travelling", "长城", "cháng chéng", "Великая Китайская стена");
addWord("shan1", "travelling", "山", "shān", "Гора");
addWord("pa2shan1", "travelling", "爬山", "pá shān", "Подниматься на гору");
addWord("shan1ding3", "travelling", "山顶", "shān dǐng", "Вершина горы");
addWord("xiang1ji1", "travelling", "相机", "xiāng jī", "Камера");
addWord("zhao4pian4", "travelling", "照片", "zhào piàn", "Фотография");
addWord("pai1zhao4pian4", "travelling", "拍照片", "pāi zhào piàn", "Снимать фотографию");
addWord("you2le4chang3", "travelling", "游乐场", "yóu lè chǎng", "Парк аттракционов");
addWord("huan2jing4", "travelling", "环境", "huán jìng", ["Окружающая среда", "Окружение", "Обстановка"]);
addWord("ting2che1chang3", "travelling", "停车场", "tíng chē chǎng", "Парковка");
addWord("bao1", "travelling", "包", "bāo", "Сумка");
addWord("bei4bao1", "travelling", "背包", "bèi bāo", "Рюкзак");
addWord("gong1li3", "travelling", "公里", "gōng lǐ", "Километр");

addWord("e2luo2si1", "countries", "俄罗斯", "é luó sī", "Россия");
addWord("zhong1guo2", "countries", "中国", "zhōng guó", "Китай");
addWord("mei3guo2", "countries", "美国", "měi guó", "Америка");
addWord("ying1guo2", "countries", "英国", "yīng guó", "Англия");
addWord("ri4ben3", "countries", "日本", "rì běn", "Япония");
addWord("han2guo2", "countries", "韩国", "hán guó", "Корея");
addWord("ao4da4li4ya4", "countries", "澳大利亚", "ào dà lì yà", "Австралия");
addWord("fa3guo2", "countries", "法国", "fǎ guó", "Франция");
addWord("yi4da4li4", "countries", "意大利", "yì dà lì", "Италия");
addWord("xi1ban1ya2", "countries", "西班牙", "xī bān yá", "Испания");
addWord("ou1zhou1", "countries", "欧洲", "ōu zhōu", "Европа");

addWord("shang1dian4", "shop", "商店", "shāng diàn", "Магазин");
addWord("cai4shi4chang3", "shop", "菜市场", "cài shì chǎng", "Рынок");
addWord("mai3", "shop", "买", "mǎi", "Покупать");
addWord("mai4", "shop", "卖", "mài", "Продавать");
addWord("dong1xi1", "shop", "东西", "dōng xī", ["Предмет", "Вещь"]);
addWord("qian2", "shop", "钱", "qián", "Деньги");
addWord("kuai4", "shop", "块", "kuài", ["Валюта", "Кусок"]);
addWord("yuan2_2", "shop", "元", "yuán", "Китайская валюта");
addWord("te4jia4", "shop", "特价", "tè jià", ["Специальное предложение", "Особая цена"]);
addWord("dai4_3", "shop", "袋", "dài", "Мешок");
addWord("su4liao4dai4", "shop", "塑料袋", "sù liào dài", "Пластиковый пакет");
addWord("bu2yong4le", "shop", "不用了", "bú yòng le", "Не нужно");
addWord("yi1dianr3", "shop", "一点儿", "yī diǎnr", "Немного");

addWord("gong1zuo4", "work", "工作", "gōng zuò", "Работать");
addWord("shang4ban1", "work", "上班", "shàng bān", "Идти на работу");
addWord("xia4ban1", "work", "下班", "xià bān", "Заканчивать работу");
addWord("zuo4zhe3", "work", "作者", "zuò zhě", "Автор");
addWord("yan3yuan2", "work", "演员", "yǎn yuán", "Актёр");
addWord("gong1cheng2shi1", "work", "工程师", "gōng chéng shī", "Инженер");
addWord("mian4shi4", "work", "面试", "miàn shì", "Собеседование");
addWord("shi2xi2", "work", "实习", "shí xí", "Стажировка");
addWord("lao3ban3", "work", "老板", "lǎo bǎn", "Босс");
addWord("jing1li3", "work", "经理", "jīng lǐ", "Менеджер");
addWord("kai1hui4", "work", "开会", "kāi huì", "Проводить совещание");
addWord("ban4gong1shi4", "work", "办公室", "bàn gōng shì", "Офис");

addWord("ai4hao3", "hobby", "爱好", "ài hǎo", "Хобби");
addWord("dian4ying3", "hobby", "电影", "diàn yǐng", "Фильм");
addWord("qiu2", "hobby", "球", "qiú", "Мяч");
addWord("ti1zu2qiu2", "hobby", "踢足球", "tī zú qiú", "Играть в футбол");
addWord("hua2bing1", "hobby", "滑冰", "huá bīng", "Кататься на коньках");
addWord("hua2xue3", "hobby", "滑雪", "huá xuě", "Кататься на лыжах");
addWord("tan2gang1qin2", "hobby", "弹钢琴", "tán gāng qín", "Играть на фортепиано");
addWord("la1xiao3ti2qin2", "hobby", "拉小提琴", "lā xiǎo tí qín", "Играть на скрипке");
addWord("tiao4wu3", "hobby", "跳舞", "tiào wǔ", "Танцевать");
addWord("chang4ge1", "hobby", "唱歌", "chàng gē", "Петь");
addWord("hua4huar4", "hobby", "画画儿", "huà huàr", "Рисовать");
addWord("wanr2", "hobby", "玩儿", "wánr", "Играть");
addWord("you2xi4", "hobby", "游戏", "yóu xì", "Игра");
addWord("diao4yu2", "hobby", "钓鱼", "diào yú", "Ловить рыбу");

addWord("yun4dong4", "sport", "运动", "yùn dòng", "Спорт");
addWord("jian4shen1", "sport", "健身", "jiàn shēn", "Тренироваться");
addWord("pao3bu4", "sport", "跑步", "pǎo bù", "Бегать");
addWord("you2yung3", "sport", "游泳", "yóu yǒng", "Плавать");
addWord("tiao4shui3", "sport", "跳水", "tiào shuǐ", "Прыжки в воду");
addWord("wang3qiu2", "sport", "网球", "wǎng qiú", "Теннис");
addWord("lan2qiu2", "sport", "篮球", "lán qiú", "Баскетбол");
addWord("pai2qiu2", "sport", "排球", "pái qiú", "Волейбол");
addWord("fen3si1", "sport", "粉丝", "fěn sī", "Фанат");
addWord("dui4", "sport", "队", "duì", "Команда");
addWord("can1jia1", "sport", "参加", "cān jiā", ["Участвовать", "Принимать участие"]);
addWord("bi3sai4", "sport", "比赛", "bǐ sài", "Соревнование");
addWord("ao4yun4hui4", "sport", "奥运会", "ào yùn huì", "Олимпийские игры");

addWord("shu1", "books", "书", "shū", "Книга");
addWord("za2zhi4", "books", "杂志", "zá zhì", "Журнал");
addWord("bao4zhi3", "books", "报纸", "bào zhǐ", "Газета");
addWord("ye4", "books", "页", "yè", "Страница");
addWord("gu4shi4", "books", "故事", "gù shì", ["История", "Рассказ"]);
addWord("xiao3shuo1", "books", "小说", "xiǎo shuō", "Рассказ");
addWord("qing2jie2", "books", "情节", "qíng jié", "Сюжет");
addWord("jie2ju2", "books", "结局", "jié jú", ["Финал", "Конец"]);
addWord("du2", "books", "读", "dú", "Читать вслух");
addWord("ci2zi", "books", "词子", "cí zi", "Слово");
addWord("ju4zi", "books", "句子", "jù zi", ["Предложение", "Фраза"]);
addWord("ci2dian3", "books", "词典", "cí diǎn", "Словарь");
addWord("han4zi4", "books", "汉字", "hàn zì", "Иероглиф");

addWord("jian1", "counting_words", "间", "jiān", "Счётное слово для комнат");
addWord("tiao2", "counting_words", "条", "tiáo", "Счётное слово для рыб");
addWord("zhi3", "counting_words", "只", "zhǐ", "Счётное слово для котов/собак");
addWord("ke1", "counting_words", "颗", "kē", "Счётное слово для зубов");

addWord("zhe4", "location", "这", "zhè", "Это");
addWord("na4", "location", "那", "nà", "То");
addWord("zhe4li3", "location", "这里", "zhè lǐ", "Здесь");
addWord("na4li3", "location", "那里", "nà lǐ", "Там");
addWord("shang4", "location", "上", "shàng", ["На", "Сверху"]);
addWord("zhong1", "location", "中", "zhōng", ["Середина", "Посередине"]);
addWord("xia4", "location", "下", "xià", ["Под", "Снизу"]);
addWord("li3", "location", "里", "lǐ", ["В", "Внутри"]);
addWord("qian2mian", "location", "前面", "qián miàn", ["Перед", "Спереди"]);
addWord("hou4mian", "location", "后面", "hòu miàn", ["Зад", "Сзади"]);
addWord("fu4jin4", "location", "附近", "fù jìn", "Рядом");
addWord("zuo3", "location", "左", "zuǒ", ["Лево", "Слева"]);
addWord("you4_1", "location", "右", "yòu", ["Право", "Справа"]);

addWord("shen2me", "questions", "什么", "shén me", "Что");
addWord("shen2meshi2hou", "questions", "什么时候", "shén me shí hou", "Когда");
addWord("shei2", "questions", "谁", "shéi", "Кто");
addWord("na3", "questions", "哪", "nǎ", "Который (есть выбор)");
addWord("na3li3", "questions", "哪里", "nǎ lǐ", ["Где", "Куда"]);
addWord("ji3", "questions", "几", "jǐ", ["Сколько", "Несколько"]);
addWord("duo1shao3", "questions", "多少", "duō shǎo", "Сколько");
addWord("yi1xie1", "questions", "一些", "yī xiē", "Несколько");
addWord("zen3me", "questions", "怎么", "zěn me", "Как");
addWord("zen3meyang4", "questions", "怎么样", "zěn me yàng", "Какой");
addWord("wei2shen2me", "questions", "为什么", "wéi shén me", "Почему");

addWord("de", "summarize", "的", "de", "Притяжательная частица");
addWord("he2_1", "summarize", "和", "hé", "И");
addWord("hai2", "summarize", "还", "hái", ["Ещё", "И (для глаголов)"]);
addWord("you4_2", "summarize", "又", "yòu", "И");
addWord("huo4", "summarize", "或", "huò", "Или");
addWord("gen1", "summarize", "跟", "gēn", "С кем-то");
addWord("yi4qi3", "summarize", "一起", "yì qǐ", "Вместе");
addWord("ye3", "summarize", "也", "yě", "Тоже");
addWord("suo3you3", "summarize", "所有", "suǒ yǒu", "Все");
addWord("dou1", "summarize", "都", "dōu", "Все");
addWord("you3de", "summarize", "有的", "yǒu de", "Некоторый");
addWord("zhe4me", "summarize", "这么", "zhè me", "Такой");
addWord("cha1bu4duo1", "summarize", "差不多", "chā bù duō", "Почти");

addWord("zheng4zai4", "other", "正在", "zhèng zài", ["Быть в процессе", "Длиться"]);
addWord("zhu3yi4", "other", "主意", "zhǔ yì", "Идея");
addWord("mi4ma3", "other", "密码", "mì mǎ", "Пароль");
addWord("shou3biao3", "other", "手表", "shǒu biǎo", "Наручные часы");
addWord("meng4xiang3", "other", "梦想", "mèng xiǎng", "Мечта");
addWord("xing1qu4", "other", "兴趣", "xīng qù", "Интерес");
addWord("jiang3", "other", "奖", "jiǎng", "Награда");
//todo аккаунт



let categoriesNode;
let wordsCountLabelNode;

document.addEventListener("DOMContentLoaded", () => {
    const wordsSearch = document.querySelector(".search .words_search");
    wordsSearch.addEventListener("input", filterWords);

    categoriesNode = document.querySelector(".words_section .categories");
    wordsCountLabelNode = categoriesNode.querySelector(".words_count_label");

    const categoryTemplate = document.querySelector(".templates .category");
    const wordTemplate = document.querySelector(".templates .word");

    for (const category of categories) {
        const categoryNode = categoryTemplate.cloneNode(true);
        categoryNode.classList.add("category_" + category.id);

        const nameNode = categoryNode.querySelector(".name");
        nameNode.innerText = category.name;

        const wordsCountNode = categoryNode.querySelector(".words_count");
        wordsCountNode.innerText = getWordsCountText(words.reduce((acc, word) =>  acc + (word.category === category.id ? 1 : 0), 0));

        categoriesNode.appendChild(categoryNode);
    }

    for (const word of words) {
        const wordNode = wordTemplate.cloneNode(true);
        wordNode.classList.add("word_" + word.id);

        wordNode.querySelector(".character").innerText = word.character;
        wordNode.querySelector(".info").innerText = word.pinyin + " - " + word.translation.join(", ");

        wordNode.addEventListener("click", () => pronounce(word.character));

        categoriesNode.querySelector(".category_" + word.category + " .words").appendChild(wordNode);
    }

    wordsCountLabelNode.innerText = "Всего " + getWordsCountText(words.length);
});

function filterWords(e) {
    const searchValue = e.target.value.toLowerCase().replaceAll(" ", "");
    let filteredWords;

    if (searchValue === "") filteredWords = words.map(word => word.id);
    else {
        filteredWords = [];

        for (const word of words) {
            if (word.id.split("_")[0].includes(searchValue) ||
                word.translation.some(el => el.toLowerCase().replaceAll(" ", "").includes(searchValue))) {
                filteredWords.push(word.id);
            }
        }

        if (filteredWords.length === 0) {
            for (const word of words) {
                if (word.id.split("_")[0].replaceAll(/[0-9]/g, "").includes(searchValue)) {
                    filteredWords.push(word.id);
                }
            }
        }
    }

    let wordsCount = 0;
    for (const word of words) {
        const wordNode = categoriesNode.querySelector(".words .word_" + word.id);

        if (filteredWords.includes(word.id)) {
            wordNode.style.display = "";
            wordsCount++;
        }
        else wordNode.style.display = "none";
    }

    if (wordsCount === words.length) wordsCountLabelNode.innerText = "Всего " + getWordsCountText(wordsCount);
    else if (wordsCount === 0) wordsCountLabelNode.innerText = "Ничего не найдено";
    else wordsCountLabelNode.innerText = "Найдено " + getWordsCountText(wordsCount);

    for (const category of categories) {
        const categoryNode = categoriesNode.querySelector(".category_" + category.id);
        categoryNode.style.display = "none";

        const wordsNode = categoryNode.querySelector(".words");

        for (const child of wordsNode.children) {
            if (child.style.display !== "none") {
                categoryNode.style.display = "";
                break;
            }
        }

        const wordsCountNode = categoryNode.querySelector(".words_count");
        wordsCountNode.innerText = getWordsCountText(Array.from(wordsNode.children).reduce((acc, child) =>  acc + (child.style.display === "" ? 1 : 0), 0));
    }
}