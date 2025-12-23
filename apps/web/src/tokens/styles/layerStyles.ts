/**
 * Layer Styles
 *
 * Common surface/panel/card styling patterns.
 * Used via css({ layerStyle: 'surface' })
 *
 * Layer styles apply multiple CSS properties as a group,
 * making it easy to create consistent surfaces throughout the app.
 */

export const layerStyles = {
  /**
   * Base surface - used for panels, cards, drawers
   */
  surface: {
    description: 'Base surface for panels, cards, and drawers',
    value: {
      bg: 'bg.default',
      borderWidth: 'default',
      borderStyle: 'solid',
      borderColor: 'border.default',
      borderRadius: 'none',
    }
  },

  /**
   * Elevated surface - panels that appear above base surfaces
   */
  surfaceElevated: {
    description: 'Elevated panels above base surfaces',
    value: {
      bg: 'bg.elevated',
      borderWidth: 'brutal',
      borderStyle: 'solid',
      borderColor: 'border.default',
      borderRadius: 'none',
      boxShadow: 'elevation.raised',
    }
  },

  /**
   * Interactive surface - surfaces that respond to hover/press
   */
  surfaceInteractive: {
    description: 'Interactive surfaces with hover and press states',
    value: {
      bg: 'bg.interactive.default',
      borderWidth: 'default',
      borderStyle: 'solid',
      borderColor: 'border.default',
      borderRadius: 'none',
      cursor: 'pointer',
      transitionDuration: 'fast',
      transitionProperty: 'all',

      _hover: {
        bg: 'bg.hover',
        borderColor: 'border.emphasis',
      },

      _active: {
        transform: 'translate(2px, 2px)',
      },
    }
  },

  /**
   * Card - compact surface for contained content
   */
  card: {
    description: 'Compact surface for contained content',
    value: {
      bg: 'bg.default',
      borderWidth: 'default',
      borderStyle: 'solid',
      borderColor: 'border.default',
      borderRadius: 'none',
      p: 'inset.normal',
    }
  },

  /**
   * Panel - larger surface for grouped controls
   */
  panel: {
    description: 'Larger surface for grouped controls',
    value: {
      bg: 'bg.elevated',
      borderWidth: 'brutal',
      borderStyle: 'solid',
      borderColor: 'border.default',
      borderRadius: 'none',
      p: 'inset.loose',
    }
  },

  /**
   * Overlay - surfaces that appear over other content
   */
  overlay: {
    description: 'Surfaces appearing over other content',
    value: {
      bg: 'bg.overlay',
      borderWidth: 'default',
      borderStyle: 'solid',
      borderColor: 'border.default',
      borderRadius: 'none',
      boxShadow: 'elevation.floating',
    }
  },

  /**
   * Glass - translucent surface with blur (not currently used in neo-brutalist design)
   */
  glass: {
    description: 'Translucent surface with blur effect',
    value: {
      bg: 'bg.overlay',
      borderWidth: 'default',
      borderStyle: 'solid',
      borderColor: 'border.default',
      borderRadius: 'none',
    }
  },
}
