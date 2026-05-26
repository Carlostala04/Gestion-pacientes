import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Record from "./pages/Record";
import PatientDeatils from "./pages/PatientDeatils";
import RegisterConsulta from "./pages/RegisterConsulta";
import EditPatient from "./pages/EditPatient";
import EditConsulta from "./pages/EditConsulta";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import User from "./pages/User";
import { supabase } from "./lib/supabase";

function useSession() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return session;
}

function ProtectedRoute({ children }) {
  const session = useSession();
  if (session === undefined) return null;
  if (!session) return <Navigate to="/" replace />;
  return children;
}

function PublicRoute({ children }) {
  const session = useSession();
  if (session === undefined) return null;
  if (session) return <Navigate to="/home" replace />;
  return children;
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Record"
        element={
          <ProtectedRoute>
            <Record />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/:id"
        element={
          <ProtectedRoute>
            <PatientDeatils />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/:id/nueva-consulta"
        element={
          <ProtectedRoute>
            <RegisterConsulta />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/:id/editar"
        element={
          <ProtectedRoute>
            <EditPatient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/:id/consulta/:consultaId/editar"
        element={
          <ProtectedRoute>
            <EditConsulta />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
