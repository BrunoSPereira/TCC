import { Routes, Route } from "react-router-dom"
import TopBar from '../topbar/topBar'
import * as Style from './main.Styled'
import Home from "../pages/Home"
import Clientes from "../pages/CadastroCliente"


export const MainContent = () =>  {

  return(
    <>
    
    <Style.Container>
    <TopBar/>
    <div className="content">
  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CadastroCliente" element={<Clientes />} />
        </Routes>

    </div>
    </Style.Container>

    </>
  )
}

export default MainContent
