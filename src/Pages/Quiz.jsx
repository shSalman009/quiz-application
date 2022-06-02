import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Checkbox from "../Component/Checkbox";
import Progress from "../Component/ProgressBar";
import { useAuth } from "../Context/AuthContext";
import useQuiz from "../Hooks/useQuiz";

const initialState = null;

const reducer = (state, action) => {
    switch (action.type) {
        case "questions":
            action.value.forEach((question) => {
                question.options.forEach((option) => {
                    option.checked = false;
                });
            });
            return action.value;
        case "answers":
            const questions = _.cloneDeep(state);
            questions[action.questionId].options[action.optionIndex].checked =
                action.value;

            return questions;
        default:
            return state;
    }
};

export default function Quiz() {
    // state
    const [currentQuestion, setCurrentQuestin] = useState(0);

    // fucntions
    const { id } = useParams();
    const { loading, error, quiz } = useQuiz(id);
    const { currentUser } = useAuth();

    const navigate = useNavigate();

    // reducer
    const [qna, dispatch] = useReducer(reducer, initialState);

    // effect
    useEffect(() => {
        dispatch({
            type: "questions",
            value: quiz,
        });
    }, [quiz]);

    // functions
    const handleChange = (e, index) => {
        dispatch({
            type: "answers",
            questionId: currentQuestion,
            optionIndex: index,
            value: e.target.checked,
        });
    };
    const next = () => {
        if (currentQuestion + 1 < quiz.length) {
            setCurrentQuestin((prev) => prev + 1);
        }
    };
    const prev = () => {
        if (currentQuestion > 0 && currentQuestion < quiz.length) {
            setCurrentQuestin((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        const { uid } = currentUser;
        const db = getDatabase();
        const resRef = ref(db, `result/${uid}`);

        await set(resRef, {
            [id]: qna,
        });

        navigate(`/result/${id}`, {
            state: {
                qna,
            },
        });
    };

    const progress =
        quiz.length > 0 ? ((currentQuestion + 1) / quiz.length) * 100 : 0;

    return (
        <div>
            {qna && qna.length > 0 && (
                <>
                    <h2>{qna[currentQuestion].title}</h2>
                    <Checkbox
                        options={qna[currentQuestion].options}
                        handleChange={handleChange}
                        input={true}
                    />
                    <Progress
                        id={id}
                        next={next}
                        prev={prev}
                        progress={progress}
                        handleSubmit={handleSubmit}
                    />
                </>
            )}
            {loading && "Loading..."}
            {error && "Something wrong happen"}
        </div>
    );
}
