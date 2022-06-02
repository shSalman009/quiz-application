import _ from "lodash";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Analysis from "../Component/Analysis";
import Summary from "../Component/Summary";
import useAnswers from "../Hooks/useAnsweres";

export default function Results() {
    const { state } = useLocation();
    const { qna } = state;
    const { id } = useParams();
    const { answers, loading, error } = useAnswers(id);

    // functions
    const calculateAnswer = () => {
        let score = 0;

        answers.forEach((question, index1) => {
            const correctIndex = [];
            const checkedIndex = [];
            question.options.forEach((option, index2) => {
                if (option.correct) {
                    correctIndex.push(index2);
                }
                if (qna[index1].options[index2].checked) {
                    checkedIndex.push(index2);
                    option.checked = true;
                }
            });
            if (_.isEqual(correctIndex, checkedIndex)) {
                score = score + 5;
            }
        });

        return score;
    };

    const userScore = calculateAnswer();

    return (
        <>
            {loading && "Loading..."}
            {error && "Something wrong happen"}
            {qna && qna.length > 0 && (
                <div>
                    <Summary userScore={userScore} noq={answers.length} />
                    <Analysis answers={answers} />
                </div>
            )}
        </>
    );
}
