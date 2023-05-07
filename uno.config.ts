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
        'DEFAULT': 'hsl(var(--c-error))',
        'error-container': 'hsl(var(--c-error-container))',
      },
      on: {
        'primary': 'hsl(var(--c-on-primary))',
        'primary-container': 'hsl(var(--c-on-primary-container))',
        'secondary': 'hsl(var(--c-on-secondary))',
        'secondary-container': 'hsl(var(--c-on-secondary-container))',
        'tertiary': 'hsl(var(--c-on-tertiary))',
        'tertiary-container': 'hsl(var(--c-on-tertiary-container))',
        'error': 'hsl(var(--c-on-error))',
        'error-container': 'hsl(var(--c-on-error-container))',
        'surface': 'hsl(var(--c-on-surface))',
        'surface-variant': 'hsl(var(--c-on-surface-variant))',
      },
      surface: {
        'DEFAULT': 'hsl(var(--c-surface))',
        'dim': 'hsl(var(--c-surface-dim))',
        'bright': 'hsl(var(--c-surface-bright))',
        'container': 'hsl(var(--c-surface-container))',
        'container-low': 'hsl(var(--c-surface-container-low))',
        'container-lowest': 'hsl(var(--c-surface-container-lowest))',
        'container-high': 'hsl(var(--c-surface-container-high))',
        'container-highest': 'hsl(var(--c-surface-container-highest))',
      },
      outline: {
        DEFAULT: 'hsl(var(--c-outline))',
        variant: 'hsl(var(--c-outline-variant))',
      },
      inverse: {
        'surface': 'hsl(var(--c-inverse-surface))',
        'on-surface': 'hsl(var(--c-inverse-on-surface))',
        'primary': 'hsl(var(--c-inverse-primary))',
      },
      scrim: 'hsl(var(--c-scrim))',
      shadow: 'hsl(var(--c-shadow))',
    },
  },
  shortcuts: [
    {
      'btn-base': 'px-4 py-2 transition duration-150 rounded-xl',
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
})
