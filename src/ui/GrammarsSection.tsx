import React, { memo, useCallback } from "react";
import { pronounce } from "../utils.ts";
import { type Word, words } from "../data/words.ts";
import { type Example, type Grammar, grammars } from "../data/grammars.ts";
import "../styles/grammars_styles.css";
import { speakerIcon } from "./icons.ts";

const GrammarsSection = () => {
    return (
        <div className="section grammars_section">
            <div className="grammars">
                <p className="not_found_label">Ничего не найдено</p>
                { grammars.map((grammar) => <Grammar grammar={grammar} key={"grammar_" + grammar.id}/>) }
            </div>
        </div>
    );
};

const Grammar = memo(({grammar}: {grammar: Grammar}) => {
    return (
        <div className={`grammar grammar_${grammar.id}`}>
            <p className="name">{grammar.name}</p>
            <div className="examples">
                { grammar.examples.map(example => <Example example={example} key={"example_" + example.sentence}/>) }
            </div>
        </div>
    );
});

const Example = memo(({example}: {example: Example}) => {
    const elements = [];
    const tokens = parse(example.sentence);

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        elements.push(token.valid ?
            <TranslatedSentenceWord word={token.word} key={"word_" + i}/> :
            <SentenceWord word={token.word} key={"word_" + i}/>
        );
    }

    const handleClick = useCallback(() => {
        pronounce(example.sentence);
    }, [example.sentence]);

    return (
        <div className="example">
            <p className="construction selectable_text chinese_text">{example.construction}</p>

            <div className="sentence">
                { elements }

                <svg className="speak_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={handleClick}>
                    <path d={speakerIcon}/>
                </svg>
            </div>

            <p className="translation selectable_text">{example.translation}</p>
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
            const infoNodes = document.querySelectorAll(".grammars .grammar .example .sentence .sentence_word .info");

            for (const otherInfoNode of infoNodes) {
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



export function filterGrammars(e: React.InputEvent<HTMLInputElement>) {
    const searchValue = (e.target as HTMLInputElement).value.toLowerCase().replaceAll(" ", "");
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

    const grammarsNode = document.querySelector(".grammars_section .grammars")!;
    grammarsNode.classList.add("not_found");

    for (const grammar of grammars) {
        const grammarNode: HTMLElement = grammarsNode.querySelector(".grammar_" + grammar.id)!;

        if (filteredGrammars.includes(grammar.id)) {
            grammarNode.style.display = "";
            grammarsNode.classList.remove("not_found");
        }
        else grammarNode.style.display = "none";
    }
}



type InvalidToken = { valid: false, word: string };
type ValidToken = { valid: true, word: Word };
type Token = InvalidToken | ValidToken;

function parse(sentence: string): Token[] {
    const tokens: Token[] = [];

    for (let i = 0; i < sentence.length; i++) {
        const string = sentence.substring(i);
        let token: ValidToken | null = null;

        for (const word of words) {
            const matcher = string.match("^" + word.character);

            if (matcher != null) {
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

export default GrammarsSection;