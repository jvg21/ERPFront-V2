import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { ThemeStyleContextProvider, useThemeStyle } from "./app/contexts/ThemeStyleContext"
import { SidebarContextProvider } from "./app/contexts/SidebarContext"

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const { themeString } = useThemeStyle
  return (
    <BrowserRouter>
      <ThemeStyleContextProvider>
        <ThemeProvider theme={themeString}>
          <SidebarContextProvider>
            <p>ds</p>

          </SidebarContextProvider>
        </ThemeProvider>
      </ThemeStyleContextProvider>
    </BrowserRouter>
  )
}

export default App
