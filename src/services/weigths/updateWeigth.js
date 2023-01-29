import axios from "axios";


export const updateWeigth = (weigth) => {
    
  const url = import.meta.env.VITE_TMTL_API_URL + '/weights/' + weigth.id;

  weigth.updated_at = new Date();
  weigth.weight = (weigth.weigth).toString();
  console.log(weigth);

  return axios({
      method: 'put',
      url,
      headers: {'x-token': sessionStorage.getItem('tmtl-token') }, 
      data: weigth
    })
  .then((resp) => true)
}