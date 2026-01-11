const words = [];
const categories = [];

function addCategory(id, name) {
    categories.push({
        id: id,
        name: name
    });
}

function addWord(id, category, character, pinyin, translation) {
    words.push({
        id: id,
        category: category,
        character: character,
        pinyin: pinyin,
        translation: translation
    });
}



addCategory("pronouns", "Местоимения");
addCategory("numbers", "Числа");
addCategory("verbs", "Глаголы");
addCategory("adjectives", "Прилагательные");
addCategory("talking", "Общение");
addCategory("colors", "Цвета");
addCategory("school", "Школа");
addCategory("clothes", "Одежда");
addCategory("appearance", "Внешность");
addCategory("health", "Здоровье");
addCategory("animals", "Животные");
addCategory("food", "Еда");
addCategory("drinks", "Напитки");
addCategory("my_house", "Мой дом");
addCategory("family", "Семья");
addCategory("time", "Время");
addCategory("countries", "Страны");
addCategory("shop", "Магазин");
addCategory("work", "Работа");
addCategory("weather", "Погода");
addCategory("transport", "Транспорт");
addCategory("hobby", "Хобби");
addCategory("counting_words", "Счётные слова");
addCategory("location", "Указания места");
addCategory("questions", "Вопросы");
addCategory("summarize", "Обобщения, союзы");
addCategory("other", "Другое");



addWord("wo3", "pronouns", "我", "wǒ", "Я");
addWord("wo3men", "pronouns", "我们", "wǒ men", "Мы");
addWord("ni3", "pronouns", "你", "nǐ", "Ты");
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
addWord("zuo3you4", "numbers", "左右", "zuǒ yòu", "Примерно, около");
addWord("ci4", "numbers", "次", "cì", "Раз");

addWord("xi3huan", "verbs", "喜欢", "xǐ huan", "Нравится");
addWord("ai4", "verbs", "爱", "ài", "Любить");
addWord("shi4", "verbs", "是", "shì", "Быть, являться");
addWord("zai4", "verbs", "在", "zài", "Находиться");
addWord("deng3", "verbs", "等", "děng", "Ждать");
addWord("qu4", "verbs", "去", "qù", "Идти, перемещаться");
addWord("zou3lu4", "verbs", "走路", "zǒu lù", "Ходить");
addWord("dai4", "verbs", "带", "dài", "Брать с собой");
addWord("kan4", "verbs", "看", "kàn", "Смотреть, видеть");
addWord("hui4", "verbs", "会", "huì", "Уметь");
addWord("xiang3", "verbs", "想", "xiǎng", "Думать, мечтать, хотеть, желать");
addWord("jin4", "verbs", "进", "jìn", "Входить");
addWord("zuo4_1", "verbs", "坐", "zuò", "Сидеть, садиться");
addWord("zhan4", "verbs", "站", "zhàn", "Стоять");
addWord("qi3lai2", "verbs", "起来", "qǐ lái", "Вставать");
addWord("qi3chuang1", "verbs", "起床", "qǐ chuáng", "Вставать с кровати");
addWord("shui4jiao4", "verbs", "睡觉", "shuì jiào", "Спать");
addWord("du2", "verbs", "读", "dú", "Читать вслух");
addWord("xie3", "verbs", "写", "xiě", "Писать");
addWord("zuo4_2", "verbs", "做", "zuò", "Делать");
addWord("gei3", "verbs", "给", "gěi", "Давать");
addWord("lai2", "verbs", "来", "lái", "Приходить");
addWord("hui2", "verbs", "回", "huí", "Возвращаться");
addWord("xi3zao3", "verbs", "洗澡", "xǐ zǎo", "Принимать душ/ванну");
addWord("xi3lian3", "verbs", "洗脸", "xǐ liǎn", "Умываться");
addWord("jian4", "verbs", "见", "jiàn", "Встречаться");
addWord("ren4shi2", "verbs", "认识", "rèn shí", "Знать, знакомиться (2 человека)");
addWord("zhi1dao4", "verbs", "知道", "zhī dào", "Знать");
addWord("da3", "verbs", "打", "dǎ", "Бить, ударять");
addWord("guan1", "verbs", "关", "guān", "Закрывать");
addWord("tiao4", "verbs", "跳", "tiào", "Прыгать");
addWord("xiu1xi1", "verbs", "休息", "xiū xī", "Отдыхать");
addWord("gao4su4", "verbs", "告诉", "gào sù", "Сообщить");
addWord("yao4_1", "verbs", "要", "yào", "Хотеть, надо");
addWord("song4", "verbs", "送", "sòng", "Доставлять");

