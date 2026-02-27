if (localStorage.getItem("theme") == null) localStorage.setItem("theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (localStorage.getItem("hue") == null) localStorage.setItem("hue", "230");

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
    localStorage.setItem("theme", event.matches ? "dark" : "light");
    updateTheme();
});


document.addEventListener("DOMContentLoaded", () => {
    themeTitleNode = document.querySelector(".settings_section .theme .title");

    updateTheme();
    updateHue();

    document.querySelector(".settings_section .toggle_theme_button").addEventListener("click", () => {
        localStorage.setItem("theme", localStorage.getItem("theme") === "light" ? "dark" : "light");
        updateTheme();
    });


    const hueSliderNode = document.querySelector(".settings_section .hue_slider");
    hueSliderNode.value = localStorage.getItem("hue");

    hueSliderNode.addEventListener("input", () => {
        localStorage.setItem("hue", hueSliderNode.value);
        updateHue();
    });
});



let themeTitleNode

function updateTheme() {
    const theme = localStorage.getItem("theme");
    themeTitleNode.innerText = theme === "light" ? "Светлая тема" : "Тёмная тема";
    document.documentElement.style.colorScheme = theme;
}

function updateHue() {
    document.documentElement.style.setProperty("--color-hue", localStorage.getItem("hue"));
}