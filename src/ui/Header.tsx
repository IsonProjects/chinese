import type { InputEventHandler } from "react";
import toSection, { sections } from "../data/sections.ts";
import { filterWords } from "./WordsSection.tsx";
import { filterGrammars } from "./GrammarsSection.tsx";
import "../styles/header_styles.css";

const Header = () => {
    return (
        <header>
            <div className="row sections_selectors">
                { sections.map(section => <SectionSelector id={section.id} title={section.name} path={section.iconPath} key={section.id}/>) }
            </div>

            <div className="row search">
                <SearchBar id="words" onInput={filterWords}/>
                <SearchBar id="grammars" onInput={filterGrammars}/>
            </div>
        </header>
    );
};

const SectionSelector = ({id, title, path} : {id: string, title: string, path: string}) => {
    return (
        <div className={`selector ${id}_selector`} onClick={() => toSection(id)}>
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d={path}/>
            </svg>

            <p className="title">{title}</p>
        </div>
    );
};

const SearchBar = ({id, onInput}: {id: string, onInput: InputEventHandler<HTMLInputElement>}) => {
    return (
        <label>
            <input className={`${id}_search`} placeholder="Поиск" onInput={onInput}/>
        </label>
    );
};

export default Header;