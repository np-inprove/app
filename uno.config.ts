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
  shortcuts: [
    {
      'bg-base': 'bg-$c-bg-base',

      'border-base': 'border-$c-border-base',
      'ring-base': 'ring-$c-ring-base',

      'btn-primary': 'text-$c-text-btn-primary bg-$c-primary hover:bg-$c-primary-active rounded-lg px-4 py-2',
      'btn-ghost': 'text-$c-text-base rounded-lg px-4 py-2',
      'btn-link': 'text-$c-text-base',
      'btn-icon': 'text-$c-text-base rounded-md p-2 hover:bg-$c-bg-btn-icon-hover',
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
