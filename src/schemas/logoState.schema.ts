import { z } from 'zod'

/**
 * Zod schemas for runtime validation
 * Single source of truth for all type definitions
 */

// HSL Color schema
export const HSLColorSchema = z.object({
  h: z.number().min(0).max(360),
  s: z.number().min(0).max(100),
  l: z.number().min(0).max(100),
})
export type HSLColor = z.infer<typeof HSLColorSchema>

// Vec2 schema
export const Vec2Schema = z.object({
  x: z.number(),
  y: z.number(),
})
export type Vec2 = z.infer<typeof Vec2Schema>

// Element IDs (must match ELEMENT_IDS in src/constants/elements.ts)
export const ElementIdSchema = z.enum(['briefcase', 'mountains', 'dollar', 'leaf'])
export type ElementId = z.infer<typeof ElementIdSchema>

// Quadrant schema (position is determined by array index, not stored)
export const QuadrantSchema = z.object({
  elementId: ElementIdSchema,
  elementScale: z.number().min(0.5).max(2.0),
  centerOffset: Vec2Schema,
  isFilled: z.boolean(),
})
export type Quadrant = z.infer<typeof QuadrantSchema>

// Base Design schema
export const BaseDesignSchema = z.object({
  fillColorForFilledQuadrants: HSLColorSchema,
  elementColorOverBase: HSLColorSchema,
  elementColorOverFilledQuadrants: HSLColorSchema,
})
export type BaseDesign = z.infer<typeof BaseDesignSchema>

// Unique Element Colors schema (tier 2 of two-tone mode)
export const UniqueElementColorsSchema = z.object({
  elementColorOverQuadrant0Fill: HSLColorSchema,
  elementColorOverQuadrant3Fill: HSLColorSchema,
})
export type UniqueElementColors = z.infer<typeof UniqueElementColorsSchema>

// Two-tone Design schema (tier 1)
export const TwoToneDesignSchema = z
  .object({
    fillColorQuadrant0: HSLColorSchema,
    fillColorQuadrant3: HSLColorSchema,
    uniqueElementColors: UniqueElementColorsSchema.nullable(),
  })
  .nullable()
export type TwoToneDesign = z.infer<typeof TwoToneDesignSchema>

// Main LogoState schema
export const LogoStateSchema = z.object({
  version: z.string(),
  name: z.string(),
  baseColor: HSLColorSchema,
  availableElements: z.array(ElementIdSchema), // Only IDs - definitions in constants/elements.ts
  quadrants: z.tuple([QuadrantSchema, QuadrantSchema, QuadrantSchema, QuadrantSchema]),
  baseDesign: BaseDesignSchema,
  twoToneDesign: TwoToneDesignSchema,
})
export type LogoState = z.infer<typeof LogoStateSchema>

// SavedDesign schema (for import/export and server sync)
export const SavedDesignSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.string().datetime(),
  state: LogoStateSchema,
})
export type SavedDesign = z.infer<typeof SavedDesignSchema>

// DesignHistory schema (for managing saved designs)
export const DesignHistorySchema = z.object({
  savedDesigns: z.array(SavedDesignSchema),
  currentDesignId: z.string().uuid().nullable(),
})
export type DesignHistory = z.infer<typeof DesignHistorySchema>

/**
 * Validates and parses persisted state from localStorage
 * @param data - Unknown data from localStorage
 * @returns Parsed and validated LogoState or throws ZodError
 */
export function validateLogoState(data: unknown): LogoState {
  return LogoStateSchema.parse(data)
}

/**
 * Safe validation that returns success/error result
 * @param data - Unknown data from localStorage
 */
export function safeValidateLogoState(data: unknown) {
  return LogoStateSchema.safeParse(data)
}

/**
 * Validates SavedDesign
 */
export function validateSavedDesign(data: unknown): SavedDesign {
  return SavedDesignSchema.parse(data)
}

/**
 * Validates DesignHistory
 */
export function validateDesignHistory(data: unknown): DesignHistory {
  return DesignHistorySchema.parse(data)
}
