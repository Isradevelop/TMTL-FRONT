import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { updateClient } from '../services/clients';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../context/client/ClientContext";


export const CreatePayment = () => {

    const navigate = useNavigate();
    const {clientId} = useParams();
    const {contextClient, setContextClient} = useContext(ClientContext);
    
    useEffect(() =>{
        if(!sessionStorage.getItem('tmtl-token')){
            navigate('/auth/login');
        }

    },[contextClient])


    const formik = useFormik({
        initialValues: {
          date: ''
        },
        validationSchema: Yup.object({
          date: Yup.string()
            .required('Este campo es obligatorio')
        }),
        onSubmit: async(values) => {
          const formDate = new Date(values.date);
            let numericMonth = formDate.getMonth();
            let year = formDate.getFullYear();

            numericMonth = numericMonth + 1;
            if(numericMonth < 10){
                numericMonth = '0' + numericMonth;
            }
            contextClient.payments.push(numericMonth + '/' + year); 
            setContextClient(contextClient);

            try {
                values.client = clientId;
                await updateClient(contextClient);
                
               
                return Swal.fire({
                    icon: 'success',
                    title: 'Pago creado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                })
                
            } catch (error) {
                console.log(error);
                
                return Swal.fire({
                  icon: 'error',
                  title: `No se pudo crear el pago. ${error.response.data.msg}`,
                  showConfirmButton: false,
                  timer: 2000
                })
            }


        },
      });

      const deletePayment = async(payment) => {

        //delete payment from contextClient
        contextClient.payments = (contextClient.payments).filter(contextPayment => contextPayment != payment);
        
        try {
            
            await updateClient(contextClient);
            setContextClient(contextClient);
            navigate('./');

            return Swal.fire({
                icon: 'success',
                title: `Pago eliminado con éxito`,
                showConfirmButton: false,
                timer: 2000
            })
            
        } catch (error) {
            console.log(error);
            
            return Swal.fire({
                icon: 'error',
                title: `No se pudo eliminar el pago.`,
                showConfirmButton: false,
                timer: 2000
            })
        }
        

      }


      return (
        <section className=' animate__animated animate__fadeInUp'>
            <h3>Añadir pago para <Link to={`/clientDetails/${contextClient.id}`}>{contextClient.name} {contextClient.surname}</Link></h3>
            <form onSubmit={formik.handleSubmit} className="formik-container my-2 d-flex justify-content-between">

                <div className="mt-3 flex-fill">
                    <label htmlFor="date" >Fecha</label>
                    <input
                        style={{maxWidth: '200px', maxHeight: '25px'}}
                        className="form-control"
                        id="date"
                        name="date"
                        type="month"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.date}
                    />
                    {formik.touched.date && formik.errors.date ? (
                        <div className='error'>{formik.errors.date}</div>
                    ) : null}
                </div>

        
                <p className='mt-4'>
                    <button className='btn btn-primary' type="submit">Crear pago</button>
                </p>
            </form>
            <div className="mt-3 flex-fill d-flex">
                <table className="table payment-table mt-4" style={{maxWidth: '35%'}}>
                    <thead>
                        <tr>
                            <th scope="col">Pagos</th>
                        </tr>
                    </thead>
                    <tbody>
                        { contextClient.payments.map((payment) => {
                            return(
                                <tr  key={payment} className='d-flex justify-content-between'>
                                    <td>{payment} <button className='btn btn-primary mx-4' onClick={()=>{deletePayment(payment)}}>Eliminar</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </section>
      );
}
