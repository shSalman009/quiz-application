import { useFormik } from "formik";
import React, { useState } from "react";
import { Alert, Button, Form, FormControl, FormGroup } from "react-bootstrap";
import Feedback from "react-bootstrap/esm/Feedback";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../Context/AuthContext";

export default function Login() {
    const [fail, setFail] = useState(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email("Provide a valid email")
                .required("email is required"),
            password: yup.string().required("password is required"),
        }),
        onSubmit: async (values) => {
            try {
                setFail(null);
                await login(values.userName, values.email, values.password);
                navigate("/");
            } catch (err) {
                setFail(err.message);
            }
        },
    });

    return (
        <Form className="w-50 mx-auto  p-5" onSubmit={formik.handleSubmit}>
            <h1 className="my-4">Login Here</h1>
            {fail && <Alert variant="warning">{fail.slice(10)}</Alert>}
            <FormGroup className="my-3">
                <FormControl
                    type="email"
                    name="email"
                    placeholder={`Enter your email`}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    isInvalid={
                        formik.errors.email && formik.touched.email
                            ? true
                            : false
                    }
                />
                <Feedback type="invalid">
                    {formik.errors.email && formik.touched.email
                        ? formik.errors.email
                        : null}
                </Feedback>
            </FormGroup>
            <FormGroup className="my-3">
                <FormControl
                    type="password"
                    name="password"
                    placeholder={`Enter your password`}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={
                        formik.errors.password && formik.touched.password
                            ? true
                            : false
                    }
                />
                <Feedback type="invalid">
                    {formik.errors.password && formik.touched.password
                        ? formik.errors.password
                        : null}
                </Feedback>
            </FormGroup>
            <Button type="submit">Login</Button>
            <div className="my-4">
                <span>
                    Don't have accout? <Link to="/signup">Sign Up</Link> here
                </span>
            </div>
        </Form>
    );
}
