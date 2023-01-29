import {Routes, Route} from 'react-router-dom';
import { Login } from './auth/Login';
import { AllClients } from './clients/AllClients';
import { ClientDetails } from './clients/ClientDetails';
import { CreateClient } from './clients/CreateClient';
import { CreatePayment } from './clients/CreatePayment';
import { UpdateClient } from './clients/UpdateClient';
import { AllWeigths } from './weigths/AllWeigths';
import { CreateWeight } from './weigths/CreateWeight';
import { ShowWeights } from './weigths/ShowWeights';
import { UpdateWeight } from './weigths/UpdateWeight';
import { WeigthChart } from './weigths/WeigthChart';

export const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<AllClients />} />
        <Route path='/clientDetails/:id' element={<ClientDetails />} />
        <Route path='/updateClient/:id' element={<UpdateClient />} />
        <Route path='/createClient' element={<CreateClient />} />
        <Route path='/weights' element={<AllWeigths />} />
        <Route path='/createWeight/:clientId' element={<CreateWeight />} />
        <Route path='/weightsChart/:id' element={<WeigthChart />} />
        <Route path='/showWeights/:clientId' element={<ShowWeights />} />
        <Route path='/updateWeigth/:id' element={<UpdateWeight />} />
        <Route path='/createPayment/:id' element={<CreatePayment />} />
        <Route path='/auth/login' element={<Login />} />
    </Routes>
  )
}
