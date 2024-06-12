import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { ThemeStyleContext, ThemeStyleContextProvider } from "./app/contexts/ThemeStyleContext"
import { SidebarContextProvider } from "./app/contexts/SidebarContext"
import AppLayout from "./components/layout/AppLayout"
import { useContext } from "react"
import { LoginPage } from "./components/LoginPage"
import { UserContext, UserContextProvider } from "./app/contexts/UserContext"

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const { themeString } = useContext(ThemeStyleContext)
  const { Token } = useContext(UserContext)
  const logado = Token ? true : false

  return (
    <BrowserRouter>
      <ThemeStyleContextProvider>
        <UserContextProvider>
          <ThemeProvider theme={themeString.style}>
            <SidebarContextProvider>
              {logado && <AppLayout /> || <LoginPage />}
            </SidebarContextProvider>
          </ThemeProvider>
        </UserContextProvider>
      </ThemeStyleContextProvider>
    </BrowserRouter>
  )
}

export default App