addWord("xiao3", "adjectives", "小", "xiǎo", "Маленький");
addWord("da4", "adjectives", "大", "dà", "Большой");
addWord("duan3", "adjectives", "短", "duǎn", "Короткий");
addWord("chang2", "adjectives", "长", "cháng", "Длинный");
addWord("duo1", "adjectives", "多", "duō", "Много");
addWord("shao3", "adjectives", "少", "shǎo", "Мало");
addWord("zui4", "adjectives", "最", "zuì", "Самый");

addWord("ting1", "talking", "听", "tīng", "Слушать");
addWord("shuo1", "talking", "说", "shuō", "Говорить");
addWord("jue2de", "talking", "觉得", "jué de", "Предполагать");
addWord("shuo1hua4", "talking", "说话", "shuō huà", "Разговаривать");
addWord("jie1", "talking", "接", "jiē", "Отвечать на телефонный звонок");
addWord("qing3", "talking", "请", "qǐng", "Просить");
addWord("wen4ti2", "talking", "问题", "wèn tí", "Вопрос");
addWord("qing3wen4", "talking", "请问", "qǐng wèn", "Можно спросить?");
addWord("na3yi1wei4", "talking", "哪一位", "nǎ yī wèi", "С кем я говорю?");
addWord("ni3hao3", "talking", "你好", "nǐ hǎo", "Здравствуйте, привет");
addWord("zai4jian4", "talking", "再见", "zài jiàn", "До свидания, пока");
addWord("dui4bu4qi3", "talking", "对不起", "duì bù qǐ", "Извините");
addWord("mei2guan1xi4", "talking", "没关系", "méi guān xì", "Ничего страшного");
addWord("xie4xie4", "talking", "谢谢", "xiè xiè", "Спасибо");
addWord("bu2yong4xie4", "talking", "不用谢", "bú yòng xiè", "Пожалуйста");
addWord("bu2ke4qi4", "talking", "不客气", "bú kè qì", "Всегда пожалуйста");
addWord("bu2cuo4", "talking", "不错", "bú cuò", "Всё хорошо");

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

addWord("xue2xiao4", "school", "学校", "xué xiào", "Школа");
addWord("shang4xue2", "school", "上学", "shàng xué", "Ходить в школу");
addWord("fang4xue2", "school", "放学", "fàng xué", "Заканчивать занятия");
addWord("nian2ji2", "school", "年级", "nián jí", "Класс обучения");
addWord("xiao4fu2", "school", "校服", "xiào fú", "Школьная форма");
addWord("nan2sheng1", "school", "男生", "nán shēng", "Ученик");
addWord("nu3sheng1", "school", "女生", "nǚ shēng", "Ученица");
addWord("xiao3xue2sheng1", "school", "小学生", "xiǎo xué shēng", "Ученик начальной школы");
addWord("zhong1xue2sheng1", "school", "中学生", "zhōng xué shēng", "Ученик средней школы");
addWord("tong2xue2", "school", "同学", "tóng xué", "Одноклассник");
addWord("peng2you3", "school", "朋友", "péng yǒu", "Друг");
addWord("ban1", "school", "班", "bān", "Класс (люди)");
addWord("zuo4ye4", "school", "作业", "zuò yè", "Домашнее задание");
addWord("han4yu3", "school", "汉语", "hàn yǔ", "Китайский язык");
addWord("ying1yu3", "school", "英语", "yīng yǔ", "Английский язык");
addWord("shu4xue2", "school", "数学", "shù xué", "Математика");
addWord("ke1xue2", "school", "科学", "kē xué", "Окружающий мир, наука");
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
addWord("cao1chang3", "school", "操场", "cāo chǎng", "Спортивная площадка");
addWord("li3tang2", "school", "礼堂", "lǐ táng", "Актовый зал");
addWord("ti3yu4guan3", "school", "体育馆", "tǐ yù guǎn", "Спортзал");
addWord("tu2shu1guan3", "school", "图书馆", "tú shū guǎn", "Библиотека");
addWord("jiao4shi4", "school", "教室", "jiào shì", "Аудитория");
addWord("lou2", "school", "楼", "lóu", "Этаж");
addWord("mei3shu4shi4", "school", "美术室", "měi shù shì", "Кабинет ИЗО");
addWord("yin1yue4shi4", "school", "音乐室", "yīn yuè shì", "Кабинет музыки");
addWord("you2yong3chi2", "school", "游泳池", "yóu yǒng chí", "Бассейн");
addWord("xiao3mai4bu4", "school", "小卖部", "xiǎo mài bù", "Буфет");
addWord("ting2che1chang3", "school", "停车场", "tíng chē chǎng", "Парковка");
addWord("shu1", "school", "书", "shū", "Книга");
addWord("bao1", "school", "包", "bāo", "Сумка");
addWord("shu1bao1", "school", "书包", "shū bāo", "Портфель");
addWord("ben3zi", "school", "本子", "běn zi", "Тетрадь");
addWord("ri4ji4ben3", "school", "日记本", "rì jì běn", "Дневник");
addWord("wen2ju4he2", "school", "文具盒", "wén jù hé", "Пенал");
addWord("qian1bi3", "school", "铅笔", "qiān bǐ", "Карандаш");
addWord("la4bi3", "school", "蜡笔", "là bǐ", "Восковой мелок");
addWord("chi3zi", "school", "尺子", "chǐ zi", "Линейка");
addWord("xiang4pi2", "school", "橡皮", "xiàng pí", "Ластик");
addWord("juan3bi3dao1", "school", "卷笔刀", "juǎn bǐ dāo", "Точилка");
addWord("ke4ben3", "school", "课本", "kè běn", "Учебник");
addWord("lian4xi2ben3", "school", "练习本", "liàn xí běn", "Рабочая тетрадь");
addWord("cai3se4bi3", "school", "彩色笔", "cǎi sè bǐ", "Цветной карандаш");
addWord("jian3dao1", "school", "剪刀", "jiǎn dāo", "Ножницы");
addWord("gu4ti3jiao1", "school", "固体胶", "gù tǐ jiāo", "Клей-карандаш");
addWord("jiao1shui3", "school", "胶水", "jiāo shuǐ", "Жидкий клей");
addWord("cuo4", "school", "错", "cuò", "Ошибка");
addWord("mei2cuo4", "school", "没错", "méi cuò", "Нет ошибок");

