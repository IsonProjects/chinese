import { exercisesIcon, grammarsIcon, settingsIcon, wordsIcon } from "../ui/icons.ts";
import WordsSection, { handleWordsSearchInput } from "../ui/WordsSection.tsx";
import React, { type ReactElement } from "react";
import GrammarsSection, { handleGrammarsSearchInput } from "../ui/GrammarsSection.tsx";
import ExercisesSection from "../ui/exercises/ExercisesSection.tsx";
import SettingsSection from "../ui/SettingsSection.tsx";

if (sessionStorage.getItem("section") == null) sessionStorage.setItem("section", "words");



export const sections: Section[] = [];

export interface Section {
    id: string;
    name: string;
    iconPath: string;
    node: () => ReactElement;
    onSearch?: (e: React.InputEvent<HTMLInputElement>) => void;
}

function addSection(id: string, name: string, iconPath: string, node: () => ReactElement, onSearch?: (e: React.InputEvent<HTMLInputElement>) => void) {
    sections.push({
        id: id,
        name: name,
        iconPath: iconPath,
        node: node,
        onSearch: onSearch
    });
}

export function findSection(id: string): Section | undefined {
    return sections.find(section => section.id == id);
}



addSection("words", "Слова", wordsIcon, WordsSection, handleWordsSearchInput);
addSection("grammars", "Грамматика", grammarsIcon, GrammarsSection, handleGrammarsSearchInput);
addSection("exercises", "Упражнения", exercisesIcon, ExercisesSection);
addSection("settings", "Настройки", settingsIcon, SettingsSection);

function toSection(id: string) {
    const section = findSection(id);
    if (section == null) {
        console.error(`Failed to find section with id ${id}`);
        return;
    }

    sessionStorage.setItem("section", id);

    const selectorsNode = document.querySelector("header .sections_selectors")!;
    const searchNode: HTMLElement = document.querySelector("header .search")!;

    for (const selectorNode of selectorsNode.querySelectorAll(".selector")) {
        if (selectorNode.classList.contains(id + "_selector")) selectorNode.classList.add("selected");
        else selectorNode.classList.remove("selected");
    }

    for (const sectionNode of document.querySelectorAll(".section") as NodeListOf<HTMLElement>) {
        if (sectionNode.classList.contains( id + "_section")) sectionNode.style.display = "";
        else sectionNode.style.display = "none";
    }

    document.title = "Китайский - " + section.name;
    searchNode.style.display = "none";

    for (const inputNode of searchNode.querySelectorAll("input")) {
        if (inputNode.classList.contains(id + "_search")) {
            inputNode.parentElement!.style.display = "";
            searchNode.style.display = "";
        }
        else inputNode.parentElement!.style.display = "none";
    }
}

export default toSection;