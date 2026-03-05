import React, { memo, useCallback, useEffect, useState } from "react";
import { getHue, getTheme, resetHue, setHue, setTheme, type Theme } from "../data/settings.ts";
import "../styles/settings_styles.css";

const SettingsSection = () => {
    useEffect(() => {
        setThemeAndUpdateTitle(getTheme());
        updateHue();
    });

    const handleResetHue = useCallback(() => {
        resetHue();
        updateHueSlider();
    }, []);

    return (
        <div className="section settings_section">
            <div className="settings">
                <Setting id="hue" title="Цвет">
                    <HueSlider/>
                    <button className="reset_hue_button" onClick={handleResetHue}>Сбросить</button>
                </Setting>

                <Setting id="theme" title="Тема">
                    <button className="toggle_theme_button" onClick={toggleTheme}>Сменить</button>
                </Setting>
            </div>
        </div>
    );
};

const Setting = memo(({id, title, children}: {id: string, title: string, children: any}) => {
    return (
        <div className={`${id} setting`}>
            <p className="title">{title}</p>
            {children}
        </div>
    );
});

const HueSlider = memo(() => {
    const [value, setValue] = useState(getHue());

    const handleSliderChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
        updateHue();
    }, []);

    const disableTransitions = useCallback(() => {
        const style = document.createElement("style");
        style.innerHTML = "* { transition: none !important; }";
        style.id = "disable-transitions";
        document.head.appendChild(style);
    }, []);

    const enableTransitions = useCallback(() => {
        const style = document.getElementById("disable-transitions");
        style?.remove();
    }, []);

    return (
        <label>
            <input
                className="hue_slider"
                type="range" min="0" max="360"
                onPointerDown={disableTransitions} onPointerUp={enableTransitions}
                value={value} onChange={handleSliderChange}
            />
        </label>
    );
});

export default SettingsSection;



function toggleTheme() {
    const theme = getTheme() === "light" ? "dark" : "light";
    setThemeAndUpdateTitle(theme);
}

function setThemeAndUpdateTitle(theme: Theme) {
    setTheme(theme);
    const themeTitleNode: HTMLElement = document.querySelector(".settings_section .theme .title")!;
    themeTitleNode.innerText = theme === "light" ? "Светлая тема" : "Тёмная тема";
}

function updateHue() {
    const hueSliderNode: HTMLInputElement = document.querySelector(".settings_section .hue_slider")!;
    setHue(Number(hueSliderNode.value));
}

function updateHueSlider() {
    const hueSliderNode: HTMLInputElement = document.querySelector(".settings_section .hue_slider")!;
    hueSliderNode.value = String(getHue());
}