addWord("chuan1", "clothes", "穿", "chuān", "Надевать");
addWord("chen4shan1", "clothes", "衬衫", "chèn shān", "Рубашка");
addWord("han4shan1", "clothes", "汗衫", "hàn shān", "Футболка");
addWord("qun2zi", "clothes", "裙子", "qún zi", "Юбка");
addWord("ku4zi", "clothes", "裤子", "kù zi", "Брюки");
addWord("niu2zai3ku4", "clothes", "牛仔裤", "niú zǎi kù", "Джинсы");
addWord("mao2yi1", "clothes", "毛衣", "máo yī", "Свитер");
addWord("da4yi1", "clothes", "大衣", "dà yī", "Пальто");
addWord("wai4tao4", "clothes", "外套", "wài tào", "Куртка");

addWord("tou2", "appearance", "头", "tóu", "Голова");
addWord("lian3", "appearance", "脸", "liǎn", "Лицо");
addWord("yan3jing1", "appearance", "眼睛", "yǎn jīng", "Глаза");
addWord("bi2zi", "appearance", "鼻子", "bí zi", "Нос");
addWord("zui3ba1", "appearance", "嘴巴", "zuǐ bā", "Рот");
addWord("ya2chi3", "appearance", "牙齿", "yáchǐ", "Зубы");
addWord("er3duo3", "appearance", "耳朵", "ěr duǒ", "Ухо");
addWord("tou2fa1", "appearance", "头发", "tóu fā", "Волосы");
addWord("shou3", "appearance", "手", "shǒu", "Рука");
addWord("shou3zhi3", "appearance", "手指", "shǒu zhǐ", "Палец");
addWord("du4zi", "appearance", "肚子", "dùzi", "Живот");
addWord("tui3", "appearance", "腿", "tuǐ", "Нога");
addWord("jiao3", "appearance", "脚", "jiǎo", "Ступня");
addWord("shou4", "appearance", "瘦", "shòu", "Худой");
addWord("pang4", "appearance", "胖", "pàng", "Толстый");
addWord("ai3", "appearance", "矮", "ǎi", "Низкий");
addWord("gao1", "appearance", "高", "gāo", "Высокий");
addWord("yuan2_1", "appearance", "圆", "yuán", "Круглый");
addWord("kai1xin1", "appearance", "开心", "kāi xīn", "Радостный");
addWord("gao1xing4", "appearance", "高兴", "gāo xìng ", "Радостный");
addWord("piao4liang", "appearance", "漂亮", "piào liang", "Красивый");
addWord("ke3ai4", "appearance", "可爱", "kě ài", "Милый");

