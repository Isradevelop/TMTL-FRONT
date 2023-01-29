import axios from "axios";

export const getMonthsOfWeigthsByClientId = (clientId) => {
    const url = import.meta.env.VITE_TMTL_API_URL + '/weights/' + clientId;

    return axios.get(url, {
        headers: {
            'x-token': import.meta.env.VITE_X_TOKEN  
        }
    })
    .then((resp) => {
        const weigths = resp.data.weights;
        const labels = [];

        weigths.forEach(weigth => {
            const [ , month, ] = (weigth.weightDate).split('-');
            labels.push(month);
            labels.sort()
        })
        
        return labels;
    })
}