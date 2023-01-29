import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { ClientContext } from "../context/client/ClientContext";
import { updateClient } from "../services/clients";

export const ClientCard = ({client}) => {

    const [clientState, setClient] = useState(client);
    const {setContextClient} = useContext(ClientContext);

    const changeIsActiveProperty = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success mx-2',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: '¿Estás segur@?',
            text: `Vas a cambiar el estado de ${clientState.name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Cambiar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                clientState.isActive = !clientState.isActive;
                setClient(clientState);
                updateClient(clientState);
                swalWithBootstrapButtons.fire(
                    'Borrado!',
                    'Cliente borrado con éxito',
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
      setContextClient(clientState);
      sessionStorage.setItem('tmtl-user', JSON.stringify( clientState ));
    }

  return (
    <>
    {
        
            <div 
                className={clientState.isActive ? 'card client-active animate__animated animate__fadeInUp' : 'card client-inactive animate__animated animate__fadeInUp'} 
                style={{width: '18rem'}}
            >
                <div className="card-body">
                    {
                        clientState.vip && <svg xmlns="http://www.w3.org/2000/svg" style={{float: 'right'}} viewBox="0 0 24 24" width="24" height="24"><path d="M12.672.668l3.059 6.197 6.838.993a.75.75 0 01.416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 01-1.088.79L12 18.347l-6.116 3.216a.75.75 0 01-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 01.416-1.279l6.838-.994L11.327.668a.75.75 0 011.345 0z"></path></svg>
                    
                    }
                    <h5 className="card-title my-3" >{clientState.name} {clientState.surname}</h5>
                    <hr />
                    <p className="card-text">Zona: {clientState.zone}</p>
                    <p className="card-text">Email: {clientState.email}</p>
                    <p className="card-text">Meses pagados: {
                        (clientState.payments).map((payment)=>{
                            return payment + ' '
                        })
                    }</p>
                    <Link to={`/clientDetails/${clientState.id}`} className="btn btn-primary mx-2 mt-2">Detalles</Link>
                    
                    <Link 
                      to={`/updateClient/${clientState.id}`} 
                      className="btn btn-warning mx-2 mt-2"
                      onClick={updateClientContext}
                      >Modificar</Link>

                    <Link
                        className="btn btn-danger mx-2 mt-2"
                        onClick={changeIsActiveProperty}
                        >Dar de baja / alta</Link>
                    
                    <Link
                        to={`/createPayment/${clientState.id}`} 
                        className="btn btn-success mx-2 mt-2"
                        onClick={updateClientContext}
                    >Crear / Eliminar pago</Link>
                </div>
            </div>
        
    }
    </>
  )
}
