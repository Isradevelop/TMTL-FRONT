import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { WeigthContext } from "../context/weigth/WeigthContext";
import { getClientById } from "../services/clients";
import { getWeigthByClientId } from "../services/weigths";
import ScrollToTop from "react-scroll-to-top";


export const ShowWeights = () => {

    const {clientId} = useParams();
    const navigate = useNavigate();
    const {id} = useParams();

    const [weigths, setWeigths] = useState(null);
    const [client, setClient] = useState(null);
    const {setContextWeigth} = useContext(WeigthContext);

    useEffect(()=> {

        if(!sessionStorage.getItem('tmtl-token')){
                navigate('/auth/login');
            }


        try {
            
            const weigthsApi = async() => {
                if(clientId){
                    const result = await getWeigthByClientId(clientId);
                    const client = await getClientById(clientId);
                    
                    setWeigths(result);
                    setClient(client.client);
                    
                }else{
                    const result = await getWeigthByClientId(id);
                    const client = await getClientById(id);

                    setClient(client.client);
                    setWeigths(result);
                    
                }
            }
            
        weigthsApi()
        
        } catch (error) {
            console.log('error');
            sessionStorage.removeItem('tmtl-token');
            navigate('/auth/login');

        }
    }, [client])

    const dateConvert = (dateAsString) => {
        let date = new Date(dateAsString); 
        date = date.toDateString();
        const [ , month, day, year ] = date.split(' ');

        return day + ' ' + month + ' ' + year; 
    }

    const setWeigthContext = (weight) => {
        setContextWeigth(weight);
    }

  return (
    <div className="animate__animated animate__fadeInUp">

        {
            (weigths)
            ?   
            <ul className="list-group list-group-flush mt-5">
                <h6>{client.name} {client.surname}</h6>
            {
                weigths.map((weigth) =>{ 
                return <li className="list-group-item my-2 d-inline-flex justify-content-between" key={weigth.id}>
                    <p className="mx-3"><b>Fecha:</b> {dateConvert(weigth.weightDate)}</p>
                    <p className="mx-3"><b>Peso:</b> {weigth.weight}</p>
                    <Link to={`/updateWeigth/${weigth.id}`} className="btn btn-primary" onClick={() => setWeigthContext(weigth)}>Modificar</Link>
                </li>
                })
            }
            </ul>

            :   <div className='spinner-container'>
                    <div className="spinner-border text-dark" role="status"></div>
                </div>
        }
        <ScrollToTop smooth color="white" style={{backgroundColor: "black"}} className='mx-5 animate__animated animate__fadeInRight' />
    </div>
  )
}
