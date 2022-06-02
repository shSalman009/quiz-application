import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import PrivateRoutes from "./Component/PrivateRoutes";
import PublicRoute from "./Component/PublicRoute";
import { AuthProvider } from "./Context/AuthContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Quiz from "./Pages/Quiz";
import Results from "./Pages/Results";
import SignUp from "./Pages/SignUp";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route
                        path="/home"
                        element={
                            <Layout>
                                <Home />
                            </Layout>
                        }
                    />

                    <Route path="/*" element={<PrivateRoutes />}>
                        <Route
                            path="login"
                            element={
                                <Layout>
                                    <Login />
                                </Layout>
                            }
                        />
                        <Route
                            path="signup"
                            element={
                                <Layout>
                                    <SignUp />
                                </Layout>
                            }
                        />
                    </Route>
                    <Route path="/*" element={<PublicRoute />}>
                        <Route
                            path="quiz/:id"
                            element={
                                <Layout>
                                    <Quiz />
                                </Layout>
                            }
                        />
                        <Route
                            path="result/:id"
                            element={
                                <Layout>
                                    <Results />
                                </Layout>
                            }
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
