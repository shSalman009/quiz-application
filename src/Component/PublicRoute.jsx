import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function PublicRoute() {
    const { currentUser } = useAuth();

    return currentUser ? <Outlet /> : <Navigate to="/signup" />;
}
