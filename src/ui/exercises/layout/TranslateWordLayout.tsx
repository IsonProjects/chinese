import type { Exercise } from "../../../data/exercises.ts";
import React, { type RefObject, useEffect, useRef, useState } from "react";
import { pronounce } from "../../../utils.ts";
import { exerciseFinished, getActionButtonRef } from "../ExercisesSection.tsx";

export const TranslateWordCharacterLayout = ({exercise}: {exercise: Exercise}) => {
    const translationInputRef: RefObject<HTMLInputElement | null> = useRef(null);

    const [correctAnswer, setCorrectAnswer] = useState(null);
    const handleTranslationInput = (event: React.InputEvent) => {
        const target = event.target as HTMLInputElement;
        getActionButtonRef().current!.disabled = target.value.length === 0;
    };

    useEffect(() => {
        if (correctAnswer != null) return;

        getActionButtonRef().current!.onclick = () => {
            const translationInputNode = translationInputRef.current!;

            const translation = exercise.content.translation.map((el: string) => el.toLowerCase());
            const input = translationInputNode.value.toLowerCase().trim();

            let correct;
            if (translation.includes(input)) {
                translationInputNode.classList.add("correct");
                correct = true;
            }
            else {
                translationInputNode.classList.add("incorrect");
                setCorrectAnswer(exercise.content.translation);
                correct = false;
            }

            translationInputNode.disabled = true;
            exerciseFinished(correct);
        };
    });

    return (
        <div className="translate_word_character_layout layout">
            <p className="character chinese_text">{exercise.content.character}</p>

            <label>
                <input className="translation_input" ref={translationInputRef} onInput={handleTranslationInput}/>
            </label>

            { correctAnswer == null ? null : <p className="correct_answer">Правильный ответ: {correctAnswer}</p> }
        </div>
    );
};

export const TranslateWordAudioLayout = ({exercise}: {exercise: Exercise}) => {
    const translationInputRef: RefObject<HTMLInputElement | null> = useRef(null);

    const [correctAnswer, setCorrectAnswer] = useState(null);
    const handleTranslationInput = (event: React.InputEvent) => {
        const target = event.target as HTMLInputElement;
        getActionButtonRef().current!.disabled = target.value.length === 0;
    };

    useEffect(() => {
        if (correctAnswer != null) return;

        getActionButtonRef().current!.onclick = () => {
            const translationInputNode = translationInputRef.current!;

            const translation = exercise.content.translation.map((el: string) => el.toLowerCase());
            const input = translationInputNode.value.toLowerCase().trim();

            let correct;
            if (translation.includes(input)) {
                translationInputNode.classList.add("correct");
                correct = true;
            }
            else {
                translationInputNode.classList.add("incorrect");
                setCorrectAnswer(exercise.content.translation);
                correct = false;
            }

            translationInputNode.disabled = true;
            exerciseFinished(correct);
        };
    });

    return (
        <div className="translate_word_audio_layout layout">
            <svg className="audio_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={() => pronounce(exercise.content.character)}>
                <path d="M545.54-81.62v-88q106.54-27.53 173.42-115 66.89-87.46 66.89-197.38 0-108.92-67.39-195.38-67.38-86.47-172.92-114v-88q142.69 27.92 234.5 139.92 91.8 112 91.8 257.46 0 146.46-91.8 259.46-91.81 113-234.5 140.92ZM88.16-360v-240h162.46l199.53-201.53v643.06L250.62-360H88.16Zm457.38 38.15v-316.3q44.46 23 70.54 65.46 26.07 42.46 26.07 92.69 0 50.61-26.27 92.88-26.27 42.27-70.34 65.27ZM364.15-594l-78 80h-112v68h112l78 80v-228Zm-95 114Z"/>
            </svg>

            <label>
                <input className="translation_input" ref={translationInputRef} onInput={handleTranslationInput}/>
            </label>

            { correctAnswer == null ? null : <p className="correct_answer">Правильный ответ: {correctAnswer}</p> }
        </div>
    );
};