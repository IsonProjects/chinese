import React, { memo, type RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getWordsAmountText, pronounce } from "../utils.ts"
import { type Category, categories, words, type Word, PartOfSpeech, filterWords } from "../data/words.ts";
import "../styles/words_styles.css";
import { closeIcon, speakerIcon } from "./icons.ts";

let setDialog: (dialog: any) => void;

const WordsSection = () => {
    const wordsByCategory = useMemo(() =>
            words.reduce((acc, word) => {
                if (!acc[word.category]) acc[word.category] = [];
                acc[word.category].push(word);
                return acc;
            }, {} as Record<string, Word[]>),
    []);

    const [Dialog, setDialogFunction] = useState(null);
    setDialog = setDialogFunction;

    return (
        <div className="section words_section">
            <div className="categories">
                <p className="words_count_label">Всего {getWordsAmountText(words.length)}</p>
                { categories.map((category) => <Category category={category} words={wordsByCategory[category.id]} key={"category_" + category.id}/>) }
            </div>

            { Dialog }
        </div>
    );
};

const Category = memo(({category, words}: {category: Category, words: Word[]}) => {
    return (
        <div className={`category category_${category.id}`}>
            <div className="info">
                <p className="name">{category.name}</p>
                <p className="words_count">{getWordsAmountText(words.length)}</p>
            </div>

            <div className="words">
                { words.map(word => <Word word={word} key={"word_" + word.id}/>) }
            </div>
        </div>
    );
});

const Word = memo(({word}: {word: Word}) => {
    const handleClick = useCallback(() => {
        const selection = window.getSelection();
        if (selection?.type == "Range") return;

        setDialog(<WordDialog word={word}/>);
    }, [word.character]);

    return (
        <div className={`word word_${word.id}`} onClick={handleClick}>
            <p className="character selectable_text chinese_text">{word.character}</p>
            <p className="info selectable_text">{word.pinyin} - {word.translations.join(", ")}</p>
        </div>
    );
});

const WordDialog = memo(({word}: {word: Word}) => {
    let dialogRef: RefObject<HTMLDialogElement | null> = useRef(null);

    useEffect(() => {
        dialogRef.current!.showModal();
    }, []);

    const handleDialogClose = useCallback(() => {
        setDialog(null);
    }, []);

    const handleSpeakerClick = useCallback(() => {
        pronounce(word.character);
    }, [word.character]);

    return (
        <dialog ref={dialogRef} onClose={handleDialogClose}>
            <div className="word_dialog">
                <svg className="close_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={handleDialogClose}>
                    <path d={closeIcon}/>
                </svg>

                <div className="info">
                    <p className="character selectable_text chinese_text">{word.character}</p>

                    <div className="pinyin_line">
                        <p className="pinyin selectable_text">{word.pinyin}</p>

                        <svg className="speak_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={handleSpeakerClick}>
                            <path d={speakerIcon}/>
                        </svg>
                    </div>
                </div>


                <div className="box">
                    <p className="title">Часть речи</p>

                    <div className="contents">
                        {
                            word.partsOfSpeech.map(partOfSpeech => {
                                return <p className="content selectable_text" key={partOfSpeech}>{PartOfSpeech[partOfSpeech]}</p>;
                            })
                        }
                    </div>
                </div>

                <div className="box">
                    <p className="title">Перевод</p>

                    <div className="contents">
                        {
                            word.translations.map(translation => {
                                return <p className="content selectable_text" key={translation}>{translation}</p>;
                            })
                        }
                    </div>
                </div>

                {
                    word.note == null ? null :
                    <div className="box note_box">
                        <p className="title">Примечание</p>
                        <p className="note">{word.note}</p>
                    </div>
                }

                {
                    word.examples == null ? null :
                    <div className="box">
                        <p className="title">Примеры</p>

                        <div className="contents">
                            {
                                word.examples.map(example => {
                                    return (
                                        <div className="content" key={example.sentence}>
                                            <p className="sentence">{example.sentence}</p>
                                            <p className="translation">{example.translation}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </dialog>
    );
});



export function handleWordsSearchInput(e: React.InputEvent<HTMLInputElement>) {
    const searchValue = (e.target as HTMLInputElement).value.toLowerCase().replaceAll(" ", "");
    const filteredWords = filterWords(searchValue);

    const categoriesNode = document.querySelector(".words_section .categories")!;
    const wordsCountLabelNode: HTMLElement = categoriesNode.querySelector(".words_count_label")!;

    for (const word of words) {
        const wordNode = categoriesNode.querySelector(`.words .word_${word.id}`)!;
        wordNode.classList.toggle("hidden", !filteredWords.includes(word));
    }

    const wordsCount = filteredWords.length;
    if (wordsCount === words.length) wordsCountLabelNode.innerText = "Всего " + getWordsAmountText(wordsCount);
    else if (wordsCount === 0) wordsCountLabelNode.innerText = "Ничего не найдено";
    else wordsCountLabelNode.innerText = "Найдено " + getWordsAmountText(wordsCount);

    for (const category of categories) {
        const wordsCountNode: HTMLElement = categoriesNode.querySelector(`.category_${category.id} .words_count`)!;
        const wordsCount = filteredWords.filter(word => word.category == category.id).length;
        wordsCountNode.innerText = getWordsAmountText(wordsCount);
    }
}

export default WordsSection;