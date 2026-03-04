import React from "react";
import { pronounce } from "../utils.ts";
import { type Word, words } from "../data/words.ts";
import { type Example, type Grammar, grammars } from "../data/grammars.ts";
import "../styles/grammars_styles.css";

const GrammarsSection = () => {
    return (
        <div className="section grammars_section">
            <div className="grammars">
                <p className="not_found_label">Ничего не найдено</p>
                { grammars.map((grammar) => Grammar(grammar)) }
            </div>
        </div>
    );
};

const Grammar = (grammar: Grammar) => {
    return (
        <div className={`grammar grammar_${grammar.id}`} key={grammar.id}>
            <p className="name">{grammar.name}</p>
            <div className="examples">
                { grammar.examples.map(example => Example(example)) }
            </div>
        </div>
    );
};

const Example = (example: Example) => {
    const elements = [];
    const tokens = parse(example.sentence);

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const word = token.word;
        let node;

        if (token.valid) node = TranslatedSentenceWord({word: word as Word, i: i});
        else node = SentenceWord({word: word as string, i: i});

        elements.push(node);
    }

    return (
        <div className="example" key={example.sentence}>
            <p className="construction selectable_text chinese_text">{example.construction}</p>

            <div className="sentence">
                { elements }

                <svg className="speak_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={() => pronounce(example.sentence)}>
                    <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/>
                </svg>
            </div>

            <p className="translation selectable_text">{example.translation}</p>
        </div>
    );
};

const SentenceWord = ({word, i}: {word: string, i: number}) => {
    return (
        <div className="sentence_word" key={i}>
            <span className="character selectable_text chinese_text">{word}</span>
        </div>
    );
};

const TranslatedSentenceWord = ({word, i}: {word: Word, i: number}) => {
    function onClick(e: React.MouseEvent<HTMLSpanElement>) {
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
    }

    return (
        <div className="sentence_word translated" key={i}>
            <span className="character selectable_text chinese_text" onClick={onClick}>{word.character}</span>

            <div className="info">
                <p className="pinyin selectable_text">{word.pinyin}</p>
                <p className="translation selectable_text">{word.translation.join(", ")}</p>
            </div>
        </div>
    );
};



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



function parse(sentence: string) {
    const tokens = [];

    for (let i = 0; i < sentence.length; i++) {
        const string = sentence.substring(i);
        let token = null;

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

            if (char !== " " && char !== "." && char !== "!" && char !== "?") {
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