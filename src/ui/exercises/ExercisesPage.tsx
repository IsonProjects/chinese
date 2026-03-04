import React, { type RefObject, useRef } from "react";
import { getExercisesAmount, setActionButtonRef, setProgressBarRef, stopExercises } from "./ExercisesSection.tsx";
import { type Exercise, findExerciseType } from "../../data/exercises.ts";

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
                    <path d="M252-189.85 191.85-252l227-228-227-230L252-772.15l229 230 227-230L768.15-710l-227 230 227 228L708-189.85l-227-230-229 230Z"/>
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