import { Link } from 'react-router-dom'

export const ClientCardWeigth = ({client}) => {
  return (
    <>
    {
            <div className={client.isActive ? 'card client-active  animate__animated animate__fadeInUp' : 'card client-inactive  animate__animated animate__fadeInUp'} style={{width: '18rem'}}>
                <div className="card-body">
                    {
                        client.vip && <svg xmlns="http://www.w3.org/2000/svg" style={{float: 'right'}} viewBox="0 0 24 24" width="24" height="24"><path d="M12.672.668l3.059 6.197 6.838.993a.75.75 0 01.416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 01-1.088.79L12 18.347l-6.116 3.216a.75.75 0 01-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 01.416-1.279l6.838-.994L11.327.668a.75.75 0 011.345 0z"></path></svg>
                    }
                    <h5 className="card-title my-3" >{client.name} {client.surname}</h5>
                    <hr />
                    <p className="card-text">Peso inicial: {client.initial_weight}</p>
                    <p className="card-text">Peso objetivo: {client.objetive_weight}</p>
                    
                    <Link to={`/weightsChart/${client.id}`} className="btn btn-warning mx-2">Ir a gráfica</Link>
                    <Link to={`/createWeight/${client.id}`} className="btn btn-primary mx-2">Crear peso</Link>
                    <Link to={`/showWeights/${client.id}`} className="btn btn-success mx-2 my-2">Ver pesos</Link>
                </div>
            </div>
    }
    </>
  )
}
