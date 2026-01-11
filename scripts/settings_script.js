if (localStorage.getItem("theme") == null) localStorage.setItem("theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
    localStorage.setItem("theme", event.matches ? "dark" : "light");
    updateColorScheme();
});

document.addEventListener("DOMContentLoaded", () => {
    updateColorScheme();

    document.querySelector(".toggle_theme_button").addEventListener("click", () => {
        localStorage.setItem("theme", localStorage.getItem("theme") == "dark" ? "light" : "dark");
        updateColorScheme();
    });
});

function updateColorScheme() {
    document.documentElement.style.colorScheme = localStorage.getItem("theme");
}