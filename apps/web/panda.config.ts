import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',
  importMap: '@styled-system',
  // presets: ['@pandacss/preset-base'],
  // eject: true,

  theme: {
    extend: {
      // Custom breakpoints
      breakpoints: {
        tablet: '768px',
        desktop: '1280px',
      },

      // ============================================================================
      // BASE TOKENS (Tier 1: Design Primitives)
      // ============================================================================

      tokens: {
        // ------------------------------------------------------------------------
        // COLORS - Visual palettes (not functional)
        // ------------------------------------------------------------------------

        colors: {
          // Neo-brutalist palette (for controls and UI elements)
          neo: {
            fg: { value: '#1a1a1a' },
            bg: { value: '#fef6e4' },
            primary: { value: '#f582ae' },
            secondary: { value: '#8bd3dd' },
            accent: { value: '#00FF00' },
            warning: { value: '#ff6b6b' },
          },

          // High-fantasy palette (for backgrounds and accents)
          fantasy: {
            void: {
              start: { value: '#0a0514' },
              mid: { value: '#0f0820' },
              end: { value: '#1a0f2e' },
            },
            aether: {
              start: { value: '#fdfdfb' },
              mid: { value: '#f5faf6' },
              end: { value: '#e8f5eb' },
            },
            arcana: {
              primary: { value: '#a78bfa' },
              secondary: { value: '#60a5fa' },
              tertiary: { value: '#34d399' },
              glow: { value: 'rgba(167, 139, 250, 0.3)' },
            },
            gold: {
              base: { value: '#d7913a' },
              dark: { value: '#5f4c0c' },
              shimmer: { value: '#ffd700' },
            },
          },
        },

        // ------------------------------------------------------------------------
        // SPACING - Consistent scale for layout
        // ------------------------------------------------------------------------

        spacing: {
          0: { value: '0' },
          1: { value: '0.25rem' }, // 4px
          2: { value: '0.5rem' }, // 8px
          3: { value: '0.75rem' }, // 12px
          4: { value: '1rem' }, // 16px
          5: { value: '1.25rem' }, // 20px
          6: { value: '1.5rem' }, // 24px
          8: { value: '2rem' }, // 32px
          10: { value: '2.5rem' }, // 40px
          12: { value: '3rem' }, // 48px
          16: { value: '4rem' }, // 64px
          20: { value: '5rem' }, // 80px
          24: { value: '6rem' }, // 96px
        },

        // ------------------------------------------------------------------------
        // BORDER WIDTHS - Neo-brutalist borders
        // ------------------------------------------------------------------------

        borderWidths: {
          brutal: {
            DEFAULT: { value: '4px' },
            lg: { value: '8px' },
            inset: { value: '2px' },
          },
        },

        // ------------------------------------------------------------------------
        // SHADOWS - Hard neo-brutalist shadows
        // ------------------------------------------------------------------------

        shadows: {
          brutal: {
            _light: {
              value: {
                offsetX: '{borderWidths.brutal}',
                offsetY: '{borderWidths.brutal}',
                blur: 0,
                spread: 0,
                color: '{colors.neo.fg}',
              },
            },
            _dark: {
              value: {
                offsetX: '{borderWidths.brutal}',
                offsetY: '{borderWidths.brutal}',
                blur: 0,
                spread: 0,
                color: '{colors.neo.bg}',
              },
            },
          },
          brutalLg: {
            _light: {
              value: {
                offsetX: '{borderWidths.brutal.lg}',
                offsetY: '{borderWidths.brutal.lg}',
                blur: 0,
                spread: 0,
                color: '{colors.neo.fg}',
              },
            },
            _dark: {
              value: {
                offsetX: '{borderWidths.brutal.lg}',
                offsetY: '{borderWidths.brutal.lg}',
                blur: 0,
                spread: 0,
                color: '{colors.neo.bg}',
              },
            },
          },
          brutalInset: {
            _light: {
              value: {
                offsetX: '{borderWidths.brutal.inset}',
                offsetY: '{borderWidths.brutal.inset}',
                blur: 0,
                spread: 0,
                color: '{colors.neo.fg}',
                inset: true,
              },
            },
            _dark: {
              value: {
                offsetX: '{borderWidths.brutal.inset}',
                offsetY: '{borderWidths.brutal.inset}',
                blur: 0,
                spread: 0,
                color: '{colors.neo.bg}',
                inset: true,
              },
            },
          },
        },

        // ------------------------------------------------------------------------
        // TYPOGRAPHY - Font families and weights
        // ------------------------------------------------------------------------

        fonts: {
          brutalist: { value: 'Space Grotesk, system-ui, sans-serif' },
          mono: { value: 'Fira Code, Consolas, Monaco, monospace' },
        },

        fontWeights: {
          normal: { value: '400' },
          medium: { value: '500' },
          semibold: { value: '600' },
          bold: { value: '700' },
          brutal: { value: '900' },
        },

        // ------------------------------------------------------------------------
        // EFFECTS - Blur, etc.
        // ------------------------------------------------------------------------

        blurs: {
          glass: { value: '12px' },
        },

        // ------------------------------------------------------------------------
        // ANIMATIONS - Durations and easings
        // ------------------------------------------------------------------------

        durations: {
          fast: { value: '100ms' },
          normal: { value: '200ms' },
          slow: { value: '300ms' },
        },

        easings: {
          default: { value: 'ease-out' },
          smooth: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
        },
      },

      // ============================================================================
      // SEMANTIC TOKENS (Tier 2: Functional Purpose with Hierarchy)
      // ============================================================================

      semanticTokens: {
        colors: {
          // ----------------------------------------------------------------------
          // WORLD - High-fantasy 3D background
          // ----------------------------------------------------------------------

          world: {
            bg: {
              value: {
                _light:
                  'radial-gradient(ellipse at center, {colors.fantasy.aether.mid} 0%, {colors.fantasy.aether.start} 50%, {colors.fantasy.aether.end} 100%)',
                _dark:
                  'radial-gradient(ellipse at center, {colors.fantasy.void.mid} 0%, {colors.fantasy.void.start} 50%, {colors.fantasy.void.end} 100%)',
              },
            },
            glow: { value: '{colors.fantasy.arcana.glow}' },
          },

          // ----------------------------------------------------------------------
          // OVERLAY - Backdrops for modals, drawers
          // ----------------------------------------------------------------------

          overlay: {
            backdrop: { value: 'rgba(0, 0, 0, 0.5)' },
            light: { value: 'rgba(0, 0, 0, 0.3)' },
            heavy: { value: 'rgba(0, 0, 0, 0.7)' },
          },

          // ----------------------------------------------------------------------
          // PANEL - UI control panels (base semantic layer)
          // ----------------------------------------------------------------------

          panel: {
            bg: {
              value: {
                _light: '{colors.neo.bg}',
                _dark: '{colors.neo.fg}',
              },
            },
            fg: {
              value: {
                _light: '{colors.neo.fg}',
                _dark: '{colors.neo.bg}',
              },
            },
            border: {
              value: {
                _light: '{colors.neo.fg}',
                _dark: '{colors.neo.bg}',
              },
            },
            primary: { value: '{colors.neo.primary}' },
            secondary: { value: '{colors.neo.secondary}' },
            accent: { value: '{colors.neo.accent}' },
            warning: { value: '{colors.neo.warning}' },
          },

          // ----------------------------------------------------------------------
          // TEXT - Hierarchical text colors (global → domain → component)
          // ----------------------------------------------------------------------

          text: {
            // Global text level (most general)
            default: { value: '{colors.panel.fg}' },
            secondary: {
              value: {
                _light: 'rgba({colors.neo.fg}, 0.7)',
                _dark: 'rgba({colors.neo.bg}, 0.7)',
              },
            },
            muted: {
              value: {
                _light: 'rgba({colors.neo.fg}, 0.6)',
                _dark: 'rgba({colors.neo.bg}, 0.6)',
              },
            },
            disabled: {
              value: {
                _light: 'rgba({colors.neo.fg}, 0.3)',
                _dark: 'rgba({colors.neo.bg}, 0.3)',
              },
            },

            // Panel text level (inherits from global)
            panel: {
              default: { value: '{colors.text.default}' },
              secondary: { value: '{colors.text.secondary}' },
              heading: { value: '{colors.panel.fg}' },
            },

            // Form text level (most specific for inputs)
            form: {
              label: { value: '{colors.text.default}' },
              input: { value: '{colors.text.default}' },
              inputDisabled: { value: '{colors.text.disabled}' },
              inputPlaceholder: { value: '{colors.text.muted}' },
              helper: { value: '{colors.text.secondary}' },
              error: { value: '{colors.panel.warning}' },
            },

            // Button text level
            button: {
              default: { value: '{colors.panel.bg}' }, // Inverted for contrast
              disabled: { value: '{colors.text.disabled}' },
            },

            // Tab text level
            tab: {
              default: { value: '{colors.text.default}' },
              active: { value: '{colors.panel.primary}' },
            },
          },

          // ----------------------------------------------------------------------
          // ICON - Hierarchical icon colors
          // ----------------------------------------------------------------------

          icon: {
            default: { value: '{colors.panel.fg}' },
            secondary: { value: '{colors.text.secondary}' },
            muted: { value: '{colors.text.muted}' },
            primary: { value: '{colors.panel.primary}' },
            disabled: { value: '{colors.text.disabled}' },
          },

          // ----------------------------------------------------------------------
          // BORDER - Hierarchical border colors (global → domain → component)
          // ----------------------------------------------------------------------

          border: {
            // Global border level
            default: { value: '{colors.panel.border}' },
            subtle: {
              value: {
                _light: 'rgba({colors.neo.fg}, 0.3)',
                _dark: 'rgba({colors.neo.bg}, 0.3)',
              },
            },

            // Panel border level
            panel: {
              default: { value: '{colors.border.default}' },
              section: { value: '{colors.border.subtle}' },
            },

            // Form border level
            form: {
              default: { value: '{colors.border.default}' },
              focus: { value: '{colors.panel.accent}' },
              error: { value: '{colors.panel.warning}' },
            },

            // Component border level (most specific)
            component: {
              colorPicker: { value: '{colors.border.panel.section}' },
              tab: { value: '{colors.border.panel.default}' },
            },
          },

          // ----------------------------------------------------------------------
          // BACKGROUND - Hierarchical background colors (global → domain → component)
          // ----------------------------------------------------------------------

          bg: {
            // Global background level
            default: { value: '{colors.panel.bg}' },
            subtle: {
              value: {
                _light: 'rgba({colors.neo.bg}, 0.5)',
                _dark: 'rgba({colors.neo.fg}, 0.5)',
              },
            },

            // Panel background level
            panel: {
              default: { value: '{colors.bg.default}' },
              hover: {
                value: {
                  _light: 'rgba({colors.neo.fg}, 0.05)',
                  _dark: 'rgba({colors.neo.bg}, 0.05)',
                },
              },
              active: {
                value: {
                  _light: 'rgba({colors.neo.fg}, 0.1)',
                  _dark: 'rgba({colors.neo.bg}, 0.1)',
                },
              },
            },

            // Form background level
            form: {
              input: { value: 'white' },
              inputDisabled: { value: '{colors.bg.subtle}' },
              inputFocus: { value: 'white' },
            },

            // Component background level (most specific)
            button: {
              primary: { value: '{colors.panel.primary}' },
              secondary: { value: '{colors.panel.secondary}' },
              danger: { value: '{colors.panel.warning}' },
              ghost: { value: 'transparent' },
              ghostHover: { value: '{colors.bg.panel.hover}' },
            },

            tab: {
              default: { value: 'transparent' },
              hover: { value: '{colors.bg.panel.hover}' },
              active: { value: '{colors.panel.bg}' },
            },

            colorPicker: {
              picker: { value: '{colors.panel.bg}' },
              section: { value: '{colors.bg.default}' },
            },
          },

          // ----------------------------------------------------------------------
          // LEGACY COMPONENT TOKENS (for backwards compatibility)
          // ----------------------------------------------------------------------

          component: {
            tab: {
              bg: { value: '{colors.bg.tab.default}' },
              bgActive: { value: '{colors.bg.tab.active}' },
              bgHover: { value: '{colors.bg.tab.hover}' },
              text: { value: '{colors.text.tab.default}' },
              textActive: { value: '{colors.text.tab.active}' },
              border: { value: '{colors.border.component.tab}' },
            },
            colorPicker: {
              pickerBg: { value: '{colors.bg.colorPicker.picker}' },
              pickerBorder: { value: '{colors.border.component.colorPicker}' },
              sectionBorder: { value: '{colors.border.component.colorPicker}' },
              labelText: { value: '{colors.text.form.label}' },
            },
          },

          // ----------------------------------------------------------------------
          // FORM - Consolidated form element tokens
          // ----------------------------------------------------------------------

          form: {
            input: {
              bg: { value: '{colors.bg.form.input}' },
              bgDisabled: { value: '{colors.bg.form.inputDisabled}' },
              bgFocus: { value: '{colors.bg.form.inputFocus}' },
              border: { value: '{colors.border.form.default}' },
              borderFocus: { value: '{colors.border.form.focus}' },
              borderError: { value: '{colors.border.form.error}' },
              text: { value: '{colors.text.form.input}' },
              textDisabled: { value: '{colors.text.form.inputDisabled}' },
              textPlaceholder: { value: '{colors.text.form.inputPlaceholder}' },
            },
            label: {
              text: { value: '{colors.text.form.label}' },
              textDisabled: { value: '{colors.text.disabled}' },
            },
            helper: {
              text: { value: '{colors.text.form.helper}' },
            },
            error: {
              text: { value: '{colors.text.form.error}' },
            },
          },
        },

        // ------------------------------------------------------------------------
        // OPACITY - Reusable opacity values
        // ------------------------------------------------------------------------

        opacity: {
          disabled: { value: 0.3 },
          muted: { value: 0.5 },
          subtle: { value: 0.6 },
          medium: { value: 0.7 },
        },

        // ------------------------------------------------------------------------
        // Z-INDEX - Stacking order scale
        // ------------------------------------------------------------------------

        zIndex: {
          dropdown: { value: 10 },
          sticky: { value: 20 },
          overlay: { value: 40 },
          modal: { value: 50 },
          tooltip: { value: 60 },
        },

        // ------------------------------------------------------------------------
        // TRANSITIONS - Composed timing values
        // ------------------------------------------------------------------------

        transitions: {
          fast: { value: 'all {durations.fast} {easings.default}' },
          normal: { value: 'all {durations.normal} {easings.default}' },
          slow: { value: 'all {durations.slow} {easings.smooth}' },
        },

        // ------------------------------------------------------------------------
        // TRANSFORMS - Reusable transform values
        // ------------------------------------------------------------------------

        transforms: {
          liftSm: { value: 'translate(2px, 2px)' },
          liftMd: { value: 'translate(4px, 4px)' },
          scaleHover: { value: 'scale(1.05)' },
        },
      },

      // ============================================================================
      // RECIPES (Component Variants)
      // ============================================================================

      recipes: {
        neoButton: {
          className: 'neo-button',
          base: {
            bg: '{colors.bg.button.primary}',
            boxShadow: '{shadows.brutal}',
            color: '{colors.text.button.default}',
            border: '{borderWidths.brutal} solid',
            borderColor: '{colors.border.default}',
            fontFamily: '{fonts.brutalist}',
            fontWeight: '{fontWeights.brutal}',
            textTransform: 'uppercase',
            px: 4,
            py: 2,
            cursor: 'pointer',
            transition: '{transitions.fast}',

            _hover: {
              transform: '{transforms.liftSm}',
              boxShadow: '2px 2px 0 {colors.panel.border}',
            },

            _active: {
              transform: '{transforms.liftMd}',
              boxShadow: 'none',
            },

            _disabled: {
              opacity: '{opacity.disabled}',
              color: '{colors.text.button.disabled}',
              cursor: 'not-allowed',
              transform: 'none',
            },
          },

          variants: {
            variant: {
              primary: {
                bg: '{colors.bg.button.primary}',
              },
              secondary: {
                bg: '{colors.bg.button.secondary}',
              },
              danger: {
                bg: '{colors.bg.button.danger}',
              },
              ghost: {
                bg: '{colors.bg.button.ghost}',
                _hover: {
                  bg: '{colors.bg.button.ghostHover}',
                },
              },
            },

            size: {
              sm: { px: 2, py: 1, fontSize: 'xs' },
              md: { px: 4, py: 2, fontSize: 'sm' },
              lg: { px: 6, py: 3, fontSize: 'md' },
            },
          },

          defaultVariants: {
            variant: 'primary',
            size: 'md',
          },
        },

        neoPanel: {
          className: 'neo-panel',
          base: {
            bg: '{colors.bg.panel.default}',
            border: '{borderWidths.brutal} solid',
            borderColor: '{colors.border.panel.default}',
            boxShadow: '{shadows.brutalLg}',
            p: 4,
          },
        },

        neoInput: {
          className: 'neo-input',
          base: {
            bg: '{colors.form.input.bg}',
            border: '{borderWidths.brutal} solid',
            borderColor: '{colors.form.input.border}',
            color: '{colors.form.input.text}',
            px: 3,
            py: 2,
            fontFamily: '{fonts.brutalist}',
            fontWeight: '{fontWeights.bold}',
            transition: '{transitions.fast}',

            _placeholder: {
              color: '{colors.form.input.textPlaceholder}',
            },

            _focus: {
              outline: '{borderWidths.brutal} solid',
              outlineColor: '{colors.form.input.borderFocus}',
              outlineOffset: '2px',
            },

            _disabled: {
              bg: '{colors.form.input.bgDisabled}',
              color: '{colors.form.input.textDisabled}',
              cursor: 'not-allowed',
            },
          },
        },
      },
    },
  },
})
