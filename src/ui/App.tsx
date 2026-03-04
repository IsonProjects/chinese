import { useEffect } from "react";
import toSection, { sections } from "../data/sections.ts";
import Header from "./Header.tsx";
import "../styles/styles.css";

const App = () => {
    useEffect(() => {
        toSection(sessionStorage.getItem("section")!);
    });

    return (
        <>
            <Header/>

            { sections.map(section => {
                const Section = section.node;
                return <Section key={section.id}/>
            }) }
        </>
    );
};

export default App;