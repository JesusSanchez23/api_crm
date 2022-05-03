import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alerta from "./Alerta";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
    .min(4, "El nombre debe tener al menos 4 caracteres")
    .required('El nombre del Cliente es obligatorio'),
    empresa: Yup.string()
    
    .required('La empresa es obligatoria'),
    telefono: Yup.number()
    .integer('Numero no válido')
    .positive('Numero no válido')
    .typeError('El Numero no es válido'),
    email: Yup.string()
    .email('El email no es válido')
    .required('El email es obligatorio'),
    notas: "",
  });

  const handleSubmit = async(values) => {
    try {
if(cliente.id){

const url = `http://localhost:4000/clientes/${cliente.id}`;
const resultado = await fetch(url, {
  method: "PUT",
  body:JSON.stringify(values),
  headers: {
  "Content-Type": "application/json",
  }
})
const data = await resultado.json();
navigate("/clientes");

}


else{
  const url = "http://localhost:4000/clientes";
  const resultado = await fetch(url, {
      method: "POST",
      body: JSON.stringify(values),
      headers:{
          "Content-Type": "application/json"
      }
  });
  const respuesta = await resultado.json();
  navigate("/clientes");
}

       
    } catch (error) {
        console.log(error);
    }
  };

  return (

cargando ? <Spinner/> : (
    <div className="bg-white px-5 py-10 mt-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-center text-gray-600 font-bold text-2xl uppercase">{cliente?.id ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
      <Formik
        initialValues={{
          nombre: cliente.nombre || "",
          empresa: cliente.empresa || "",
          telefono: cliente.telefono || "",
          email: cliente.email || "",
          notas: cliente.notas || "",
        }}

        // Pinta los valores por defecto, si no se marca los asigna ero el formulario aparece en blanco
enableReinitialize={true}

        onSubmit={async(values,{resetForm}) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({errors,touched}) =>{
            return(
          <Form className="mt-10">
            <div className="mb-4">
              <label htmlFor="nombre" className="text-gray-800">
                Nombre:
              </label>
              <Field
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                id="nombre"
                placeholder="Nombre del Cliente"
                name="nombre"
              />

              {errors.nombre && touched.nombre  ? (
                 <Alerta>{errors.nombre}</Alerta>
              ) : ''}
                     
            </div>

            <div className="mb-4">
              <label htmlFor="empresa" className="text-gray-800">
                Empresa del Cliente:
              </label>
              <Field
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                id="empresa"
                placeholder="Empresa"
                name="empresa"
              />
              {errors.empresa && touched.empresa  ? (
                 <Alerta>{errors.empresa}</Alerta>
              ) : ''}
                  
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="text-gray-800">
                Email:
              </label>
              <Field
                type="email"
                className="mt-2 block w-full p-3 bg-gray-50"
                id="email"
                placeholder="Email"
                name="email"
              />
                  {errors.email && touched.email  ? (
                 <Alerta>{errors.email}</Alerta>
              ) : ''}
            </div>

            <div className="mb-4">
              <label htmlFor="telefono" className="text-gray-800">
                Teléfono:
              </label>
              <Field
                type="tel"
                className="mt-2 block w-full p-3 bg-gray-50"
                id="telefono"
                placeholder="Telefono"
                name="telefono"
              />
               {errors.telefono && touched.telefono  ? (
                 <Alerta>{errors.telefono}</Alerta>
              ) : ''}
            </div>

            <div className="mb-4">
              <label htmlFor="notas" className="text-gray-800">
                Notas:
              </label>
              <Field
                as="textarea"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50 h-30"
                id="notas"
                placeholder="Notas"
                name="notas"
              />
            </div>

            <input
              className="bg-blue-800 p-3 rounded-md block w-full text-white font-bold hover:bg-blue-700 cursor-pointer"
              type="submit"
              value={`${cliente?.id ? "Editar Cliente" : "Agregar Cliente"}`}
            />
          </Form>
        )}}
      </Formik>
    </div>
  )
  );
};

Formulario.defaultProps = {
cliente:{},
cargando:false
};

export default Formulario;
