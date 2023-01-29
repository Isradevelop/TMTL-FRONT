import axios from "axios";

export const login = ({email, password}) => {
    
    const url = import.meta.env.VITE_TMTL_API_URL + '/auth';

    return axios({
        method: 'post',
        url,
        data: {email, password}
      })
    .then((resp) =>  resp )
}