import { Route, Routes, useLocation } from "react-router-dom"
import { HeaderComponet } from "./components/headerComponent/HeaderComponet"
import { LoginComponent } from "./components/loginComponent/LoginComponent"
import { AsideNavComponent } from "./components/asideNavComponent/AsideNavComponent"
import "flowbite";
import { DashboardComponent } from "./components/dashboardComponent/DashboardComponent";
import { PerfilComponent } from "./components/perfilComponent/PerfilComponent";
import { ReportComponent } from "./components/reportComponent/ReportComponent";
import PrivateRoute from "./auth/guards/PrivateRoute";
import LoggedRoute from "./auth/guards/LoggedRoute";
import { useEffect, useState } from "react";
import { getAllUsers, getUser } from "./services/userService";
import { UserInfo } from "./models/userInfo.interface";
import { UsersComponent } from "./components/usersComponent/UsersComponent";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [user, setUser] = useState<UserInfo | null>(null);
  const [users, setUsers] = useState<UserInfo[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (token && userId) {
        const user = await getUser(userId);
        const allUsers = await getAllUsers();

        setUser(user);
        setUsers(allUsers);
      }
    };

    fetchUser();
  }, [isLoginPage]);


  return (
    <div className="mainContainer">

      {!isLoginPage && <HeaderComponet />}
      {!isLoginPage && <AsideNavComponent />}

      <main className={!isLoginPage ? "mainContent p-4 sm:ml-64" : ""}>
        <div className={!isLoginPage ? "p-4 border-2 border-gray-200 rounded-lg mt-14 h-150" : ""}>
          <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <PerfilComponent userInfo={user} />
              </PrivateRoute>
            } />
            <Route path="/users" element={
              <PrivateRoute>
                <UsersComponent users={users} />
              </PrivateRoute>
            } />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DashboardComponent />
              </PrivateRoute>
            } />
            <Route path="/reports" element={
              <PrivateRoute>
                <ReportComponent />
              </PrivateRoute>
            } />
            <Route path="/login" element={
              <LoggedRoute>
                <LoginComponent />
              </LoggedRoute>
            } />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App
