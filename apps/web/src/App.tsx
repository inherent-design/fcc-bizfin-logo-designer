import { ControlPanel } from './components/camera/ControlPanel'
import { LogoPreviewWorld } from './components/world/LogoPreviewWorld'
import { WorldSpace } from './components/world/WorldSpace'

function App() {
  // Toggle this to show Base UI test component
  // const showBaseUITest = true
  // if (showBaseUITest) {
  //   return <BaseUITest />
  // }

  return (
    <WorldSpace>
      <ControlPanel />
      <LogoPreviewWorld />
    </WorldSpace>
  )
}

export default App
