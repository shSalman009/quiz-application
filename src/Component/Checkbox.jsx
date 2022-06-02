import React from "react";
import { Form } from "react-bootstrap";
import shortid from "shortid";
import style from "../Styles/Checkbox.module.css";

export default function Checkbox({ options, handleChange, input }) {
    return (
        <div className={style.main}>
            {options.map((option, index) =>
                input ? (
                    <div
                        style={{ background: "#DDDDDD" }}
                        className="d-flex border p-4 m-2 "
                        key={shortid.generate()}
                    >
                        <Form.Check
                            className="me-4"
                            type="checkbox"
                            checked={option.checked}
                            value={index}
                            onChange={(e) => {
                                handleChange(e, index);
                            }}
                        />
                        <Form.Label>
                            <strong>{option.title}</strong>
                        </Form.Label>
                    </div>
                ) : (
                    <div
                        className={`d-flex border p-4 m-2 ${
                            option.correct
                                ? "bg-success"
                                : option.checked
                                ? "bg-danger"
                                : null
                        }`}
                        key={shortid.generate()}
                    >
                        <Form.Check
                            className="me-4"
                            type="checkbox"
                            defaultChecked={option.checked}
                            disabled
                        />
                        <Form.Label>
                            <strong>{option.title}</strong>
                        </Form.Label>
                    </div>
                )
            )}
        </div>
    );
}
