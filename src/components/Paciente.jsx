import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
    const { nombre, email, fecha, propietario, sintomas, _id } = paciente;
    const { setEdicion, eliminarPaciente } = usePacientes();

    const formatDate = (fecha) => {
      const newDate = new Date(fecha)
      return new  Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(newDate);
    }

  return (
    <div className='mx-5 my-10 bg-white px-5 py-10 shadow-md'>
      <p className='font-bold text-teal-500 my-2'>🐶Nombre:{" "}
      <span className="font-normal text-gray-500">{ nombre}</span>
      </p>
      <p className='font-bold text-teal-500 my-2'>🙍Propietario:{" "}
      <span className="font-normal text-gray-500">{ propietario}</span>
      </p>
      <p className='font-bold text-teal-500 my-2'>📧Email contacto:{" "}
      <span className="font-normal text-gray-500">{ email}</span>
      </p>
      <p className='font-bold text-teal-500 my-2'>📅Fecha de alta:{" "}
      <span className="font-normal text-gray-500">{ formatDate(fecha) }</span>
      </p>
      <p className='font-bold text-teal-500 my-2'>💊Síntomas/motivo visita:{" "}
      <span className="font-normal text-gray-500">{ sintomas }</span>
      </p>
      <div className="flex justify-between my-5">
      <button
      onClick={()=>setEdicion(paciente)}
          type="button"
          className="py-2 px-10 bg-teal-600 hover:bg-teal-800 hover:cursor-pointer rounded-xl text-white font-bold"
        >✏️Editar</button>
        <button
        onClick={()=> eliminarPaciente(_id)}
          type="button"
          className="py-2 px-10 bg-rose-600 hover:bg-rose-400 hover:cursor-pointer rounded-xl text-white font-bold"
        >🗑️Eliminar</button>
      </div>
    </div>
  )
}

export default Paciente
