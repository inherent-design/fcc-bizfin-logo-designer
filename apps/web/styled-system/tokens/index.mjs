const tokens = {
  "aspectRatios.square": {
    "value": "1 / 1",
    "variable": "var(--aspect-ratios-square)"
  },
  "aspectRatios.landscape": {
    "value": "4 / 3",
    "variable": "var(--aspect-ratios-landscape)"
  },
  "aspectRatios.portrait": {
    "value": "3 / 4",
    "variable": "var(--aspect-ratios-portrait)"
  },
  "aspectRatios.wide": {
    "value": "16 / 9",
    "variable": "var(--aspect-ratios-wide)"
  },
  "aspectRatios.ultrawide": {
    "value": "18 / 5",
    "variable": "var(--aspect-ratios-ultrawide)"
  },
  "aspectRatios.golden": {
    "value": "1.618 / 1",
    "variable": "var(--aspect-ratios-golden)"
  },
  "borders.none": {
    "value": "none",
    "variable": "var(--borders-none)"
  },
  "radii.xs": {
    "value": "0.125rem",
    "variable": "var(--radii-xs)"
  },
  "radii.sm": {
    "value": "0.25rem",
    "variable": "var(--radii-sm)"
  },
  "radii.md": {
    "value": "0.375rem",
    "variable": "var(--radii-md)"
  },
  "radii.lg": {
    "value": "0.5rem",
    "variable": "var(--radii-lg)"
  },
  "radii.xl": {
    "value": "0.75rem",
    "variable": "var(--radii-xl)"
  },
  "radii.2xl": {
    "value": "1rem",
    "variable": "var(--radii-2xl)"
  },
  "radii.3xl": {
    "value": "1.5rem",
    "variable": "var(--radii-3xl)"
  },
  "radii.4xl": {
    "value": "2rem",
    "variable": "var(--radii-4xl)"
  },
  "radii.full": {
    "value": "9999px",
    "variable": "var(--radii-full)"
  },
  "lineHeights.none": {
    "value": "1",
    "variable": "var(--line-heights-none)"
  },
  "lineHeights.tight": {
    "value": "1.25",
    "variable": "var(--line-heights-tight)"
  },
  "lineHeights.snug": {
    "value": "1.375",
    "variable": "var(--line-heights-snug)"
  },
  "lineHeights.normal": {
    "value": "1.5",
    "variable": "var(--line-heights-normal)"
  },
  "lineHeights.relaxed": {
    "value": "1.625",
    "variable": "var(--line-heights-relaxed)"
  },
  "lineHeights.loose": {
    "value": "2",
    "variable": "var(--line-heights-loose)"
  },
  "letterSpacings.tighter": {
    "value": "-0.05em",
    "variable": "var(--letter-spacings-tighter)"
  },
  "letterSpacings.tight": {
    "value": "-0.025em",
    "variable": "var(--letter-spacings-tight)"
  },
  "letterSpacings.normal": {
    "value": "0em",
    "variable": "var(--letter-spacings-normal)"
  },
  "letterSpacings.wide": {
    "value": "0.025em",
    "variable": "var(--letter-spacings-wide)"
  },
  "letterSpacings.wider": {
    "value": "0.05em",
    "variable": "var(--letter-spacings-wider)"
  },
  "letterSpacings.widest": {
    "value": "0.1em",
    "variable": "var(--letter-spacings-widest)"
  },
  "fontSizes.2xs": {
    "value": "0.5rem",
    "variable": "var(--font-sizes-2xs)"
  },
  "fontSizes.xs": {
    "value": "0.75rem",
    "variable": "var(--font-sizes-xs)"
  },
  "fontSizes.sm": {
    "value": "0.875rem",
    "variable": "var(--font-sizes-sm)"
  },
  "fontSizes.md": {
    "value": "1rem",
    "variable": "var(--font-sizes-md)"
  },
  "fontSizes.lg": {
    "value": "1.125rem",
    "variable": "var(--font-sizes-lg)"
  },
  "fontSizes.xl": {
    "value": "1.25rem",
    "variable": "var(--font-sizes-xl)"
  },
  "fontSizes.2xl": {
    "value": "1.5rem",
    "variable": "var(--font-sizes-2xl)"
  },
  "fontSizes.3xl": {
    "value": "1.875rem",
    "variable": "var(--font-sizes-3xl)"
  },
  "fontSizes.4xl": {
    "value": "2.25rem",
    "variable": "var(--font-sizes-4xl)"
  },
  "fontSizes.5xl": {
    "value": "3rem",
    "variable": "var(--font-sizes-5xl)"
  },
  "fontSizes.6xl": {
    "value": "3.75rem",
    "variable": "var(--font-sizes-6xl)"
  },
  "fontSizes.7xl": {
    "value": "4.5rem",
    "variable": "var(--font-sizes-7xl)"
  },
  "fontSizes.8xl": {
    "value": "6rem",
    "variable": "var(--font-sizes-8xl)"
  },
  "fontSizes.9xl": {
    "value": "8rem",
    "variable": "var(--font-sizes-9xl)"
  },
  "sizes.0": {
    "value": "0rem",
    "variable": "var(--sizes-0)"
  },
  "sizes.1": {
    "value": "0.25rem",
    "variable": "var(--sizes-1)"
  },
  "sizes.2": {
    "value": "0.5rem",
    "variable": "var(--sizes-2)"
  },
  "sizes.3": {
    "value": "0.75rem",
    "variable": "var(--sizes-3)"
  },
  "sizes.4": {
    "value": "1rem",
    "variable": "var(--sizes-4)"
  },
  "sizes.5": {
    "value": "1.25rem",
    "variable": "var(--sizes-5)"
  },
  "sizes.6": {
    "value": "1.5rem",
    "variable": "var(--sizes-6)"
  },
  "sizes.7": {
    "value": "1.75rem",
    "variable": "var(--sizes-7)"
  },
  "sizes.8": {
    "value": "2rem",
    "variable": "var(--sizes-8)"
  },
  "sizes.9": {
    "value": "2.25rem",
    "variable": "var(--sizes-9)"
  },
  "sizes.10": {
    "value": "2.5rem",
    "variable": "var(--sizes-10)"
  },
  "sizes.11": {
    "value": "2.75rem",
    "variable": "var(--sizes-11)"
  },
  "sizes.12": {
    "value": "3rem",
    "variable": "var(--sizes-12)"
  },
  "sizes.14": {
    "value": "3.5rem",
    "variable": "var(--sizes-14)"
  },
  "sizes.16": {
    "value": "4rem",
    "variable": "var(--sizes-16)"
  },
  "sizes.20": {
    "value": "5rem",
    "variable": "var(--sizes-20)"
  },
  "sizes.24": {
    "value": "6rem",
    "variable": "var(--sizes-24)"
  },
  "sizes.28": {
    "value": "7rem",
    "variable": "var(--sizes-28)"
  },
  "sizes.32": {
    "value": "8rem",
    "variable": "var(--sizes-32)"
  },
  "sizes.36": {
    "value": "9rem",
    "variable": "var(--sizes-36)"
  },
  "sizes.40": {
    "value": "10rem",
    "variable": "var(--sizes-40)"
  },
  "sizes.44": {
    "value": "11rem",
    "variable": "var(--sizes-44)"
  },
  "sizes.48": {
    "value": "12rem",
    "variable": "var(--sizes-48)"
  },
  "sizes.52": {
    "value": "13rem",
    "variable": "var(--sizes-52)"
  },
  "sizes.56": {
    "value": "14rem",
    "variable": "var(--sizes-56)"
  },
  "sizes.60": {
    "value": "15rem",
    "variable": "var(--sizes-60)"
  },
  "sizes.64": {
    "value": "16rem",
    "variable": "var(--sizes-64)"
  },
  "sizes.72": {
    "value": "18rem",
    "variable": "var(--sizes-72)"
  },
  "sizes.80": {
    "value": "20rem",
    "variable": "var(--sizes-80)"
  },
  "sizes.96": {
    "value": "24rem",
    "variable": "var(--sizes-96)"
  },
  "sizes.0.5": {
    "value": "0.125rem",
    "variable": "var(--sizes-0\\.5)"
  },
  "sizes.1.5": {
    "value": "0.375rem",
    "variable": "var(--sizes-1\\.5)"
  },
  "sizes.2.5": {
    "value": "0.625rem",
    "variable": "var(--sizes-2\\.5)"
  },
  "sizes.3.5": {
    "value": "0.875rem",
    "variable": "var(--sizes-3\\.5)"
  },
  "sizes.4.5": {
    "value": "1.125rem",
    "variable": "var(--sizes-4\\.5)"
  },
  "sizes.5.5": {
    "value": "1.375rem",
    "variable": "var(--sizes-5\\.5)"
  },
  "sizes.xs": {
    "value": "20rem",
    "variable": "var(--sizes-xs)"
  },
  "sizes.sm": {
    "value": "24rem",
    "variable": "var(--sizes-sm)"
  },
  "sizes.md": {
    "value": "28rem",
    "variable": "var(--sizes-md)"
  },
  "sizes.lg": {
    "value": "32rem",
    "variable": "var(--sizes-lg)"
  },
  "sizes.xl": {
    "value": "36rem",
    "variable": "var(--sizes-xl)"
  },
  "sizes.2xl": {
    "value": "42rem",
    "variable": "var(--sizes-2xl)"
  },
  "sizes.3xl": {
    "value": "48rem",
    "variable": "var(--sizes-3xl)"
  },
  "sizes.4xl": {
    "value": "56rem",
    "variable": "var(--sizes-4xl)"
  },
  "sizes.5xl": {
    "value": "64rem",
    "variable": "var(--sizes-5xl)"
  },
  "sizes.6xl": {
    "value": "72rem",
    "variable": "var(--sizes-6xl)"
  },
  "sizes.7xl": {
    "value": "80rem",
    "variable": "var(--sizes-7xl)"
  },
  "sizes.8xl": {
    "value": "90rem",
    "variable": "var(--sizes-8xl)"
  },
  "sizes.prose": {
    "value": "65ch",
    "variable": "var(--sizes-prose)"
  },
  "sizes.full": {
    "value": "100%",
    "variable": "var(--sizes-full)"
  },
  "sizes.min": {
    "value": "min-content",
    "variable": "var(--sizes-min)"
  },
  "sizes.max": {
    "value": "max-content",
    "variable": "var(--sizes-max)"
  },
  "sizes.fit": {
    "value": "fit-content",
    "variable": "var(--sizes-fit)"
  },
  "sizes.breakpoint-sm": {
    "value": "640px",
    "variable": "var(--sizes-breakpoint-sm)"
  },
  "sizes.breakpoint-md": {
    "value": "768px",
    "variable": "var(--sizes-breakpoint-md)"
  },
  "sizes.breakpoint-lg": {
    "value": "1024px",
    "variable": "var(--sizes-breakpoint-lg)"
  },
  "sizes.breakpoint-xl": {
    "value": "1280px",
    "variable": "var(--sizes-breakpoint-xl)"
  },
  "sizes.breakpoint-2xl": {
    "value": "1536px",
    "variable": "var(--sizes-breakpoint-2xl)"
  },
  "sizes.breakpoint-tablet": {
    "value": "768px",
    "variable": "var(--sizes-breakpoint-tablet)"
  },
  "sizes.breakpoint-desktop": {
    "value": "1280px",
    "variable": "var(--sizes-breakpoint-desktop)"
  },
  "animations.spin": {
    "value": "spin 1s linear infinite",
    "variable": "var(--animations-spin)"
  },
  "animations.ping": {
    "value": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    "variable": "var(--animations-ping)"
  },
  "animations.pulse": {
    "value": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    "variable": "var(--animations-pulse)"
  },
  "animations.bounce": {
    "value": "bounce 1s infinite",
    "variable": "var(--animations-bounce)"
  },
  "colors.current": {
    "value": "currentColor",
    "variable": "var(--colors-current)"
  },
  "colors.black": {
    "value": "#000",
    "variable": "var(--colors-black)"
  },
  "colors.white": {
    "value": "#fff",
    "variable": "var(--colors-white)"
  },
  "colors.transparent": {
    "value": "rgb(0 0 0 / 0)",
    "variable": "var(--colors-transparent)"
  },
  "colors.rose.50": {
    "value": "#fff1f2",
    "variable": "var(--colors-rose-50)"
  },
  "colors.rose.100": {
    "value": "#ffe4e6",
    "variable": "var(--colors-rose-100)"
  },
  "colors.rose.200": {
    "value": "#fecdd3",
    "variable": "var(--colors-rose-200)"
  },
  "colors.rose.300": {
    "value": "#fda4af",
    "variable": "var(--colors-rose-300)"
  },
  "colors.rose.400": {
    "value": "#fb7185",
    "variable": "var(--colors-rose-400)"
  },
  "colors.rose.500": {
    "value": "#f43f5e",
    "variable": "var(--colors-rose-500)"
  },
  "colors.rose.600": {
    "value": "#e11d48",
    "variable": "var(--colors-rose-600)"
  },
  "colors.rose.700": {
    "value": "#be123c",
    "variable": "var(--colors-rose-700)"
  },
  "colors.rose.800": {
    "value": "#9f1239",
    "variable": "var(--colors-rose-800)"
  },
  "colors.rose.900": {
    "value": "#881337",
    "variable": "var(--colors-rose-900)"
  },
  "colors.rose.950": {
    "value": "#4c0519",
    "variable": "var(--colors-rose-950)"
  },
  "colors.pink.50": {
    "value": "#fdf2f8",
    "variable": "var(--colors-pink-50)"
  },
  "colors.pink.100": {
    "value": "#fce7f3",
    "variable": "var(--colors-pink-100)"
  },
  "colors.pink.200": {
    "value": "#fbcfe8",
    "variable": "var(--colors-pink-200)"
  },
  "colors.pink.300": {
    "value": "#f9a8d4",
    "variable": "var(--colors-pink-300)"
  },
  "colors.pink.400": {
    "value": "#f472b6",
    "variable": "var(--colors-pink-400)"
  },
  "colors.pink.500": {
    "value": "#ec4899",
    "variable": "var(--colors-pink-500)"
  },
  "colors.pink.600": {
    "value": "#db2777",
    "variable": "var(--colors-pink-600)"
  },
  "colors.pink.700": {
    "value": "#be185d",
    "variable": "var(--colors-pink-700)"
  },
  "colors.pink.800": {
    "value": "#9d174d",
    "variable": "var(--colors-pink-800)"
  },
  "colors.pink.900": {
    "value": "#831843",
    "variable": "var(--colors-pink-900)"
  },
  "colors.pink.950": {
    "value": "#500724",
    "variable": "var(--colors-pink-950)"
  },
  "colors.fuchsia.50": {
    "value": "#fdf4ff",
    "variable": "var(--colors-fuchsia-50)"
  },
  "colors.fuchsia.100": {
    "value": "#fae8ff",
    "variable": "var(--colors-fuchsia-100)"
  },
  "colors.fuchsia.200": {
    "value": "#f5d0fe",
    "variable": "var(--colors-fuchsia-200)"
  },
  "colors.fuchsia.300": {
    "value": "#f0abfc",
    "variable": "var(--colors-fuchsia-300)"
  },
  "colors.fuchsia.400": {
    "value": "#e879f9",
    "variable": "var(--colors-fuchsia-400)"
  },
  "colors.fuchsia.500": {
    "value": "#d946ef",
    "variable": "var(--colors-fuchsia-500)"
  },
  "colors.fuchsia.600": {
    "value": "#c026d3",
    "variable": "var(--colors-fuchsia-600)"
  },
  "colors.fuchsia.700": {
    "value": "#a21caf",
    "variable": "var(--colors-fuchsia-700)"
  },
  "colors.fuchsia.800": {
    "value": "#86198f",
    "variable": "var(--colors-fuchsia-800)"
  },
  "colors.fuchsia.900": {
    "value": "#701a75",
    "variable": "var(--colors-fuchsia-900)"
  },
  "colors.fuchsia.950": {
    "value": "#4a044e",
    "variable": "var(--colors-fuchsia-950)"
  },
  "colors.purple.50": {
    "value": "#faf5ff",
    "variable": "var(--colors-purple-50)"
  },
  "colors.purple.100": {
    "value": "#f3e8ff",
    "variable": "var(--colors-purple-100)"
  },
  "colors.purple.200": {
    "value": "#e9d5ff",
    "variable": "var(--colors-purple-200)"
  },
  "colors.purple.300": {
    "value": "#d8b4fe",
    "variable": "var(--colors-purple-300)"
  },
  "colors.purple.400": {
    "value": "#c084fc",
    "variable": "var(--colors-purple-400)"
  },
  "colors.purple.500": {
    "value": "#a855f7",
    "variable": "var(--colors-purple-500)"
  },
  "colors.purple.600": {
    "value": "#9333ea",
    "variable": "var(--colors-purple-600)"
  },
  "colors.purple.700": {
    "value": "#7e22ce",
    "variable": "var(--colors-purple-700)"
  },
  "colors.purple.800": {
    "value": "#6b21a8",
    "variable": "var(--colors-purple-800)"
  },
  "colors.purple.900": {
    "value": "#581c87",
    "variable": "var(--colors-purple-900)"
  },
  "colors.purple.950": {
    "value": "#3b0764",
    "variable": "var(--colors-purple-950)"
  },
  "colors.violet.50": {
    "value": "#f5f3ff",
    "variable": "var(--colors-violet-50)"
  },
  "colors.violet.100": {
    "value": "#ede9fe",
    "variable": "var(--colors-violet-100)"
  },
  "colors.violet.200": {
    "value": "#ddd6fe",
    "variable": "var(--colors-violet-200)"
  },
  "colors.violet.300": {
    "value": "#c4b5fd",
    "variable": "var(--colors-violet-300)"
  },
  "colors.violet.400": {
    "value": "#a78bfa",
    "variable": "var(--colors-violet-400)"
  },
  "colors.violet.500": {
    "value": "#8b5cf6",
    "variable": "var(--colors-violet-500)"
  },
  "colors.violet.600": {
    "value": "#7c3aed",
    "variable": "var(--colors-violet-600)"
  },
  "colors.violet.700": {
    "value": "#6d28d9",
    "variable": "var(--colors-violet-700)"
  },
  "colors.violet.800": {
    "value": "#5b21b6",
    "variable": "var(--colors-violet-800)"
  },
  "colors.violet.900": {
    "value": "#4c1d95",
    "variable": "var(--colors-violet-900)"
  },
  "colors.violet.950": {
    "value": "#2e1065",
    "variable": "var(--colors-violet-950)"
  },
  "colors.indigo.50": {
    "value": "#eef2ff",
    "variable": "var(--colors-indigo-50)"
  },
  "colors.indigo.100": {
    "value": "#e0e7ff",
    "variable": "var(--colors-indigo-100)"
  },
  "colors.indigo.200": {
    "value": "#c7d2fe",
    "variable": "var(--colors-indigo-200)"
  },
  "colors.indigo.300": {
    "value": "#a5b4fc",
    "variable": "var(--colors-indigo-300)"
  },
  "colors.indigo.400": {
    "value": "#818cf8",
    "variable": "var(--colors-indigo-400)"
  },
  "colors.indigo.500": {
    "value": "#6366f1",
    "variable": "var(--colors-indigo-500)"
  },
  "colors.indigo.600": {
    "value": "#4f46e5",
    "variable": "var(--colors-indigo-600)"
  },
  "colors.indigo.700": {
    "value": "#4338ca",
    "variable": "var(--colors-indigo-700)"
  },
  "colors.indigo.800": {
    "value": "#3730a3",
    "variable": "var(--colors-indigo-800)"
  },
  "colors.indigo.900": {
    "value": "#312e81",
    "variable": "var(--colors-indigo-900)"
  },
  "colors.indigo.950": {
    "value": "#1e1b4b",
    "variable": "var(--colors-indigo-950)"
  },
  "colors.blue.50": {
    "value": "#eff6ff",
    "variable": "var(--colors-blue-50)"
  },
  "colors.blue.100": {
    "value": "#dbeafe",
    "variable": "var(--colors-blue-100)"
  },
  "colors.blue.200": {
    "value": "#bfdbfe",
    "variable": "var(--colors-blue-200)"
  },
  "colors.blue.300": {
    "value": "#93c5fd",
    "variable": "var(--colors-blue-300)"
  },
  "colors.blue.400": {
    "value": "#60a5fa",
    "variable": "var(--colors-blue-400)"
  },
  "colors.blue.500": {
    "value": "#3b82f6",
    "variable": "var(--colors-blue-500)"
  },
  "colors.blue.600": {
    "value": "#2563eb",
    "variable": "var(--colors-blue-600)"
  },
  "colors.blue.700": {
    "value": "#1d4ed8",
    "variable": "var(--colors-blue-700)"
  },
  "colors.blue.800": {
    "value": "#1e40af",
    "variable": "var(--colors-blue-800)"
  },
  "colors.blue.900": {
    "value": "#1e3a8a",
    "variable": "var(--colors-blue-900)"
  },
  "colors.blue.950": {
    "value": "#172554",
    "variable": "var(--colors-blue-950)"
  },
  "colors.sky.50": {
    "value": "#f0f9ff",
    "variable": "var(--colors-sky-50)"
  },
  "colors.sky.100": {
    "value": "#e0f2fe",
    "variable": "var(--colors-sky-100)"
  },
  "colors.sky.200": {
    "value": "#bae6fd",
    "variable": "var(--colors-sky-200)"
  },
  "colors.sky.300": {
    "value": "#7dd3fc",
    "variable": "var(--colors-sky-300)"
  },
  "colors.sky.400": {
    "value": "#38bdf8",
    "variable": "var(--colors-sky-400)"
  },
  "colors.sky.500": {
    "value": "#0ea5e9",
    "variable": "var(--colors-sky-500)"
  },
  "colors.sky.600": {
    "value": "#0284c7",
    "variable": "var(--colors-sky-600)"
  },
  "colors.sky.700": {
    "value": "#0369a1",
    "variable": "var(--colors-sky-700)"
  },
  "colors.sky.800": {
    "value": "#075985",
    "variable": "var(--colors-sky-800)"
  },
  "colors.sky.900": {
    "value": "#0c4a6e",
    "variable": "var(--colors-sky-900)"
  },
  "colors.sky.950": {
    "value": "#082f49",
    "variable": "var(--colors-sky-950)"
  },
  "colors.cyan.50": {
    "value": "#ecfeff",
    "variable": "var(--colors-cyan-50)"
  },
  "colors.cyan.100": {
    "value": "#cffafe",
    "variable": "var(--colors-cyan-100)"
  },
  "colors.cyan.200": {
    "value": "#a5f3fc",
    "variable": "var(--colors-cyan-200)"
  },
  "colors.cyan.300": {
    "value": "#67e8f9",
    "variable": "var(--colors-cyan-300)"
  },
  "colors.cyan.400": {
    "value": "#22d3ee",
    "variable": "var(--colors-cyan-400)"
  },
  "colors.cyan.500": {
    "value": "#06b6d4",
    "variable": "var(--colors-cyan-500)"
  },
  "colors.cyan.600": {
    "value": "#0891b2",
    "variable": "var(--colors-cyan-600)"
  },
  "colors.cyan.700": {
    "value": "#0e7490",
    "variable": "var(--colors-cyan-700)"
  },
  "colors.cyan.800": {
    "value": "#155e75",
    "variable": "var(--colors-cyan-800)"
  },
  "colors.cyan.900": {
    "value": "#164e63",
    "variable": "var(--colors-cyan-900)"
  },
  "colors.cyan.950": {
    "value": "#083344",
    "variable": "var(--colors-cyan-950)"
  },
  "colors.teal.50": {
    "value": "#f0fdfa",
    "variable": "var(--colors-teal-50)"
  },
  "colors.teal.100": {
    "value": "#ccfbf1",
    "variable": "var(--colors-teal-100)"
  },
  "colors.teal.200": {
    "value": "#99f6e4",
    "variable": "var(--colors-teal-200)"
  },
  "colors.teal.300": {
    "value": "#5eead4",
    "variable": "var(--colors-teal-300)"
  },
  "colors.teal.400": {
    "value": "#2dd4bf",
    "variable": "var(--colors-teal-400)"
  },
  "colors.teal.500": {
    "value": "#14b8a6",
    "variable": "var(--colors-teal-500)"
  },
  "colors.teal.600": {
    "value": "#0d9488",
    "variable": "var(--colors-teal-600)"
  },
  "colors.teal.700": {
    "value": "#0f766e",
    "variable": "var(--colors-teal-700)"
  },
  "colors.teal.800": {
    "value": "#115e59",
    "variable": "var(--colors-teal-800)"
  },
  "colors.teal.900": {
    "value": "#134e4a",
    "variable": "var(--colors-teal-900)"
  },
  "colors.teal.950": {
    "value": "#042f2e",
    "variable": "var(--colors-teal-950)"
  },
  "colors.emerald.50": {
    "value": "#ecfdf5",
    "variable": "var(--colors-emerald-50)"
  },
  "colors.emerald.100": {
    "value": "#d1fae5",
    "variable": "var(--colors-emerald-100)"
  },
  "colors.emerald.200": {
    "value": "#a7f3d0",
    "variable": "var(--colors-emerald-200)"
  },
  "colors.emerald.300": {
    "value": "#6ee7b7",
    "variable": "var(--colors-emerald-300)"
  },
  "colors.emerald.400": {
    "value": "#34d399",
    "variable": "var(--colors-emerald-400)"
  },
  "colors.emerald.500": {
    "value": "#10b981",
    "variable": "var(--colors-emerald-500)"
  },
  "colors.emerald.600": {
    "value": "#059669",
    "variable": "var(--colors-emerald-600)"
  },
  "colors.emerald.700": {
    "value": "#047857",
    "variable": "var(--colors-emerald-700)"
  },
  "colors.emerald.800": {
    "value": "#065f46",
    "variable": "var(--colors-emerald-800)"
  },
  "colors.emerald.900": {
    "value": "#064e3b",
    "variable": "var(--colors-emerald-900)"
  },
  "colors.emerald.950": {
    "value": "#022c22",
    "variable": "var(--colors-emerald-950)"
  },
  "colors.green.50": {
    "value": "#f0fdf4",
    "variable": "var(--colors-green-50)"
  },
  "colors.green.100": {
    "value": "#dcfce7",
    "variable": "var(--colors-green-100)"
  },
  "colors.green.200": {
    "value": "#bbf7d0",
    "variable": "var(--colors-green-200)"
  },
  "colors.green.300": {
    "value": "#86efac",
    "variable": "var(--colors-green-300)"
  },
  "colors.green.400": {
    "value": "#4ade80",
    "variable": "var(--colors-green-400)"
  },
  "colors.green.500": {
    "value": "#22c55e",
    "variable": "var(--colors-green-500)"
  },
  "colors.green.600": {
    "value": "#16a34a",
    "variable": "var(--colors-green-600)"
  },
  "colors.green.700": {
    "value": "#15803d",
    "variable": "var(--colors-green-700)"
  },
  "colors.green.800": {
    "value": "#166534",
    "variable": "var(--colors-green-800)"
  },
  "colors.green.900": {
    "value": "#14532d",
    "variable": "var(--colors-green-900)"
  },
  "colors.green.950": {
    "value": "#052e16",
    "variable": "var(--colors-green-950)"
  },
  "colors.lime.50": {
    "value": "#f7fee7",
    "variable": "var(--colors-lime-50)"
  },
  "colors.lime.100": {
    "value": "#ecfccb",
    "variable": "var(--colors-lime-100)"
  },
  "colors.lime.200": {
    "value": "#d9f99d",
    "variable": "var(--colors-lime-200)"
  },
  "colors.lime.300": {
    "value": "#bef264",
    "variable": "var(--colors-lime-300)"
  },
  "colors.lime.400": {
    "value": "#a3e635",
    "variable": "var(--colors-lime-400)"
  },
  "colors.lime.500": {
    "value": "#84cc16",
    "variable": "var(--colors-lime-500)"
  },
  "colors.lime.600": {
    "value": "#65a30d",
    "variable": "var(--colors-lime-600)"
  },
  "colors.lime.700": {
    "value": "#4d7c0f",
    "variable": "var(--colors-lime-700)"
  },
  "colors.lime.800": {
    "value": "#3f6212",
    "variable": "var(--colors-lime-800)"
  },
  "colors.lime.900": {
    "value": "#365314",
    "variable": "var(--colors-lime-900)"
  },
  "colors.lime.950": {
    "value": "#1a2e05",
    "variable": "var(--colors-lime-950)"
  },
  "colors.yellow.50": {
    "value": "#fefce8",
    "variable": "var(--colors-yellow-50)"
  },
  "colors.yellow.100": {
    "value": "#fef9c3",
    "variable": "var(--colors-yellow-100)"
  },
  "colors.yellow.200": {
    "value": "#fef08a",
    "variable": "var(--colors-yellow-200)"
  },
  "colors.yellow.300": {
    "value": "#fde047",
    "variable": "var(--colors-yellow-300)"
  },
  "colors.yellow.400": {
    "value": "#facc15",
    "variable": "var(--colors-yellow-400)"
  },
  "colors.yellow.500": {
    "value": "#eab308",
    "variable": "var(--colors-yellow-500)"
  },
  "colors.yellow.600": {
    "value": "#ca8a04",
    "variable": "var(--colors-yellow-600)"
  },
  "colors.yellow.700": {
    "value": "#a16207",
    "variable": "var(--colors-yellow-700)"
  },
  "colors.yellow.800": {
    "value": "#854d0e",
    "variable": "var(--colors-yellow-800)"
  },
  "colors.yellow.900": {
    "value": "#713f12",
    "variable": "var(--colors-yellow-900)"
  },
  "colors.yellow.950": {
    "value": "#422006",
    "variable": "var(--colors-yellow-950)"
  },
  "colors.amber.50": {
    "value": "#fffbeb",
    "variable": "var(--colors-amber-50)"
  },
  "colors.amber.100": {
    "value": "#fef3c7",
    "variable": "var(--colors-amber-100)"
  },
  "colors.amber.200": {
    "value": "#fde68a",
    "variable": "var(--colors-amber-200)"
  },
  "colors.amber.300": {
    "value": "#fcd34d",
    "variable": "var(--colors-amber-300)"
  },
  "colors.amber.400": {
    "value": "#fbbf24",
    "variable": "var(--colors-amber-400)"
  },
  "colors.amber.500": {
    "value": "#f59e0b",
    "variable": "var(--colors-amber-500)"
  },
  "colors.amber.600": {
    "value": "#d97706",
    "variable": "var(--colors-amber-600)"
  },
  "colors.amber.700": {
    "value": "#b45309",
    "variable": "var(--colors-amber-700)"
  },
  "colors.amber.800": {
    "value": "#92400e",
    "variable": "var(--colors-amber-800)"
  },
  "colors.amber.900": {
    "value": "#78350f",
    "variable": "var(--colors-amber-900)"
  },
  "colors.amber.950": {
    "value": "#451a03",
    "variable": "var(--colors-amber-950)"
  },
  "colors.orange.50": {
    "value": "#fff7ed",
    "variable": "var(--colors-orange-50)"
  },
  "colors.orange.100": {
    "value": "#ffedd5",
    "variable": "var(--colors-orange-100)"
  },
  "colors.orange.200": {
    "value": "#fed7aa",
    "variable": "var(--colors-orange-200)"
  },
  "colors.orange.300": {
    "value": "#fdba74",
    "variable": "var(--colors-orange-300)"
  },
  "colors.orange.400": {
    "value": "#fb923c",
    "variable": "var(--colors-orange-400)"
  },
  "colors.orange.500": {
    "value": "#f97316",
    "variable": "var(--colors-orange-500)"
  },
  "colors.orange.600": {
    "value": "#ea580c",
    "variable": "var(--colors-orange-600)"
  },
  "colors.orange.700": {
    "value": "#c2410c",
    "variable": "var(--colors-orange-700)"
  },
  "colors.orange.800": {
    "value": "#9a3412",
    "variable": "var(--colors-orange-800)"
  },
  "colors.orange.900": {
    "value": "#7c2d12",
    "variable": "var(--colors-orange-900)"
  },
  "colors.orange.950": {
    "value": "#431407",
    "variable": "var(--colors-orange-950)"
  },
  "colors.red.50": {
    "value": "#fef2f2",
    "variable": "var(--colors-red-50)"
  },
  "colors.red.100": {
    "value": "#fee2e2",
    "variable": "var(--colors-red-100)"
  },
  "colors.red.200": {
    "value": "#fecaca",
    "variable": "var(--colors-red-200)"
  },
  "colors.red.300": {
    "value": "#fca5a5",
    "variable": "var(--colors-red-300)"
  },
  "colors.red.400": {
    "value": "#f87171",
    "variable": "var(--colors-red-400)"
  },
  "colors.red.500": {
    "value": "#ef4444",
    "variable": "var(--colors-red-500)"
  },
  "colors.red.600": {
    "value": "#dc2626",
    "variable": "var(--colors-red-600)"
  },
  "colors.red.700": {
    "value": "#b91c1c",
    "variable": "var(--colors-red-700)"
  },
  "colors.red.800": {
    "value": "#991b1b",
    "variable": "var(--colors-red-800)"
  },
  "colors.red.900": {
    "value": "#7f1d1d",
    "variable": "var(--colors-red-900)"
  },
  "colors.red.950": {
    "value": "#450a0a",
    "variable": "var(--colors-red-950)"
  },
  "colors.neutral.50": {
    "value": "#fafafa",
    "variable": "var(--colors-neutral-50)"
  },
  "colors.neutral.100": {
    "value": "#f5f5f5",
    "variable": "var(--colors-neutral-100)"
  },
  "colors.neutral.200": {
    "value": "#e5e5e5",
    "variable": "var(--colors-neutral-200)"
  },
  "colors.neutral.300": {
    "value": "#d4d4d4",
    "variable": "var(--colors-neutral-300)"
  },
  "colors.neutral.400": {
    "value": "#a3a3a3",
    "variable": "var(--colors-neutral-400)"
  },
  "colors.neutral.500": {
    "value": "#737373",
    "variable": "var(--colors-neutral-500)"
  },
  "colors.neutral.600": {
    "value": "#525252",
    "variable": "var(--colors-neutral-600)"
  },
  "colors.neutral.700": {
    "value": "#404040",
    "variable": "var(--colors-neutral-700)"
  },
  "colors.neutral.800": {
    "value": "#262626",
    "variable": "var(--colors-neutral-800)"
  },
  "colors.neutral.900": {
    "value": "#171717",
    "variable": "var(--colors-neutral-900)"
  },
  "colors.neutral.950": {
    "value": "#0a0a0a",
    "variable": "var(--colors-neutral-950)"
  },
  "colors.stone.50": {
    "value": "#fafaf9",
    "variable": "var(--colors-stone-50)"
  },
  "colors.stone.100": {
    "value": "#f5f5f4",
    "variable": "var(--colors-stone-100)"
  },
  "colors.stone.200": {
    "value": "#e7e5e4",
    "variable": "var(--colors-stone-200)"
  },
  "colors.stone.300": {
    "value": "#d6d3d1",
    "variable": "var(--colors-stone-300)"
  },
  "colors.stone.400": {
    "value": "#a8a29e",
    "variable": "var(--colors-stone-400)"
  },
  "colors.stone.500": {
    "value": "#78716c",
    "variable": "var(--colors-stone-500)"
  },
  "colors.stone.600": {
    "value": "#57534e",
    "variable": "var(--colors-stone-600)"
  },
  "colors.stone.700": {
    "value": "#44403c",
    "variable": "var(--colors-stone-700)"
  },
  "colors.stone.800": {
    "value": "#292524",
    "variable": "var(--colors-stone-800)"
  },
  "colors.stone.900": {
    "value": "#1c1917",
    "variable": "var(--colors-stone-900)"
  },
  "colors.stone.950": {
    "value": "#0c0a09",
    "variable": "var(--colors-stone-950)"
  },
  "colors.zinc.50": {
    "value": "#fafafa",
    "variable": "var(--colors-zinc-50)"
  },
  "colors.zinc.100": {
    "value": "#f4f4f5",
    "variable": "var(--colors-zinc-100)"
  },
  "colors.zinc.200": {
    "value": "#e4e4e7",
    "variable": "var(--colors-zinc-200)"
  },
  "colors.zinc.300": {
    "value": "#d4d4d8",
    "variable": "var(--colors-zinc-300)"
  },
  "colors.zinc.400": {
    "value": "#a1a1aa",
    "variable": "var(--colors-zinc-400)"
  },
  "colors.zinc.500": {
    "value": "#71717a",
    "variable": "var(--colors-zinc-500)"
  },
  "colors.zinc.600": {
    "value": "#52525b",
    "variable": "var(--colors-zinc-600)"
  },
  "colors.zinc.700": {
    "value": "#3f3f46",
    "variable": "var(--colors-zinc-700)"
  },
  "colors.zinc.800": {
    "value": "#27272a",
    "variable": "var(--colors-zinc-800)"
  },
  "colors.zinc.900": {
    "value": "#18181b",
    "variable": "var(--colors-zinc-900)"
  },
  "colors.zinc.950": {
    "value": "#09090b",
    "variable": "var(--colors-zinc-950)"
  },
  "colors.gray.50": {
    "value": "#f9fafb",
    "variable": "var(--colors-gray-50)"
  },
  "colors.gray.100": {
    "value": "#f3f4f6",
    "variable": "var(--colors-gray-100)"
  },
  "colors.gray.200": {
    "value": "#e5e7eb",
    "variable": "var(--colors-gray-200)"
  },
  "colors.gray.300": {
    "value": "#d1d5db",
    "variable": "var(--colors-gray-300)"
  },
  "colors.gray.400": {
    "value": "#9ca3af",
    "variable": "var(--colors-gray-400)"
  },
  "colors.gray.500": {
    "value": "#6b7280",
    "variable": "var(--colors-gray-500)"
  },
  "colors.gray.600": {
    "value": "#4b5563",
    "variable": "var(--colors-gray-600)"
  },
  "colors.gray.700": {
    "value": "#374151",
    "variable": "var(--colors-gray-700)"
  },
  "colors.gray.800": {
    "value": "#1f2937",
    "variable": "var(--colors-gray-800)"
  },
  "colors.gray.900": {
    "value": "#111827",
    "variable": "var(--colors-gray-900)"
  },
  "colors.gray.950": {
    "value": "#030712",
    "variable": "var(--colors-gray-950)"
  },
  "colors.slate.50": {
    "value": "#f8fafc",
    "variable": "var(--colors-slate-50)"
  },
  "colors.slate.100": {
    "value": "#f1f5f9",
    "variable": "var(--colors-slate-100)"
  },
  "colors.slate.200": {
    "value": "#e2e8f0",
    "variable": "var(--colors-slate-200)"
  },
  "colors.slate.300": {
    "value": "#cbd5e1",
    "variable": "var(--colors-slate-300)"
  },
  "colors.slate.400": {
    "value": "#94a3b8",
    "variable": "var(--colors-slate-400)"
  },
  "colors.slate.500": {
    "value": "#64748b",
    "variable": "var(--colors-slate-500)"
  },
  "colors.slate.600": {
    "value": "#475569",
    "variable": "var(--colors-slate-600)"
  },
  "colors.slate.700": {
    "value": "#334155",
    "variable": "var(--colors-slate-700)"
  },
  "colors.slate.800": {
    "value": "#1e293b",
    "variable": "var(--colors-slate-800)"
  },
  "colors.slate.900": {
    "value": "#0f172a",
    "variable": "var(--colors-slate-900)"
  },
  "colors.slate.950": {
    "value": "#020617",
    "variable": "var(--colors-slate-950)"
  },
  "colors.neo.fg": {
    "value": "#1a1a1a",
    "variable": "var(--colors-neo-fg)"
  },
  "colors.neo.bg": {
    "value": "#fef6e4",
    "variable": "var(--colors-neo-bg)"
  },
  "colors.neo.primary": {
    "value": "#f582ae",
    "variable": "var(--colors-neo-primary)"
  },
  "colors.neo.secondary": {
    "value": "#8bd3dd",
    "variable": "var(--colors-neo-secondary)"
  },
  "colors.neo.accent": {
    "value": "#00FF00",
    "variable": "var(--colors-neo-accent)"
  },
  "colors.neo.warning": {
    "value": "#ff6b6b",
    "variable": "var(--colors-neo-warning)"
  },
  "colors.fantasy.void.start": {
    "value": "#0a0514",
    "variable": "var(--colors-fantasy-void-start)"
  },
  "colors.fantasy.void.mid": {
    "value": "#0f0820",
    "variable": "var(--colors-fantasy-void-mid)"
  },
  "colors.fantasy.void.end": {
    "value": "#1a0f2e",
    "variable": "var(--colors-fantasy-void-end)"
  },
  "colors.fantasy.aether.start": {
    "value": "#fdfdfb",
    "variable": "var(--colors-fantasy-aether-start)"
  },
  "colors.fantasy.aether.mid": {
    "value": "#f5faf6",
    "variable": "var(--colors-fantasy-aether-mid)"
  },
  "colors.fantasy.aether.end": {
    "value": "#e8f5eb",
    "variable": "var(--colors-fantasy-aether-end)"
  },
  "colors.fantasy.arcana.primary": {
    "value": "#a78bfa",
    "variable": "var(--colors-fantasy-arcana-primary)"
  },
  "colors.fantasy.arcana.secondary": {
    "value": "#60a5fa",
    "variable": "var(--colors-fantasy-arcana-secondary)"
  },
  "colors.fantasy.arcana.tertiary": {
    "value": "#34d399",
    "variable": "var(--colors-fantasy-arcana-tertiary)"
  },
  "colors.fantasy.arcana.glow": {
    "value": "rgba(167, 139, 250, 0.3)",
    "variable": "var(--colors-fantasy-arcana-glow)"
  },
  "colors.fantasy.gold.base": {
    "value": "#d7913a",
    "variable": "var(--colors-fantasy-gold-base)"
  },
  "colors.fantasy.gold.dark": {
    "value": "#5f4c0c",
    "variable": "var(--colors-fantasy-gold-dark)"
  },
  "colors.fantasy.gold.shimmer": {
    "value": "#ffd700",
    "variable": "var(--colors-fantasy-gold-shimmer)"
  },
  "spacing.0": {
    "value": "0",
    "variable": "var(--spacing-0)"
  },
  "spacing.1": {
    "value": "0.25rem",
    "variable": "var(--spacing-1)"
  },
  "spacing.2": {
    "value": "0.5rem",
    "variable": "var(--spacing-2)"
  },
  "spacing.3": {
    "value": "0.75rem",
    "variable": "var(--spacing-3)"
  },
  "spacing.4": {
    "value": "1rem",
    "variable": "var(--spacing-4)"
  },
  "spacing.5": {
    "value": "1.25rem",
    "variable": "var(--spacing-5)"
  },
  "spacing.6": {
    "value": "1.5rem",
    "variable": "var(--spacing-6)"
  },
  "spacing.7": {
    "value": "1.75rem",
    "variable": "var(--spacing-7)"
  },
  "spacing.8": {
    "value": "2rem",
    "variable": "var(--spacing-8)"
  },
  "spacing.9": {
    "value": "2.25rem",
    "variable": "var(--spacing-9)"
  },
  "spacing.10": {
    "value": "2.5rem",
    "variable": "var(--spacing-10)"
  },
  "spacing.11": {
    "value": "2.75rem",
    "variable": "var(--spacing-11)"
  },
  "spacing.12": {
    "value": "3rem",
    "variable": "var(--spacing-12)"
  },
  "spacing.14": {
    "value": "3.5rem",
    "variable": "var(--spacing-14)"
  },
  "spacing.16": {
    "value": "4rem",
    "variable": "var(--spacing-16)"
  },
  "spacing.20": {
    "value": "5rem",
    "variable": "var(--spacing-20)"
  },
  "spacing.24": {
    "value": "6rem",
    "variable": "var(--spacing-24)"
  },
  "spacing.28": {
    "value": "7rem",
    "variable": "var(--spacing-28)"
  },
  "spacing.32": {
    "value": "8rem",
    "variable": "var(--spacing-32)"
  },
  "spacing.36": {
    "value": "9rem",
    "variable": "var(--spacing-36)"
  },
  "spacing.40": {
    "value": "10rem",
    "variable": "var(--spacing-40)"
  },
  "spacing.44": {
    "value": "11rem",
    "variable": "var(--spacing-44)"
  },
  "spacing.48": {
    "value": "12rem",
    "variable": "var(--spacing-48)"
  },
  "spacing.52": {
    "value": "13rem",
    "variable": "var(--spacing-52)"
  },
  "spacing.56": {
    "value": "14rem",
    "variable": "var(--spacing-56)"
  },
  "spacing.60": {
    "value": "15rem",
    "variable": "var(--spacing-60)"
  },
  "spacing.64": {
    "value": "16rem",
    "variable": "var(--spacing-64)"
  },
  "spacing.72": {
    "value": "18rem",
    "variable": "var(--spacing-72)"
  },
  "spacing.80": {
    "value": "20rem",
    "variable": "var(--spacing-80)"
  },
  "spacing.96": {
    "value": "24rem",
    "variable": "var(--spacing-96)"
  },
  "spacing.0.5": {
    "value": "0.125rem",
    "variable": "var(--spacing-0\\.5)"
  },
  "spacing.1.5": {
    "value": "0.375rem",
    "variable": "var(--spacing-1\\.5)"
  },
  "spacing.2.5": {
    "value": "0.625rem",
    "variable": "var(--spacing-2\\.5)"
  },
  "spacing.3.5": {
    "value": "0.875rem",
    "variable": "var(--spacing-3\\.5)"
  },
  "spacing.4.5": {
    "value": "1.125rem",
    "variable": "var(--spacing-4\\.5)"
  },
  "spacing.5.5": {
    "value": "1.375rem",
    "variable": "var(--spacing-5\\.5)"
  },
  "borderWidths.brutal": {
    "value": "4px",
    "variable": "var(--border-widths-brutal)"
  },
  "borderWidths.brutal.lg": {
    "value": "8px",
    "variable": "var(--border-widths-brutal-lg)"
  },
  "borderWidths.brutal.inset": {
    "value": "2px",
    "variable": "var(--border-widths-brutal-inset)"
  },
  "shadows.2xs": {
    "value": "0 1px rgb(0 0 0 / 0.05)",
    "variable": "var(--shadows-2xs)"
  },
  "shadows.xs": {
    "value": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "variable": "var(--shadows-xs)"
  },
  "shadows.sm": {
    "value": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "variable": "var(--shadows-sm)"
  },
  "shadows.md": {
    "value": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "variable": "var(--shadows-md)"
  },
  "shadows.lg": {
    "value": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "variable": "var(--shadows-lg)"
  },
  "shadows.xl": {
    "value": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "variable": "var(--shadows-xl)"
  },
  "shadows.2xl": {
    "value": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "variable": "var(--shadows-2xl)"
  },
  "shadows.inset-2xs": {
    "value": "inset 0 1px rgb(0 0 0 / 0.05)",
    "variable": "var(--shadows-inset-2xs)"
  },
  "shadows.inset-xs": {
    "value": "inset 0 1px 1px rgb(0 0 0 / 0.05)",
    "variable": "var(--shadows-inset-xs)"
  },
  "shadows.inset-sm": {
    "value": "inset 0 2px 4px rgb(0 0 0 / 0.05)",
    "variable": "var(--shadows-inset-sm)"
  },
  "shadows.brutal._light": {
    "value": "var(--border-widths-brutal) var(--border-widths-brutal) 0px 0px var(--colors-neo-fg)",
    "variable": "var(--shadows-brutal-_light)"
  },
  "shadows.brutal._dark": {
    "value": "var(--border-widths-brutal) var(--border-widths-brutal) 0px 0px var(--colors-neo-bg)",
    "variable": "var(--shadows-brutal-_dark)"
  },
  "shadows.brutalLg._light": {
    "value": "var(--border-widths-brutal-lg) var(--border-widths-brutal-lg) 0px 0px var(--colors-neo-fg)",
    "variable": "var(--shadows-brutal-lg-_light)"
  },
  "shadows.brutalLg._dark": {
    "value": "var(--border-widths-brutal-lg) var(--border-widths-brutal-lg) 0px 0px var(--colors-neo-bg)",
    "variable": "var(--shadows-brutal-lg-_dark)"
  },
  "shadows.brutalInset._light": {
    "value": "inset  var(--border-widths-brutal-inset) var(--border-widths-brutal-inset) 0px 0px var(--colors-neo-fg)",
    "variable": "var(--shadows-brutal-inset-_light)"
  },
  "shadows.brutalInset._dark": {
    "value": "inset  var(--border-widths-brutal-inset) var(--border-widths-brutal-inset) 0px 0px var(--colors-neo-bg)",
    "variable": "var(--shadows-brutal-inset-_dark)"
  },
  "fonts.sans": {
    "value": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"",
    "variable": "var(--fonts-sans)"
  },
  "fonts.serif": {
    "value": "ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif",
    "variable": "var(--fonts-serif)"
  },
  "fonts.brutalist": {
    "value": "Space Grotesk, system-ui, sans-serif",
    "variable": "var(--fonts-brutalist)"
  },
  "fonts.mono": {
    "value": "Fira Code, Consolas, Monaco, monospace",
    "variable": "var(--fonts-mono)"
  },
  "fontWeights.thin": {
    "value": "100",
    "variable": "var(--font-weights-thin)"
  },
  "fontWeights.extralight": {
    "value": "200",
    "variable": "var(--font-weights-extralight)"
  },
  "fontWeights.light": {
    "value": "300",
    "variable": "var(--font-weights-light)"
  },
  "fontWeights.extrabold": {
    "value": "800",
    "variable": "var(--font-weights-extrabold)"
  },
  "fontWeights.black": {
    "value": "900",
    "variable": "var(--font-weights-black)"
  },
  "fontWeights.normal": {
    "value": "400",
    "variable": "var(--font-weights-normal)"
  },
  "fontWeights.medium": {
    "value": "500",
    "variable": "var(--font-weights-medium)"
  },
  "fontWeights.semibold": {
    "value": "600",
    "variable": "var(--font-weights-semibold)"
  },
  "fontWeights.bold": {
    "value": "700",
    "variable": "var(--font-weights-bold)"
  },
  "fontWeights.brutal": {
    "value": "900",
    "variable": "var(--font-weights-brutal)"
  },
  "blurs.xs": {
    "value": "4px",
    "variable": "var(--blurs-xs)"
  },
  "blurs.sm": {
    "value": "8px",
    "variable": "var(--blurs-sm)"
  },
  "blurs.md": {
    "value": "12px",
    "variable": "var(--blurs-md)"
  },
  "blurs.lg": {
    "value": "16px",
    "variable": "var(--blurs-lg)"
  },
  "blurs.xl": {
    "value": "24px",
    "variable": "var(--blurs-xl)"
  },
  "blurs.2xl": {
    "value": "40px",
    "variable": "var(--blurs-2xl)"
  },
  "blurs.3xl": {
    "value": "64px",
    "variable": "var(--blurs-3xl)"
  },
  "blurs.glass": {
    "value": "12px",
    "variable": "var(--blurs-glass)"
  },
  "durations.fastest": {
    "value": "50ms",
    "variable": "var(--durations-fastest)"
  },
  "durations.faster": {
    "value": "100ms",
    "variable": "var(--durations-faster)"
  },
  "durations.slower": {
    "value": "400ms",
    "variable": "var(--durations-slower)"
  },
  "durations.slowest": {
    "value": "500ms",
    "variable": "var(--durations-slowest)"
  },
  "durations.fast": {
    "value": "100ms",
    "variable": "var(--durations-fast)"
  },
  "durations.normal": {
    "value": "200ms",
    "variable": "var(--durations-normal)"
  },
  "durations.slow": {
    "value": "300ms",
    "variable": "var(--durations-slow)"
  },
  "easings.linear": {
    "value": "linear",
    "variable": "var(--easings-linear)"
  },
  "easings.in": {
    "value": "cubic-bezier(0.4, 0, 1, 1)",
    "variable": "var(--easings-in)"
  },
  "easings.out": {
    "value": "cubic-bezier(0, 0, 0.2, 1)",
    "variable": "var(--easings-out)"
  },
  "easings.in-out": {
    "value": "cubic-bezier(0.4, 0, 0.2, 1)",
    "variable": "var(--easings-in-out)"
  },
  "easings.default": {
    "value": "ease-out",
    "variable": "var(--easings-default)"
  },
  "easings.smooth": {
    "value": "cubic-bezier(0.4, 0, 0.2, 1)",
    "variable": "var(--easings-smooth)"
  },
  "breakpoints.sm": {
    "value": "640px",
    "variable": "var(--breakpoints-sm)"
  },
  "breakpoints.md": {
    "value": "768px",
    "variable": "var(--breakpoints-md)"
  },
  "breakpoints.lg": {
    "value": "1024px",
    "variable": "var(--breakpoints-lg)"
  },
  "breakpoints.xl": {
    "value": "1280px",
    "variable": "var(--breakpoints-xl)"
  },
  "breakpoints.2xl": {
    "value": "1536px",
    "variable": "var(--breakpoints-2xl)"
  },
  "breakpoints.tablet": {
    "value": "768px",
    "variable": "var(--breakpoints-tablet)"
  },
  "breakpoints.desktop": {
    "value": "1280px",
    "variable": "var(--breakpoints-desktop)"
  },
  "colors.world.glow": {
    "value": "var(--colors-fantasy-arcana-glow)",
    "variable": "var(--colors-world-glow)"
  },
  "colors.overlay.backdrop": {
    "value": "rgba(0, 0, 0, 0.5)",
    "variable": "var(--colors-overlay-backdrop)"
  },
  "colors.overlay.light": {
    "value": "rgba(0, 0, 0, 0.3)",
    "variable": "var(--colors-overlay-light)"
  },
  "colors.overlay.heavy": {
    "value": "rgba(0, 0, 0, 0.7)",
    "variable": "var(--colors-overlay-heavy)"
  },
  "colors.panel.primary": {
    "value": "var(--colors-neo-primary)",
    "variable": "var(--colors-panel-primary)"
  },
  "colors.panel.secondary": {
    "value": "var(--colors-neo-secondary)",
    "variable": "var(--colors-panel-secondary)"
  },
  "colors.panel.accent": {
    "value": "var(--colors-neo-accent)",
    "variable": "var(--colors-panel-accent)"
  },
  "colors.panel.warning": {
    "value": "var(--colors-neo-warning)",
    "variable": "var(--colors-panel-warning)"
  },
  "colors.text.default": {
    "value": "var(--colors-panel-fg)",
    "variable": "var(--colors-text-default)"
  },
  "colors.text.panel.default": {
    "value": "var(--colors-text-default)",
    "variable": "var(--colors-text-panel-default)"
  },
  "colors.text.panel.secondary": {
    "value": "var(--colors-text-secondary)",
    "variable": "var(--colors-text-panel-secondary)"
  },
  "colors.text.panel.heading": {
    "value": "var(--colors-panel-fg)",
    "variable": "var(--colors-text-panel-heading)"
  },
  "colors.text.form.label": {
    "value": "var(--colors-text-default)",
    "variable": "var(--colors-text-form-label)"
  },
  "colors.text.form.input": {
    "value": "var(--colors-text-default)",
    "variable": "var(--colors-text-form-input)"
  },
  "colors.text.form.inputDisabled": {
    "value": "var(--colors-text-disabled)",
    "variable": "var(--colors-text-form-input-disabled)"
  },
  "colors.text.form.inputPlaceholder": {
    "value": "var(--colors-text-muted)",
    "variable": "var(--colors-text-form-input-placeholder)"
  },
  "colors.text.form.helper": {
    "value": "var(--colors-text-secondary)",
    "variable": "var(--colors-text-form-helper)"
  },
  "colors.text.form.error": {
    "value": "var(--colors-panel-warning)",
    "variable": "var(--colors-text-form-error)"
  },
  "colors.text.button.default": {
    "value": "var(--colors-panel-bg)",
    "variable": "var(--colors-text-button-default)"
  },
  "colors.text.button.disabled": {
    "value": "var(--colors-text-disabled)",
    "variable": "var(--colors-text-button-disabled)"
  },
  "colors.text.tab.default": {
    "value": "var(--colors-text-default)",
    "variable": "var(--colors-text-tab-default)"
  },
  "colors.text.tab.active": {
    "value": "var(--colors-panel-primary)",
    "variable": "var(--colors-text-tab-active)"
  },
  "colors.icon.default": {
    "value": "var(--colors-panel-fg)",
    "variable": "var(--colors-icon-default)"
  },
  "colors.icon.secondary": {
    "value": "var(--colors-text-secondary)",
    "variable": "var(--colors-icon-secondary)"
  },
  "colors.icon.muted": {
    "value": "var(--colors-text-muted)",
    "variable": "var(--colors-icon-muted)"
  },
  "colors.icon.primary": {
    "value": "var(--colors-panel-primary)",
    "variable": "var(--colors-icon-primary)"
  },
  "colors.icon.disabled": {
    "value": "var(--colors-text-disabled)",
    "variable": "var(--colors-icon-disabled)"
  },
  "colors.border.default": {
    "value": "var(--colors-panel-border)",
    "variable": "var(--colors-border-default)"
  },
  "colors.border.panel.default": {
    "value": "var(--colors-border-default)",
    "variable": "var(--colors-border-panel-default)"
  },
  "colors.border.panel.section": {
    "value": "var(--colors-border-subtle)",
    "variable": "var(--colors-border-panel-section)"
  },
  "colors.border.form.default": {
    "value": "var(--colors-border-default)",
    "variable": "var(--colors-border-form-default)"
  },
  "colors.border.form.focus": {
    "value": "var(--colors-panel-accent)",
    "variable": "var(--colors-border-form-focus)"
  },
  "colors.border.form.error": {
    "value": "var(--colors-panel-warning)",
    "variable": "var(--colors-border-form-error)"
  },
  "colors.border.component.colorPicker": {
    "value": "var(--colors-border-panel-section)",
    "variable": "var(--colors-border-component-color-picker)"
  },
  "colors.border.component.tab": {
    "value": "var(--colors-border-panel-default)",
    "variable": "var(--colors-border-component-tab)"
  },
  "colors.bg.default": {
    "value": "var(--colors-panel-bg)",
    "variable": "var(--colors-bg-default)"
  },
  "colors.bg.panel.default": {
    "value": "var(--colors-bg-default)",
    "variable": "var(--colors-bg-panel-default)"
  },
  "colors.bg.form.input": {
    "value": "white",
    "variable": "var(--colors-bg-form-input)"
  },
  "colors.bg.form.inputDisabled": {
    "value": "var(--colors-bg-subtle)",
    "variable": "var(--colors-bg-form-input-disabled)"
  },
  "colors.bg.form.inputFocus": {
    "value": "white",
    "variable": "var(--colors-bg-form-input-focus)"
  },
  "colors.bg.button.primary": {
    "value": "var(--colors-panel-primary)",
    "variable": "var(--colors-bg-button-primary)"
  },
  "colors.bg.button.secondary": {
    "value": "var(--colors-panel-secondary)",
    "variable": "var(--colors-bg-button-secondary)"
  },
  "colors.bg.button.danger": {
    "value": "var(--colors-panel-warning)",
    "variable": "var(--colors-bg-button-danger)"
  },
  "colors.bg.button.ghost": {
    "value": "transparent",
    "variable": "var(--colors-bg-button-ghost)"
  },
  "colors.bg.button.ghostHover": {
    "value": "var(--colors-bg-panel-hover)",
    "variable": "var(--colors-bg-button-ghost-hover)"
  },
  "colors.bg.tab.default": {
    "value": "transparent",
    "variable": "var(--colors-bg-tab-default)"
  },
  "colors.bg.tab.hover": {
    "value": "var(--colors-bg-panel-hover)",
    "variable": "var(--colors-bg-tab-hover)"
  },
  "colors.bg.tab.active": {
    "value": "var(--colors-panel-bg)",
    "variable": "var(--colors-bg-tab-active)"
  },
  "colors.bg.colorPicker.picker": {
    "value": "var(--colors-panel-bg)",
    "variable": "var(--colors-bg-color-picker-picker)"
  },
  "colors.bg.colorPicker.section": {
    "value": "var(--colors-bg-default)",
    "variable": "var(--colors-bg-color-picker-section)"
  },
  "colors.component.tab.bg": {
    "value": "var(--colors-bg-tab-default)",
    "variable": "var(--colors-component-tab-bg)"
  },
  "colors.component.tab.bgActive": {
    "value": "var(--colors-bg-tab-active)",
    "variable": "var(--colors-component-tab-bg-active)"
  },
  "colors.component.tab.bgHover": {
    "value": "var(--colors-bg-tab-hover)",
    "variable": "var(--colors-component-tab-bg-hover)"
  },
  "colors.component.tab.text": {
    "value": "var(--colors-text-tab-default)",
    "variable": "var(--colors-component-tab-text)"
  },
  "colors.component.tab.textActive": {
    "value": "var(--colors-text-tab-active)",
    "variable": "var(--colors-component-tab-text-active)"
  },
  "colors.component.tab.border": {
    "value": "var(--colors-border-component-tab)",
    "variable": "var(--colors-component-tab-border)"
  },
  "colors.component.colorPicker.pickerBg": {
    "value": "var(--colors-bg-color-picker-picker)",
    "variable": "var(--colors-component-color-picker-picker-bg)"
  },
  "colors.component.colorPicker.pickerBorder": {
    "value": "var(--colors-border-component-color-picker)",
    "variable": "var(--colors-component-color-picker-picker-border)"
  },
  "colors.component.colorPicker.sectionBorder": {
    "value": "var(--colors-border-component-color-picker)",
    "variable": "var(--colors-component-color-picker-section-border)"
  },
  "colors.component.colorPicker.labelText": {
    "value": "var(--colors-text-form-label)",
    "variable": "var(--colors-component-color-picker-label-text)"
  },
  "colors.form.input.bg": {
    "value": "var(--colors-bg-form-input)",
    "variable": "var(--colors-form-input-bg)"
  },
  "colors.form.input.bgDisabled": {
    "value": "var(--colors-bg-form-input-disabled)",
    "variable": "var(--colors-form-input-bg-disabled)"
  },
  "colors.form.input.bgFocus": {
    "value": "var(--colors-bg-form-input-focus)",
    "variable": "var(--colors-form-input-bg-focus)"
  },
  "colors.form.input.border": {
    "value": "var(--colors-border-form-default)",
    "variable": "var(--colors-form-input-border)"
  },
  "colors.form.input.borderFocus": {
    "value": "var(--colors-border-form-focus)",
    "variable": "var(--colors-form-input-border-focus)"
  },
  "colors.form.input.borderError": {
    "value": "var(--colors-border-form-error)",
    "variable": "var(--colors-form-input-border-error)"
  },
  "colors.form.input.text": {
    "value": "var(--colors-text-form-input)",
    "variable": "var(--colors-form-input-text)"
  },
  "colors.form.input.textDisabled": {
    "value": "var(--colors-text-form-input-disabled)",
    "variable": "var(--colors-form-input-text-disabled)"
  },
  "colors.form.input.textPlaceholder": {
    "value": "var(--colors-text-form-input-placeholder)",
    "variable": "var(--colors-form-input-text-placeholder)"
  },
  "colors.form.label.text": {
    "value": "var(--colors-text-form-label)",
    "variable": "var(--colors-form-label-text)"
  },
  "colors.form.label.textDisabled": {
    "value": "var(--colors-text-disabled)",
    "variable": "var(--colors-form-label-text-disabled)"
  },
  "colors.form.helper.text": {
    "value": "var(--colors-text-form-helper)",
    "variable": "var(--colors-form-helper-text)"
  },
  "colors.form.error.text": {
    "value": "var(--colors-text-form-error)",
    "variable": "var(--colors-form-error-text)"
  },
  "transitions.fast": {
    "value": "all var(--durations-fast) var(--easings-default)",
    "variable": "var(--transitions-fast)"
  },
  "transitions.normal": {
    "value": "all var(--durations-normal) var(--easings-default)",
    "variable": "var(--transitions-normal)"
  },
  "transitions.slow": {
    "value": "all var(--durations-slow) var(--easings-smooth)",
    "variable": "var(--transitions-slow)"
  },
  "transforms.liftSm": {
    "value": "translate(2px, 2px)",
    "variable": "var(--transforms-lift-sm)"
  },
  "transforms.liftMd": {
    "value": "translate(4px, 4px)",
    "variable": "var(--transforms-lift-md)"
  },
  "transforms.scaleHover": {
    "value": "scale(1.05)",
    "variable": "var(--transforms-scale-hover)"
  },
  "spacing.-0": {
    "value": "calc(var(--spacing-0) * -1)",
    "variable": "var(--spacing-0)"
  },
  "spacing.-1": {
    "value": "calc(var(--spacing-1) * -1)",
    "variable": "var(--spacing-1)"
  },
  "spacing.-2": {
    "value": "calc(var(--spacing-2) * -1)",
    "variable": "var(--spacing-2)"
  },
  "spacing.-3": {
    "value": "calc(var(--spacing-3) * -1)",
    "variable": "var(--spacing-3)"
  },
  "spacing.-4": {
    "value": "calc(var(--spacing-4) * -1)",
    "variable": "var(--spacing-4)"
  },
  "spacing.-5": {
    "value": "calc(var(--spacing-5) * -1)",
    "variable": "var(--spacing-5)"
  },
  "spacing.-6": {
    "value": "calc(var(--spacing-6) * -1)",
    "variable": "var(--spacing-6)"
  },
  "spacing.-7": {
    "value": "calc(var(--spacing-7) * -1)",
    "variable": "var(--spacing-7)"
  },
  "spacing.-8": {
    "value": "calc(var(--spacing-8) * -1)",
    "variable": "var(--spacing-8)"
  },
  "spacing.-9": {
    "value": "calc(var(--spacing-9) * -1)",
    "variable": "var(--spacing-9)"
  },
  "spacing.-10": {
    "value": "calc(var(--spacing-10) * -1)",
    "variable": "var(--spacing-10)"
  },
  "spacing.-11": {
    "value": "calc(var(--spacing-11) * -1)",
    "variable": "var(--spacing-11)"
  },
  "spacing.-12": {
    "value": "calc(var(--spacing-12) * -1)",
    "variable": "var(--spacing-12)"
  },
  "spacing.-14": {
    "value": "calc(var(--spacing-14) * -1)",
    "variable": "var(--spacing-14)"
  },
  "spacing.-16": {
    "value": "calc(var(--spacing-16) * -1)",
    "variable": "var(--spacing-16)"
  },
  "spacing.-20": {
    "value": "calc(var(--spacing-20) * -1)",
    "variable": "var(--spacing-20)"
  },
  "spacing.-24": {
    "value": "calc(var(--spacing-24) * -1)",
    "variable": "var(--spacing-24)"
  },
  "spacing.-28": {
    "value": "calc(var(--spacing-28) * -1)",
    "variable": "var(--spacing-28)"
  },
  "spacing.-32": {
    "value": "calc(var(--spacing-32) * -1)",
    "variable": "var(--spacing-32)"
  },
  "spacing.-36": {
    "value": "calc(var(--spacing-36) * -1)",
    "variable": "var(--spacing-36)"
  },
  "spacing.-40": {
    "value": "calc(var(--spacing-40) * -1)",
    "variable": "var(--spacing-40)"
  },
  "spacing.-44": {
    "value": "calc(var(--spacing-44) * -1)",
    "variable": "var(--spacing-44)"
  },
  "spacing.-48": {
    "value": "calc(var(--spacing-48) * -1)",
    "variable": "var(--spacing-48)"
  },
  "spacing.-52": {
    "value": "calc(var(--spacing-52) * -1)",
    "variable": "var(--spacing-52)"
  },
  "spacing.-56": {
    "value": "calc(var(--spacing-56) * -1)",
    "variable": "var(--spacing-56)"
  },
  "spacing.-60": {
    "value": "calc(var(--spacing-60) * -1)",
    "variable": "var(--spacing-60)"
  },
  "spacing.-64": {
    "value": "calc(var(--spacing-64) * -1)",
    "variable": "var(--spacing-64)"
  },
  "spacing.-72": {
    "value": "calc(var(--spacing-72) * -1)",
    "variable": "var(--spacing-72)"
  },
  "spacing.-80": {
    "value": "calc(var(--spacing-80) * -1)",
    "variable": "var(--spacing-80)"
  },
  "spacing.-96": {
    "value": "calc(var(--spacing-96) * -1)",
    "variable": "var(--spacing-96)"
  },
  "spacing.-0.5": {
    "value": "calc(var(--spacing-0\\.5) * -1)",
    "variable": "var(--spacing-0\\.5)"
  },
  "spacing.-1.5": {
    "value": "calc(var(--spacing-1\\.5) * -1)",
    "variable": "var(--spacing-1\\.5)"
  },
  "spacing.-2.5": {
    "value": "calc(var(--spacing-2\\.5) * -1)",
    "variable": "var(--spacing-2\\.5)"
  },
  "spacing.-3.5": {
    "value": "calc(var(--spacing-3\\.5) * -1)",
    "variable": "var(--spacing-3\\.5)"
  },
  "spacing.-4.5": {
    "value": "calc(var(--spacing-4\\.5) * -1)",
    "variable": "var(--spacing-4\\.5)"
  },
  "spacing.-5.5": {
    "value": "calc(var(--spacing-5\\.5) * -1)",
    "variable": "var(--spacing-5\\.5)"
  },
  "colors.world.bg": {
    "value": "var(--colors-world-bg)",
    "variable": "var(--colors-world-bg)"
  },
  "colors.panel.bg": {
    "value": "var(--colors-panel-bg)",
    "variable": "var(--colors-panel-bg)"
  },
  "colors.panel.fg": {
    "value": "var(--colors-panel-fg)",
    "variable": "var(--colors-panel-fg)"
  },
  "colors.panel.border": {
    "value": "var(--colors-panel-border)",
    "variable": "var(--colors-panel-border)"
  },
  "colors.text.secondary": {
    "value": "var(--colors-text-secondary)",
    "variable": "var(--colors-text-secondary)"
  },
  "colors.text.muted": {
    "value": "var(--colors-text-muted)",
    "variable": "var(--colors-text-muted)"
  },
  "colors.text.disabled": {
    "value": "var(--colors-text-disabled)",
    "variable": "var(--colors-text-disabled)"
  },
  "colors.border.subtle": {
    "value": "var(--colors-border-subtle)",
    "variable": "var(--colors-border-subtle)"
  },
  "colors.bg.subtle": {
    "value": "var(--colors-bg-subtle)",
    "variable": "var(--colors-bg-subtle)"
  },
  "colors.bg.panel.hover": {
    "value": "var(--colors-bg-panel-hover)",
    "variable": "var(--colors-bg-panel-hover)"
  },
  "colors.bg.panel.active": {
    "value": "var(--colors-bg-panel-active)",
    "variable": "var(--colors-bg-panel-active)"
  },
  "colors.colorPalette": {
    "value": "var(--colors-color-palette)",
    "variable": "var(--colors-color-palette)"
  },
  "colors.colorPalette.50": {
    "value": "var(--colors-color-palette-50)",
    "variable": "var(--colors-color-palette-50)"
  },
  "colors.colorPalette.100": {
    "value": "var(--colors-color-palette-100)",
    "variable": "var(--colors-color-palette-100)"
  },
  "colors.colorPalette.200": {
    "value": "var(--colors-color-palette-200)",
    "variable": "var(--colors-color-palette-200)"
  },
  "colors.colorPalette.300": {
    "value": "var(--colors-color-palette-300)",
    "variable": "var(--colors-color-palette-300)"
  },
  "colors.colorPalette.400": {
    "value": "var(--colors-color-palette-400)",
    "variable": "var(--colors-color-palette-400)"
  },
  "colors.colorPalette.500": {
    "value": "var(--colors-color-palette-500)",
    "variable": "var(--colors-color-palette-500)"
  },
  "colors.colorPalette.600": {
    "value": "var(--colors-color-palette-600)",
    "variable": "var(--colors-color-palette-600)"
  },
  "colors.colorPalette.700": {
    "value": "var(--colors-color-palette-700)",
    "variable": "var(--colors-color-palette-700)"
  },
  "colors.colorPalette.800": {
    "value": "var(--colors-color-palette-800)",
    "variable": "var(--colors-color-palette-800)"
  },
  "colors.colorPalette.900": {
    "value": "var(--colors-color-palette-900)",
    "variable": "var(--colors-color-palette-900)"
  },
  "colors.colorPalette.950": {
    "value": "var(--colors-color-palette-950)",
    "variable": "var(--colors-color-palette-950)"
  },
  "colors.colorPalette.fg": {
    "value": "var(--colors-color-palette-fg)",
    "variable": "var(--colors-color-palette-fg)"
  },
  "colors.colorPalette.bg": {
    "value": "var(--colors-color-palette-bg)",
    "variable": "var(--colors-color-palette-bg)"
  },
  "colors.colorPalette.primary": {
    "value": "var(--colors-color-palette-primary)",
    "variable": "var(--colors-color-palette-primary)"
  },
  "colors.colorPalette.secondary": {
    "value": "var(--colors-color-palette-secondary)",
    "variable": "var(--colors-color-palette-secondary)"
  },
  "colors.colorPalette.accent": {
    "value": "var(--colors-color-palette-accent)",
    "variable": "var(--colors-color-palette-accent)"
  },
  "colors.colorPalette.warning": {
    "value": "var(--colors-color-palette-warning)",
    "variable": "var(--colors-color-palette-warning)"
  },
  "colors.colorPalette.void.start": {
    "value": "var(--colors-color-palette-void-start)",
    "variable": "var(--colors-color-palette-void-start)"
  },
  "colors.colorPalette.start": {
    "value": "var(--colors-color-palette-start)",
    "variable": "var(--colors-color-palette-start)"
  },
  "colors.colorPalette.void.mid": {
    "value": "var(--colors-color-palette-void-mid)",
    "variable": "var(--colors-color-palette-void-mid)"
  },
  "colors.colorPalette.mid": {
    "value": "var(--colors-color-palette-mid)",
    "variable": "var(--colors-color-palette-mid)"
  },
  "colors.colorPalette.void.end": {
    "value": "var(--colors-color-palette-void-end)",
    "variable": "var(--colors-color-palette-void-end)"
  },
  "colors.colorPalette.end": {
    "value": "var(--colors-color-palette-end)",
    "variable": "var(--colors-color-palette-end)"
  },
  "colors.colorPalette.aether.start": {
    "value": "var(--colors-color-palette-aether-start)",
    "variable": "var(--colors-color-palette-aether-start)"
  },
  "colors.colorPalette.aether.mid": {
    "value": "var(--colors-color-palette-aether-mid)",
    "variable": "var(--colors-color-palette-aether-mid)"
  },
  "colors.colorPalette.aether.end": {
    "value": "var(--colors-color-palette-aether-end)",
    "variable": "var(--colors-color-palette-aether-end)"
  },
  "colors.colorPalette.arcana.primary": {
    "value": "var(--colors-color-palette-arcana-primary)",
    "variable": "var(--colors-color-palette-arcana-primary)"
  },
  "colors.colorPalette.arcana.secondary": {
    "value": "var(--colors-color-palette-arcana-secondary)",
    "variable": "var(--colors-color-palette-arcana-secondary)"
  },
  "colors.colorPalette.arcana.tertiary": {
    "value": "var(--colors-color-palette-arcana-tertiary)",
    "variable": "var(--colors-color-palette-arcana-tertiary)"
  },
  "colors.colorPalette.tertiary": {
    "value": "var(--colors-color-palette-tertiary)",
    "variable": "var(--colors-color-palette-tertiary)"
  },
  "colors.colorPalette.arcana.glow": {
    "value": "var(--colors-color-palette-arcana-glow)",
    "variable": "var(--colors-color-palette-arcana-glow)"
  },
  "colors.colorPalette.glow": {
    "value": "var(--colors-color-palette-glow)",
    "variable": "var(--colors-color-palette-glow)"
  },
  "colors.colorPalette.gold.base": {
    "value": "var(--colors-color-palette-gold-base)",
    "variable": "var(--colors-color-palette-gold-base)"
  },
  "colors.colorPalette.base": {
    "value": "var(--colors-color-palette-base)",
    "variable": "var(--colors-color-palette-base)"
  },
  "colors.colorPalette.gold.dark": {
    "value": "var(--colors-color-palette-gold-dark)",
    "variable": "var(--colors-color-palette-gold-dark)"
  },
  "colors.colorPalette.dark": {
    "value": "var(--colors-color-palette-dark)",
    "variable": "var(--colors-color-palette-dark)"
  },
  "colors.colorPalette.gold.shimmer": {
    "value": "var(--colors-color-palette-gold-shimmer)",
    "variable": "var(--colors-color-palette-gold-shimmer)"
  },
  "colors.colorPalette.shimmer": {
    "value": "var(--colors-color-palette-shimmer)",
    "variable": "var(--colors-color-palette-shimmer)"
  },
  "colors.colorPalette.backdrop": {
    "value": "var(--colors-color-palette-backdrop)",
    "variable": "var(--colors-color-palette-backdrop)"
  },
  "colors.colorPalette.light": {
    "value": "var(--colors-color-palette-light)",
    "variable": "var(--colors-color-palette-light)"
  },
  "colors.colorPalette.heavy": {
    "value": "var(--colors-color-palette-heavy)",
    "variable": "var(--colors-color-palette-heavy)"
  },
  "colors.colorPalette.border": {
    "value": "var(--colors-color-palette-border)",
    "variable": "var(--colors-color-palette-border)"
  },
  "colors.colorPalette.default": {
    "value": "var(--colors-color-palette-default)",
    "variable": "var(--colors-color-palette-default)"
  },
  "colors.colorPalette.muted": {
    "value": "var(--colors-color-palette-muted)",
    "variable": "var(--colors-color-palette-muted)"
  },
  "colors.colorPalette.disabled": {
    "value": "var(--colors-color-palette-disabled)",
    "variable": "var(--colors-color-palette-disabled)"
  },
  "colors.colorPalette.panel.default": {
    "value": "var(--colors-color-palette-panel-default)",
    "variable": "var(--colors-color-palette-panel-default)"
  },
  "colors.colorPalette.panel.secondary": {
    "value": "var(--colors-color-palette-panel-secondary)",
    "variable": "var(--colors-color-palette-panel-secondary)"
  },
  "colors.colorPalette.panel.heading": {
    "value": "var(--colors-color-palette-panel-heading)",
    "variable": "var(--colors-color-palette-panel-heading)"
  },
  "colors.colorPalette.heading": {
    "value": "var(--colors-color-palette-heading)",
    "variable": "var(--colors-color-palette-heading)"
  },
  "colors.colorPalette.form.label": {
    "value": "var(--colors-color-palette-form-label)",
    "variable": "var(--colors-color-palette-form-label)"
  },
  "colors.colorPalette.label": {
    "value": "var(--colors-color-palette-label)",
    "variable": "var(--colors-color-palette-label)"
  },
  "colors.colorPalette.form.input": {
    "value": "var(--colors-color-palette-form-input)",
    "variable": "var(--colors-color-palette-form-input)"
  },
  "colors.colorPalette.input": {
    "value": "var(--colors-color-palette-input)",
    "variable": "var(--colors-color-palette-input)"
  },
  "colors.colorPalette.form.inputDisabled": {
    "value": "var(--colors-color-palette-form-input-disabled)",
    "variable": "var(--colors-color-palette-form-input-disabled)"
  },
  "colors.colorPalette.inputDisabled": {
    "value": "var(--colors-color-palette-input-disabled)",
    "variable": "var(--colors-color-palette-input-disabled)"
  },
  "colors.colorPalette.form.inputPlaceholder": {
    "value": "var(--colors-color-palette-form-input-placeholder)",
    "variable": "var(--colors-color-palette-form-input-placeholder)"
  },
  "colors.colorPalette.inputPlaceholder": {
    "value": "var(--colors-color-palette-input-placeholder)",
    "variable": "var(--colors-color-palette-input-placeholder)"
  },
  "colors.colorPalette.form.helper": {
    "value": "var(--colors-color-palette-form-helper)",
    "variable": "var(--colors-color-palette-form-helper)"
  },
  "colors.colorPalette.helper": {
    "value": "var(--colors-color-palette-helper)",
    "variable": "var(--colors-color-palette-helper)"
  },
  "colors.colorPalette.form.error": {
    "value": "var(--colors-color-palette-form-error)",
    "variable": "var(--colors-color-palette-form-error)"
  },
  "colors.colorPalette.error": {
    "value": "var(--colors-color-palette-error)",
    "variable": "var(--colors-color-palette-error)"
  },
  "colors.colorPalette.button.default": {
    "value": "var(--colors-color-palette-button-default)",
    "variable": "var(--colors-color-palette-button-default)"
  },
  "colors.colorPalette.button.disabled": {
    "value": "var(--colors-color-palette-button-disabled)",
    "variable": "var(--colors-color-palette-button-disabled)"
  },
  "colors.colorPalette.tab.default": {
    "value": "var(--colors-color-palette-tab-default)",
    "variable": "var(--colors-color-palette-tab-default)"
  },
  "colors.colorPalette.tab.active": {
    "value": "var(--colors-color-palette-tab-active)",
    "variable": "var(--colors-color-palette-tab-active)"
  },
  "colors.colorPalette.active": {
    "value": "var(--colors-color-palette-active)",
    "variable": "var(--colors-color-palette-active)"
  },
  "colors.colorPalette.subtle": {
    "value": "var(--colors-color-palette-subtle)",
    "variable": "var(--colors-color-palette-subtle)"
  },
  "colors.colorPalette.panel.section": {
    "value": "var(--colors-color-palette-panel-section)",
    "variable": "var(--colors-color-palette-panel-section)"
  },
  "colors.colorPalette.section": {
    "value": "var(--colors-color-palette-section)",
    "variable": "var(--colors-color-palette-section)"
  },
  "colors.colorPalette.form.default": {
    "value": "var(--colors-color-palette-form-default)",
    "variable": "var(--colors-color-palette-form-default)"
  },
  "colors.colorPalette.form.focus": {
    "value": "var(--colors-color-palette-form-focus)",
    "variable": "var(--colors-color-palette-form-focus)"
  },
  "colors.colorPalette.focus": {
    "value": "var(--colors-color-palette-focus)",
    "variable": "var(--colors-color-palette-focus)"
  },
  "colors.colorPalette.component.colorPicker": {
    "value": "var(--colors-color-palette-component-color-picker)",
    "variable": "var(--colors-color-palette-component-color-picker)"
  },
  "colors.colorPalette.colorPicker": {
    "value": "var(--colors-color-palette-color-picker)",
    "variable": "var(--colors-color-palette-color-picker)"
  },
  "colors.colorPalette.component.tab": {
    "value": "var(--colors-color-palette-component-tab)",
    "variable": "var(--colors-color-palette-component-tab)"
  },
  "colors.colorPalette.tab": {
    "value": "var(--colors-color-palette-tab)",
    "variable": "var(--colors-color-palette-tab)"
  },
  "colors.colorPalette.panel.hover": {
    "value": "var(--colors-color-palette-panel-hover)",
    "variable": "var(--colors-color-palette-panel-hover)"
  },
  "colors.colorPalette.hover": {
    "value": "var(--colors-color-palette-hover)",
    "variable": "var(--colors-color-palette-hover)"
  },
  "colors.colorPalette.panel.active": {
    "value": "var(--colors-color-palette-panel-active)",
    "variable": "var(--colors-color-palette-panel-active)"
  },
  "colors.colorPalette.form.inputFocus": {
    "value": "var(--colors-color-palette-form-input-focus)",
    "variable": "var(--colors-color-palette-form-input-focus)"
  },
  "colors.colorPalette.inputFocus": {
    "value": "var(--colors-color-palette-input-focus)",
    "variable": "var(--colors-color-palette-input-focus)"
  },
  "colors.colorPalette.button.primary": {
    "value": "var(--colors-color-palette-button-primary)",
    "variable": "var(--colors-color-palette-button-primary)"
  },
  "colors.colorPalette.button.secondary": {
    "value": "var(--colors-color-palette-button-secondary)",
    "variable": "var(--colors-color-palette-button-secondary)"
  },
  "colors.colorPalette.button.danger": {
    "value": "var(--colors-color-palette-button-danger)",
    "variable": "var(--colors-color-palette-button-danger)"
  },
  "colors.colorPalette.danger": {
    "value": "var(--colors-color-palette-danger)",
    "variable": "var(--colors-color-palette-danger)"
  },
  "colors.colorPalette.button.ghost": {
    "value": "var(--colors-color-palette-button-ghost)",
    "variable": "var(--colors-color-palette-button-ghost)"
  },
  "colors.colorPalette.ghost": {
    "value": "var(--colors-color-palette-ghost)",
    "variable": "var(--colors-color-palette-ghost)"
  },
  "colors.colorPalette.button.ghostHover": {
    "value": "var(--colors-color-palette-button-ghost-hover)",
    "variable": "var(--colors-color-palette-button-ghost-hover)"
  },
  "colors.colorPalette.ghostHover": {
    "value": "var(--colors-color-palette-ghost-hover)",
    "variable": "var(--colors-color-palette-ghost-hover)"
  },
  "colors.colorPalette.tab.hover": {
    "value": "var(--colors-color-palette-tab-hover)",
    "variable": "var(--colors-color-palette-tab-hover)"
  },
  "colors.colorPalette.colorPicker.picker": {
    "value": "var(--colors-color-palette-color-picker-picker)",
    "variable": "var(--colors-color-palette-color-picker-picker)"
  },
  "colors.colorPalette.picker": {
    "value": "var(--colors-color-palette-picker)",
    "variable": "var(--colors-color-palette-picker)"
  },
  "colors.colorPalette.colorPicker.section": {
    "value": "var(--colors-color-palette-color-picker-section)",
    "variable": "var(--colors-color-palette-color-picker-section)"
  },
  "colors.colorPalette.tab.bg": {
    "value": "var(--colors-color-palette-tab-bg)",
    "variable": "var(--colors-color-palette-tab-bg)"
  },
  "colors.colorPalette.tab.bgActive": {
    "value": "var(--colors-color-palette-tab-bg-active)",
    "variable": "var(--colors-color-palette-tab-bg-active)"
  },
  "colors.colorPalette.bgActive": {
    "value": "var(--colors-color-palette-bg-active)",
    "variable": "var(--colors-color-palette-bg-active)"
  },
  "colors.colorPalette.tab.bgHover": {
    "value": "var(--colors-color-palette-tab-bg-hover)",
    "variable": "var(--colors-color-palette-tab-bg-hover)"
  },
  "colors.colorPalette.bgHover": {
    "value": "var(--colors-color-palette-bg-hover)",
    "variable": "var(--colors-color-palette-bg-hover)"
  },
  "colors.colorPalette.tab.text": {
    "value": "var(--colors-color-palette-tab-text)",
    "variable": "var(--colors-color-palette-tab-text)"
  },
  "colors.colorPalette.text": {
    "value": "var(--colors-color-palette-text)",
    "variable": "var(--colors-color-palette-text)"
  },
  "colors.colorPalette.tab.textActive": {
    "value": "var(--colors-color-palette-tab-text-active)",
    "variable": "var(--colors-color-palette-tab-text-active)"
  },
  "colors.colorPalette.textActive": {
    "value": "var(--colors-color-palette-text-active)",
    "variable": "var(--colors-color-palette-text-active)"
  },
  "colors.colorPalette.tab.border": {
    "value": "var(--colors-color-palette-tab-border)",
    "variable": "var(--colors-color-palette-tab-border)"
  },
  "colors.colorPalette.colorPicker.pickerBg": {
    "value": "var(--colors-color-palette-color-picker-picker-bg)",
    "variable": "var(--colors-color-palette-color-picker-picker-bg)"
  },
  "colors.colorPalette.pickerBg": {
    "value": "var(--colors-color-palette-picker-bg)",
    "variable": "var(--colors-color-palette-picker-bg)"
  },
  "colors.colorPalette.colorPicker.pickerBorder": {
    "value": "var(--colors-color-palette-color-picker-picker-border)",
    "variable": "var(--colors-color-palette-color-picker-picker-border)"
  },
  "colors.colorPalette.pickerBorder": {
    "value": "var(--colors-color-palette-picker-border)",
    "variable": "var(--colors-color-palette-picker-border)"
  },
  "colors.colorPalette.colorPicker.sectionBorder": {
    "value": "var(--colors-color-palette-color-picker-section-border)",
    "variable": "var(--colors-color-palette-color-picker-section-border)"
  },
  "colors.colorPalette.sectionBorder": {
    "value": "var(--colors-color-palette-section-border)",
    "variable": "var(--colors-color-palette-section-border)"
  },
  "colors.colorPalette.colorPicker.labelText": {
    "value": "var(--colors-color-palette-color-picker-label-text)",
    "variable": "var(--colors-color-palette-color-picker-label-text)"
  },
  "colors.colorPalette.labelText": {
    "value": "var(--colors-color-palette-label-text)",
    "variable": "var(--colors-color-palette-label-text)"
  },
  "colors.colorPalette.input.bg": {
    "value": "var(--colors-color-palette-input-bg)",
    "variable": "var(--colors-color-palette-input-bg)"
  },
  "colors.colorPalette.input.bgDisabled": {
    "value": "var(--colors-color-palette-input-bg-disabled)",
    "variable": "var(--colors-color-palette-input-bg-disabled)"
  },
  "colors.colorPalette.bgDisabled": {
    "value": "var(--colors-color-palette-bg-disabled)",
    "variable": "var(--colors-color-palette-bg-disabled)"
  },
  "colors.colorPalette.input.bgFocus": {
    "value": "var(--colors-color-palette-input-bg-focus)",
    "variable": "var(--colors-color-palette-input-bg-focus)"
  },
  "colors.colorPalette.bgFocus": {
    "value": "var(--colors-color-palette-bg-focus)",
    "variable": "var(--colors-color-palette-bg-focus)"
  },
  "colors.colorPalette.input.border": {
    "value": "var(--colors-color-palette-input-border)",
    "variable": "var(--colors-color-palette-input-border)"
  },
  "colors.colorPalette.input.borderFocus": {
    "value": "var(--colors-color-palette-input-border-focus)",
    "variable": "var(--colors-color-palette-input-border-focus)"
  },
  "colors.colorPalette.borderFocus": {
    "value": "var(--colors-color-palette-border-focus)",
    "variable": "var(--colors-color-palette-border-focus)"
  },
  "colors.colorPalette.input.borderError": {
    "value": "var(--colors-color-palette-input-border-error)",
    "variable": "var(--colors-color-palette-input-border-error)"
  },
  "colors.colorPalette.borderError": {
    "value": "var(--colors-color-palette-border-error)",
    "variable": "var(--colors-color-palette-border-error)"
  },
  "colors.colorPalette.input.text": {
    "value": "var(--colors-color-palette-input-text)",
    "variable": "var(--colors-color-palette-input-text)"
  },
  "colors.colorPalette.input.textDisabled": {
    "value": "var(--colors-color-palette-input-text-disabled)",
    "variable": "var(--colors-color-palette-input-text-disabled)"
  },
  "colors.colorPalette.textDisabled": {
    "value": "var(--colors-color-palette-text-disabled)",
    "variable": "var(--colors-color-palette-text-disabled)"
  },
  "colors.colorPalette.input.textPlaceholder": {
    "value": "var(--colors-color-palette-input-text-placeholder)",
    "variable": "var(--colors-color-palette-input-text-placeholder)"
  },
  "colors.colorPalette.textPlaceholder": {
    "value": "var(--colors-color-palette-text-placeholder)",
    "variable": "var(--colors-color-palette-text-placeholder)"
  },
  "colors.colorPalette.label.text": {
    "value": "var(--colors-color-palette-label-text)",
    "variable": "var(--colors-color-palette-label-text)"
  },
  "colors.colorPalette.label.textDisabled": {
    "value": "var(--colors-color-palette-label-text-disabled)",
    "variable": "var(--colors-color-palette-label-text-disabled)"
  },
  "colors.colorPalette.helper.text": {
    "value": "var(--colors-color-palette-helper-text)",
    "variable": "var(--colors-color-palette-helper-text)"
  },
  "colors.colorPalette.error.text": {
    "value": "var(--colors-color-palette-error-text)",
    "variable": "var(--colors-color-palette-error-text)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar