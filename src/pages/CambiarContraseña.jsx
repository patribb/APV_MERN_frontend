import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from '../hooks/useAuth'

const CambiarContraseña = () => {
  const [alerta, setAlerta] = useState({});
  const [contraseña, setContraseña] = useState({pwd_actual: '', pwd_nuevo: ''});

  const { guardarContraseña } = useAuth();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(Object.values(contraseña).some(campo => campo === '')) {
      setAlerta({msg: 'Todos los campos son necesarios', error: true});
      return;
    }
    if(contraseña.pwd_nuevo.length < 6) {
      setAlerta({msg: 'La contraseña debe contener al menos 6 caracteres', error: true});
      return;
    }
    const respuesta = await guardarContraseña(contraseña);
    setAlerta({respuesta})
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10 text-teal-700">
        Cambiar la contraseña
      </h2>
      <p className="text-sm mt-5 mb-10 text-center">
        Modifica aquí tu{" "}
        <span className="text-teal-500 font-bold">contraseña</span>
      </p>
      <div className="flex justify-center shadow-md bg-white">
        <div className="w-full md:w-1/2">
          {msg && <Alerta alerta={alerta} />}
          <form className="py-10 px-5 lg:mb-5" onSubmit={handleSubmit}>
            <div className="flex items-center mb-5">
              <label className="inline-block w-30 mr-6 text-right font-bold text-gray-500">
                Contraseña actual
              </label>
              <input
              onChange={(e)=> setContraseña({...contraseña, [e.target.name]: e.target.value})}
                name="pwd_actual"
                placeholder="Escribe tu contraseña actual"
                type="password"
                className="flex-1 py-2 border-b-2 border-gray-400 focus:border-teal-400  text-gray-500 placeholder-gray-300 outline-none" />
            </div>
            <div className="flex items-center mb-5">
              <label className="inline-block w-30 mr-6 text-right font-bold text-gray-500">
                Nueva contraseña
              </label>
              <input
              onChange={(e)=> setContraseña({...contraseña, [e.target.name]: e.target.value})}
                name="pwd_nuevo"
                placeholder="Escribe tu nueva contraseña"
                type="password"
                className="flex-1 py-2 border-b-2 border-gray-400 focus:border-teal-400 text-gray-500 placeholder-gray-300 outline-none"/>
            </div>
            <div className="text-right">
              <input
                type="submit"
                className="py-3 mt-5 px-8 bg-teal-600 hover:bg-teal-800 hover:cursor-pointer rounded-xl text-white font-bold"
                value="Actualizar contraseña"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarContraseña;
