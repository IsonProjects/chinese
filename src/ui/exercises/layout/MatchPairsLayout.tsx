import type { Exercise } from "../../../data/exercises.ts";
import { shuffle } from "../../../utils.ts";
import React, { type RefObject, useEffect, useRef } from "react";
import { exerciseFinished, getActionButtonRef } from "../ExercisesSection.tsx";

const MatchPairsLayout = ({exercise}: {exercise: Exercise}) => {
    useEffect(() => {
        getActionButtonRef().current!.style.display = "none";
    });

    const keys: string[] = Array.from(exercise.content.keys());
    const values: string[] = Array.from(exercise.content.values());
    const nonShuffledValues = Array.from(values);
    shuffle(values);

    const layoutNodeRef: RefObject<HTMLDivElement | null> = useRef(null);
    const children = [];

    for (let i = 0; i < exercise.content.size; i++) {
        const key = keys[i];
        const value = values[i];

        const keyElementRef: RefObject<HTMLDivElement | null> = useRef(null);

        const keyElement = <PairItem key={"key_" + i} id={String(i)} type="key" text={key} ref={keyElementRef} onClick={() => {
            const pairItemKeyNode = keyElementRef.current!;

            if (pairItemKeyNode.classList.contains("correct")) return;
            if (pairItemKeyNode.classList.contains("selected")) {
                pairItemKeyNode.classList.remove("selected");
                return;
            }

            layoutNodeRef.current!.querySelector(".key.selected")?.classList?.remove("selected");
            pairItemKeyNode.classList.add("selected");
            checkAnswer();
        }}/>;

        children.push(keyElement);

        const valueElementRef: RefObject<HTMLDivElement | null> = useRef(null);

        const valueElement = <PairItem key={"value_" + i} id={String(nonShuffledValues.indexOf(value))} type="value" text={value} ref={valueElementRef} onClick={() => {
            const pairItemValueNode = valueElementRef.current!;

            if (pairItemValueNode.classList.contains("correct")) return;
            if (pairItemValueNode.classList.contains("selected")) {
                pairItemValueNode.classList.remove("selected");
                return;
            }

            layoutNodeRef.current!.querySelector(".value.selected")?.classList?.remove("selected");
            pairItemValueNode.classList.add("selected");
            checkAnswer();
        }}/>;

        children.push(valueElement);
    }

    function checkAnswer() {
        const layoutNode = layoutNodeRef.current!;

        const selectedKey: HTMLElement | null = layoutNode.querySelector(".key.selected");
        const selectedValue = layoutNode.querySelector(".value.selected");
        if (selectedKey == null || selectedValue == null) return;

        selectedKey.classList.remove("selected");
        selectedValue.classList.remove("selected");
        selectedKey.classList.remove("incorrect");
        selectedValue.classList.remove("incorrect");
        void selectedKey.offsetWidth;

        if (selectedKey.id === selectedValue.id) {
            selectedKey.classList.add("correct");
            selectedValue.classList.add("correct");
        }
        else {
            selectedKey.classList.add("incorrect");
            selectedValue.classList.add("incorrect");
            layoutNode.classList.add("incorrect");
        }

        if (layoutNode.querySelectorAll(".key.correct").length >= 5) {
            const correct = !layoutNode.classList.contains("incorrect");
            exerciseFinished(correct);
        }
    }

    return (
        <div className="match_pairs_layout layout" ref={layoutNodeRef}>
            {children}
        </div>
    );
};

const PairItem = ({id, type, text, onClick, ref}: {id: string, type: string, text: string, onClick: () => void, ref: React.Ref<HTMLDivElement>}) => {
    return (
        <div className={`pair_item ${type}`} onClick={onClick} id={id} ref={ref}>
            <p className="text">{text}</p>
        </div>
    );
};

export default MatchPairsLayout;