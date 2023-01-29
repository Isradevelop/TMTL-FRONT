import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getClients } from '../services/clients';
import { ClientCardWeigth } from './ClientCardWeigth';
import ScrollToTop from "react-scroll-to-top";


export const AllWeigths = () => {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {

        if(!sessionStorage.getItem('tmtl-token')){
            navigate('/auth/login');
        }

        const clientsApi = async() => {
            const result = await getClients();

            if(!result){
                sessionStorage.removeItem('tmtl-token');
                navigate('/auth/login')
            }
            setClients(result.clients);
        }

        clientsApi()
    }, [])


    return (
      <div>
            <h4 className="component-title mt-5 mb-3">Pesajes</h4>
            {
                clients.length === 0 && <div className='spinner-container'>
                                            <div className="spinner-border text-dark" role="status"></div>
                                        </div>
            }
            <div className='cards-container'>
                {
                    clients.map((client) => {
                        
                        return <ClientCardWeigth client={client} key={client.id}/>
                    })
                }
            </div>
            <ScrollToTop smooth color="white" style={{backgroundColor: "black"}} className='mx-5 animate__animated animate__fadeInRight' />   
      </div>
    )
}
