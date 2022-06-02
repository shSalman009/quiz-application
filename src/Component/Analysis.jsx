import React from "react";
import shortid from "shortid";
import Checkbox from "./Checkbox";

export default function Analysis({ answers }) {
    return (
        <>
            {answers.map((answer) => (
                <div key={shortid.generate()}>
                    <h2>{answer.title}</h2>
                    <Checkbox options={answer.options} input={false} />
                </div>
            ))}
        </>
    );
}
