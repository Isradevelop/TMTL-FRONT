import axios from 'axios';


export const getWeigthByClientId = (clientId) => {

    const url = import.meta.env.VITE_TMTL_API_URL + '/weights/' + clientId;

    return axios.get(url, {
        headers: {
            'x-token': sessionStorage.getItem('tmtl-token')   
        }
    })
    .then((resp) => resp.data.weights)
}