addWord("sheng1bing4", "health", "生病", "shēng bìng", "Заболеть, болезнь");
addWord("fa1shao1", "health", "发烧", "fā shāo", "Температура, жар (гл.)");
addWord("ke2sou", "health", "咳嗽", "ké sou", "Кашель (гл.)");
addWord("tou2tong4", "health", "头痛", "tóu tòng", "Головная боль (гл.)");
addWord("yan3jing1teng2", "health", "眼睛疼", "yǎn jīng téng", "Глазная боль (гл.)");
addWord("sang3ziteng2", "health", "嗓子疼", "sǎng zi téng", "Боль в горле (гл.)");
addWord("du4ziteng2", "health", "肚子疼", "dù zi téng", "Боль в животе (гл.)");
addWord("jiao3teng2", "health", "脚疼", "jiǎo téng", "Боль в ноге (гл.)");
addWord("shou3teng2", "health", "手疼", "shǒu téng", "Боль в руке (гл.)");
addWord("gan3mao4", "health", "感冒", "gǎn mào", "Простудиться");
addWord("yao4_2", "health", "药", "yào", "Таблетки");
addWord("yi1sheng1", "health", "医生", "yī shēng", "Доктор");
addWord("yi1yuan4", "health", "医院", "yī yuàn", "Больница");
addWord("zhu4yuan4", "health", "住院", "zhù yuàn", "Лежать в больнице");
addWord("chu1yuan4", "health", "出院", "chū yuàn", "Выписываться из больницы");
addWord("shu1fu2", "health", "舒服", "shū fú", "Комфортный, приятный");

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
addWord("she2", "animals", "蛇", "shé", "Змея");
addWord("hou2", "animals", "猴", "hóu", "Обезьяна");
addWord("shu3_1", "animals", "鼠", "shǔ", "Крыса");
addWord("xiong2mao1", "animals", "熊猫", "xióng māo", "Панда");
addWord("chang2jing3lu4", "animals", "长颈鹿", "cháng jǐng lù", "Жираф");
addWord("da4xing1xing1", "animals", "大猩猩", "dà xīng xīng", "Горилла");
addWord("he2ma3", "animals", "河马", "hé mǎ", "Бегемот");
addWord("ban1ma3", "animals", "斑马", "bān mǎ", "Зебра");
addWord("long2", "animals", "龙", "lóng", "Дракон");
addWord("yang3", "animals", "养", "yǎng", "Выращивать, держать животных");

addWord("chi1", "food", "吃", "chī", "Есть, кушать");
addWord("fan4", "food", "饭", "fàn", "Еда");
addWord("zao3fan4", "food", "早饭", "zǎo fàn", "Завтрак");
addWord("wu3fan4", "food", "午饭", "wǔ fàn", "Обед");
addWord("wan3fan4", "food", "晚饭", "wǎn fàn", "Ужин");
addWord("shui3guo3", "food", "水果", "shuǐ guǒ", "Фрукты");
addWord("ping2guo3", "food", "苹果", "píng guǒ", "Яблоко");
addWord("xiang1jiao1", "food", "香蕉", "xiāng jiāo", "Банан");
addWord("pu2tao", "food", "葡萄", "pú tao", "Виноград");
addWord("cao3mei2", "food", "草莓", "cǎo méi", "Клубника");
addWord("xi1gua1", "food", "西瓜", "xī guā", "Арбуз");
addWord("shu1cai4", "food", "蔬菜", "shū cài", "Овощи");
addWord("hu2luo2bu3", "food", "胡萝卜", "hú luó bǔ", "Морковь");
addWord("huang2gua1", "food", "黄瓜", "huáng guā", "Огурец");
addWord("xi1hong2shi4", "food", "西红柿", "xī hóng shì", "Помидор");
addWord("tu3dou4", "food", "土豆", "tǔ dòu", "Картошка");
addWord("bai2cai4", "food", "白菜", "bái cài", "Китайская капуста");
addWord("qing1cai4", "food", "青菜", "qīng cài", "Салатные листья");
addWord("luo4bu3", "food", "萝卜", "luó bǔ", "Редиска");
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
addWord("yi4da4li4mian4", "food", "意大利面", "yì dà lì miàn", "Макароны, спагетти");
addWord("xiang1chang2", "food", "香肠", "xiāng cháng", "Сосиски");
addWord("bi3sa4bing3", "food", "比萨饼", "bǐ sà bǐng", "Пицца");

