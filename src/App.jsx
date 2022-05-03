import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Login from "./pages/Login";
import NuevaContraseña from "./pages/NuevaContraseña";
import OlvideContraseña from "./pages/OlvideContraseña";
import Regsitrar from "./pages/Regsitrar";
import { AuthProvider } from "./context/authProvider";
import { PacientesProvider } from "./context/PacientesProvider";
import AdminLayout from "./layout/AdminLayout";
import AdministrarPacientes from "./pages/AdministrarPacientes";
import EditarPerfil from "./pages/EditarPerfil";
import CambiarContraseña from "./pages/CambiarContraseña";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <PacientesProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Regsitrar />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            <Route path="olvide-password" element={<OlvideContraseña />} />
            <Route
              path="olvide-password/:token"
              element={<NuevaContraseña />}
            />
          </Route>
          <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdministrarPacientes />} />
          <Route path='perfil' element={<EditarPerfil />} />
          <Route path='cambiar-password' element={<CambiarContraseña />} />
          </Route>
        </Routes>
        </PacientesProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
