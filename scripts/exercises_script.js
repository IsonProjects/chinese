const exerciseTypes = [];

addExerciseType("match_pairs", "Сопоставить пары", generateMatchPairsExercise, loadMatchPairsExercise);
addExerciseType("select_pinyin", "Выбрать пиньинь", generateSelectPinyinExercise, loadSelectPinyinExercise);
addExerciseType("translate_word_audio", "Перевести слово на слух", generateTranslateWordAudioExercise, loadTranslateWordAudioExercise);
addExerciseType("translate_word_character", "Перевести иероглиф", generateTranslateWordCharacterExercise, loadTranslateWordCharacterExercise);

function addExerciseType(id, name, generate, load) {
    exerciseTypes.push({
        id: id,
        name: name,
        generate: generate,
        load: load
    });
}

function findExerciseType(id) {
    for (const exerciseType of exerciseTypes) {
        if (exerciseType.id === id) return exerciseType;
    }

    return null;
}



const selectedExerciseCategories = [];
const selectedExerciseTypes = [];
let exercisesAmount = 1;

let exercisesStartPageNode;
let exercisesPageNode;
let exercisesProgressBarNode;
let exercisesActionButtonNode;
let exercisesResultsPageNode;

let exercises = [];
let exerciseIndex = 0;
let startTime = null;
let exercisesCorrectAmount = 0;

document.addEventListener("DOMContentLoaded", () => {
    exercisesStartPageNode = document.querySelector(".exercises_section .exercises_start_page");
    exercisesPageNode = document.querySelector(".exercises_section .exercises_page");
    exercisesProgressBarNode = exercisesPageNode.querySelector(".progress_bar");
    exercisesActionButtonNode = exercisesPageNode.querySelector(".action_button");
    exercisesResultsPageNode = document.querySelector(".exercises_section .exercises_results_page");
    
    stopExercises();

    const categorySelectorTemplate = document.querySelector(".templates .category_selector");

    for (const category of categories) {
        const categorySelectorNode = categorySelectorTemplate.cloneNode(true);
        categorySelectorNode.classList.add(category.id);

        const checkboxNode = categorySelectorNode.querySelector(".checkbox");
        checkboxNode.addEventListener("change", () => {
            if (checkboxNode.checked) selectedExerciseCategories.push(category.id);
            else selectedExerciseCategories.pop(category.id);
        });

        const nameNode = categorySelectorNode.querySelector(".name");
        nameNode.innerText = category.name;

        document.querySelector(".exercises_section .categories_selectors").appendChild(categorySelectorNode);
    }

    const exerciseTypeSelectorTemplate = document.querySelector(".templates .exercise_type_selector");

    for (const exerciseType of exerciseTypes) {
        const exerciseTypeSelectorNode = exerciseTypeSelectorTemplate.cloneNode(true);
        exerciseTypeSelectorNode.classList.add(exerciseType.id);

        const checkboxNode = exerciseTypeSelectorNode.querySelector(".checkbox");
        checkboxNode.addEventListener("change", () => {
            if (checkboxNode.checked) selectedExerciseTypes.push(exerciseType.id);
            else selectedExerciseTypes.pop(exerciseType.id);
        });

        const nameNode = exerciseTypeSelectorNode.querySelector(".name");
        nameNode.innerText = exerciseType.name;

        document.querySelector(".exercises_section .exercise_types_selectors").appendChild(exerciseTypeSelectorNode);
    }

    const exercisesAmountInputNode = document.querySelector(".exercises_section .exercises_amount_input");
    exercisesAmountInputNode.value = exercisesAmount;
    exercisesAmountInputNode.addEventListener("change", () => {
        if (!exercisesAmountInputNode.value) return;
        exercisesAmount = Number.parseInt(exercisesAmountInputNode.value);
    });

    for (const settingsSection of document.querySelectorAll(".exercises_section .settings_section")) {
        settingsSection.classList.add("collapsed");
        settingsSection.querySelector(".title").addEventListener("click", () => {
            settingsSection.classList.toggle("collapsed");
        });
    }

    document.querySelector(".exercises_section .start_exercises_button").addEventListener("click", () => {
        if (selectedExerciseCategories.length === 0) return;
        if (selectedExerciseTypes.length === 0) return;
        startExercises();
    });

    exercisesPageNode.querySelector(".header .close_button").addEventListener("click", () => stopExercises());
    exercisesResultsPageNode.querySelector(".close_button").addEventListener("click", () => stopExercises());
});