addWord("he1", "drinks", "喝", "hē", "Пить");
addWord("bei1zi", "drinks", "杯子", "bēi zi", "Стакан, кружка");
addWord("shui3", "drinks", "水", "shuǐ", "Вода");
addWord("ke3le4", "drinks", "可乐", "kě lè", "Кока-кола");
addWord("guo3zhi1", "drinks", "果汁", "guǒ zhī", "Сок");
addWord("cha2", "drinks", "茶", "chá", "Чай");
addWord("niu2nai3", "drinks", "牛奶", "niú nǎi", "Молоко");

addWord("zhu4", "my_house", "住", "zhù", "Жить");
addWord("lu4", "my_house", "路", "lù", "Улица, дорога");
addWord("dian4hua4", "my_house", "电话", "diàn huà", "Телефон");
addWord("shou3ji1", "my_house", "手机", "shǒu jī", "Современный телефон");
addWord("hao4ma3", "my_house", "号码", "hào mǎ", "Номер");
addWord("fang2jian1", "my_house", "房间", "fáng jiān", "Комната");
addWord("wo4shi4", "my_house", "卧室", "wò shì", "Спальня");
addWord("ke4ting1", "my_house", "客厅", "kè tīng", "Гостиная");
addWord("yu4shi4", "my_house", "浴室", "yù shì", "Ванная");
addWord("chu2fang2", "my_house", "厨房", "chú fáng", "Кухня");
addWord("shu1fang2", "my_house", "书房", "shū fáng", "Кабинет");
addWord("ce4suo3", "my_house", "厕所", "cè suǒ", "Туалет");
addWord("yang2tai2", "my_house", "阳台", "yáng tái", "Балкон");
addWord("can1ting1", "my_house", "餐厅", "cān tīng", "Столовая");
addWord("yi1gui4", "my_house", "衣柜", "yī guì", "Шкаф, гардероб");
addWord("chuang2", "my_house", "床", "chuáng", "Кровать");
addWord("zhuo1zi", "my_house", "桌子", "zhuō zi", "Стол");
addWord("yi3zi", "my_house", "椅子", "yǐ zi", "Стул");
addWord("dian4nao3", "my_house", "电脑", "diàn nǎo", "Компьютер");
addWord("dian4shi4", "my_house", "电视", "diàn shì", "Телевизор");
addWord("sha1fa1", "my_house", "沙发", "shā fā", "Диван");
addWord("shu1jia4", "my_house", "书架", "shū jià", "Книжная полка");
addWord("chuang2tou2gui4", "my_house", "床头柜", "chuáng tóu guì", "Тумбочка");
addWord("kong1tiao2", "my_house", "空调", "kōng tiáo", "Кондиционер");
addWord("tai2deng1", "my_house", "台灯", "tái dēng", "Настольная лампа");

addWord("ren2", "family", "人", "rén", "Человек");
addWord("jia1", "family", "家", "jiā", "Дом, семья");
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
addWord("di4di4", "family", "弟弟", "dì dì", "Младший брат");
addWord("ge1ge1", "family", "哥哥", "gē gē", "Старший брат");
addWord("xiong1di4", "family", "弟们", "xiōng dì", "Братья");
addWord("xiao3jie3", "family", "小姐", "xiǎo jiě", "Девушка");
addWord("xian1sheng", "family", "先生", "xiān sheng", "Мужчина");
addWord("yi4ma1", "family", "姨妈", "yí mā", "Тётя со стороны мамы");
addWord("jiu4jiu4", "family", "舅舅", "jiù jiù", "Дядя со стороны мамы");
addWord("shu1shu1", "family", "叔叔", "shū shū", "Дядя со стороны папы");

