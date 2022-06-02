import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswers(videoId) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const frcthAnswers = async () => {
            const db = getDatabase();
            const answerRef = ref(db, "answers/" + videoId + "/questions");
            const answersQuery = query(answerRef, orderByKey());

            try {
                setError(false);
                setLoading(true);
                const snapshot = await get(answersQuery);
                setLoading(false);

                if (snapshot.exists()) {
                    setAnswers((prevAnswers) => {
                        return [
                            ...prevAnswers,
                            ...Object.values(snapshot.val()),
                        ];
                    });
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };
        frcthAnswers();
    }, [videoId]);

    return {
        loading,
        error,
        answers,
    };
}
