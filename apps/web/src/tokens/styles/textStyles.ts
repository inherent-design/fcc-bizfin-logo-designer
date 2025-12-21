import { defineTextStyles } from '@pandacss/dev'

export const textStyles = defineTextStyles({
  brutalistLabel: {
    value: {
      fontFamily: '{fonts.brutalist}',
      fontWeight: '{fontWeights.brutal}',
      fontSize: '{fontSizes.typeMinus1}',
      textTransform: 'uppercase',
      letterSpacing: '{letterSpacings.wide}',
    }
  },
  sectionHeader: {
    value: {
      fontFamily: '{fonts.brutalist}',
      fontWeight: '{fontWeights.bold}',
      fontSize: '{fontSizes.typeMinus1}',
      textTransform: 'uppercase',
      letterSpacing: '{letterSpacings.wider}',
    }
  },
  formLabel: {
    value: {
      fontFamily: '{fonts.brutalist}',
      fontSize: '{fontSizes.typeMinus1}',
      fontWeight: '{fontWeights.semibold}',
    }
  },
})