addWord("shi2jian1", "time", "时间", "shí jiān", "Время");
addWord("ri4", "time", "日", "rì", "День");
addWord("hao4", "time", "号", "hào", "Число, день");
addWord("yue4", "time", "月", "yuè", "Месяц");
addWord("nian2", "time", "年", "nián", "Год");
addWord("xing1qi1", "time", "星期", "xīng qī", "Неделя");
addWord("jin1tian1", "time", "今天", "jīn tiān", "Сегодня");
addWord("ming2tian1", "time", "明天", "míng tiān", "Завтра");
addWord("zuo2tian1", "time", "昨天", "zuó tiān", "Вчера");
addWord("xian4zai4", "time", "现在", "xiàn zài", "Сейчас");
addWord("dian3", "time", "点", "diǎn", "Час");
addWord("fen1", "time", "分", "fēn", "Минута");
addWord("ke4", "time", "刻", "kè", "15 минут, четверть часа");
addWord("ban4", "time", "半", "bàn", "30 минут, полчаса");
addWord("zao3shang4", "time", "早上", "zǎo shàng", "Утро");
addWord("shang4wu3", "time", "上午", "shàng wǔ", "Первая половина дня, утро");
addWord("zhong1wu3", "time", "中午", "zhōng wǔ", "Полдень");
addWord("xia4wu3", "time", "下午", "xià wǔ", "День");
addWord("wan3shang4", "time", "晚上", "wǎn shàng", "Вечер");
addWord("sheng1ri4", "time", "生日", "shēng rì", "День рождения");
addWord("chu1sheng1", "time", "出生", "chū shēng", "Родиться");
addWord("shu3_2", "time", "属", "shǔ", "Родиться (знаки зодиака)");
addWord("mei3tian1", "time", "每天", "měi tiān", "Каждый день");
addWord("yi1hui4r", "time", "一会儿", "yī huìr", "Недолго");
addWord("chang2chang2", "time", "常常", "cháng cháng", "Часто");
addWord("yi1ban1", "time", "一般", "yī bān", "Обычно");
addWord("you3shi2hou", "time", "有时候", "yǒu shí hou", "Иногда");
addWord("yi3jing1", "time", "已经", "yǐ jīng", "Уже");

addWord("zhong1guo2", "countries", "中国", "zhōng guó", "Китай");
addWord("mei3guo2", "countries", "美国", "měi guó", "Америка");
addWord("ying1guo2", "countries", "英国", "yīng guó", "Англия");
addWord("ri4ben3", "countries", "日本", "rì běn", "Япония");
addWord("han2guo2", "countries", "韩国", "hán guó", "Корея");
addWord("ao4da4li4ya4", "countries", "澳大利亚", "ào dà lì yà", "Австралия");
addWord("e2luo2si1", "countries", "俄罗斯", "é luó sī", "Россия");
addWord("fa3guo2", "countries", "法国", "fǎ guó", "Франция");

addWord("shang1dian4", "shop", "商店", "shāng diàn", "Магазин");
addWord("mai3", "shop", "买", "mǎi", "Покупать");
addWord("qian2", "shop", "钱", "qián", "Деньги");
addWord("kuai4", "shop", "块", "kuài", "Валюта");
addWord("yuan2_2", "shop", "元", "yuán", "Китайская валюта");

addWord("gong1zuo4", "work", "工作", "gōng zuò", "Работать");
addWord("shang4ban1", "work", "上班", "shàng bān", "Ходить на работу");
addWord("fan4dian4", "work", "饭店", "fàn diàn", "Ресторан, отель, гостиница");

addWord("tian1qi4", "weather", "天气", "tiān qì", "Погода");
addWord("leng3", "weather", "冷", "lěng", "Холодно");
addWord("re4", "weather", "热", "rè", "Жарко, горячо");
addWord("qing2tian1", "weather", "晴天", "qíng tiān", "Солнечно");
addWord("yin1tian1", "weather", "阴天", "yīn tiān", "Пасмурно");
addWord("qi4wen1", "weather", "气温", "qì wēn", "Температура воздуха");
addWord("du4", "weather", "度", "dù", "Градус");
addWord("ling2shang4", "weather", "零上", "líng shàng", "Выше нуля");
addWord("ling2xia4", "weather", "零下", "líng xià", "Ниже нуля");
addWord("duo1yun2", "weather", "多云", "duō yún", "Облачно");
addWord("gua1feng1", "weather", "刮风", "guā fēng", "Дует ветер");
addWord("gua1tai2feng1", "weather", "刮台风", "guā tái fēng", "Тайфун");
addWord("xia4mao2mao2yu3", "weather", "下毛毛雨", "xià máo máo yǔ", "Моросит");
addWord("xia4xiao3yu3", "weather", "下小雨", "xià xiǎo yǔ", "Идёт небольшой дождь");
addWord("xia4yu3", "weather", "下雨", "xià yǔ", "Идёт дождь");
addWord("xia4xue3", "weather", "下雪", "xià xuě", "Идёт снег");
addWord("ji4jie2", "weather", "季节", "jì jié", "Сезон, время года");
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
addWord("du4chuan2", "transport", "渡船", "dù chuán", "Катер");
addWord("di4tie3", "transport", "地铁", "dì tiě", "Метро");
addWord("dian4che1", "transport", "电车", "diàn chē", "Трамвай");
addWord("gong1gong4qi4che1", "transport", "公共汽车", "gōng gòng qì chē", "Автобус");
addWord("xiao4che1", "transport", "校车", "xiào chē", "Школьный автобус");
addWord("huo3che1", "transport", "火车", "huǒ chē", "Поезд");
addWord("huo3che1zhan4", "transport", "火车站", "huǒ chē zhàn", "Железнодорожный вокзал");

