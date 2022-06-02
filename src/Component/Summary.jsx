import React from "react";

export default function Summary({ userScore, noq }) {
    return (
        <div>
            <h1 className="text-center my-5">
                Your score is {userScore} out of {noq * 5}
            </h1>
        </div>
    );
}
