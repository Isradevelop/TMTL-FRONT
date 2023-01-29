import { useContext, useEffect } from "react";
import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';
import { ClientContext } from "../context/client/ClientContext";
import { convertMonthNumericToMonth } from "../services/convertMonthNumericToMonth";
import { getClientById, updateClient } from "../services/clients";
import { ShowWeights } from "../weigths/ShowWeights";
import ScrollToTop from "react-scroll-to-top";



export const ClientDetails = () => {

    const navigate = useNavigate();
    const { setContextClient } = useContext(ClientContext)
    const { id } = useParams();

    const [client, setClient] = useState({});
    const [ok, setOk] = useState(false);

    useEffect(() => {

        if (!sessionStorage.getItem('tmtl-token')) {
            navigate('/auth/login');
        }

        const clientData = async () => {
            const clientDB = await getClientById(id);

            if (!clientDB.ok) {
                sessionStorage.removeItem('tmtl-token');
                navigate('/auth/login')
            }

            setClient(clientDB.client);
            setOk(clientDB.ok);
        }

        clientData();
    }, [client]);

    const changeIsActiveProperty = (event) => {
        event.preventDefault();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Estás segur@?',
            text: `Vas a cambiar el estado de ${client.name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Cambiar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                client.isActive = !client.isActive;
                setClient(client);
                await updateClient(client);
                swalWithBootstrapButtons.fire(
                    (client.isActive) ? 'Activado!!' : 'Desactivado!!',
                    (client.isActive) ? 'Se ha activado el cliente' : 'Se ha desactivado el cliente',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelar',
                    'Operación cancelada',
                    'error'
                )
            }
        })
    }

    const updateClientContext = () => {
        setContextClient(client);
    }

    return (
        <>
            {
                (!ok)

                    ?
                    <div className='spinner-container'>
                        <div className="spinner-border text-dark" role="status"></div>
                    </div>

                    :
                    <div className="client-details-principal animate__animated animate__fadeInUp">
                        <div className="btn-group  d-flex justify-content-center" role="group">
                            <Link
                                className="btn btn-danger mt-2"
                                onClick={changeIsActiveProperty}
                            >Dar de baja / alta</Link>

                            <Link
                                to={`/updateClient/${client.id}`}
                                className="btn btn-warning mt-2"
                                onClick={updateClientContext}
                            >Modificar</Link>

                            <Link to={`/weightsChart/${client.id}`} className="btn btn-primary mt-2">Ir a gráfica de pesos</Link>

                            <Link
                                to={`/createPayment/${client.id}`}
                                className="btn btn-success mt-2"
                                onClick={updateClientContext}
                            >Crear pago</Link>

                            <Link
                                to={`/createWeight/${client.id}`}
                                className="btn btn-info mt-2"
                                onClick={updateClientContext}
                            >Crear peso</Link>
                        </div>

                        <h3 className="my-4">{client.name} {client.surname}</h3>
                        <hr />
                        <fieldset disabled className="clients-details-container">
                            <div className="mb-3 labels">
                                <label className="form-label">Teléfono</label>
                                <input type="text" id="disabledTextInput" className="form-control" placeholder={client.telephone} />
                            </div>
                            <div className="mb-3 labels">
                                <label className="form-label">Email</label>
                                <input type="text" id="disabledTextInput" className="form-control" placeholder={client.email} />
                            </div>
                            <div className="mb-3 labels">
                                <label className="form-label">Dirección</label>
                                <input type="text" id="disabledTextInput" className="form-control" placeholder={client.address} />
                            </div>
                            <div className="mb-3 labels">
                                <label className="form-label">Zona</label>
                                <input type="text" id="disabledTextInput" className="form-control" placeholder={client.zone} />
                            </div>
                            <div className="mb-3 labels">
                                <label className="form-label">Peso inicial</label>
                                <input type="text" id="disabledTextInput" className="form-control" placeholder={client.initial_weight} />
                            </div>
                            <div className="mb-3 labels">
                                <label className="form-label">Peso objetivo</label>
                                <input type="text" id="disabledTextInput" className="form-control" placeholder={client.objetive_weight} />
                            </div>
                            <div className="mb-3 labels">
                                <label className="form-label">Está activo</label>
                                <input type="text" id="disabledTextInput" className="form-control" placeholder={(client.isActive) ? 'Si' : 'No'} />
                            </div>
                            <div className="mb-3 labels">
                                <label className="form-label">Cliente VIP</label>
                                <input type="text" id="disabledTextInput" className="form-control" placeholder={(client.vip) ? 'Si' : 'No'} />
                            </div>
                        </fieldset>
                        <hr />
                        <div className="payments-table">
                            <h4>Meses pagados</h4>
                            <table className="table table-success table-striped mb-3">
                                <thead>
                                    <tr>
                                        <th>Mes</th>
                                        <th>Año</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (client.payments).map((date) => {
                                            const [month, year] = date.split('/');
                                            return (
                                                <tr key={date}>
                                                    <td>{convertMonthNumericToMonth(month)}</td>
                                                    <td>{year}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <hr />
                        <div>
                            <h5>Pesos</h5>
                            <ShowWeights />
                        </div>
                    </div>
            }

        </>
    )

}
