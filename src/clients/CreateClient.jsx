import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createClient } from '../services/clients';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateClient = () => {

    const navigate = useNavigate();

    useEffect(() =>{
        if(!sessionStorage.getItem('tmtl-token')){
            navigate('/auth/login');
        }
    },[])

    const formik = useFormik({
        initialValues: {
          name: '',
          surname: '',
          address: '',
          zone: '',
          telephone:'',
          email: '',
          birdDate:'',
          vip: false,
          initialWeigth: '',
          objetiveWeigth: ''
        },
        validationSchema: Yup.object({
          name: Yup.string()
            .max(15, 'Debe tener 15 caracteres o menos')
            .required('Este campo es obligatorio'),
          surname: Yup.string()
            .max(50, 'Debe tener 20 caracteres o menos')
            .required('Este campo es obligatorio'),
          address: Yup.string()
            .max(50, 'Debe tener 20 caracteres o menos')
            .required('Este campo es obligatorio'),
          zone: Yup.string()
            .max(50, 'Debe tener 20 caracteres o menos')
            .required('Este campo es obligatorio'),
          telephone: Yup.string()
          .max(15, 'Debe tener 15 caracteres o menos')
          .required('Este campo es obligatorio'),
          email: Yup.string().email('Invalid email address').required('Este campo es obligatorio'),
          birdDate: Yup.string()
            .required('Este campo es obligatorio'),
          initialWeigth: Yup.number()
            .required('Este campo es obligatorio'),
          objetiveWeigth: Yup.number()
            .required('Este campo es obligatorio'),
        }),
        onSubmit: async(values) => {

            try {
                
                const res = await createClient(values) ;
      
                if(res.data.ok){
                    navigate(-1)
                  return Swal.fire({
                      icon: 'success',
                      title: 'Cliente creado con éxito',
                      showConfirmButton: false,
                      timer: 1500
                    })
                }
            } catch (error) {
                console.log(error);
                
                return Swal.fire({
                  icon: 'error',
                  title: `No se pudo crear el cliente. ${error.response.data.msg}`,
                  showConfirmButton: false,
                  timer: 2000
                })
            }


        },
      });
      return (
        <section className=' animate__animated animate__fadeInUp'>
            <h3>Nuevo Cliente</h3>
            <form onSubmit={formik.handleSubmit} className="formik-container">
                    
                <label htmlFor="name" className="mt-3">Nombre</label>
                <input
                    className="form-control"
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className='error'>{formik.errors.name}</div>
                ) : null}

                <label htmlFor="surname" className="mt-3">Apellidos</label>
                <input
                    className="form-control"
                    id="surname"
                    name="surname"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                />
                {formik.touched.surname && formik.errors.surname ? (
                    <div className='error'>{formik.errors.surname}</div>
                ) : null}

                <label htmlFor="email" className="mt-3">Correo electrónico</label>
                <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className='error'>{formik.errors.email}</div>
                ) : null}

                <label htmlFor="birdDate" className="mt-3">Fecha de nacimiento</label>
                <input
                    className="form-control"
                    id="birdDate"
                    name="birdDate"
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.birdDate}
                />
                {formik.touched.birdDate && formik.errors.birdDate ? (
                    <div className='error'>{formik.errors.birdDate}</div>
                ) : null}
            

                <label htmlFor="telephone" className="mt-3">Teléfono</label>
                <input
                    className="form-control"
                    id="telephone"
                    name="telephone"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.telephone}
                />
                {formik.touched.telephone && formik.errors.telephone ? (
                    <div className='error'>{formik.errors.telephone}</div>
                ) : null}

                <label htmlFor="address" className="mt-3">Direccion</label>
                <input
                    className="form-control"
                    id="address"
                    name="address"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address ? (
                    <div className='error'>{formik.errors.address}</div>
                ) : null}

                <label htmlFor="initialWeigth" className="mt-3">Peso inicial</label>
                <input
                    className="form-control"
                    id="initialWeigth"
                    name="initialWeigth"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.initialWeigth}
                />
                {formik.touched.initialWeigth && formik.errors.initialWeigth ? (
                    <div className='error'>{formik.errors.initialWeigth}</div>
                ) : null}

                <label htmlFor="objetiveWeigth" className='mt-3'>Peso objetivo</label>
                <input
                    className="form-control"
                    id="objetiveWeigth"
                    name="objetiveWeigth"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.objetiveWeigth}
                />
                {formik.touched.objetiveWeigth && formik.errors.objetiveWeigth ? (
                    <div className='error'>{formik.errors.objetiveWeigth}</div>
                ) : null}

                <label htmlFor="zone" className='mt-3'>Zona</label>
                <input
                    className="form-control"
                    id="zone"
                    name="zone"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.zone}
                />

                <label className='mt-3 text-center'>
                    Es cliente VIP
                </label>
                <input
                    type="checkbox" 
                    id="vip" 
                    name="vip" 
                    className='mx-1 text-center' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.vip}
                    />
                    <br />
                <button className='btn btn-primary mt-3' type="submit">Crear cliente</button>
            </form>
        </section>
      );
}
