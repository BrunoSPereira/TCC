import { SideBar } from "./components/sidebar/sideBar"
import { MainContent } from "./components/main/mainContent"
import { GlobalStyle } from './GlobalStyle';
import { BrowserRouter } from "react-router-dom";


function App () {

  return(
   <>
  
   <GlobalStyle />

  <main>
  <BrowserRouter>
    <SideBar/>  
    <MainContent/>   
   </BrowserRouter>
  </main>

   </>
  )
}

export default App
