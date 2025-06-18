import { CircleUserRound, FileSpreadsheet, LayoutDashboard, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"

export const AsideNavComponent = () => {
    const location = useLocation();

    const [rol, setRol] = useState("tecnico");

    useEffect(() => {
        setRol(localStorage.getItem("rol") || "tecnico");
    }, [])

    const navItems = [
        {
            to: "/", label: "Perfil", icon: (
                <CircleUserRound className="w-6 h-6 transition duration-75" aria-hidden="true" />

            )
        },
        {
            to: "/reports", label: "Reportes", icon: (
                <FileSpreadsheet className="w-6 h-6 transition duration-75" aria-hidden="true" />
            )
        },
    ];
    if (rol === "administrador") {
        navItems.push(
            {
                to: "/users", label: "Usuarios", icon: (
                    <Users className="w-6 h-6 transition duration-75" aria-hidden="true" />
                )
            },
            {
                to: "/dashboard", label: "Dashboard", icon: (
                    <LayoutDashboard className="w-6 h-6 transition duration-75" aria-hidden="true" />
                )
            }
        );
    }

    return (
        <div className="asideNavComponent">
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium">
                        {navItems.map(({ to, label, icon }) => {
                            const isActive = location.pathname === to;
                            const baseClasses = "flex items-center p-2 rounded-lg group";
                            const activeClasses = "bg-orange-500 text-white";
                            const hoverClasses = "text-gray-900 hover:bg-orange-500 hover:text-white";
                            return (
                                <li key={label}>
                                    <Link
                                        to={to}
                                        className={`${baseClasses} ${isActive ? activeClasses : hoverClasses}`}
                                    >
                                        <div className={`${isActive ? "text-white" : "text-gray-500 group-hover:text-white"} w-5 h-5`}>
                                            {icon}
                                        </div>
                                        <span className="ms-3">{label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </aside>
        </div>
    );
};
