import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [alerta, setAlerta] = useState({});

  const {setAuth} = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, contraseña].includes('')) {
      setAlerta({msg: 'Todos los campos son necesarios para iniciar sesión', error: true});
      return;
    }
    try {
      const { data } = await clienteAxios.post('/veterinarios/login', {email, contraseña});
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/admin');
    } catch (error) {
      setAlerta({msg: error.response.data.msg, error: true});
    }

  }

  const {msg} = alerta;
  
  return (
    <>
      <div>
        <h1 className="text-teal-600 text-6xl font-black">
          Inicia sesión y Administra tus{" "}
          <span className="text-black">Pacientes</span>.
        </h1>
      </div>
      <div className='mt-20 md:mt-5  px-5 py-10 rounded-xl bg-white'>
      { msg && <Alerta alerta={ alerta } /> }
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="text-gray-500 block text-xl font-bold">
              E-mail
            </label>
            <input
              className="border w-full p-3 rounded-xl outline-none bg-gray-50 mt-2"
              type="email"
              placeholder="Tu E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Iniciar sesión"
            className="bg-teal-700 w-full py-3 rounded-xl px-10 md:w-auto text-white font-bold hover:cursor-pointer hover:bg-teal-800"
          />
        </form>
        <nav className="mt-6">
          <Link className="text-teal-500 text-sm  text-center" to="/registrar">
            ¿Aún no tienes una cuenta?{" "}
            <span className="text-teal-600 font-bold">Regístrate</span>
          </Link>
          <br />
          <Link className="text-teal-500 text-sm  text-center" to="/olvide-password">
            ¿No recuerdas tu contraseña?{" "}
            <span className="text-teal-600 font-bold">
              Recuperar contraseña
            </span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
