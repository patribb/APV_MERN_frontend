import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Regsitrar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [repContraseña, setRepContraseña] = useState('');
  const [alerta, setAlerta] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if([nombre, email, contraseña, repContraseña].includes('')) {
      setAlerta({msg: 'Todos los campos son necesarios.', error: true})
      return;
    }
    if(contraseña !== repContraseña) {
      setAlerta({msg: 'Las contraseñas no coinciden.', error: true})
      return;
    }
    if(contraseña.length < 6) {
      setAlerta({msg: 'La contraseña debe tener al menos 6 caracteres.', error: true})
      return;
    }

    setAlerta({});

    // Crear el usuario mediante la api
    try {
       await clienteAxios.post('/veterinarios', {nombre, email, contraseña});
       setAlerta({msg: 'Usuario creado correctamente, revisa tu email.', error: false});
    } catch (error) {
      setAlerta({msg: error.response.data.msg, error: true})
    }
  }

  const {msg} = alerta;

  return (
    <>
       <div>
        <h1 className="text-teal-600 text-6xl font-black">
          Crea tu cuenta y Administra tus{" "}
          <span className="text-black">Pacientes</span>.
        </h1>
      </div>
      <div className='mt-20 md:mt-5  px-5 py-10 rounded-xl bg-white'>
      {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
        <div className="my-5">
            <label className="text-gray-500 block text-xl font-bold">
              Nombre
            </label>
            <input
              className="border w-full p-3 rounded-xl outline-none bg-gray-50 mt-2"
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e)=> setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="text-gray-500 block text-xl font-bold">
              E-mail
            </label>
            <input
              className="border w-full p-3 rounded-xl outline-none bg-gray-50 mt-2"
              type="email"
              placeholder="Tu E-mail"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="text-gray-500 block text-xl font-bold">
              Contraseña
            </label>
            <input
              className="border w-full p-3 rounded-xl outline-none bg-gray-50 mt-2"
              type="password"
              placeholder="Tu contraseña"
              value={contraseña}
              onChange={(e)=> setContraseña(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="text-gray-500 block text-xl font-bold">
              Repetir Contraseña
            </label>
            <input
              className="border w-full p-3 rounded-xl outline-none bg-gray-50 mt-2"
              type="password"
              placeholder="Repetir tu contraseña"
              value={repContraseña}
              onChange={(e)=> setRepContraseña(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Crear cuenta"
            className="bg-teal-700 w-full py-3 rounded-xl px-10 md:w-auto text-white font-bold hover:cursor-pointer hover:bg-teal-800"
          />
        </form>
        <nav className="mt-6">
          <Link className="text-teal-500 text-sm  text-center" to="/">
            ¿Ya tienes una cuenta?{" "}
            <span className="text-teal-600 font-bold">Iniciar sesión</span>
          </Link>
          <br />
          {/* <Link className="text-teal-500 text-sm  text-center" to="/olvide-password">
            ¿No recuerdas tu contraseña?{" "}
            <span className="text-teal-600 font-bold">
              Recuperar contraseña
            </span>
          </Link> */}
        </nav>
      </div>
    </>
  )
}

export default Regsitrar;
