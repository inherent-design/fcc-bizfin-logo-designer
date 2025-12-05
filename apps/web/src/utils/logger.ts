import { format } from 'date-fns'
import pino, { type Logger } from 'pino'

// ANSI color codes for terminal output
const COLOR = {
  GREEN: '\x1b[32m',
  RED: '\x1b[31m',
  WHITE: '\x1b[37m',
  YELLOW: '\x1b[33m',
  CYAN: '\x1b[36m',
  MAGENTA: '\x1b[35m',
  RESET: '\x1b[0m',
}

const LEVEL_COLORS = {
  FATAL: COLOR.RED,
  ERROR: COLOR.RED,
  WARN: COLOR.YELLOW,
  INFO: COLOR.GREEN,
  DEBUG: COLOR.CYAN,
  TRACE: COLOR.MAGENTA,
}

// Environment detection
const isDevelopment = import.meta.env.MODE === 'development'

// Base logger configuration
const baseLogger: Logger = pino({
  level: isDevelopment ? 'trace' : 'warn',

  browser: {
    write: (logObj) => {
      const { level, msg, module, time, ...rest } = logObj as Record<
        string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any
      >

      const levelUppercased = (level as string).toUpperCase()
      const timeFormatted = format(new Date(time as number), 'HH:mm:ss.SSS')
      const levelColor = LEVEL_COLORS[levelUppercased as keyof typeof LEVEL_COLORS] || COLOR.WHITE

      if (isDevelopment) {
        // Pretty-printed format for development
        const moduleLabel = module ? `${COLOR.CYAN}[${module}]${COLOR.RESET}` : ''
        const extraData = Object.keys(rest).length > 0 ? `\n${JSON.stringify(rest, null, 2)}` : ''

        console.log(
          `${COLOR.WHITE}[${timeFormatted}]${COLOR.RESET} ${levelColor}${levelUppercased}${COLOR.RESET} ${moduleLabel} ${msg}${extraData}`
        )
      } else {
        // Structured JSON for production
        console.log(JSON.stringify(logObj))
      }
    },
    formatters: {
      level: (label) => ({ level: label }),
    },
  },

  // Server-side configuration (for potential SSR or testing)
  ...(typeof window === 'undefined' && {
    transport: isDevelopment
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            messageFormat: '[{module}] {msg}',
            ignore: 'pid,hostname',
            translateTime: 'yyyy-mm-dd HH:mm:ss.l',
          },
        }
      : undefined,
  }),
})

// Module-specific loggers
export const appLogger = baseLogger.child({ module: 'app' })
export const storeLogger = baseLogger.child({ module: 'store' })
export const componentLogger = baseLogger.child({ module: 'component' })
export const storageLogger = baseLogger.child({ module: 'storage' })

// Default export
export default appLogger

// Log initialization
appLogger.info(
  {
    mode: import.meta.env.MODE,
    logLevel: isDevelopment ? 'trace' : 'warn',
  },
  'Logger initialized'
)
