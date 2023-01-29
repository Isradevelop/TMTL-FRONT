import axios from "axios";


export const createWeigth = (weigth) => {

    const url = import.meta.env.VITE_TMTL_API_URL + '/weights/';
    weigth.created_at = new Date();
    weigth.updated_at = new Date();
    weigth.weight = weigth.weigth; 

    return axios({
        method: 'post',
        url,
        headers: {'x-token': sessionStorage.getItem('tmtl-token') }, 
        data: weigth
      })
    .then((resp) =>resp )
}