import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { searchClientByName } from '../services/clients';
import { useState } from 'react';
import { Link } from 'react-router-dom'



export const SearchClientBar = () => {

    const [clients, setClients] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Este campo es obligatorio')
    }),
    onSubmit: async(values) => {

        try {
            const res = await searchClientByName(values) ;
            
            setClients(res);
            
        } catch (error) {
            console.log(error);

            navigate('/auth/login');
            sessionStorage.removeItem('tmtl-token');
            
            return Swal.fire({
              icon: 'error',
              title: `No se encuentra ningún cliente con ese nombre`,
              showConfirmButton: false,
              timer: 2000
            })
        }

    }
  });

  const cleanClient = () => {
    setClients([])
  }
 
  return (
    <>
        <div>
            <form onSubmit={formik.handleSubmit} className="form-label search-form">
                <input
                    id="name"
                    name="name"
                    type="text"
                    className='form-control mt-3'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder="Nombre cliente"
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className='error'>{formik.errors.name}</div>
                ) : null}
                <button className='btn btn-outline-success mt-3' type="submit">Buscar</button>
            </form>
        </div>
        {
            (clients.length === 0)
            ?
                null
            : 
            <ul className="list-group animate__animated animate__fadeInUp">
                {
                    clients.map((client) => 
                        <li className="list-group-item mx-2 d-flex justify-content-between align-items-start" key={client.id} aria-current="true">
                            <p className='mt-2'>{client.name} {client.surname}</p>
                            <Link className='btn btn-outline-success mx-2' to={`/clientDetails/${client.id}`} onClick={cleanClient} >Detalles</Link>
                        </li>
                    )
                }
            </ul>
        }
    </>
  )
}





