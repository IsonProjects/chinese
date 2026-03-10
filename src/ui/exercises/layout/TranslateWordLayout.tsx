import type { Exercise } from "../../../data/exercises.ts";
import React, { type RefObject, useEffect, useRef, useState } from "react";
import { pronounce } from "../../../utils.ts";
import { exerciseFinished, getActionButtonRef } from "../ExercisesSection.tsx";
import { speakerIcon } from "../../icons.ts";

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
        };
    });

    return (
        <div className="translate_word_audio_layout layout">
            <svg className="audio_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" onClick={() => pronounce(exercise.content.character)}>
                <path d={speakerIcon}/>
            </svg>

            <label>
                <input className="translation_input" ref={translationInputRef} onInput={handleTranslationInput}/>
            </label>

            { correctAnswer == null ? null : <p className="correct_answer">Правильный ответ: {correctAnswer}</p> }
        </div>
    );
};