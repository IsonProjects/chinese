import { stopExercises } from "./ExercisesSection.tsx";

const ResultsPage = ({time, correctAmount, allAmount}: {time: string, correctAmount: number, allAmount: number}) => {
    return (
        <div className="exercises_results_page">
            <div className="results_section">
                <p className="label">Время</p>
                <p className="time">{time}</p>
            </div>

            <div className="results_section">
                <p className="label">Результат</p>
                <p className="result">{correctAmount}/{allAmount}</p>
            </div>

            <button className="close_button" onClick={stopExercises}>Закрыть</button>
        </div>
    );
};

export default ResultsPage;