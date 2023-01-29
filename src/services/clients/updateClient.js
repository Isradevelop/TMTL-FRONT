import axios from "axios";


export const updateClient = (client) => {

    const url = import.meta.env.VITE_TMTL_API_URL + '/clients/' + client.id;
    
    client.updated_at = new Date();

    return axios({
        method: 'put',
        url,
        headers: {'x-token': sessionStorage.getItem('tmtl-token') }, 
        data: client
      })
    .then((resp) => true)
}