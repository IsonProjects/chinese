import React, { memo } from "react";
import { type Example, filterGrammars, type Grammar, grammars } from "../data/grammars.ts";
import Sentence from "./Sentence.tsx";
import "../styles/grammars.css";

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
    return (
        <div className="example">
            <p className="construction selectable_text chinese_text">{example.construction}</p>
            <Sentence sentence={example.sentence}/>
            <p className="translation selectable_text">{example.translation}</p>
        </div>
    );
});



export function handleGrammarsSearchInput(e: React.InputEvent<HTMLInputElement>) {
    const searchValue = (e.target as HTMLInputElement).value.toLowerCase().replaceAll(" ", "");
    const filteredGrammars = filterGrammars(searchValue);

    const grammarsNode = document.querySelector(".grammars_section .grammars")!;

    for (const grammar of grammars) {
        const grammarNode: HTMLElement = grammarsNode.querySelector(".grammar_" + grammar.id)!;
        grammarNode.classList.toggle("hidden", !filteredGrammars.includes(grammar));
    }
}

export default GrammarsSection;