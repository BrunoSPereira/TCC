import { useState } from "react";
import { SideBar } from "./components/sidebar/sideBar";
import { MainContent } from "./components/main/mainContent";
import { GlobalStyle } from "./GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/pages/login/login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <GlobalStyle />

      <main>
        <BrowserRouter>
          {isAuthenticated ? (
            <>
              <SideBar />
              <MainContent />
            </>
          ) : (
            <Login onLogin={() => setIsAuthenticated(true)} />
          )}
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
