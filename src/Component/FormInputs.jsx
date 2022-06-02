import React from "react";
import { FormControl, FormGroup } from "react-bootstrap";
import Feedback from "react-bootstrap/esm/Feedback";

export default function FormInputs({
    placeholder,
    value,
    onChange,
    name,
    isInvalid,
    feedback,
    type,
}) {
    return (
        <FormGroup className="my-3">
            <FormControl
                type={type}
                name={name}
                placeholder={`Enter your ${placeholder}`}
                value={value}
                onChange={onChange}
                isInvalid={isInvalid}
            />
            <Feedback type="invalid">{feedback}</Feedback>
        </FormGroup>
    );
}
