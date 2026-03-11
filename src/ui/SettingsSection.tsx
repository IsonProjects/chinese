import React, { memo, type RefObject, useCallback, useEffect, useRef, useState } from "react";
import { getHue, getTheme, resetHue, setHue, setTheme, type Theme } from "../data/settings.ts";
import "../styles/settings.css";

let themeTitleRef: RefObject<HTMLParagraphElement | null>;
let hueSliderRef: RefObject<HTMLInputElement | null>;

const SettingsSection = () => {
    useEffect(() => {
        setThemeAndUpdateTitle(getTheme());
    });

    const handleResetHue = useCallback(() => {
        resetHue();
        updateHueSlider();
    }, []);

    themeTitleRef = useRef(null);
    hueSliderRef = useRef(null);

    return (
        <div className="section settings_section">
            <div className="settings">
                <Setting id="hue" title="Цвет">
                    <HueSlider ref={hueSliderRef}/>
                    <button className="reset_hue_button" onClick={handleResetHue}>Сбросить</button>
                </Setting>

                <Setting id="theme" title="Тема" titleRef={themeTitleRef}>
                    <button className="toggle_theme_button" onClick={toggleTheme}>Сменить</button>
                </Setting>
            </div>
        </div>
    );
};

const Setting = memo(({id, title, titleRef, children}: {id: string, title: string, titleRef?: RefObject<HTMLParagraphElement | null>, children: any}) => {
    return (
        <div className={`${id} setting`}>
            <p className="title" ref={titleRef}>{title}</p>
            {children}
        </div>
    );
});

const HueSlider = memo(({ref}: {ref: RefObject<HTMLInputElement | null>}) => {
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
                className="hue_slider" ref={ref}
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
    themeTitleRef.current!.innerText = theme === "light" ? "Светлая тема" : "Тёмная тема";
}

function updateHue() {
    setHue(Number(hueSliderRef.current!.value));
}

function updateHueSlider() {
    hueSliderRef.current!.value = String(getHue());
}