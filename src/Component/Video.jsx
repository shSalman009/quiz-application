import React from "react";
import { Card } from "react-bootstrap";
import style from "../Styles/Video.module.css";

export default function Video({ title, id, noq }) {
    return (
        <Card className={style.video}>
            <Card.Img
                src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            />
            <Card.Body>
                <Card.Title className={style.title}>{title}</Card.Title>
                <div className="d-flex justify-content-between">
                    <span>{noq} Question</span>
                    <span>Total Points : {noq * 4}</span>
                </div>
            </Card.Body>
        </Card>
    );
}
