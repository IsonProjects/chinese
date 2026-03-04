import React, { type ReactElement, type RefObject, useState } from "react";
import { getTime, shuffle } from "../../utils.ts";
import { words } from "../../data/words.ts";
import { type Exercise, findExerciseType } from "../../data/exercises.ts";
import StartPage from "./StartPage.tsx";
import ExercisesPage from "./ExercisesPage.tsx";
import ResultsPage from "./ResultsPage.tsx";
import "../../styles/exercises_styles.css";

let selectedExerciseCategories: Set<string> = new Set(localStorage.getItemOrDefault("selected_exercise_categories", []));
let selectedExerciseTypes: Set<string> = new Set(localStorage.getItemOrDefault("selected_exercise_types", []));
let exercisesAmount: number = localStorage.getItemOrDefault("exercises_amount", 5);

export function getSelectedExerciseCategories() {
    return selectedExerciseCategories;
}

export function setSelectedExerciseCategories(value: Set<string>) {
    selectedExerciseCategories = value;
}

export function getSelectedExerciseTypes() {
    return selectedExerciseTypes;
}

export function setSelectedExerciseTypes(value: Set<string>) {
    selectedExerciseTypes = value;
}

export function getExercisesAmount() {
    return exercisesAmount;
}

export function setExercisesAmount(value: number) {
    exercisesAmount = value;
}

export function setProgressBarRef(ref: RefObject<HTMLProgressElement | null>) {
    progressBarRef = ref;
}

export function getActionButtonRef() {
    return actionButtonRef;
}

export function setActionButtonRef(ref: RefObject<HTMLButtonElement | null>) {
    actionButtonRef = ref;
}

let exercises: Exercise[] = [];
let exerciseIndex = 0;
let startTime: Date | null = null;
let exercisesCorrectAmount = 0;

let setPage: (page: ReactElement) => void;
let progressBarRef: RefObject<HTMLProgressElement | null>;
let actionButtonRef: RefObject<HTMLButtonElement | null>;

const ExercisesSection = () => {
    const [page, setPageState] = useState(<StartPage/>);
    setPage = setPageState;

    return (
        <div className="section exercises_section">
            {page}
        </div>
    );
};


function resetExercises() {
    exercises = [];
    exerciseIndex = 0;
    startTime = null;
    exercisesCorrectAmount = 0;
}

export function startExercises() {
    resetExercises();
    startTime = new Date();
    generateExercises();
    loadExercise();
}

export function stopExercises() {
    resetExercises();
    setPage(<StartPage/>);
}

function generateExercises() {
    const availableWords = [];
    for (const word of words) {
        if (selectedExerciseCategories.has(word.category)) {
            availableWords.push(word);
        }
    }

    const shuffledExerciseTypes = Array.from(selectedExerciseTypes);
    shuffle(shuffledExerciseTypes);

    for (let i = 0; i < exercisesAmount; i++) {
        const exerciseTypeId = shuffledExerciseTypes[i % shuffledExerciseTypes.length];
        const content = findExerciseType(exerciseTypeId)!.generate(availableWords);

        exercises.push({
            index: i,
            type: exerciseTypeId,
            content: content
        });
    }

    shuffle(exercises);
}

function loadExercise() {
    const exercise = exercises[exerciseIndex];
    setPage(<ExercisesPage exercise={exercise}/>);
}

export function exerciseFinished(correct: boolean) {
    exerciseIndex++;
    if (correct) exercisesCorrectAmount++;

    const exercisesActionButtonNode = actionButtonRef.current!;
    exercisesActionButtonNode.style.display = "";
    exercisesActionButtonNode.disabled = false;
    progressBarRef.current!.value = exerciseIndex;

    if (exerciseIndex < exercisesAmount) {
        exercisesActionButtonNode.innerText = "Дальше";
        exercisesActionButtonNode.onclick = () => loadExercise();
        return;
    }

    exercisesActionButtonNode.innerText = "Завершить";
    exercisesActionButtonNode.onclick = () => {
        const time = getTime(new Date().getTime() - startTime!.getTime());
        setPage(<ResultsPage time={time} correctAmount={exercisesCorrectAmount} allAmount={exercisesAmount}/>);
    };
}

export default ExercisesSection;