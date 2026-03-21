import type { Exercise } from "../../../data/exercises.ts";
import React, { type RefObject, useCallback, useEffect, useRef, useState } from "react";
import { pronounce } from "../../../utils.ts";
import { exerciseFinished, getActionButtonRef } from "../ExercisesSection.tsx";
import { speakerIcon } from "../../icons.ts";

export const TranslateWordCharacterLayout = ({exercise}: {exercise: Exercise}) => {
    return (
        <TranslateWordLayout exercise={exercise}>
            <p className="character chinese_text">{exercise.content.character}</p>
        </TranslateWordLayout>
    );
};

export const TranslateWordAudioLayout = ({exercise}: {exercise: Exercise}) => {
    return (
        <TranslateWordLayout exercise={exercise}>
            <svg className="audio_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={() => pronounce(exercise.content.character)}>
                <path d={speakerIcon}/>
            </svg>
        </TranslateWordLayout>
    );
};

const TranslateWordLayout = ({exercise, children}: {exercise: Exercise, children: any}) => {
    const translationInputRef: RefObject<HTMLInputElement | null> = useRef(null);

    const [correctAnswer, setCorrectAnswer] = useState(null);
    const handleTranslationInput = (event: React.KeyboardEvent) => {
        const target = event.target as HTMLInputElement;
        const disabled = target.value.length === 0;

        if (event.key === "Enter" && !disabled) {
            event.preventDefault();
            checkAnswer();
        }

        getActionButtonRef().current!.disabled = disabled;
    };

    useEffect(() => {
        if (correctAnswer != null) return;
        getActionButtonRef().current!.onclick = checkAnswer;
    });

    const checkAnswer = useCallback(() => {
        const translationInputNode = translationInputRef.current!;

        const translation = exercise.content.translations.map((el: string) => el.toLowerCase());
        const input = translationInputNode.value.toLowerCase().trim();

        let correct;
        if (translation.includes(input)) {
            translationInputNode.classList.add("correct");
            correct = true;
        }
        else {
            translationInputNode.classList.add("incorrect");
            setCorrectAnswer(exercise.content.translations.join(", "));
            correct = false;
        }

        translationInputNode.disabled = true;
        exerciseFinished(correct);
    }, [exercise.content]);

    return (
        <div className={`${exercise.type}_layout layout`}>
            { children }

            <label>
                <input className="translation_input" ref={translationInputRef} placeholder="Перевод" onKeyDown={handleTranslationInput}/>
            </label>

            { correctAnswer == null ? null : <p className="correct_answer">Правильный ответ: {correctAnswer}</p> }
        </div>
    );
};