function resetExercises() {
    exercises = [];
    exerciseIndex = 0;
    startTime = null;
    exercisesCorrectAmount = 0;
    exercisesProgressBarNode.max = 0;
    exercisesProgressBarNode.value = 0;
}

function startExercises() {
    resetExercises();
    startTime = new Date();
    exercisesProgressBarNode.max = exercisesAmount;
    exercisesStartPageNode.style.display = "none";
    exercisesPageNode.style.display = "";
    exercisesResultsPageNode.style.display = "none";

    generateExercises();
    loadExercise();
}

function stopExercises() {
    resetExercises();
    startTime = null;
    exercisesStartPageNode.style.display = "";
    exercisesPageNode.style.display = "none";
    exercisesResultsPageNode.style.display = "none";
}

function generateExercises() {
    const availableWords = [];
    for (const word of words) {
        if (selectedExerciseCategories.includes(word.category)) {
            availableWords.push(word);
        }
    }
    
    const shuffledExerciseTypes = Array.from(selectedExerciseTypes);
    shuffle(shuffledExerciseTypes);

    for (let i = 0; i < exercisesAmount; i++) {
        const exerciseTypeId = shuffledExerciseTypes[i % shuffledExerciseTypes.length];
        const exercise = findExerciseType(exerciseTypeId).generate(availableWords);
        exercises.push(exercise);
    }

    shuffle(exercises);
}

function loadExercise() {
    const exercise = exercises[exerciseIndex];

    const exerciseNode = document.querySelector(".exercises_section .exercises_page .exercise");
    const titleNode = exerciseNode.querySelector(".title");

    exercisesActionButtonNode.innerHTML = "Ответить";
    exercisesActionButtonNode.disabled = true;
    exercisesActionButtonNode.style.display = "";

    for (const layoutNode of exerciseNode.querySelectorAll(".layout")) {
        layoutNode.style.display = "none";
    }
    
    const exerciseType = findExerciseType(exercise.type);
    exerciseType.load(exercise, exerciseNode, titleNode);
}

function exerciseFinished() {
    exerciseIndex++;
    exercisesActionButtonNode.style.display = "";
    exercisesActionButtonNode.disabled = false;
    exercisesProgressBarNode.value = exerciseIndex;

    if (exerciseIndex < exercisesAmount) {
        exercisesActionButtonNode.innerHTML = "Дальше";
        exercisesActionButtonNode.onclick = () => loadExercise();
        return;
    }

    exercisesActionButtonNode.innerHTML = "Завершить";

    exercisesActionButtonNode.onclick = () => {
        const timeNode = exercisesResultsPageNode.querySelector(".time");
        timeNode.innerHTML = getTime(new Date().getTime() - startTime.getTime());
            
        const resultNode = exercisesResultsPageNode.querySelector(".result");
        resultNode.innerHTML = exercisesCorrectAmount + "/" + exercisesAmount;

        exercisesStartPageNode.style.display = "none";
        exercisesPageNode.style.display = "none";
        exercisesResultsPageNode.style.display = "";
    };
}



function generateMatchPairsExercise(availableWords) {
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
            value = word.translation;
        }
        else if (mode === 2) {
            key = word.pinyin;
            value = word.translation;
        }

        if (content.has(key)) continue;
        if (Array.from(content.values()).includes(value)) continue;
        content.set(key, value);
    }

    return {
        type: "match_pairs",
        content: content
    };
}

