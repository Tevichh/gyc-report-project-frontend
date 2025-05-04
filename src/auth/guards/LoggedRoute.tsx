import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { isAuthenticated } from "../auth";

interface PrivateRouteProps {
    children: ReactNode;
}

export default function LoggedRoute({ children }: PrivateRouteProps) {
    return isAuthenticated() ? <Navigate to="/" /> : <>{children}</>;
}