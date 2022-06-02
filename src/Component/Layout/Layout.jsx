import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <Container fluid className="mt-5">
                {children}
            </Container>
        </>
    );
}
