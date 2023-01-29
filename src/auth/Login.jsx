import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { login } from '../services/auth/login';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';



export const Login = () => {

  const navigate = useNavigate();
  
  //protect routes
  useEffect(() => {
      const token = sessionStorage.getItem('tmtl-token');
      if(token){
        navigate('/');
      }
    },[])

  
    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Este campo es obligatorio'),
          password: Yup.string()
            .min(6, 'La contraseña debe tener al menos 6 digitos')
            .required('Este campo es obligatorio')
        }),
        onSubmit: async(values) => {

            try {
                
                const res = await login(values);
                if(res.data.ok){
                  sessionStorage.setItem('tmtl-token', res.data.token);
                  
                  navigate('/');
                  return Swal.fire({
                      icon: 'success',
                      showConfirmButton: false,
                      timer: 1500
                    });

                }
            } catch (error) {
                console.log(error);
                
                return Swal.fire({
                  icon: 'error',
                  title: `${error.response.data.msg}`,
                  showConfirmButton: false,
                  timer: 2000
                })
            }


        },
      });
      return (
        <section className='animate__animated animate__fadeInUp'>
            <h3>Login</h3>
            <form onSubmit={formik.handleSubmit} className="formik-container d-flex flex-column">

                <label htmlFor="email" className="mt-3 form-label">Email</label>
                <input
                    className='form-control'
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
            
                

                <label htmlFor="password" className="mt-3 form-label">Contraseña</label>
                <input
                    className='form-control'
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className='error'>{formik.errors.password}</div>
                ) : null}
        
                <button className='btn btn-primary mt-3' type="submit">Entrar</button>
            </form>
            
        </section>
      );
  
}