function loadMatchPairsExercise(exercise, exerciseNode, titleNode) {
    titleNode.innerHTML = "Сопоставьте пары";
    exercisesActionButtonNode.style.display = "none";

    const layoutNode = exerciseNode.querySelector(".match_pairs_layout");
    layoutNode.classList.remove("incorrect");
    layoutNode.innerHTML = "";
    layoutNode.style.display = "";

    const keys = Array.from(exercise.content.keys());
    const values = Array.from(exercise.content.values());
    const nonShuffledValues = Array.from(values);
    shuffle(values);

    const pairItemTemplate = document.querySelector(".templates .pair_item");
    for (let i = 0; i < exercise.content.size; i++) {
        const key = keys[i];
        const value = values[i];

        const pairItemKeyNode = pairItemTemplate.cloneNode(true);
        pairItemKeyNode.classList.add("key");
        pairItemKeyNode.id = i;
        pairItemKeyNode.innerHTML = key;
        pairItemKeyNode.addEventListener("click", () => {
            if (pairItemKeyNode.classList.contains("correct")) return;
            if (pairItemKeyNode.classList.contains("selected")) {
                pairItemKeyNode.classList.remove("selected");
                return;
            }
            
            layoutNode.querySelector(".key.selected")?.classList?.remove("selected");
            pairItemKeyNode.classList.add("selected");
            checkAnswer();
        });
        layoutNode.appendChild(pairItemKeyNode);

        const pairItemValueNode = pairItemTemplate.cloneNode(true);
        pairItemValueNode.classList.add("value");
        pairItemValueNode.id = nonShuffledValues.indexOf(value);
        pairItemValueNode.innerHTML = value;
        pairItemValueNode.addEventListener("click", () => {
            if (pairItemValueNode.classList.contains("correct")) return;
            if (pairItemValueNode.classList.contains("selected")) {
                pairItemValueNode.classList.remove("selected");
                return;
            }
            
            layoutNode.querySelector(".value.selected")?.classList?.remove("selected");
            pairItemValueNode.classList.add("selected");
            checkAnswer();
        });
        layoutNode.appendChild(pairItemValueNode);
    }

    function checkAnswer() {
        const selectedKey = layoutNode.querySelector(".key.selected");
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
            exerciseFinished();
            if (!layoutNode.classList.contains("incorrect")) exercisesCorrectAmount++;
        }
    }
}



function generateSelectPinyinExercise(availableWords) {
    const selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    const wordPinyin = selectedWord.pinyin.split(" ");

    const content = [];
    for (let i = 0; i < selectedWord.character.length; i++) {
        const pinyin = wordPinyin[i];
        const toneChar = findToneChar(pinyin);

        let chars;
        for (const chs of toneChars) {
            if (chs.includes(toneChar)) {
                chars = chs;
                break;
            }
        }

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

    return {
        type: "select_pinyin",
        content: content
    };
}

function loadSelectPinyinExercise(exercise, exerciseNode, titleNode) {
    titleNode.innerHTML = "Выберите правильный тон";

    const contentLength = exercise.content.length;

    const layoutNode = exerciseNode.querySelector(".select_pinyin_layout");
    layoutNode.classList.remove("disabled");
    layoutNode.style.gridTemplateColumns = "repeat(" + contentLength + ", 1fr)";
    layoutNode.innerHTML = "";
    layoutNode.style.display = "";

    const variants = [];
    for (let i = 0; i < 5; i++) {
        for (const item of exercise.content) {
            variants.push(item.variants[i]);
        }
    }

    const characterItemTemplate = document.querySelector(".templates .character_item");
    for (const item of exercise.content) {
        const character = item.character;
        const characterItemNode = characterItemTemplate.cloneNode(true);
        characterItemNode.innerHTML = character;
        layoutNode.appendChild(characterItemNode);
    }

    const pinyinItemTemplate = document.querySelector(".templates .pinyin_item");
    for (let i = 0; i < variants.length; i++) {
        const variant = variants[i];

        const pinyinItemNode = pinyinItemTemplate.cloneNode(true);
        pinyinItemNode.classList.add("id_" + i);
        pinyinItemNode.classList.add("column_" + (i % contentLength));
        pinyinItemNode.innerHTML = variant;

        pinyinItemNode.addEventListener("click", () => {
            if (pinyinItemNode.classList.contains("selected")) {
                pinyinItemNode.classList.remove("selected");
            }
            else {
                layoutNode.querySelector(".pinyin_item.selected.column_" + (i % contentLength))?.classList?.remove("selected");
                pinyinItemNode.classList.add("selected");
            }

            exercisesActionButtonNode.disabled = layoutNode.querySelectorAll(".pinyin_item.selected").length !== contentLength;
        });

        layoutNode.appendChild(pinyinItemNode);
    }

    exercisesActionButtonNode.onclick = () => {
        for (let i = 0; i < contentLength; i++) {
            const correct = exercise.content[i].correct;
            const selectedNode = layoutNode.querySelector(".pinyin_item.selected.column_" + i);

            if (selectedNode.innerHTML === correct) {
                selectedNode.classList.add("correct");
            }
            else {
                selectedNode.classList.add("incorrect");

                const correctId = variants.indexOf(correct);
                const correctNode = layoutNode.querySelector(".pinyin_item.id_" + correctId + ".column_" + i);
                correctNode.classList.add("correct");
            }
        }

        layoutNode.classList.add("disabled");

        exerciseFinished();
        if (layoutNode.querySelector(".pinyin_item.incorrect") == null) exercisesCorrectAmount++;
    };
}



function generateTranslateWordAudioExercise(availableWords) {
    const selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)];

    return {
        type: "translate_word_audio",
        content: selectedWord
    }
}

