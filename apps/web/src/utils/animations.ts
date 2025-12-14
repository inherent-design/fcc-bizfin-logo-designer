/**
 * Animation and easing utilities
 */

/**
 * Spring easing function for smooth, natural animations
 * cubic-bezier(0.34, 1.56, 0.64, 1) - creates overshoot effect
 */
export const SPRING_EASING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

/**
 * Ease-out for natural deceleration
 */
export const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'

/**
 * Linear interpolation
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Map value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * Calculate rotation from mouse position
 * @param mouseX Normalized mouse X position [-1, 1]
 * @param mouseY Normalized mouse Y position [-1, 1]
 * @param maxRotation Maximum rotation in degrees
 * @returns Rotation values for X and Y axes
 */
export function calculateTiltFromMouse(
  mouseX: number,
  mouseY: number,
  maxRotation: number = 10
): { x: number; y: number } {
  return {
    x: mouseY * maxRotation, // Mouse up/down controls X-axis rotation (pitch)
    y: mouseX * maxRotation, // Mouse left/right controls Y-axis rotation (yaw)
  }
}

/**
 * Smooth damping for gradual value changes
 * @param current Current value
 * @param target Target value
 * @param smoothing Smoothing factor (0-1, lower = smoother)
 * @param deltaTime Time delta (usually 1/60 for 60fps)
 */
export function smoothDamp(
  current: number,
  target: number,
  smoothing: number = 0.1,
  deltaTime: number = 1 / 60
): number {
  return lerp(current, target, 1 - Math.exp(-smoothing * 60 * deltaTime))
}
