import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdministrarPacientes = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
       <button
        type="button"
        className="py-3 px-8 mx-10 mb-10 bg-teal-400 text-white font-bold rounded-xl hover:bg-teal-800 md:hidden"
        onClick={()=> setShowForm(!showForm)}
      >
        {showForm ? 'Cerrar Formulario' : 'Abrir Formulario'}
      </button>
      <div className={`${showForm ? "block" : "hidden"} md:block md:w-1/2 lg:w-2/5`}>
        <Formulario />
      </div>
      <div className="md:w-1/2 lg:3/5">
        <ListadoPacientes />
      </div>
    </div>
  );
};

export default AdministrarPacientes;