function loadTranslateWordAudioExercise(exercise, exerciseNode, titleNode) {
    titleNode.innerHTML = "Переведите слово на слух";

    const layoutNode = exerciseNode.querySelector(".translate_word_audio_layout");
    layoutNode.style.display = "";

    const audioButtonNode = layoutNode.querySelector(".audio_button");
    audioButtonNode.onclick = () => pronounce(exercise.content.character);

    const translationInputNode = layoutNode.querySelector(".translation_input");
    translationInputNode.disabled = false;
    translationInputNode.classList.remove("correct", "incorrect");
    translationInputNode.value = "";

    const correctAnswerNode = layoutNode.querySelector(".correct_answer");
    correctAnswerNode.style.display = "none";

    translationInputNode.oninput = () => {
        exercisesActionButtonNode.disabled = translationInputNode.value.length === 0;
    }

    exercisesActionButtonNode.onclick = () => {
        const translation = exercise.content.translation.toLowerCase();
        const input = translationInputNode.value.toLowerCase();

        if (input === translation) {
            translationInputNode.classList.add("correct");
            exercisesCorrectAmount++;
        }
        else {
            translationInputNode.classList.add("incorrect");
            correctAnswerNode.innerHTML = "Правильный ответ: " + exercise.content.translation;
            correctAnswerNode.style.display = "";
        }

        translationInputNode.disabled = true;
        exerciseFinished();
    };
}



function generateTranslateWordCharacterExercise(availableWords) {
    const selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)];

    return {
        type: "translate_word_character",
        content: selectedWord
    }
}

function loadTranslateWordCharacterExercise(exercise, exerciseNode, titleNode) {
    titleNode.innerHTML = "Переведите иероглиф";

    const layoutNode = exerciseNode.querySelector(".translate_word_character_layout");
    layoutNode.style.display = "";

    const characterNode = layoutNode.querySelector(".character");
    characterNode.innerHTML = exercise.content.character;

    const translationInputNode = layoutNode.querySelector(".translation_input");
    translationInputNode.disabled = false;
    translationInputNode.classList.remove("correct", "incorrect");
    translationInputNode.value = "";

    const correctAnswerNode = layoutNode.querySelector(".correct_answer");
    correctAnswerNode.style.display = "none";

    translationInputNode.oninput = () => {
        exercisesActionButtonNode.disabled = translationInputNode.value.length === 0;
    }

    exercisesActionButtonNode.onclick = () => {
        const translation = exercise.content.translation.toLowerCase();
        const input = translationInputNode.value.toLowerCase();

        if (input === translation) {
            translationInputNode.classList.add("correct");
            exercisesCorrectAmount++;
        }
        else {
            translationInputNode.classList.add("incorrect");
            correctAnswerNode.innerHTML = "Правильный ответ: " + exercise.content.translation;
            correctAnswerNode.style.display = "";
        }

        translationInputNode.disabled = true;
        exerciseFinished();
    };
}