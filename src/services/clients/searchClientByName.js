import axios from "axios"

export const searchClientByName = async({name}) => {

    name = name.toLowerCase();

    const url = import.meta.env.VITE_TMTL_API_URL + '/clients/';
    

    return await axios.get(url, {
        headers: {
            'x-token': sessionStorage.getItem('tmtl-token') 
        }
    })
    .then((resp) => {
        const clientsSearched = resp.data.clients;
        const coincidentClients = [];

        clientsSearched.forEach(element => {

            const lowerName = element.name.toLowerCase();

            if(lowerName.includes(name)){
                coincidentClients.push(element)
            }
        });
        
        return coincidentClients;
    })
    .catch((error) => error)

}