import React, { memo, useCallback } from "react";
import { parseSentence, type Word } from "../data/words.ts";
import { pronounce } from "../utils.ts";
import { speakerIcon } from "./icons.ts";
import "../styles/sentence.css";

const Sentence = memo(({sentence}: {sentence: string}) => {
    const words = [];
    const tokens = parseSentence(sentence);

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        words.push(token.valid ?
            <TranslatedSentenceWord word={token.word} key={"word_" + i}/> :
            <SentenceWord word={token.word} key={"word_" + i}/>
        );
    }

    const handleClick = useCallback(() => {
        pronounce(sentence);
    }, [sentence]);

    return (
        <div className="sentence">
            { words }

            <svg className="speak_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={handleClick}>
                <path d={speakerIcon}/>
            </svg>
        </div>
    );
});

const SentenceWord = memo(({word}: {word: string}) => {
    return (
        <div className="sentence_word">
            <span className="character selectable_text chinese_text">{word}</span>
        </div>
    );
});

const TranslatedSentenceWord = memo(({word}: {word: Word}) => {
    const handleClick = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
        const parent = (e.target as HTMLSpanElement).parentElement!;

        const infoNode = parent.querySelector(".info") as HTMLElement;
        infoNode.classList.toggle("show");

        if (infoNode.classList.contains("show")) {
            pronounce(word.character);

            for (const otherInfoNode of document.querySelectorAll(".sentence .sentence_word .info")) {
                if (otherInfoNode !== infoNode) otherInfoNode.classList.remove("show");
            }
        }
    }, [word.character]);

    return (
        <div className="sentence_word translated">
            <span className="character selectable_text chinese_text" onClick={handleClick}>{word.character}</span>

            <div className="info">
                <p className="pinyin selectable_text">{word.pinyin}</p>
                <p className="translation selectable_text">{word.translations.join(", ")}</p>
            </div>
        </div>
    );
});

export default Sentence;