import { ColorSettings } from './components/ColorSettings'
import { HistorySettings } from './components/HistorySettings'
import { LayoutSettings } from './components/LayoutSettings'
import { LogoPreview } from './components/LogoPreview'
import { useLogoStore } from './store/logoStore'

function App() {
  // Extract state values and actions using hybrid pattern
  const baseColor = useLogoStore((state) => state.baseColor)
  const baseDesign = useLogoStore((state) => state.baseDesign)
  const twoToneDesign = useLogoStore((state) => state.twoToneDesign)
  const quadrants = useLogoStore((state) => state.quadrants)
  const currentDesignName = useLogoStore((state) => state.name)

  // Group all actions
  const actions = {
    // Color actions
    setBaseColor: useLogoStore((state) => state.setBaseColor),
    setBaseFillColor: useLogoStore((state) => state.setBaseFillColor),
    setBaseElementColorOverBase: useLogoStore((state) => state.setBaseElementColorOverBase),
    setBaseElementColorOverFilledQuadrants: useLogoStore(
      (state) => state.setBaseElementColorOverFilledQuadrants
    ),
    enableTwoTone: useLogoStore((state) => state.enableTwoTone),
    disableTwoTone: useLogoStore((state) => state.disableTwoTone),
    setTwoToneFillColor: useLogoStore((state) => state.setTwoToneFillColor),
    enableUniqueElementColors: useLogoStore((state) => state.enableUniqueElementColors),
    disableUniqueElementColors: useLogoStore((state) => state.disableUniqueElementColors),
    setUniqueElementColor: useLogoStore((state) => state.setUniqueElementColor),

    // Layout actions
    setCenterOffset: useLogoStore((state) => state.setCenterOffset),
    setElementScale: useLogoStore((state) => state.setElementScale),

    // History actions
    exportState: useLogoStore((state) => state.exportState),
    importState: useLogoStore((state) => state.importState),
    resetToDefault: useLogoStore((state) => state.resetToDefault),
  }

  return (
    <div className='min-h-screen bg-base-100 p-4 lg:p-8'>
      <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8'>
        {/* Column 1: ColorSettings + HistorySettings */}
        <div className='lg:col-span-1 space-y-6'>
          <div className='bg-base-200 rounded-2xl p-6'>
            <ColorSettings
              baseColor={baseColor}
              baseDesign={baseDesign}
              twoToneDesign={twoToneDesign}
              actions={{
                setBaseColor: actions.setBaseColor,
                setBaseFillColor: actions.setBaseFillColor,
                setBaseElementColorOverBase: actions.setBaseElementColorOverBase,
                setBaseElementColorOverFilledQuadrants:
                  actions.setBaseElementColorOverFilledQuadrants,
                enableTwoTone: actions.enableTwoTone,
                disableTwoTone: actions.disableTwoTone,
                setTwoToneFillColor: actions.setTwoToneFillColor,
                enableUniqueElementColors: actions.enableUniqueElementColors,
                disableUniqueElementColors: actions.disableUniqueElementColors,
                setUniqueElementColor: actions.setUniqueElementColor,
              }}
            />
          </div>
          <div className='bg-base-200 rounded-2xl p-6'>
            <HistorySettings
              currentDesignName={currentDesignName}
              actions={{
                exportState: actions.exportState,
                importState: actions.importState,
                resetToDefault: actions.resetToDefault,
              }}
            />
          </div>
        </div>

        {/* Columns 2-3: LayoutSettings */}
        <div className='lg:col-span-2'>
          <div className='bg-base-200 rounded-2xl p-6'>
            <LayoutSettings
              quadrants={quadrants}
              actions={{
                setCenterOffset: actions.setCenterOffset,
                setElementScale: actions.setElementScale,
              }}
            />
          </div>
        </div>

        {/* Columns 4-5: LogoPreview - sticky on desktop */}
        <div className='lg:col-span-2'>
          <div className='lg:sticky lg:top-8'>
            <LogoPreview />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
