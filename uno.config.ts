import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: {
        DEFAULT: 'hsl(var(--c-primary))',
        container: 'hsl(var(--c-primary-container))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--c-secondary))',
        container: 'hsl(var(--c-secondary-container))',
      },
      tertiary: {
        DEFAULT: 'hsl(var(--c-tertiary))',
        container: 'hsl(var(--c-tertiary-container))',
      },
      error: {
        DEFAULT: 'hsl(var(--c-error))',
        container: 'hsl(var(--c-error-container))',
      },
      on: {
        primary: {
          DEFAULT: 'hsl(var(--c-on-primary))',
          container: 'hsl(var(--c-on-primary-container))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--c-on-secondary))',
          container: 'hsl(var(--c-on-secondary-container))',
        },
        tertiary: {
          DEFAULT: 'hsl(var(--c-on-tertiary))',
          container: 'hsl(var(--c-on-tertiary-container))',
        },
        error: {
          DEFAULT: 'hsl(var(--c-on-error))',
          container: 'hsl(var(--c-on-error-container))',
        },
        surface: {
          DEFAULT: 'hsl(var(--c-on-surface))',
          variant: 'hsl(var(--c-on-surface-variant))',
        },
      },
      surface: {
        DEFAULT: 'hsl(var(--c-surface))',
        dim: 'hsl(var(--c-surface-dim))',
        bright: 'hsl(var(--c-surface-bright))',
        container: {
          DEFAULT: 'hsl(var(--c-surface-container))',
          low: 'hsl(var(--c-surface-container-low))',
          lowest: 'hsl(var(--c-surface-container-lowest))',
          high: 'hsl(var(--c-surface-container-high))',
          highest: 'hsl(var(--c-surface-container-highest))',
        },
      },
      outline: {
        DEFAULT: 'hsl(var(--c-outline))',
        variant: 'hsl(var(--c-outline-variant))',
      },
      inverse: {
        surface: 'hsl(var(--c-inverse-surface))',
        primary: 'hsl(var(--c-inverse-primary))',
        on: {
          surface: 'hsl(var(--c-inverse-on-surface))',
        },
      },
      scrim: 'hsl(var(--c-scrim))',
      shadow: 'hsl(var(--c-shadow))',
      logo: {
        i: 'hsl(var(--c-logo-i))',
        np: 'hsl(var(--c-logo-np))',
        rv: 'hsl(var(--c-logo-rv))',
        oe: 'hsl(var(--c-logo-oe))',
      },
    },
  },
  shortcuts: [
    {
      'btn-base': 'px-4 py-2 transition duration-150 rounded-xl disabled:(opacity-12 cursor-not-allowed)',
      'btn-filled': 'btn-base text-on-primary bg-primary hover:(shadow-md)',
      'btn-outlined': 'btn-base text-primary hover:(bg-primary bg-opacity-08) border-1 border-outline',
      'btn-text': 'btn-base text-primary hover:(bg-primary bg-opacity-08) px-4 py-2',
    },
  ],
  presets: [
    presetUno({
      attributifyPseudo: true,
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'color': 'inherit',
        // Avoid crushing of icons in crowded situations
        'min-width': '1.2em',
      },
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  rules: [
    [/^content-space$/, () => ({ content: '" "' })],
  ],
})
