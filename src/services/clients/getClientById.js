import axios from "axios"



export const getClientById = async(id) =>{

    const url = import.meta.env.VITE_TMTL_API_URL + '/clients/' + id;
    

    return await axios.get(url, {
        headers: {
            'x-token': sessionStorage.getItem('tmtl-token')  
        }
    })
    .then((resp) => resp.data)
    .catch((error) => error)
}