import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function Header() {
    const { currentUser, logOut } = useAuth();

    return (
        <Row className="w-100 px-4 py-3 bg-primary text-white">
            <Col>
                <h4>A Practice Project</h4>
            </Col>
            <Col className="d-flex justify-content-end">
                {currentUser ? (
                    <div className="d-flex">
                        <h4 className="me-4">{currentUser.displayName}</h4>
                        <span onClick={logOut} className="btn btn-info mx-2">
                            Log Out
                        </span>
                    </div>
                ) : (
                    <div className="d-flex justify-content-end">
                        <Link to="/login">
                            <span className="btn btn-info mx-2">Login</span>
                        </Link>
                        <Link to="/signup">
                            <span className="btn btn-info mx-2">sign Up</span>
                        </Link>
                    </div>
                )}
            </Col>
        </Row>
    );
}
