import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { ThemeStyleContext, ThemeStyleContextProvider } from "./app/contexts/ThemeStyleContext"
import { SidebarContextProvider } from "./app/contexts/SidebarContext"
import AppLayout from "./components/layout/AppLayout"
import { useContext } from "react"
import { ActiveLanguages } from "./app/config/ActiveLanguages"

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const { themeString } = useContext(ThemeStyleContext)
  console.log(themeString);
  
  return (
    <BrowserRouter>
      <ThemeStyleContextProvider>
        <ThemeProvider theme={themeString.style}>
          <SidebarContextProvider>
            <AppLayout/>
          </SidebarContextProvider>
        </ThemeProvider>
      </ThemeStyleContextProvider>
    </BrowserRouter>
  )
}

export default App
