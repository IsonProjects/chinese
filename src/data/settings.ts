if (localStorage.getItem("theme") == null) {
    localStorage.setItem("theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

if (localStorage.getItem("hue") == null) {
    localStorage.setItem("hue", "230");
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
    setTheme(event.matches ? "dark" : "light");
});



export type Theme = "light" | "dark";

export function getTheme(): Theme {
    return localStorage.getItem("theme") as Theme;
}

export function setTheme(theme: Theme) {
    localStorage.setItem("theme", theme);
    document.documentElement.style.colorScheme = theme;
}



export type Hue = number;

export function getHue(): Hue {
    return Number(localStorage.getItem("hue"));
}

export function setHue(hue: Hue) {
    const stringHue = String(hue);
    localStorage.setItem("hue", stringHue);
    document.documentElement.style.setProperty("--color-hue", stringHue);
}

export function resetHue() {
    setHue(230);
}