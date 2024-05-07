import AppLayout from './screen/components/layout/AppLayout'
import { DashboardLayout } from './screen/components/layout/DashboardLayout'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <AppLayout/>
    </>
  )
}

export default App
