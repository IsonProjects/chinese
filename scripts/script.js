Storage.prototype.getItemOrDefault = function(key, defaultValue) {
    const item = this.getItem(key);
    if (item != null && item !== "") return JSON.parse(item);

    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
}

Storage.prototype.setItemJson = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}



function pronounce(text) {
    const speechSynthesis = new SpeechSynthesisUtterance(text);
    speechSynthesis.volume = 1;
    speechSynthesis.rate = 1;
    speechSynthesis.pitch = 1;
    speechSynthesis.lang = "zh-CN";
    window.speechSynthesis.speak(speechSynthesis);
}

function shuffle(array) {
    if (array.length === 0) return;

    for (let i = array.length - 1; i > 0; i--) {
        const randomI = Math.floor(Math.random() * i);
        [array[i], array[randomI]] = [array[randomI], array[i]];
    }
}

function getTime(time) {
    time = Math.floor(time / 1000);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
}



const toneChars = [
    ["a", "ā", "á", "ǎ", "à"],
    ["o", "ō", "ó", "ǒ", "ò"],
    ["e", "ē", "é", "ě", "è"],
    ["i", "ī", "í", "ǐ", "ì"],
    ["u", "ū", "ú", "ǔ", "ù"],
    ["ü", "ǖ", "ǘ", "ǚ", "ǜ"]
];

function findToneChar(pinyin) {
    for (let i = 0; i < pinyin.length; i++) {
        const c = pinyin[i];

        for (const chars of toneChars) {
            if (chars.includes(c) && chars.indexOf(c) !== 0) return c;
        }
    }

    for (let i = 0; i < pinyin.length; i++) {
        const c = pinyin[i];

        for (const chars of toneChars) {
            if (chars.includes(c)) return c;
        }
    }

    return null;
}