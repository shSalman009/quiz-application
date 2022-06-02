import { useFormik } from "formik";
import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import FormInputs from "../Component/FormInputs";
import { useAuth } from "../Context/AuthContext";

export default function SignUp() {
    const [fail, setFail] = useState(null);

    const navigate = useNavigate();

    const { signUp } = useAuth();

    const formik = useFormik({
        initialValues: {
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: yup.object({
            userName: yup
                .string()
                .min(2, "Username is too short")
                .max(20, "Username is too long")
                .required("Username is required"),
            email: yup
                .string()
                .email("Provide a valid email")
                .required("email is required"),
            password: yup
                .string()
                .matches(
                    /(?=.*[a-z])/,
                    "The string must contain at least 1 lowercase alphabetical character"
                )
                .matches(
                    /(?=.*[A-Z])/,
                    "The string must contain at least 1 uppercase alphabetical character"
                )
                .matches(
                    /(?=.*[0-9])/,
                    "The string must contain at least 1 numeric character"
                )
                .matches(
                    /(?=.{6,})/,
                    "The string must be eight characters or longer"
                )
                .required("password is required"),
            confirmPassword: yup
                .string()
                .oneOf([yup.ref("password")], "Password does not match")
                .required("confirmPassword is required"),
        }),
        onSubmit: async (values) => {
            try {
                setFail(null);
                await signUp(values.userName, values.email, values.password);
                navigate("/");
            } catch (err) {
                setFail(err.message);
            }
        },
    });

    return (
        <Form className="w-50 mx-auto p-5" onSubmit={formik.handleSubmit}>
            <h1 className="my-4">SignUp Here</h1>
            {fail && <Alert variant="warning">{fail.slice(10)}</Alert>}
            <FormInputs
                placeholder="name"
                type="text"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                isInvalid={
                    formik.errors.userName && formik.touched.userName
                        ? true
                        : false
                }
                feedback={
                    formik.errors.userName && formik.touched.userName
                        ? formik.errors.userName
                        : null
                }
            />
            <FormInputs
                placeholder="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                isInvalid={
                    formik.errors.email && formik.touched.email ? true : false
                }
                feedback={
                    formik.errors.email && formik.touched.email
                        ? formik.errors.email
                        : null
                }
            />
            <FormInputs
                placeholder="password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                isInvalid={
                    formik.errors.password && formik.touched.password
                        ? true
                        : false
                }
                feedback={
                    formik.errors.password && formik.touched.password
                        ? formik.errors.password
                        : null
                }
            />
            <FormInputs
                placeholder="confirm password"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                isInvalid={
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                        ? true
                        : false
                }
                feedback={
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                        ? formik.errors.confirmPassword
                        : null
                }
            />
            <Button type="submit">SignUp</Button>
            <div className="my-4">
                <span>
                    Already have an account? <Link to="/login">Login</Link> here
                </span>
            </div>
        </Form>
    );
}
