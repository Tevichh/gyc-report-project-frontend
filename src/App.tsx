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

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="mainContainer">

      {!isLoginPage && <HeaderComponet />}
      {!isLoginPage && <AsideNavComponent />}

      <main className={!isLoginPage ? "mainContent p-4 sm:ml-64" : ""}>
        <div className={!isLoginPage ? "p-4 border-2 border-gray-200 rounded-lg mt-14 h-150" : ""}>
          <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <PerfilComponent />
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
