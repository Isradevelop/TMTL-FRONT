import './App.css'
import { AppRouter } from './AppRouter'
import { Logout } from './auth/Logout'
import { ClientProvider } from './context/client/ClientProvider'
import { WeigthProvider } from './context/weigth/WeigthProvider'
import { NavBar } from './shared/NavBar'

function App() {

  return (
    <div className='container'>
      <ClientProvider>
        <WeigthProvider>
          <div style={{ textAlign: "center", background: "white" }} className="mt-4 d-flex justify-content-between">
            <img src="/assets/tumetatulinea-logo.jpg" alt="logo" style={{ width: '200px' }} />
            <Logout />
          </div>
          <NavBar />

          <AppRouter />
        </WeigthProvider>
      </ClientProvider>
    </div>
  )
}

export default App
