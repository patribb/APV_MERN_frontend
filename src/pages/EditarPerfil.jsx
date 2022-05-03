import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import AdminNav from "../components/AdminNav";
import Alerta from '../components/Alerta';

const EditarPerfil = () => {
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});
  const { auth, actualizarPerfil } = useAuth();

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, email } = perfil;
    if([nombre, email].includes('')) {
       setAlerta({msg: 'Tu perfil debe incluir un nombre y un email', error: true});
       return;
    }
    const resultado = await actualizarPerfil(perfil);
    setAlerta({msg: resultado})
  }
  
  const {msg} = alerta;

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10 text-teal-700">
        Editar Perfil
      </h2>
      <p className="text-sm mt-5 mb-10 text-center">
        Edita aqui tu{" "}
        <span className="text-teal-500 font-bold">información</span>
      </p>
      <div className="flex justify-center shadow-md bg-white">
        <div className="w-full md:w-1/2">
        {msg && <Alerta alerta={alerta}/>}
          <form className="py-10 px-5 lg:mb-5" onSubmit={handleSubmit}>
            <div className="flex items-center mb-5">
              <label
                className="inline-block w-20 mr-6 text-right 
                                 font-bold text-gray-500"
              >
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={perfil.nombre || ''}
                onChange={(e) => setPerfil({...perfil, [e.target.name] : e.target.value})}
                className="flex-1 py-2 border-b-2 border-gray-400 focus:border-teal-400 
                      text-gray-500 placeholder-gray-300
                      outline-none"
              />
            </div>

            <div className="flex items-center mb-5">
              <label
                className="inline-block w-15 mr-6 text-right 
                                 font-bold text-gray-500"
              >
                Sitio Web
              </label>
              <input
                type="text"
                name="web"
                value={perfil.web || ''}
                onChange={(e) => setPerfil({...perfil, [e.target.name] : e.target.value})}
                className="flex-1 py-2 border-b-2 border-gray-400 focus:border-teal-400 
                      text-gray-500 placeholder-gray-300
                      outline-none"
              />
            </div>

            <div className="flex items-center mb-5">
              <label
                className="inline-block w-20 mr-6 text-right 
                                 font-bold text-gray-500"
              >
                No.Teléfono
              </label>
              <input
                type="text"
                name="teléfono"
                value={perfil.teléfono || ''}
                onChange={(e) => setPerfil({...perfil, [e.target.name] : e.target.value})}
                className="flex-1 py-2 border-b-2 border-gray-400 focus:border-teal-400 
                      text-gray-500 placeholder-gray-300
                      outline-none"
              />
            </div>

            <div className="flex items-center mb-5">
              <label
                htmlFor="email"
                className="inline-block w-20 mr-6 text-right
                                    font-bold text-gray-500"
              >
                E-mail
              </label>
              <input
                name="email"
                type="email"
                value={perfil.email || ''}
                onChange={(e) => setPerfil({...perfil, [e.target.name] : e.target.value})}
                className="flex-1 py-2 border-b-2 border-gray-400 focus:border-teal-400 
                      text-gray-500 placeholder-gray-300
                      outline-none"
              />
            </div>

            <div className="text-right">
              <input
                type="submit"
                className="py-3 px-8 bg-teal-600 hover:bg-teal-800 hover:cursor-pointer rounded-xl text-white font-bold"
                value="Guardar cambios"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;
