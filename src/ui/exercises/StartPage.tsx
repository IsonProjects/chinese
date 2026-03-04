import { categories } from "../../data/words.ts";
import { exerciseTypes } from "../../data/exercises.ts";
import React, { useRef, useState } from "react";
import {
    getExercisesAmount,
    getSelectedExerciseCategories, getSelectedExerciseTypes,
    setExercisesAmount, setSelectedExerciseCategories, setSelectedExerciseTypes, startExercises
} from "./ExercisesSection.tsx";
import { selectAllIcon, unselectAllIcon } from "../icons.ts";

const StartPage = () => {
    const ref = useRef<HTMLDivElement>(null);

    const categoriesElements = categories.map(category => <SettingsSelector
        type="category"
        id={category.id}
        name={category.name}
        onChange={(checkboxNode: HTMLInputElement) => {
            if (checkboxNode.checked) getSelectedExerciseCategories().add(category.id);
            else getSelectedExerciseCategories().delete(category.id);
            localStorage.setItemJson("selected_exercise_categories", [...getSelectedExerciseCategories()]);
        }}
        checked={getSelectedExerciseCategories().has(category.id)}
        key={category.id}
    />);

    const selectAllCategories = () => {
        setSelectedExerciseCategories(new Set(categories.map(category => category.id)));
        ref.current?.querySelectorAll(".categories_selectors input").forEach(input => (input as HTMLInputElement).checked = true);
        localStorage.setItemJson("selected_exercise_categories", [...getSelectedExerciseCategories()]);
    };

    const unselectAllCategories = () => {
        setSelectedExerciseCategories(new Set());
        ref.current?.querySelectorAll(".categories_selectors input").forEach(input => (input as HTMLInputElement).checked = false);
        localStorage.setItemJson("selected_exercise_categories", [...getSelectedExerciseCategories()]);
    };

    const typesElements = exerciseTypes.map(exerciseType => <SettingsSelector
        type="type"
        id={exerciseType.id}
        name={exerciseType.name}
        onChange={(checkboxNode: HTMLInputElement) => {
            if (checkboxNode.checked) getSelectedExerciseTypes().add(exerciseType.id);
            else getSelectedExerciseTypes().delete(exerciseType.id);
            localStorage.setItemJson("selected_exercise_types", [...getSelectedExerciseTypes()]);
        }}
        checked={getSelectedExerciseTypes().has(exerciseType.id)}
        key={exerciseType.id}
    />);

    const selectAllTypes = () => {
        setSelectedExerciseTypes(new Set(exerciseTypes.map(exerciseType => exerciseType.id)));
        ref.current?.querySelectorAll(".types_selectors input").forEach(input => (input as HTMLInputElement).checked = true);
        localStorage.setItemJson("selected_exercise_types", [...getSelectedExerciseTypes()]);
    };

    const unselectAllTypes = () => {
        setSelectedExerciseCategories(new Set());
        ref.current?.querySelectorAll(".types_selectors input").forEach(input => (input as HTMLInputElement).checked = false);
        localStorage.setItemJson("selected_exercise_types", [...getSelectedExerciseTypes()]);
    };

    const [value, setValue] = useState(String(getExercisesAmount()));
    const handleAmountInput = (event: React.InputEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        setValue(value);
        if (!value) return;
        setExercisesAmount(Number.parseInt(value));
        localStorage.setItem("exercises_amount", value);
    };

    const handleStartExercises = () => {
        if (getSelectedExerciseCategories().size === 0) return;
        if (getSelectedExerciseTypes().size === 0) return;
        if (getExercisesAmount() < 1) return;
        startExercises();
    };

    return (
        <div className="exercises_start_page" ref={ref}>
            <div className="exercises_settings">
                <SelectableSettingsSection id="categories" title="Категории слов" selectAll={selectAllCategories} unselectAll={unselectAllCategories}>
                    <div className="categories_selectors settings_selectors">{categoriesElements}</div>
                </SelectableSettingsSection>

                <SelectableSettingsSection id="types" title="Типы упражнений" selectAll={selectAllTypes} unselectAll={unselectAllTypes}>
                    <div className="types_selectors settings_selectors">{typesElements}</div>
                </SelectableSettingsSection>

                <SimpleSettingsSection title="Количество упражнений">
                    <label>
                        <input className="exercises_amount_input" type="number" min="1" placeholder="Число" value={value} onInput={handleAmountInput}/>
                    </label>
                </SimpleSettingsSection>
            </div>

            <button className="start_exercises_button" onClick={handleStartExercises}>Начать</button>
        </div>
    );
};

const SelectableSettingsSection = ({id, title, children, selectAll, unselectAll}: {id: string, title: string, children: any, selectAll: () => void, unselectAll: () => void}) => {
    const handleTitleClick = (event: React.MouseEvent<HTMLElement>) => {
        (event.target as HTMLInputElement).parentElement?.parentElement?.classList.toggle("collapsed");
    };

    return (
        <div className={`${id}_settings settings_section collapsed`}>
            <div className="top">
                <p className="title" onClick={handleTitleClick}>{title}</p>
                <div className="space"></div>

                <svg className="select_all_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={selectAll}>
                    <path d={selectAllIcon}/>
                </svg>

                <svg className="unselect_all_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={unselectAll}>
                    <path d={unselectAllIcon}/>
                </svg>
            </div>

            { children}
        </div>
    );
};

const SimpleSettingsSection = ({title, children}: {title: string, children: any}) => {
    return (
        <div className="settings_section">
            <div className="top">
                <p className="title">{title}</p>
            </div>

            { children }
        </div>
    );
};

const SettingsSelector = ({type, id, name, onChange, checked}: { type: string, id: string, name: string, onChange: (checkboxNode: HTMLInputElement) => void, checked: boolean }) => {
    const [value, setValue] = useState(checked);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.checked);
        onChange(event.target as HTMLInputElement);
    };

    return (
        <div className={`${type}_selector settings_selector`}>
            <input className="checkbox" type="checkbox" id={`${id}_${type}_checkbox`} onChange={handleCheckboxChange} checked={value}/>
            <label className="name" htmlFor={`${id}_${type}_checkbox`}>{name}</label>
        </div>
    );
};

export default StartPage;