addWord("ai4hao3", "hobby", "爱好", "ài hǎo", "Хобби");
addWord("dian4ying3", "hobby", "电影", "diàn yǐng", "Фильм");
addWord("qiu2", "hobby", "球", "qiú", "Мяч");
addWord("ti1zu2qiu2", "hobby", "踢足球", "tī zú qiú", "Играть в футбол");
addWord("hua2bing1", "hobby", "滑冰", "huá bīng", "Кататься на коньках");
addWord("hua2xue3", "hobby", "滑雪", "huá xuě", "Кататься на лыжах");
addWord("tan2gang1qin2", "hobby", "弹钢琴", "tán gāng qín", "Играть на фортепиано");
addWord("tiao4wu3", "hobby", "跳舞", "tiào wǔ", "Танцевать");
addWord("chang4ge1", "hobby", "唱歌", "chàng gē", "Петь");
addWord("hua4huar4", "hobby", "画画儿", "huà huàr", "Рисовать");
addWord("la1xiao3ti2qin2", "hobby", "拉小提琴", "lā xiǎo tí qín", "Играть на скрипке");
addWord("wan2dian4nao3you2xi4", "hobby", "玩电脑游戏", "wán diàn nǎo yóu xì", "Играть в компьютерные игры");
addWord("yun4dong4", "hobby", "运动", "yùn dòng", "Спорт");
addWord("pao3bu4", "hobby", "跑步", "pǎo bù", "Бег");
addWord("you2yung3", "hobby", "游泳", "yóu yǒng", "Плавать");
addWord("da3wang3qiu2", "hobby", "打网球", "dǎ wǎng qiú", "Играть в теннис");

addWord("jian1", "counting_words", "间", "jiān", "Счётное слово для комнат");
addWord("tiao2", "counting_words", "条", "tiáo", "Счётное слово для рыб");
addWord("zhi3", "counting_words", "只", "zhǐ", "Счётное слово для котов/собак");
addWord("ke1", "counting_words", "颗", "kē", "Счётное слово для зубов");

addWord("zhe4", "location", "这", "zhè", "Это");
addWord("na4", "location", "那", "nà", "То");
addWord("zhe4er", "location", "这儿", "zhè er", "Здесь");
addWord("na4er", "location", "那儿", "nà er", "Там");
addWord("shang4", "location", "上", "shàng", "На, сверху");
addWord("zhong1", "location", "中", "zhōng", "Середина, посередине");
addWord("xia4", "location", "下", "xià", "Под, снизу");
addWord("li3", "location", "里", "lǐ", "В, внутри");
addWord("qian2mian", "location", "前面", "qián miàn", "Перед, спереди");
addWord("hou4mian", "location", "后面", "hòu miàn", "Зад, сзади");
addWord("zuo3", "location", "左", "zuǒ", "Лево, слева");
addWord("you4", "location", "右", "yòu", "Право, справа");

addWord("shen2me", "questions", "什么", "shén me", "Чего, как");
addWord("shen2meshi2hou", "questions", "什么时候", "shén me shí hou", "Когда");
addWord("shei2", "questions", "谁", "shéi", "Кто");
addWord("na3", "questions", "哪", "nǎ", "Который (есть выбор)");
addWord("na3er", "questions", "哪儿", "nǎ er", "Где, куда");
addWord("ji3", "questions", "几", "jǐ", "Сколько, несколько");
addWord("duo1shao3", "questions", "多少", "duō shǎo", "Сколько");
addWord("yi1xie1", "questions", "一些", "yī xiē", "Несколько");
addWord("zen3me", "questions", "怎么", "zěn me", "Как");
addWord("zen3meyang4", "questions", "怎么样", "zěn me yàng", "Какой");

