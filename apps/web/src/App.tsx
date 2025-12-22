import { CameraSpaceOverlay } from './components/camera/CameraSpaceOverlay'
import { ControlPanel } from './components/camera/ControlPanel'
import { DesignGalleryDrawer } from './components/camera/DesignGalleryDrawer'
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
      <LogoPreviewWorld />

      <CameraSpaceOverlay>
        <ControlPanel />
        <DesignGalleryDrawer />
      </CameraSpaceOverlay>
    </WorldSpace>
  )
}

export default App
