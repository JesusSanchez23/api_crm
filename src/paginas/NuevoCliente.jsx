import React from 'react'
import Formulario from '../components/Formulario'

const NuevoCliente = () => {
  return (
    <>
    <h1 className='text-center font-black text-4xl text-blue-900 mb-5'>Nuevo Cliente</h1>
    <p className='text-center'>Llene los siguientes datos para registrar un cliente</p>

    <Formulario/>
    </>
  )
}

export default NuevoCliente