addWord("he2_1", "summarize", "和", "hé", "И");
addWord("hai2", "summarize", "还", "hái", "Ещё, и (для глаголов)");
addWord("huo4", "summarize", "或", "huò", "Или");
addWord("gen1", "summarize", "跟", "gēn", "С кем-то");
addWord("yi4qi3", "summarize", "一起", "yì qǐ", "Вместе");
addWord("ye3", "summarize", "也", "yě", "Тоже");
addWord("dou1", "summarize", "都", "dōu", "Все");
addWord("you3de", "summarize", "有的", "yǒu de", "Некоторый");
addWord("dong1xi1", "summarize", "东西", "dōng xī", "Предмет, вещь");

addWord("nao3", "other", "脑", "nǎo", "Мозг");
addWord("hua1", "other", "花", "huā", "Цветок");
addWord("hua1yuan2", "other", "花园", "huā yuán", "Сад");
addWord("yi1dian3r", "other", "一点儿", "yī diǎnr", "Немного");
addWord("he2_2", "other", "河", "hé", "Река");
addWord("han4zi4", "other", "汉字", "hàn zì", "Иероглиф");
addWord("xiao3shuo1", "other", "小说", "xiǎo shuō", "Рассказ");
addWord("za2zhi4", "other", "杂志", "zá zhì", "Журнал");
addWord("bao4zhi3", "other", "报纸", "bào zhǐ", "Газета");
addWord("zheng4zai4", "other", "正在", "zhèng zài", "Быть в процессе, длиться");



const categoryTemplate = document.querySelector(".templates .category");
for (const category of categories) {
    const categoryNode = categoryTemplate.cloneNode(true);
    categoryNode.classList.add(category.id);

    const nameNode = categoryNode.querySelector(".name");
    nameNode.innerText = category.name;

    document.querySelector(".words_section .categories").appendChild(categoryNode);
}

const wordTemplate = document.querySelector(".templates .word");
for (const word of words) {
    const wordNode = wordTemplate.cloneNode(true);
    wordNode.classList.add(word.id);

    wordNode.querySelector(".character").innerText = word.character;
    wordNode.querySelector(".info").innerText = word.pinyin + " - " + word.translation;

    wordNode.addEventListener("click", () => pronounce(word.character));

    document.querySelector("." + word.category + " .words").appendChild(wordNode);
}



let allowedWordsTranscription = words.map(word => word.id);
let allowedWordsTranslate = words.map(word => word.id);

const transcriptionSearch = document.querySelector(".search .transcription_search");
const translateSearch = document.querySelector(".search .translate_search");

transcriptionSearch.addEventListener("input", () => {
    if (transcriptionSearch.value == "") {
        allowedWordsTranscription = words.map(word => word.id);
    }
    else {
        allowedWordsTranscription = [];
        for (const word of words) {
            if (word.id.split("_")[0].includes(transcriptionSearch.value.toLowerCase().replaceAll(" ", ""))) {
                allowedWordsTranscription.push(word.id);
            }
        }
    }
    

    if (allowedWordsTranscription.length == 0) {
        for (const word of words) {
            if (word.id.split("_")[0].replaceAll(/[0-9]/g, "").includes(transcriptionSearch.value.toLowerCase().replaceAll(" ", ""))) {
                allowedWordsTranscription.push(word.id);
            }
        }
    }

    updateWordsList();
});

translateSearch.addEventListener("input", () => {
    if (translateSearch.value == "") {
        allowedWordsTranslate = words.map(word => word.id);
    }
    else {
        allowedWordsTranslate = [];
        for (const word of words) {
            if (word.translation.toLowerCase().replaceAll(" ", "").includes(translateSearch.value.toLowerCase().replaceAll(" ", ""))) {
                allowedWordsTranslate.push(word.id);
            }
        }
    }

    updateWordsList();
});

function updateWordsList() {
    for (const word of words) {
        const wordNode = document.querySelector(".words ." + word.id);
        if (allowedWordsTranscription.includes(word.id) && allowedWordsTranslate.includes(word.id)) wordNode.style.display = "";
        else wordNode.style.display = "none";
    }

    for (const category of categories) {
        const categoryNode = document.querySelector("." + category.id);
        const categoryWordsNode = categoryNode.querySelector(".words");
        categoryNode.style.display = "none";

        for (const child of categoryWordsNode.children) {
            if (child.style.display !== "none") {
                categoryNode.style.display = "block";
                break;
            }
        }
    }
}