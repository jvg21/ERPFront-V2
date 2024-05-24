import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { ThemeStyleContext, ThemeStyleContextProvider } from "./app/contexts/ThemeStyleContext"
import { SidebarContextProvider } from "./app/contexts/SidebarContext"
import AppLayout from "./components/layout/AppLayout"
import { useContext } from "react"

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const { themeString } = useContext(ThemeStyleContext)
  return (
    <BrowserRouter>
      <ThemeStyleContextProvider>
        <ThemeProvider theme={themeString}>
          <SidebarContextProvider>
            <AppLayout/>
          </SidebarContextProvider>
        </ThemeProvider>
      </ThemeStyleContextProvider>
    </BrowserRouter>
  )
}

export default App
