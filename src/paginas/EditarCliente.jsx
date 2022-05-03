import Formulario from '../components/Formulario';
import {useEffect,useState} from 'react';
import {useParams} from "react-router-dom"

const EditarCliente = () => {
  const params = useParams();
  const { id } = params;
  const [cliente, setCliente] = useState({}); 
   const [cargando, setCargando] = useState(true);
  
  useEffect(() => {

    const extraerDatosAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        setCliente(data);
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando);
      
    };
    extraerDatosAPI();
  }, []);


  return (
    <>
    <h1 className='text-center font-black text-4xl text-blue-900 mb-5'>Editar Cliente</h1>
    <p className='text-center'>Edita la información del cliente</p>
    {cliente?.id ? (
    <Formulario cliente={cliente} cargando={cargando}/>
    ) :(
      <p>Id Incorrecto</p>
    )}
    </>
  )
}

export default EditarCliente