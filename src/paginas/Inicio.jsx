import { useEffect, useState } from "react";
import ListadoCliente from "../components/ListadoCliente";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    const consultarAPI = async () => {
      const url = "http://localhost:4000/clientes";
      const resultado = await fetch(url);
      const data = await resultado.json();

      setClientes(data);
    };
    consultarAPI();
  }, []); 
  
  const handleEliminar = async(id)=>{
    const confirmar = confirm('Deseas eliminar el registro?');

    if(confirmar){
      try {
        const url=`http://localhost:4000/clientes/${id}`;
        const resultado = await fetch(url, {
          method:'DELETE',
        })
        await resultado.json();

        const ClientesArray = clientes.filter(cliente => cliente.id !== id);
        setClientes(ClientesArray);

      } catch (error) {
        console.log('error',error);
      }
    }
  }

  return (
    <>
      <h1 className="text-center font-black text-4xl text-blue-900 mb-5">
        Clientes
      </h1>
      <p className="text-center">Administra tu clientes</p>

      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-blue-800 text-white'>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
        </thead>

        <tbody>
        {clientes.map((cliente) => {
        return <ListadoCliente key={cliente.id} cliente={cliente} handleEliminar={handleEliminar} />;
      })}
        </tbody>
      </table>   

     
    </>
  );
};

export default Inicio;
