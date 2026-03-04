import React, { useEffect, useState } from "react";
import { getHue, getTheme, resetHue, setHue, setTheme, type Theme } from "../data/settings.ts";
import "../styles/settings_styles.css";

const SettingsSection = () => {
    useEffect(() => {
        setThemeAndUpdateTitle(getTheme());
        updateHue();
    });

    return (
        <div className="section settings_section">
            <div className="settings">
                <Setting id="hue" title="Цвет">
                    <HueSlider/>
                    <button className="reset_hue_button" onClick={() => { resetHue(); updateHueSlider(); }}>Сбросить</button>
                </Setting>

                <Setting id="theme" title="Тема">
                    <button className="toggle_theme_button" onClick={toggleTheme}>Сменить</button>
                </Setting>
            </div>
        </div>
    );
};

const Setting = ({id, title, children}: {id: string, title: string, children: any}) => {
    return (
        <div className={`${id} setting`}>
            <p className="title">{title}</p>
            {children}
        </div>
    );
};

const HueSlider = () => {
    const [value, setValue] = useState(getHue());
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
        updateHue();
    };

    return (
        <label>
            <input className="hue_slider" type="range" min="0" max="360" value={value} onChange={handleSliderChange}/>
        </label>
    );
};

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