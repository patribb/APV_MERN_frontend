import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from '../config/axios'

const ConfirmarCuenta = () => {
  const params = useParams();
  const { id } = params;

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alerta, setAlerta] = useState({})

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`
        const { data } = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({msg: data.msg, error: false})
      } catch (error) {
        setAlerta({msg: error.response.data.msg, error: true});
      }
      setLoading(false);
    }
    confirmarCuenta();
  }, [])
  
  
  return (
    <>
      <div>
        <h1 className="text-teal-600 text-6xl font-black">
          Confirma tu cuenta y administra tus{" "}
          <span className="text-black">Pacientes</span>.
        </h1>
      </div>
      <div className='mt-20 md:mt-5  px-5 py-10 rounded-xl bg-white'>
       {!loading && <Alerta alerta={alerta} />}
       {cuentaConfirmada && (
        <nav className="mt-6">
          <Link className="text-teal-500 text-center" to="/">
            Ya puedes {" "}
            <span className="text-teal-600 font-bold">Iniciar sesión</span>
          </Link>
          </nav>
       )}
      </div>
    </>
  )
}

export default ConfirmarCuenta;