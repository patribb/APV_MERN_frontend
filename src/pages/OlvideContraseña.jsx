import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const OlvideContraseña = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || email.length < 6) {
      setAlerta({ msg: "El email es necesario.", error: true });
      return;
    }
    try {
      const { data } = await clienteAxios.post('/veterinarios/olvide-password', {email});
      setAlerta({msg: data.msg, error: false})
    } catch(error) {
      setAlerta({msg: error.response.data.msg, error: true})
    }
  };

  const {msg} = alerta;

  return (
    <>
      <div>
        <h1 className="text-teal-600 text-6xl font-black">
          Reestablece tu cuenta y no pierdas tus{" "}
          <span className="text-black">Paacientes</span>.
        </h1>
      </div>
      <div className="mt-20 md:mt-5  px-5 py-10 rounded-xl bg-white">
      {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="text-gray-500 block text-xl font-bold">
              E-mail
            </label>
            <input
              className="border w-full p-3 rounded-xl outline-none bg-gray-50 mt-2"
              type="email"
              placeholder="Tu E-mail para recuperar contraseña"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Enviar"
            className="bg-teal-700 w-full py-3 rounded-xl px-10 md:w-auto text-white font-bold hover:cursor-pointer hover:bg-teal-800"
          />
        </form>
        <nav className="mt-6">
          <Link className="text-teal-500 text-sm  text-center" to="/">
            Volver
          </Link>
          <br />
          <Link className="text-teal-500 text-sm  text-center" to="/registrar">
            ¿Aún no tienes una cuenta?{" "}
            <span className="text-teal-600 font-bold">Regístrate</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvideContraseña;
