import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const VerCliente = () => {
  const params = useParams();
  const { id } = params;
  const [cliente, setcliente] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    const extraerDatosAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        setcliente(data);
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando);
    };
    extraerDatosAPI();
  }, []);

  return (
      
     cargando ? <Spinner/> : ( 
    Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (
      
      <div className="bg-white px-5 py-10 rounded-md shadow-md">
      {cargando ? 'cargando...' : (
       <>
      <h1 className="text-center font-black text-4xl text-blue-900 mb-5">
        Información del Cliente: <span className="text-black">{cliente.nombre}</span>
      </h1>
      <p className="text-center">
       Datos del Cliente
      </p>

      <p className="text-2xl text-gray-600">
        <span className="text-gray-800 uppercase font-bold ">Cliente: </span>
        {cliente.nombre}
      </p>
      <p className="text-2xl text-gray-600">
        <span className="text-gray-800 uppercase font-bold ">Email: </span>
        {cliente.email}
      </p>


    {cliente.telefono && (
      <p className="text-2xl text-gray-600">
        <span className="text-gray-800 uppercase font-bold ">Telefono: </span>
        {cliente.telefono}
      </p>
      )}

      {cliente.notas && (
      <p className="text-2xl text-gray-600">
        <span className="text-gray-800 uppercase font-bold ">notas: </span>
        {cliente.notas}
      </p>
      )}
    </>
      ) }
    </div>
    )
    )
  );

};

export default VerCliente;
