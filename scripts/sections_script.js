let selectorsNode;
let searchNode;

document.addEventListener("DOMContentLoaded", () => {
    selectorsNode = document.querySelector("header .sections_selectors");
    searchNode = document.querySelector("header .search");

    toSection(sessionStorage.getItem("section"));

    for (const selectorNode of selectorsNode.querySelectorAll(".selector")) {
        let id = null;
        for (const cls of selectorNode.classList) {
            if (cls.endsWith("_selector")) {
                id = cls.replace("_selector", "");
                break;
            }
        }

        if (id == null) continue;
        selectorNode.addEventListener("click", () => toSection(id));
    }
});



if (sessionStorage.getItem("section") == null) sessionStorage.setItem("section", "words");

function toSection(id) {
    sessionStorage.setItem("section", id);

    for (const selectorNode of selectorsNode.querySelectorAll(".selector")) {
        if (selectorNode.classList.contains( id + "_selector")) selectorNode.classList.add("selected");
        else selectorNode.classList.remove("selected");
    }

    for (const sectionNode of document.querySelectorAll(".section")) {
        if (sectionNode.classList.contains( id + "_section")) sectionNode.style.display = "";
        else sectionNode.style.display = "none";
    }

    if (id === "grammars") document.title = "Китайский - Грамматика";
    else if (id == "words") document.title = "Китайский - Слова";
    else if (id == "exercises") document.title = "Китайский - Упражнения";
    else if (id == "settings") document.title = "Китайский - Настройки";
    else document.title = "Китайский";

    let hasInput = false;
    for (const inputNode of searchNode.querySelectorAll("input")) {
        if (inputNode.classList.contains(id + "_search")) {
            console.log(inputNode.classList);
            inputNode.style.display = "";
            hasInput = true;
        }
        else inputNode.style.display = "none";
    }

    if (!hasInput) {
        searchNode.style.display = "none";
        document.querySelector("body > ." + id + "_section").style.setProperty("--section-padding", "80px");
    }
    else {
        searchNode.style.display = "";
        document.querySelector("body > ." + id + "_section").style.setProperty("--section-padding", "157px");
    }
}