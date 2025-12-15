import { WorldSpace } from './components/world/WorldSpace'
import { LogoPreviewWorld } from './components/world/LogoPreviewWorld'
import { CameraSpaceOverlay } from './components/camera/CameraSpaceOverlay'
import { ControlPanel } from './components/camera/ControlPanel'
import { DesignGalleryDrawer } from './components/camera/DesignGalleryDrawer'

function App() {
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
