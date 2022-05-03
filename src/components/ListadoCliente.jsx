import { useNavigate } from "react-router-dom";

const ListadoCliente = ({cliente, handleEliminar}) => {
    const {nombre,empresa,telefono,email,notas,id} = cliente;
    

    const navigate = useNavigate();
  return (
    <tr className='border-b hover:bg-gray-100'>
     <td className='p-3 '>{nombre}</td> 
     <td className='p-3 '>
         <p><span className='text-gray-800 uppercase font-bold'>Email: </span>{email}</p>
         <p><span className='text-gray-800 uppercase font-bold'>Tel: </span>{telefono}</p>
         </td> 
     <td className='p-3 '>{empresa}</td> 
    <td className='p-3'>
    <button className='bg-blue-600 p-1 w-full rounded-md text-white cursor-pointer hover:bg-blue-400 mb-1 font-bold uppercase' onClick={()=> navigate(`${id}`)}>Ver</button>
        <button className='bg-yellow-600 p-1 w-full rounded-md text-white cursor-pointer hover:bg-yellow-400 mb-1 font-bold uppercase' onClick={()=>navigate(`editar/${id}`)}>Editar</button>
        <button className='bg-red-600 p-1 w-full rounded-md text-white cursor-pointer hover:bg-red-400 font-bold uppercase' onClick={()=>handleEliminar(id)}>Eliminar</button>
    </td>
    </tr>
  )
}

export default ListadoCliente