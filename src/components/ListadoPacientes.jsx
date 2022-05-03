import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-teal-600 text-center underline">
            Lista de Pacientes y citas
          </h2>
          <p className="text-md text-center mt-5 mb-10 font-bold text-gray-500">
            Administra tus{" "}
            <span className="text-teal-400 font-black">
              pacientes y sus citas.
            </span>
          </p>
          { pacientes.map((paciente) => (
            <Paciente key={paciente._id} paciente={paciente} />
          )) }
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-teal-600 text-center">
            Aún no hay pacientes regsitrados
          </h2>
          <p className="text-xl text-center mt-5 mb-10 font bold text-gray-500">
            Usa el formulario para añadir pacientes y sus citas
          </p>
        </>
      )}
    </>
  );
};

export default ListadoPacientes;
