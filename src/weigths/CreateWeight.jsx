import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { createWeigth } from '../services/weigths';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ShowWeights } from './ShowWeights';
import { useEffect } from 'react';

export const CreateWeight = () => {

    const {clientId} = useParams();
    const navigate = useNavigate();

    const clientSessionStorage = JSON.parse( sessionStorage.getItem('tmtl-user'));

    useEffect(() =>{
            if(!sessionStorage.getItem('tmtl-token')){
                navigate('/auth/login');
            }
        },[])
  
    const formik = useFormik({
        initialValues: {
          weigth: '',
          weightDate: ''
        },
        validationSchema: Yup.object({
          weightDate: Yup.string()
            .required('Este campo es obligatorio'),
          weigth: Yup.number()
            .required('Este campo es obligatorio')
        }),
        onSubmit: async(values) => {
          values.weightDate = new Date(values.weightDate);

            try {
                values.client = clientId;
                const res = await createWeigth(values) ;
                
                if(res.data.ok){
                  return Swal.fire({
                      icon: 'success',
                      title: 'Peso creado con éxito',
                      showConfirmButton: false,
                      timer: 1500
                    })
                }
            } catch (error) {
                console.log(error);

                navigate('/auth/login');
                sessionStorage.removeItem('tmtl-token');
                
                return Swal.fire({
                  icon: 'error',
                  title: `No se pudo crear el peso. ${error.response.data.msg}`,
                  showConfirmButton: false,
                  timer: 2000
                })
            }


        },
      });
      return (
        <section className='animate__animated animate__fadeInUp'>
            <h3>Crear peso para {clientSessionStorage.name} {clientSessionStorage.surname}</h3>
            <Link to={`/weightsChart/${clientId}`} className='btn btn-info'>Ir a gráfica</Link>
            <form onSubmit={formik.handleSubmit} className="formik-container">

                <label htmlFor="weightDate" className="mt-3">Fecha</label>
                <input
                    className='form-control'
                    id="weightDate"
                    name="weightDate"
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.weightDate}
                />
                {formik.touched.weightDate && formik.errors.weightDate ? (
                    <div className='error'>{formik.errors.weightDate}</div>
                ) : null}
            
                

                <label htmlFor="weigth" className="mt-3">Peso</label>
                <input
                    className='form-control'
                    id="weigth"
                    name="weigth"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.weigth}
                />
                {formik.touched.weigth && formik.errors.weigth ? (
                    <div className='error'>{formik.errors.weigth}</div>
                ) : null}
        
                <button className='btn btn-primary mt-3' type="submit">Crear peso</button>
            </form>
            <ShowWeights />
        </section>
      );
  
}
