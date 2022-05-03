import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/axios";

const NuevaContraseña = () => {
  const [contraseña, setContraseña] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [contraseñaModificada, setContraseñaModificada] = useState(false)

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({ msg: "Escribe tu nueva contraseña" });
        setTokenValido(true);
      } catch (error) {
        setAlerta({ msg: "Uppsss, algo salió mal...", error: true });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contraseña.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener al menos 6 caracteres.",
        error: true,
      });
      return;
    }
    setAlerta({});
    try {
      const url = `veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { contraseña });
      setContraseñaModificada(true)
      setAlerta({ msg: data.msg });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-teal-600 text-6xl font-black">
          Crea una nueva Contraseña para acceder a tus{" "}
          <span className="text-black">Pacientes</span>.
        </h1>
      </div>
      <div className="mt-20 md:mt-5  px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="text-gray-500 block text-xl font-bold">
                Nueva Contraseña
              </label>
              <input
                className="border w-full p-3 rounded-xl outline-none bg-gray-50 mt-2"
                type="password"
                placeholder="Tu nueva contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Reestablecer contraseña"
              className="bg-teal-700 w-full py-3 rounded-xl px-10 md:w-auto text-white font-bold hover:cursor-pointer hover:bg-teal-800"
            />
          </form>
        )}
        {contraseñaModificada && (
            <nav className="mt-6">
          <Link to="/" className="text-teal-600 font-bold">
            Iniciar sesión
          </Link>
        </nav>
        )}
      </div>
    </>
  );
};

export default NuevaContraseña;
