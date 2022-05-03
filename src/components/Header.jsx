import { Link } from "react-router-dom";
import { AiOutlineLogout } from 'react-icons/ai';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { cerrarSesion } = useAuth();

  return (
    <>
      <header className="py-10 bg-teal-600">
        <div className="mx-auto px-10 container flex justify-between items-center flex-col lg:flex-row">
          <h1 className="font-bold text-teal-200 text-2xl text-center">
            Administrador de Pacientes de{" "}
            <span className="text-white font-black">Veterinaria</span>
          </h1>
          <nav className='flex gap-4 mt-5 items-center lg:mt-0'>
              <Link to='/admin' className='text-white text-sm font-bold'>Pacientes</Link>
              <Link to='/admin/perfil' className='text-white text-sm font-bold'>Perfil</Link>
              <button onClick={cerrarSesion}  type='button' className='text-white text-xl'><AiOutlineLogout /></button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;

