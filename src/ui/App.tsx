import { useEffect } from "react";
import toSection from "../sections.ts";
import Header from "./Header.tsx";
import WordsSection from "./WordsSection.tsx";
import GrammarsSection from "./GrammarsSection.tsx";
import ExercisesSection from "./exercises/ExercisesSection.tsx";
import SettingsSection from "./SettingsSection.tsx";
import "../styles/styles.css";

const App = () => {
    useEffect(() => {
        toSection(sessionStorage.getItem("section")!);
    });

    return (
        <>
            <Header/>
            <WordsSection/>
            <GrammarsSection/>
            <ExercisesSection/>
            <SettingsSection/>
        </>
    );
};

export default App;