import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="flex gap-3">
      <Link
        to="/admin/perfil"
        className="font-bold text-gray-400 hover:text-teal-600"
      >
        🙍Perfil
      </Link>{" "}
      |
      <Link
        to="/admin/cambiar-password"
        className="font-bold text-gray-400 hover:text-teal-600"
      >
        🔑Cambiar contraseña
      </Link>
    </nav>
  );
};

export default AdminNav;
