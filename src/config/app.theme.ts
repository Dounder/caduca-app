import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

/**
 * Custom theme preset extending the Aura theme with a custom primary color palette.
 * @remarks
 * This theme uses a nature-inspired green color scheme for primary colors.
 * - Base color: #94cc34 (primary.400)
 * - Range: from very light (#e5f5d2) to very dark (#17230f)
 *
 * @example
 * ```tsx
 * const app = createApp({
 *   theme: CustomAuraTheme
 * })
 * ```
 *
 * @see {@link https://primevue.org/theming/styled/ Prime Vue Theming}
 */
const CustomAuraTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e5f5d2', // Lightest shade
      100: '#d3eda1',
      200: '#bfde6c',
      300: '#a7d03b',
      400: '#94cc34', // Base color
      500: '#82b62d',
      600: '#6c9f27',
      700: '#567821',
      800: '#41511b',
      900: '#2b3b15', // Darkest shade
      950: '#17230f' // Extra dark
    }
  }
})

export default CustomAuraTheme
