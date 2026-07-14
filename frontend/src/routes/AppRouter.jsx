import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { Login } from "../pages/auth/Login";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { ProtectedRoute } from "./ProtectedRoute";
import Register from "../pages/auth/Register";
import { Teams } from "../pages/Teams";
import { Profile } from "../pages/Profile";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
