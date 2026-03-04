import { categories } from "../../data/words.ts";
import { exerciseTypes } from "../../data/exercises.ts";
import React, { useRef, useState } from "react";
import {
    getExercisesAmount,
    getSelectedExerciseCategories, getSelectedExerciseTypes,
    setExercisesAmount, setSelectedExerciseCategories, setSelectedExerciseTypes, startExercises
} from "./ExercisesSection.tsx";

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
                    <path d="m424-305.85 290.92-290.92-60.15-60.15L424-426.15l-116-116L247.85-482 424-305.85ZM212.31-114q-41.03 0-69.67-28.64T114-212.31v-535.38q0-41.03 28.64-69.67T212.31-846h535.38q41.03 0 69.67 28.64T846-747.69v535.38q0 41.03-28.64 69.67T747.69-114H212.31Zm0-86h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM200-760v560-560Z"/>
                </svg>

                <svg className="unselect_all_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={unselectAll}>
                    <path d="m336-289 144-144 144 144 47-47-144-144 144-144-47-47-144 144-144-144-47 47 144 144-144 144 47 47ZM202.57-122.67q-32.52 0-56.21-23.69-23.69-23.69-23.69-56.21v-554.86q0-32.52 23.69-56.21 23.69-23.69 56.21-23.69h554.86q32.52 0 56.21 23.69 23.69 23.69 23.69 56.21v554.86q0 32.52-23.69 56.21-23.69 23.69-56.21 23.69H202.57Zm0-67.59h554.86q4.62 0 8.47-3.84 3.84-3.85 3.84-8.47v-554.86q0-4.62-3.84-8.47-3.85-3.84-8.47-3.84H202.57q-4.62 0-8.47 3.84-3.84 3.85-3.84 8.47v554.86q0 4.62 3.84 8.47 3.85 3.84 8.47 3.84Zm-12.31-579.48v579.48-579.48Z"/>
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