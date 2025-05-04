import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { isAuthenticated } from "../auth";

interface PrivateRouteProps {
    children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    return isAuthenticated() ? children : <Navigate to="/login" />;
}
