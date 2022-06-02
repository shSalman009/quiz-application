import React from "react";
import { Button, Col, ProgressBar, Row } from "react-bootstrap";

export default function Progress({ next, prev, progress, handleSubmit }) {
    const progressInstance = (
        <ProgressBar now={progress} label={`${progress}%`} />
    );

    return (
        <Row className="text-center bg-light p-4 m-4">
            <Col md={1}>
                <Button onClick={prev}>Prev</Button>
            </Col>
            <Col md={9} className="bg-info d-flex align-items-center border ">
                <div className="w-100"> {progressInstance}</div>
            </Col>
            <Col md={2}>
                <Button onClick={progress === 100 ? handleSubmit : next}>
                    {progress === 100 ? "Submit" : "Next Question"}
                </Button>
            </Col>
        </Row>
    );
}
