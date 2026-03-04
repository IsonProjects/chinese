if (sessionStorage.getItem("section") == null) sessionStorage.setItem("section", "words");

function toSection(id: string) {
    sessionStorage.setItem("section", id);

    const selectorsNode: HTMLElement = document.querySelector("header .sections_selectors")!;
    const searchNode: HTMLElement = document.querySelector("header .search")!;

    for (const selectorNode of selectorsNode.querySelectorAll(".selector")) {
        if (selectorNode.classList.contains( id + "_selector")) selectorNode.classList.add("selected");
        else selectorNode.classList.remove("selected");
    }

    for (const sectionNode of document.querySelectorAll(".section") as NodeListOf<HTMLElement>) {
        if (sectionNode.classList.contains( id + "_section")) sectionNode.style.display = "";
        else sectionNode.style.display = "none";
    }

    if (id === "grammars") document.title = "Китайский - Грамматика";
    else if (id === "words") document.title = "Китайский - Слова";
    else if (id === "exercises") document.title = "Китайский - Упражнения";
    else if (id === "settings") document.title = "Китайский - Настройки";
    else document.title = "Китайский";

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