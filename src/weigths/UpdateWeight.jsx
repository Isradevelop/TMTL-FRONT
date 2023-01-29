
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { WeigthContext } from '../context/weigth/WeigthContext';
import { updateWeigth } from '../services/weigths';


export const UpdateWeight = () => {
    const {id} = useParams();
    const {contextWeigth} = useContext(WeigthContext);
    const navigate = useNavigate();

    useEffect(() =>{
            if(!sessionStorage.getItem('tmtl-token')){
                navigate('/auth/login');
            }
        },[])

    
    const dateConvert = (dateAsString) => {
        let date = new Date(dateAsString); 
        let month = date.getMonth() + 1;
        date = date.toDateString();
        const [ , , day, year ] = date.split(' ');

        if(month < 10){month = '0' + month;} 

        return year + '-' + month + '-' + day; 
    }
    
  
    const formik = useFormik({
        initialValues: {
          weigth: contextWeigth.weight,
          date: dateConvert(contextWeigth.weightDate) 
        },
        validationSchema: Yup.object({
          date: Yup.string()
            .required('Este campo es obligatorio'),
          weigth: Yup.number()
            .required('Este campo es obligatorio')
        }),
        onSubmit: async(values) => {

            try {
                values.client = contextWeigth.client;
                values.created_at = contextWeigth.created_at;
                values.id = id;
                values.weightDate = values.date;
                const res = await updateWeigth(values) ;
                if(res === true){

                    navigate(-1);

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
            <h3>Modificar Peso</h3>
            <form onSubmit={formik.handleSubmit} className="formik-container">

                <label htmlFor="date" className="mt-3">Fecha</label>
                <input
                    className='form-control'
                    id="date"
                    name="date"
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                />
                {formik.touched.date && formik.errors.date ? (
                    <div className='error'>{formik.errors.date}</div>
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
        
                <button className='btn btn-primary mt-3' type="submit">Modificar</button>
            </form>
        </section>
      );
}
