import { SideBar } from "./components/sidebar/sideBar"
import { MainContent } from "./components/main/mainContent"
import { TopBar } from "./components/topbar/topBar"
import { GlobalStyle } from './GlobalStyle';


function App () {

  return(
   <>
   <GlobalStyle />

   <TopBar/>

   <SideBar/>  

   <MainContent/>
   </>
  )
}

export default App
