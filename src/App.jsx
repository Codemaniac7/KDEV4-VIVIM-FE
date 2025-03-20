import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Checklist from "./pages/Checklist";
import Board from "./pages/Board";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 로그인 페이지 */}
          <Route path="/login" element={<Login />} />

          {/* 홈 페이지는 누구나 접근 가능 */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>

          {/* 보호된 페이지 */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id/checklist"
            element={
              <ProtectedRoute>
                <Checklist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id/board"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
