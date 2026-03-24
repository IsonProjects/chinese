import type { Exercise, MatchPairsExerciseContentItem } from "../../../data/exercises.ts";
import React, { useEffect, useRef, useState } from "react";
import { exerciseFinished, getActionButtonRef } from "../ExercisesSection.tsx";
import { pronounce } from "../../../utils.ts";

const MatchPairsLayout = ({exercise}: {exercise: Exercise}) => {
    useEffect(() => {
        getActionButtonRef().current!.style.display = "none";
    });

    const layoutNodeRef = useRef<HTMLDivElement | null>(null);
    const selectedKeyRef = useRef<HTMLDivElement | null>(null);
    const selectedValueRef = useRef<HTMLDivElement | null>(null);

    const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
    const [selectedValueId, setSelectedValueId] = useState<string | null>(null);
    const [correctWordIds, setCorrectWordIds] = useState<Set<string>>(new Set());
    const [incorrectWordId, setIncorrectWordId] = useState<[string, string] | null>(null);
    const [correct, setCorrect] = useState(true);

    const content = exercise.content as Map<MatchPairsExerciseContentItem, MatchPairsExerciseContentItem>;
    const children = [];

    for (const [key, value] of content) {
        const keyElementRef = useRef<HTMLDivElement | null>(null);

        const keyElement = <PairItem
            key={"key_" + key.word.id}
            id={key.word.id}
            type="key"
            text={key.data}
            state={correctWordIds.has(key.word.id) ? "correct" : incorrectWordId != null && incorrectWordId[0] == key.word.id ? "incorrect" : selectedKeyId == key.word.id ? "selected" : ""}
            ref={keyElementRef}
            onClick={() => {
                if (correctWordIds.has(key.word.id)) return;

                if (selectedKeyId == key.word.id) {
                    setSelectedKeyId(null);
                    selectedKeyRef.current = null;
                    return;
                }

                if (key.pronounce) pronounce(key.word.character);

                setSelectedKeyId(key.word.id);
                selectedKeyRef.current = keyElementRef.current;
                checkAnswer();
            }}
        />;

        children.push(keyElement);

        const valueElementRef = useRef<HTMLDivElement | null>(null);

        const valueElement = <PairItem
            key={"value_" + value.word.id}
            id={value.word.id}
            type="value"
            text={value.data}
            state={correctWordIds.has(value.word.id) ? "correct" : incorrectWordId != null && incorrectWordId[1] == value.word.id ? "incorrect" : selectedValueId == value.word.id ? "selected" : ""}
            ref={valueElementRef}
            onClick={() => {
                if (correctWordIds.has(value.word.id)) return;

                if (selectedValueId == value.word.id) {
                    setSelectedValueId(null);
                    selectedValueRef.current = null;
                    return;
                }

                if (value.pronounce) pronounce(value.word.character);

                setSelectedValueId(value.word.id);
                selectedValueRef.current = valueElementRef.current;
                checkAnswer();
            }}
        />;

        children.push(valueElement);
    }

    const checkAnswer = () => {
        const selectedKeyId = selectedKeyRef.current?.id;
        const selectedValueId = selectedValueRef.current?.id;
        if (selectedKeyId == null || selectedValueId == null) return;

        if (selectedKeyId === selectedValueId) {
            setCorrectWordIds(pairs => new Set([...pairs, selectedKeyId]));
        }
        else {
            setIncorrectWordId([selectedKeyId, selectedValueId]);

            setTimeout(() => {
                setIncorrectWordId(null);
            }, 500);

            setCorrect(false);
        }

        setSelectedKeyId(null);
        setSelectedValueId(null);

        selectedKeyRef.current = null;
        selectedValueRef.current = null;
    };

    useEffect(() => {
        if (correctWordIds.size >= 5) {
            exerciseFinished(correct);
        }
    }, [correctWordIds.size, correct]);

    return (
        <div className="match_pairs_layout layout" key={"exercise_" + exercise.index} ref={layoutNodeRef}>
            {children}
        </div>
    );
};

const PairItem = ({id, type, text, state, onClick, ref}: {id: string, type: string, text: string, state: PairItemState, onClick: () => void, ref: React.Ref<HTMLDivElement>}) => {
    return (
        <div className={`pair_item ${type} ${state}`} onClick={onClick} id={id} ref={ref}>
            <p>{text}</p>
        </div>
    );
};

type PairItemState = "correct" | "incorrect" | "selected" | "";

export default MatchPairsLayout;