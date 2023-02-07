import { useMemo, useState } from 'react'
import { ClientCard } from './ClientCard';
import './AllClients.css'
import { Link, useNavigate } from 'react-router-dom';
import { getClients } from '../services/clients';
import 'animate.css';
import ScrollToTop from "react-scroll-to-top";
import { useEffect } from 'react';


export const AllClients = () => {

    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [showClients, setShowClients] = useState([]);
    const [activeClientsState, setActiveClients] = useState(0);
    const [vipClientsState, setVipClients] = useState(0);
    const [inactiveClientsState, setInactiveClients] = useState(0);
    const [totalClientsState, setTotalClients] = useState(0);
    const [cardIsChange, setCardIsChange] = useState(0);


    let clientsToShow = [];
    let activeClients = 0;
    let inactiveClients = 0;
    let vipClients = 0;
    let totalClients = 0;

    useMemo(() => {
        clientsToShow = []
        if (!sessionStorage.getItem('tmtl-token')) {
            navigate('/auth/login');
        }

        const clientsApi = async () => {
            const result = await getClients();

            if (!result.ok) {
                sessionStorage.removeItem('tmtl-token');
                navigate('/auth/login')
            }

            setClients(result.clients);

            if (showClients.length === 0) {

                setShowClients(result.clients);
            }
        }

        clientsApi();
    }, [cardIsChange]);


    useEffect(() => {
        totalClients = 0;
        activeClients = 0;
        inactiveClients = 0;
        vipClients = 0;
        clients.forEach((client) => {
            totalClients++;

            if (client.isActive) {
                activeClients++;
            } else {
                inactiveClients++;
            }

            if (client.vip) {
                vipClients++;
            }

        })

        setActiveClients(activeClients);
        setTotalClients(totalClients);
        setInactiveClients(inactiveClients);
        setVipClients(vipClients);

    }, [clients])


    const onclick = (event) => {

        if (event.target.value === 'all') {
            clientsToShow = clients;
        } else if (event.target.value === 'actives') {
            clients.forEach((client) => {
                if (client.isActive === true) {
                    clientsToShow.push(client);
                }
            });
        } else if (event.target.value === 'inactives') {
            clients.forEach((client) => {
                if (client.isActive === false) {
                    clientsToShow.push(client);
                }
            });
        } else if (event.target.value === 'vip') {
            clients.forEach((client) => {
                if (client.vip === true) {
                    clientsToShow.push(client);
                }
            });
        }

        setShowClients(clientsToShow);
    }

    const onClickUp = () => {
        scroll.scrollToTop();
    }


    return (
        <div>
            <h3 className="component-title mt-5 mb-3">Clientes</h3>
            <Link className='btn btn-primary' to="/createClient">Crear nuevo cliente</Link>
            <hr />
            <div
                className="btn-group my-3 top-0 start-50 translate-middle"
                role="group"
            >
                <button type="button" className="btn btn-primary mx-1" onClick={onclick} value="all">Todos</button>
                <button type="button" className="btn btn-success mx-1" onClick={onclick} value="actives">Activos</button>
                <button type="button" className="btn btn-warning mx-1" onClick={onclick} value="vip">Vip</button>
                <button type="button" className="btn btn-danger mx-1" onClick={onclick} value="inactives">Inactivos</button>
                <br />
            </div>
            <ul className="list-group list-group-client">
                <li className="list-group-item list-group-item-primary">Total de clientes: {totalClientsState}</li>
                <li className="list-group-item list-group-item-success">Nº de clientes activos: {activeClientsState}</li>
                <li className="list-group-item list-group-item-warning">Nº de clientes Vip: {vipClientsState}</li>
                <li className="list-group-item list-group-item-danger">Nº de clientes inactivos: {inactiveClientsState}</li>
            </ul>

            {
                clients.length === 0 && <div className='spinner-container'>
                    <div className="spinner-border text-dark" role="status"></div>
                </div>
            }
            <div className='cards-container '>
                {
                    showClients.map((client) => {
                        return <ClientCard client={client} key={client.id} setCardIsChange={setCardIsChange} cardIsChange={cardIsChange} />
                    })
                }
            </div>
            <ScrollToTop smooth color="white" style={{ backgroundColor: "black" }} className='mx-5 animate__animated animate__fadeInRight' />
        </div>
    )
}
