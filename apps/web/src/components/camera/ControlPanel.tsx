import { css } from 'styled-system/css'
import { Panel } from '../ui/Panel'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs'
import { Icon } from '../ui/Icon'
import { useUIStore } from '../../store/uiStore'
import { ColorTab } from '../tabs/ColorTab'
import { LayoutTab } from '../tabs/LayoutTab'

export function ControlPanel() {
  const activeTab = useUIStore((state) => state.activeTab)
  const setActiveTab = useUIStore((state) => state.setActiveTab)

  return (
    <div
      className={css({
        position: 'absolute',

        // Mobile: top 40% height, full width, scrollable
        top: { base: 0, tablet: 0 },
        left: { base: 0, tablet: 0 },
        right: { base: 0, tablet: 'auto' },
        bottom: { tablet: 0 },
        height: { base: '40%', tablet: 'auto' },
        width: { tablet: '40%', desktop: '20%' },
        maxWidth: { desktop: '400px' },
        minWidth: { desktop: '300px' },
        p: { base: 4, tablet: 6 },
        overflowY: { base: 'auto' },
        overflowX: { base: 'hidden' },
      })}
    >
      <Panel
        className={css({
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          p: 6,
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            mb: 2,
          })}
        >
          <Icon
            name='palette'
            className={css({
              width: 8,
              height: 8,
              color: 'panel.primary',
            })}
          />
          <h1
            className={css({
              fontFamily: 'brutalist',
              fontWeight: 'brutal',
              fontSize: 'xl',
              textTransform: 'uppercase',
              color: 'panel.fg',
            })}
          >
            Logo Designer
          </h1>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'color' | 'layout')}
        >
          <TabsList>
            <TabsTrigger value='color'>
              <Icon name='palette' className={css({ width: 4, height: 4 })} />
              Color
            </TabsTrigger>
            <TabsTrigger value='layout'>
              <Icon name='grid' className={css({ width: 4, height: 4 })} />
              Layout
            </TabsTrigger>
          </TabsList>

          <div
            className={css({
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              pr: 2,
            })}
          >
            <TabsContent value='color'>
              <ColorTab />
            </TabsContent>

            <TabsContent value='layout'>
              <LayoutTab />
            </TabsContent>
          </div>
        </Tabs>
      </Panel>
    </div>
  )
}
