Storage.prototype.getItemOrDefault = function(key: string, defaultValue: any) {
    const item = this.getItem(key);
    if (item != null && item !== "") return JSON.parse(item);

    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
};

Storage.prototype.setItemJson = function(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
};



export function pronounce(text: string) {
    const speechSynthesis = new SpeechSynthesisUtterance(text);
    speechSynthesis.volume = 1;
    speechSynthesis.rate = 1;
    speechSynthesis.pitch = 1;
    speechSynthesis.lang = "zh-CN";
    window.speechSynthesis.speak(speechSynthesis);
}

export function getWordsAmountText(count: number): string {
    const units = count % 10;
    const tens = count % 100;

    if (units === 0 || units >= 5 || (tens >= 11 && tens <= 14)) return count + " слов";
    if (units === 1) return count + " слово";
    if (units >= 2 && units <= 4) return count + " слова";
    return count + " слов";
}

export function getTime(time: number): string {
    time = Math.floor(time / 1000);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
}

export function shuffle(array: any[]) {
    if (array.length === 0) return;

    for (let i = array.length - 1; i > 0; i--) {
        const randomI = Math.floor(Math.random() * i);
        [array[i], array[randomI]] = [array[randomI], array[i]];
    }
}

const randomCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
const randomCharactersLength = randomCharacters.length;

export function generateRandomId(): string {
    let result = "";

    for (let i = 0; i < 10; i++) {
        result += randomCharacters.charAt(Math.floor(Math.random() * randomCharactersLength));
    }

    return result;
}



export const toneChars = [
    ["a", "ā", "á", "ǎ", "à"],
    ["o", "ō", "ó", "ǒ", "ò"],
    ["e", "ē", "é", "ě", "è"],
    ["i", "ī", "í", "ǐ", "ì"],
    ["u", "ū", "ú", "ǔ", "ù"],
    ["ü", "ǖ", "ǘ", "ǚ", "ǜ"]
];

export function findToneChar(pinyin: string): string | null {
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