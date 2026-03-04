import type { Exercise } from "../../../data/exercises.ts";
import React, { type RefObject, useEffect, useRef } from "react";
import { exerciseFinished, getActionButtonRef } from "../ExercisesSection.tsx";

const SelectPinyinLayout = ({exercise}: {exercise: Exercise}) => {
    const layoutNodeRef: RefObject<HTMLDivElement | null> = useRef(null);
    const children = [];

    const contentLength = exercise.content.length;

    const variants: string[] = [];
    for (let i = 0; i < 5; i++) {
        for (const item of exercise.content) {
            variants.push(item.variants[i]);
        }
    }

    for (let i = 0; i < contentLength; i++) {
        const characterElement = <CharacterItem key={"character_" + i} character={exercise.content[i].character}/>;
        children.push(characterElement);
    }

    for (let i = 0; i < variants.length; i++) {
        const pinyinElement = <PinyinItem key={"pinyin_" + i} pinyin={variants[i]} id={i} contentLength={contentLength} layoutNodeRef={layoutNodeRef}/>;
        children.push(pinyinElement);
    }

    useEffect(() => {
        getActionButtonRef().current!.onclick = () => {
            const layoutNode = layoutNodeRef.current!;

            for (let i = 0; i < contentLength; i++) {
                const correct = exercise.content[i].correct;
                const selectedNode = layoutNode.querySelector(".pinyin_item.selected.column_" + i)!;

                if (selectedNode.innerHTML === correct) {
                    selectedNode.classList.add("correct");
                }
                else {
                    selectedNode.classList.add("incorrect");

                    const correctId = variants.indexOf(correct);
                    const correctNode = layoutNode.querySelector(".pinyin_item.id_" + correctId + ".column_" + i)!;
                    correctNode.classList.add("correct");
                }
            }

            layoutNode.classList.add("disabled");

            const correct = layoutNode.querySelector(".pinyin_item.incorrect") == null;
            exerciseFinished(correct);
        };
    });

    return (
        <div className="select_pinyin_layout layout" ref={layoutNodeRef} style={{gridTemplateColumns: `repeat(${contentLength}, 1fr)`}}>
            {children}
        </div>
    );
};

const PinyinItem = ({pinyin, id, contentLength, layoutNodeRef}: {pinyin: string, id: number, contentLength: number, layoutNodeRef: RefObject<HTMLDivElement | null>}) => {
    const ref: RefObject<HTMLParagraphElement | null> = useRef(null);
    const column = id % contentLength;

    const onClick = () => {
        const pinyinItemNode = ref.current!;
        const layoutNode = layoutNodeRef.current!;

        if (pinyinItemNode.classList.contains("selected")) {
            pinyinItemNode.classList.remove("selected");
        }
        else {
            layoutNode.querySelector(".pinyin_item.selected.column_" + column)?.classList?.remove("selected");
            pinyinItemNode.classList.add("selected");
        }

        getActionButtonRef().current!.disabled = layoutNode.querySelectorAll(".pinyin_item.selected").length !== contentLength;
    };

    return (
        <p className={`pinyin_item id_${id} column_${column}`} ref={ref} onClick={onClick}>{pinyin}</p>
    );
};

const CharacterItem = ({character}: {character: string}) => {
    return (
        <p className="character_item chinese_text">{character}</p>
    );
};

export default SelectPinyinLayout;