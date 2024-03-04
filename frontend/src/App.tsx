import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./context/AppContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard step={"list"} />} />
        <Route
          path="/dashboard/register"
          element={<Dashboard step={"register"} />}
        />
        <Route
          path="/dashboard/edit/:id"
          element={<Dashboard step={"edit"} />}
        />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
