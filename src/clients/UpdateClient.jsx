import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom"
import { updateClient } from '../services/clients';
import { useContext, useEffect } from 'react';
import { ClientContext } from '../context/client/ClientContext';

export const UpdateClient = () => {

    const { id } = useParams();

    let { contextClient } = useContext(ClientContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('tmtl-token')) {
            navigate('/auth/login');
        }
    }, [])

    const dateConvert = (dateAsString) => {
        let date = new Date(dateAsString);
        let month = date.getMonth() + 1;
        date = date.toDateString();
        const [, , day, year] = date.split(' ');

        if (month < 10) { month = '0' + month; }

        return year + '-' + month + '-' + day;
    }

    const formik = useFormik({
        initialValues: {
            name: contextClient?.name,
            surname: contextClient?.surname,
            address: contextClient?.address,
            zone: contextClient?.zone,
            telephone: contextClient?.telephone,
            email: contextClient?.email,
            date_of_bird: dateConvert(contextClient?.date_of_bird),
            vip: contextClient?.vip,
            initial_weight: contextClient?.initial_weight,
            objetive_weight: contextClient?.objetive_weight
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
            date_of_bird: Yup.string()
                .required('Este campo es obligatorio'),
            initial_weight: Yup.number()
                .required('Este campo es obligatorio'),
            objetive_weight: Yup.number()
                .required('Este campo es obligatorio'),
        }),
        onSubmit: async (values) => {

            try {
                values.id = id;
                values.isActive = contextClient.isActive;
                const res = await updateClient(values);

                if (res) {
                    navigate(`/clientDetails/${id}`);
                    return Swal.fire({
                        icon: 'success',
                        title: 'Cliente actualizado con éxito',
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
                    title: `No se pudo actualizar el cliente.`,
                    showConfirmButton: false,
                    timer: 2000
                })
            }


        },
    });
    return (
        <section className='animate__animated animate__fadeInUp'>
            <h3>Modificar cliente</h3>
            <form onSubmit={formik.handleSubmit} className="formik-container">

                <label htmlFor="name" className="mt-3">Nombre</label>
                <input
                    className='form-control'
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
                    className='form-control'
                    id="surname"
                    name="surname"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.surname}
                />
                {formik.touched.surname && formik.errors.surname ? (
                    <div className='error'>{formik.errors.surname}</div>
                ) : null}

                <label htmlFor="email" className="mt-3">Correo electrónico</label>
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

                <label htmlFor="date_of_bird" className="mt-3">Fecha de nacimiento</label>
                <input
                    className='form-control'
                    id="date_of_bird"
                    name="date_of_bird"
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date_of_bird}
                />
                {formik.touched.date_of_bird && formik.errors.date_of_bird ? (
                    <div className='error'>{formik.errors.date_of_bird}</div>
                ) : null}


                <label htmlFor="telephone" className="mt-3">Teléfono</label>
                <input
                    className='form-control'
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
                    className='form-control'
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

                <label htmlFor="initial_weight" className="mt-3">Peso inicial</label>
                <input
                    className='form-control'
                    id="initial_weight"
                    name="initial_weight"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.initial_weight}
                />
                {formik.touched.initial_weight && formik.errors.initial_weight ? (
                    <div className='error'>{formik.errors.initial_weight}</div>
                ) : null}

                <label htmlFor="objetive_weight" className='mt-3'>Peso objetivo</label>
                <input
                    className='form-control'
                    id="objetive_weight"
                    name="objetive_weight"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.objetive_weight}
                />
                {formik.touched.objetive_weight && formik.errors.objetive_weight ? (
                    <div className='error'>{formik.errors.objetive_weight}</div>
                ) : null}

                <label htmlFor="zone" className='mt-3'>Zona</label>
                <input
                    className='form-control'
                    id="zone"
                    name="zone"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.zone}
                />

                <label className='mt-3'>
                    Es cliente activo
                    <input
                        type="checkbox"
                        id="vip"
                        name="vip"
                        className='mx-1'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.isActive}
                        checked={contextClient.isActive}
                        onClick={() => contextClient.isActive = !contextClient.isActive}
                    />
                </label>

                <label className='mt-3'>
                    Es cliente VIP
                    <input
                        type="checkbox"
                        id="vip"
                        name="vip"
                        className='mx-1'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.vip}
                        checked={contextClient.vip}
                        onClick={() => contextClient.vip = !contextClient.vip}
                    />
                </label>
                <br />
                <button className='btn btn-primary mt-3' type="submit">Actualizar</button>
            </form>
        </section>
    );
}
