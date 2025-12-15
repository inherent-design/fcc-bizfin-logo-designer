/**
 * World Space Configuration
 * Centralized constants for 3D world behavior
 */

/**
 * Maximum rotation angle (in degrees) for logo tilt effect
 * Applied to both mouse-based (desktop) and gyroscope-based (mobile) tilt
 *
 * @default 10 degrees
 * @experimental May be adjusted to 8 degrees for subtler effect
 */
export const MAX_LOGO_ROTATION = 10

/**
 * Mobile breakpoint (in pixels)
 * Below this width, gyroscope is enabled; above it, mouse tracking is enabled
 */
export const MOBILE_BREAKPOINT = 768

/**
 * Smooth damping factor for logo rotation
 * Lower values = slower, smoother transitions
 * Higher values = faster, snappier movements
 *
 * @default 0.1
 * @range 0.05 - 0.3
 */
export const ROTATION_DAMPING = 0.1
