import { useEffect } from "react";
import toSection, { sections } from "../data/sections.ts";
import Header from "./Header.tsx";
import "../styles/main.css";

const App = () => {
    useEffect(() => {
        toSection(sessionStorage.getItem("section")!);
    });

    return (
        <>
            <Header/>

            <main>
                { sections.map(section => {
                    const Section = section.node;
                    return <Section key={section.id}/>;
                }) }
            </main>
        </>
    );
};

export default App;