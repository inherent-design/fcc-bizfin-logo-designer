/**
 * Custom Patterns
 * Layout and utility patterns
 */

import { scaleRatios } from './constants'

/**
 * Hover Effect Pattern
 * Tokenized hover transition effects
 */
export const hoverEffect = {
  properties: {
    effect: {
      type: 'enum',
      value: ['scale', 'lift', 'glow'],
    },
    speed: {
      type: 'enum',
      value: ['fast', 'normal', 'slow'],
    },
  },
  defaultValues: {
    effect: 'scale',
    speed: 'normal',
  },
  transform(props: { effect?: 'scale' | 'lift' | 'glow'; speed?: 'fast' | 'normal' | 'slow' }) {
    const { effect, speed, ...rest } = props

    const effects = {
      scale: { transform: `scale(${scaleRatios.subtle})` },
      lift: { transform: 'translateY(-0.2rem)' },
      glow: { boxShadow: 'brutalLg' },
    } as const

    return {
      transition: `all {durations.${speed}} {easings.smooth}`,
      _hover: effects[effect as keyof typeof effects],
      ...rest,
    }
  },
} as const

/**
 * Transform Effect Pattern
 * Tokenized transform presets
 */
export const transformEffect = {
  properties: {
    preset: {
      type: 'enum',
      value: [
        'scale',
        'scaleActive',
        'translateSm',
        'translateMd',
        'translateLg',
        'quarterTurn',
        'halfTurn',
        'pointRight',
        'pointDown',
        'tiltStrong',
      ],
    },
  },
  defaultValues: {
    preset: 'scale',
  },
  transform(props: {
    preset?:
      | 'scale'
      | 'scaleActive'
      | 'translateSm'
      | 'translateMd'
      | 'translateLg'
      | 'quarterTurn'
      | 'halfTurn'
      | 'pointRight'
      | 'pointDown'
      | 'tiltStrong'
  }) {
    const { preset, ...rest } = props

    const presets = {
      scale: { transform: `scale(${scaleRatios.subtle})` },
      scaleActive: { transform: `scale(${1 / scaleRatios.subtle})` },
      translateSm: { transform: 'translate(0.2rem, 0.2rem)' },
      translateMd: { transform: 'translate(0.4rem, 0.4rem)' },
      translateLg: { transform: 'translate(0.6rem, 0.6rem)' },
      quarterTurn: { transform: 'rotate({rotationSemantics.turns.quarter})' },
      halfTurn: { transform: 'rotate({rotationSemantics.turns.half})' },
      pointRight: { transform: 'rotate({rotationSemantics.direction.right})' },
      pointDown: { transform: 'rotate({rotationSemantics.direction.down})' },
      tiltStrong: { transform: 'rotate({rotationSemantics.tilt.strong})' },
    } as const

    return {
      ...presets[preset as keyof typeof presets],
      ...rest,
    }
  },
} as const

/**
 * All Patterns
 */
export const patterns = {
  hoverEffect,
  transformEffect,
} as const
