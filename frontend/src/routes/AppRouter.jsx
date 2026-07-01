import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AuthLayout from "../layout/authLayout";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={AuthLayout}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
