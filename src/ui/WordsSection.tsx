import React from "react";
import { getWordsAmountText, pronounce } from "../utils.ts"
import { type Category, categories, words, type Word } from "../data/words.ts";
import "../styles/words_styles.css";

const WordsSection = () => {
    return (
        <div className="section words_section">
            <div className="categories">
                <p className="words_count_label">Всего {getWordsAmountText(words.length)}</p>
                { categories.map((category) => Category(category)) }
            </div>
        </div>
    );
};

const Category = (category: Category) => {
    const categoryWords = words.filter(word => word.category === category.id);

    return (
        <div className={`category category_${category.id}`} key={category.id}>
            <div className="info">
                <p className="name">{category.name}</p>
                <p className="words_count">{getWordsAmountText(categoryWords.length)}</p>
            </div>

            <div className="words">
                { categoryWords.map(word => Word(word)) }
            </div>
        </div>
    );
};

const Word = (word: Word) => {
    return (
        <div className={`word word_${word.id}`} key={word.id} onClick={() => pronounce(word.character)}>
            <p className="character selectable_text chinese_text">{word.character}</p>
            <p className="info selectable_text">{word.pinyin} - {word.translation.join(", ")}</p>
        </div>
    );
};



export function filterWords(e: React.InputEvent<HTMLInputElement>) {
    const searchValue = (e.target as HTMLInputElement).value.toLowerCase().replaceAll(" ", "");
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

    const categoriesNode: HTMLElement = document.querySelector(".words_section .categories")!;
    const wordsCountLabelNode: HTMLElement = categoriesNode.querySelector(".words_count_label")!;

    let wordsCount = 0;
    for (const word of words) {
        const wordNode: HTMLElement = categoriesNode.querySelector(".words .word_" + word.id)!;

        if (filteredWords.includes(word.id)) {
            wordNode.style.display = "";
            wordsCount++;
        }
        else wordNode.style.display = "none";
    }

    if (wordsCount === words.length) wordsCountLabelNode.innerText = "Всего " + getWordsAmountText(wordsCount);
    else if (wordsCount === 0) wordsCountLabelNode.innerText = "Ничего не найдено";
    else wordsCountLabelNode.innerText = "Найдено " + getWordsAmountText(wordsCount);

    for (const category of categories) {
        const categoryNode: HTMLElement = categoriesNode.querySelector(".category_" + category.id)!;
        categoryNode.style.display = "none";

        const wordsNode = categoryNode.querySelector(".words")!;

        for (const child of wordsNode.children) {
            if ((child as HTMLElement).style.display !== "none") {
                categoryNode.style.display = "";
                break;
            }
        }

        const wordsCountNode: HTMLElement = categoryNode.querySelector(".words_count")!;
        const wordsCount = Array.from(wordsNode.children).reduce((acc: number, child) => acc + ((child as HTMLElement).style.display === "" ? 1 : 0), 0);
        wordsCountNode.innerText = getWordsAmountText(wordsCount);
    }
}

export default WordsSection;