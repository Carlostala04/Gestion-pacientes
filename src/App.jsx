import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Record from './pages/Record'
import PatientDeatils from './pages/PatientDeatils'
import RegisterConsulta from './pages/RegisterConsulta'
import EditPatient from './pages/EditPatient'
import EditConsulta from './pages/EditConsulta'
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Record" element={<Record/>}/>
      <Route path="/patient/:id" element={<PatientDeatils/>}/>
      <Route path="/patient/:id/nueva-consulta" element={<RegisterConsulta/>}/>
      <Route path="/patient/:id/editar" element={<EditPatient/>}/>
      <Route path="/patient/:id/consulta/:consultaId/editar" element={<EditConsulta/>}/>
    </Routes>
  );
}

export default App;
