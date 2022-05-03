
import './index.css'
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import IniciarSesion from './layout/IniciarSesion'
import Layout from './layout/Layout'
import NuevoCliente from './paginas/NuevoCliente'
import Inicio from './paginas/Inicio';
import EditarCliente from './paginas/EditarCliente'
import VerCliente from './paginas/VerCliente'

function App() {
 

  return (

      <BrowserRouter>
      <Routes>
      <Route path='/clientes' element={<Layout/>}>
        <Route index element={<Inicio/>}/>
        <Route path='nuevo' element={<NuevoCliente/>}/>
        <Route path='editar/:id' element={<EditarCliente/>}/>
        <Route path=':id' element={<VerCliente/>}/>
      </Route>
      </Routes>
      </BrowserRouter>
   
  )
}

export default App
