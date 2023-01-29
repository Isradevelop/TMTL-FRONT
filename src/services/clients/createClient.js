import axios from "axios";


export const createClient = (client) => {

    const url = import.meta.env.VITE_TMTL_API_URL + '/clients/';

    client.isActive = true;
    client.created_at = new Date();
    client.updated_at = new Date();
    client.date_of_bird = client.birdDate;
    client.initial_weight = client.initialWeigth;
    client.objetive_weight = client.objetiveWeigth;
    

    return axios({
        method: 'post',
        url,
        headers: {'x-token': sessionStorage.getItem('tmtl-token') }, 
        data: client
      })
    .then((resp) => resp)
}