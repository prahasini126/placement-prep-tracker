import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import AddProgress from "./pages/AddProgress";
import WeakAreas from "./pages/WeakAreas";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";


function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}


function AppLayout() {

  // ⭐ THEME LOADER
  useEffect(() => {

    const savedTheme = localStorage.getItem("theme") ;

    if(savedTheme === "dark"){
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.remove("dark");
    }

  }, []);

  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">
          <Routes>

            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />

            <Route path="/add" element={
              <PrivateRoute>
                <AddProgress />
              </PrivateRoute>
            } />

            <Route path="/weak" element={
              <PrivateRoute>
                <WeakAreas />
              </PrivateRoute>
            } />

          </Routes>
        </div>
      </div>
    </div>
  );
}


// ROOT
export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/*" element={<AppLayout />} />

      </Routes>

    </BrowserRouter>
  );
}
