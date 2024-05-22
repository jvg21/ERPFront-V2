import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { ThemeStyleContextProvider, useThemeStyle } from "./app/contexts/ThemeStyleContext"

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const { themeString } = useThemeStyle
  return (
    <BrowserRouter>
      <ThemeStyleContextProvider>
        <ThemeProvider theme={themeString}>
          <p>ds</p>
        </ThemeProvider>
      </ThemeStyleContextProvider>
    </BrowserRouter>
  )
}

export default App
