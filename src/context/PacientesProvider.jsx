import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const PacienteContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({})

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("/pacientes", config);
        setPacientes(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, []);

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
    if(paciente.id) {
      try {
        const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
        const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
        setPacientes(pacientesActualizado)
      } catch (error) {
        
      }
    } else {
      try {
        const { data } = await clienteAxios.post("/pacientes", paciente, config);
        const { createdAt, updatedAt, __v, ...pacienteGuardado } = data;
        setPacientes([pacienteGuardado, ...pacientes]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const setEdicion = (paciente) => {
    setPaciente(paciente);
  }

  const eliminarPaciente = async id => {
    const confirmar = window.confirm('¿Estás seguro de eliminar este paciente?');
    if(confirmar) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
        const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id)
        setPacientes(pacientesActualizado)
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <PacienteContext.Provider value={{ pacientes, guardarPaciente, setEdicion, paciente, eliminarPaciente }}>
      {children}
    </PacienteContext.Provider>
  );
};

export default PacienteContext;
