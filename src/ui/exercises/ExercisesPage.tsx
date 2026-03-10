import React, { type RefObject, useRef } from "react";
import { getExercisesAmount, setActionButtonRef, setProgressBarRef, stopExercises } from "./ExercisesSection.tsx";
import { type Exercise, findExerciseType } from "../../data/exercises.ts";
import { crossIcon } from "../icons.ts";

const ExercisesPage = ({exercise}: {exercise: Exercise}) => {
    const progressBarRef = useRef(null);
    setProgressBarRef(progressBarRef);

    const actionButtonRef = useRef(null);
    setActionButtonRef(actionButtonRef);

    const exerciseType = findExerciseType(exercise.type)!;
    const LayoutNode = exerciseType.layout;

    return (
        <div className="exercises_page">
            <div className="header">
                <svg className="close_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={stopExercises}>
                    <path d={crossIcon}/>
                </svg>

                <progress className="progress_bar" value={0} max={getExercisesAmount()} ref={progressBarRef}/>
            </div>

            <div className="exercise">
                <p className="title">{exerciseType.title}</p>
                <LayoutNode exercise={exercise} key={exercise.index}/>
            </div>

            <div className="footer">
                <ActionButton ref={actionButtonRef}/>
            </div>
        </div>
    );
};

const ActionButton = ({ref}: { ref: RefObject<HTMLButtonElement | null> }) => {
    return (
        <button className="action_button" ref={ref} disabled={true}>Ответить</button>
    );
};

export default ExercisesPage;