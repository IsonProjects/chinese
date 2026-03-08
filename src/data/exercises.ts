import type { Word } from "./words.ts";
import type { ReactElement } from "react";
import MatchPairsLayout from "../ui/exercises/layout/MatchPairsLayout.tsx";
import { findToneChar, toneChars } from "../utils.ts";
import SelectPinyinLayout from "../ui/exercises/layout/SelectPinyinLayout.tsx";
import { TranslateWordAudioLayout, TranslateWordCharacterLayout } from "../ui/exercises/layout/TranslateWordLayout.tsx";

export const exerciseTypes: ExerciseType[] = [];

export interface ExerciseType {
    id: string;
    name: string;
    title: string;
    generate: GenerateFunction;
    layout: LayoutFunction;
}

export interface Exercise {
    index: number;
    type: string;
    content: any;
}

export type GenerateFunction = (words: Word[]) => any;
export type LayoutFunction = ({exercise}: {exercise: Exercise}) => ReactElement;

function addExerciseType(id: string, name: string, title: string, generate: GenerateFunction, layout: LayoutFunction) {
    exerciseTypes.push({
        id: id,
        name: name,
        title: title,
        generate: generate,
        layout: layout
    });
}

export function findExerciseType(id: string): ExerciseType | undefined {
    return exerciseTypes.find(exerciseType => exerciseType.id == id);
}



addExerciseType("match_pairs", "Сопоставить пары", "Сопоставьте пары", generateMatchPairsExercise, MatchPairsLayout);
addExerciseType("select_pinyin", "Выбрать пиньинь", "Выберите правильный пиньинь", generateSelectPinyinExercise, SelectPinyinLayout);
addExerciseType("translate_word_character", "Перевести иероглиф", "Переведите иероглиф", generateTranslateWordCharacterExercise, TranslateWordCharacterLayout);
addExerciseType("translate_word_audio", "Перевести слово на слух", "Переведите слово на слух", generateTranslateWordAudioExercise, TranslateWordAudioLayout);



function generateMatchPairsExercise(availableWords: Word[]): Map<string, string> {
    const content = new Map();
    const mode = Math.floor(Math.random() * 3);

    while (content.size < 5) {
        const word = availableWords[Math.floor(Math.random() * availableWords.length)];

        let key, value;
        if (mode === 0) {
            key = word.character;
            value = word.pinyin;
        }
        else if (mode === 1) {
            key = word.character;
            value = word.translations.join(", ");
        }
        else if (mode === 2) {
            key = word.pinyin;
            value = word.translations.join(", ");
        }

        if (content.has(key)) continue;
        if (Array.from(content.values()).includes(value)) continue;
        content.set(key, value);
    }

    return content;
}



function generateSelectPinyinExercise(availableWords: Word[]): any[] {
    const selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    const wordPinyin = selectedWord.pinyin.split(" ");

    const content = [];
    for (let i = 0; i < selectedWord.character.length; i++) {
        const pinyin = wordPinyin[i];
        const toneChar = findToneChar(pinyin)!;

        let chars;
        for (const chs of toneChars) {
            if (chs.includes(toneChar)) {
                chars = chs;
                break;
            }
        }

        if (chars == undefined) continue;

        const variants = [];
        for (let i = 0; i < 5; i++) {
            variants.push(pinyin.replace(toneChar, chars[i]));
        }

        content.push({
            character: selectedWord.character[i],
            correct: pinyin,
            variants: variants
        });
    }

    return content;
}



function generateTranslateWordCharacterExercise(availableWords: Word[]): Word {
    return availableWords[Math.floor(Math.random() * availableWords.length)];
}



function generateTranslateWordAudioExercise(availableWords: Word[]): Word {
    return availableWords[Math.floor(Math.random() * availableWords.length)];
}