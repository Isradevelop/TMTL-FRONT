import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate, useParams } from 'react-router-dom';
import { getClientById } from '../services/clients';
import { getWeigthByClientId } from '../services/weigths';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: `Histórico de pesos`
      },
    },
  }

export const WeigthChart = () => {
    const {id} = useParams();
    const [weigths, setWeigths] = useState([]);
    const [client, setClient] = useState(null);
    const [labels, setLabels] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
            if(!sessionStorage.getItem('tmtl-token')){
                navigate('/auth/login');
            }
        },[])
    
    
    const data = useMemo(() => {
        const getData = () => {
    
            Promise.all([
                getClientById(id),
                getWeigthByClientId(id)
            ]).then((resp) => {

              //sort array weigths before set weigths state
              resp[1].sort((x,y) => x.weightDate.localeCompare(y.weightDate));
              
    
                setClient(resp[0]);
                setWeigths(resp[1]);

                //format date to sort in formateedDate 
                const formateedDate = [];
                weigths.forEach((weigth) => {
                  const newDate = new Date(weigth.weightDate);
                  let day = newDate.getDate();
                  let month = newDate.getMonth() + 1;
                  if(day < 10) day = '0' + day;
                  if(month < 10) month = '0' + month;
                  const year = newDate.getFullYear();
                  formateedDate.push(`${year}/${month}/${day}`);

                });

                if(labels.length === 0) setLabels(formateedDate.sort());
              })
            }
            
        getData();

        return{
            datasets: [
            {
                label: 'Peso inicial',
                data: labels.map(() => client.client.initial_weight),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Peso objetivo',
                data: labels.map(() => client.client.objetive_weight),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            },
            {
                label: 'Evolución',
                data: weigths.map((weight) => weight.weight),
                borderColor: '#66cc00',
                backgroundColor: '#73e600',
            },
            ],
            labels: labels
        }
    }
    ,[labels])

    if(weigths.length != 0){
        return (
        <Line options={options} data={data} className='animate__animated animate__fadeInUp' />
        )
    }

        
    return (
        <div className='spinner-container'>
            <div className="spinner-border text-dark" role="status"></div>
        </div>
        )
}
