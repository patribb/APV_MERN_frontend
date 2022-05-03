import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [propietario, setPropietario] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [alerta, setAlerta] = useState({});
  const [id, setId] = useState(null);

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if(paciente?.nombre) {
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
        setId(paciente._id)
    }
   
}, [paciente])




const handleSubmit = e => {
    e.preventDefault()

    // validar el formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')) {
        setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
        })
        return;
    }


    
    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id })
    setAlerta({
        msg: 'Guardado Correctamente'
    })
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    setId('')
}
  const { msg } = alerta;

  return (
    <>
      <p className="text-gray-500 font-bold text-3xl text-center mb-10 underline">
        Añadir y administrar{" "}
        <span className="text-teal-600 font-black">Pacientes</span>
      </p>
      {msg && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmit} className="py-10 px-5 lg:mb-5 ">
        <div className="flex items-center mb-5">
          <label
            htmlFor="nombre"
            className="inline-block w-20 mr-6 text-right 
                                 font-bold text-gray-500"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="nombre del animal"
            className="flex-1 py-2 border-b-2 border-gray-400 focus:border-teal-400 
                      text-gray-500 placeholder-gray-300
                      outline-none"
          />
        </div>

        <div className="flex items-center mb-5">
          <label
            htmlFor="propietario"
            className="inline-block w-20 mr-6 text-right
                                    font-bold text-gray-500"
          >
            Propietario
          </label>
          <input
            id="propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
            type="text"
            placeholder="nombre del propietario"
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
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e-mail de contacto"
            className="flex-1 py-2 border-b-2 border-gray-400 focus:border-teal-400 
                      text-gray-500 placeholder-gray-300
                      outline-none"
          />
        </div>

        <div className="flex items-center mb-5">
          <label
            htmlFor="fecha"
            className="inline-block w-20 mr-6 text-right
                                    font-bold text-gray-500"
          >
            Fecha
          </label>
          <input
            id="fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            placeholder="fecha de alta"
            className="flex-1 py-2 border-b-2 border-gray-400 focus:border-teal-400 
                      text-gray-500 placeholder-gray-300
                      outline-none"
          />
        </div>

        <div className="flex items-center mb-10">
          <label
            htmlFor="email"
            className="inline-block w-20 mr-6 text-right
                                    font-bold text-gray-500"
          >
            Síntomas
          </label>
          <textarea
            id="sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            placeholder="síntomas o motivos de la consulta..."
            className="flex-1 py-2 border-b-2 border-gray-400 focus:border-teal-400 
                      text-gray-500 placeholder-gray-300
                      outline-none"
          />
        </div>

        <div className="text-right">
          <input
            type="submit"
            className="py-3 px-8 bg-teal-600 hover:bg-teal-800 hover:cursor-pointer rounded-xl text-white font-bold"
            value={id ? "Guardar cambios" : "Guardar paciente"}
          />
        </div>
      </form>
    </>
  );
};

export default Formulario;
