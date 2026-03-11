import type { InputEventHandler } from "react";
import toSection, { sections } from "../data/sections.ts";
import "../styles/header.css";

const Header = () => {
    return (
        <header>
            <div className="row sections_selectors">
                { sections.map(section => <SectionSelector id={section.id} title={section.name} path={section.iconPath} key={"section_" + section.id}/>) }
            </div>

            <div className="row search">
                { sections
                    .filter(section => section.onSearch != null)
                    .map(section => <SearchBar id={section.id} onInput={section.onSearch!} key={"search_" + section.id}/>)
                }
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