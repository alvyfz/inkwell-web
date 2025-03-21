import { heroui } from '@heroui/theme'
import type { Config } from 'tailwindcss'
import Colors from 'tailwindcss/colors'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        gray: Colors.slate,
        red: Colors.red,
        green: Colors.green,
        blue: Colors.blue,
        yellow: Colors.yellow,
        white: Colors.white,
        black: Colors.black
      },
      fontFamily: {
        code: 'var(--font-code)',
        body: 'var(--font-body)',
        serif: 'var(--font-serif)',
        brand: 'var(--font-brand)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shine: 'shine 5s linear infinite'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            default: {
              '50': '#f1f1f1',
              '100': '#dddddd',
              '200': '#cacaca',
              '300': '#b6b6b6',
              '400': '#a3a3a3',
              '500': '#8f8f8f',
              '600': '#767676',
              '700': '#5d5d5d',
              '800': '#444444',
              '900': '#2b2b2b',
              foreground: '#000',
              DEFAULT: '#8f8f8f'
            },
            primary: {
              '50': '#dfdfdf',
              '100': '#b3b3b3',
              '200': '#868686',
              '300': '#595959',
              '400': '#2d2d2d',
              '500': '#000000',
              '600': '#000000',
              '700': '#000000',
              '800': '#000000',
              '900': '#000000',
              foreground: '#fff',
              DEFAULT: '#000000'
            },
            secondary: {
              '50': '#f9f8fc',
              '100': '#f1edf8',
              '200': '#e9e3f5',
              '300': '#e1d9f1',
              '400': '#d9ceed',
              '500': '#d1c4e9',
              '600': '#aca2c0',
              '700': '#887f97',
              '800': '#635d6f',
              '900': '#3f3b46',
              foreground: '#000',
              DEFAULT: '#d1c4e9'
            },
            success: {
              '50': '#eff8f0',
              '100': '#d9eeda',
              '200': '#c3e4c5',
              '300': '#addbaf',
              '400': '#97d19a',
              '500': '#81c784',
              '600': '#6aa46d',
              '700': '#548156',
              '800': '#3d5f3f',
              '900': '#273c28',
              foreground: '#000',
              DEFAULT: '#81c784'
            },
            warning: {
              '50': '#fff6e9',
              '100': '#ffe9ca',
              '200': '#ffddaa',
              '300': '#ffd08b',
              '400': '#ffc46c',
              '500': '#ffb74d',
              '600': '#d29740',
              '700': '#a67732',
              '800': '#795725',
              '900': '#4d3717',
              foreground: '#000',
              DEFAULT: '#ffb74d'
            },
            danger: {
              '50': '#fceeee',
              '100': '#f7d5d5',
              '200': '#f3bdbd',
              '300': '#eea4a4',
              '400': '#ea8c8c',
              '500': '#e57373',
              '600': '#bd5f5f',
              '700': '#954b4b',
              '800': '#6d3737',
              '900': '#452323',
              foreground: '#000',
              DEFAULT: '#e57373'
            },
            background: '#ffffff',
            foreground: '#4a4a4a',
            content1: {
              DEFAULT: '#f0f0f0',
              foreground: '#000'
            },
            content2: {
              DEFAULT: '#e6e6e6',
              foreground: '#000'
            },
            content3: {
              DEFAULT: '#dcdcdc',
              foreground: '#000'
            },
            content4: {
              DEFAULT: '#d2d2d2',
              foreground: '#000'
            },
            focus: '#db924b',
            overlay: '#000000'
          }
        },
        dark: {
          colors: {
            default: {
              '50': '#f1f1f1',
              '100': '#dddddd',
              '200': '#cacaca',
              '300': '#b6b6b6',
              '400': '#a3a3a3',
              '500': '#8f8f8f',
              '600': '#767676',
              '700': '#5d5d5d',
              '800': '#444444',
              '900': '#2b2b2b',
              foreground: '#000',
              DEFAULT: '#8f8f8f'
            },
            primary: {
              '50': '#ffffff',
              '100': '#ffffff',
              '200': '#ffffff',
              '300': '#ffffff',
              '400': '#ffffff',
              '500': '#ffffff',
              '600': '#d2d2d2',
              '700': '#a6a6a6',
              '800': '#797979',
              '900': '#4d4d4d',
              foreground: '#000',
              DEFAULT: '#ffffff'
            },
            secondary: {
              '50': '#ebebeb',
              '100': '#cfcfcf',
              '200': '#b3b3b3',
              '300': '#969696',
              '400': '#7a7a7a',
              '500': '#5e5e5e',
              '600': '#4e4e4e',
              '700': '#3d3d3d',
              '800': '#2d2d2d',
              '900': '#1c1c1c',
              foreground: '#fff',
              DEFAULT: '#5e5e5e'
            },
            success: {
              '50': '#e6f1e7',
              '100': '#c3ddc5',
              '200': '#a0c9a2',
              '300': '#7eb680',
              '400': '#5ba25e',
              '500': '#388e3c',
              '600': '#2e7532',
              '700': '#245c27',
              '800': '#1b431d',
              '900': '#112b12',
              foreground: '#000',
              DEFAULT: '#388e3c'
            },
            warning: {
              '50': '#feefdf',
              '100': '#fcd8b3',
              '200': '#fac186',
              '300': '#f9aa59',
              '400': '#f7932d',
              '500': '#f57c00',
              '600': '#ca6600',
              '700': '#9f5100',
              '800': '#743b00',
              '900': '#4a2500',
              foreground: '#000',
              DEFAULT: '#f57c00'
            },
            danger: {
              '50': '#fae5e5',
              '100': '#f2c1c1',
              '200': '#ea9c9c',
              '300': '#e27878',
              '400': '#db5353',
              '500': '#d32f2f',
              '600': '#ae2727',
              '700': '#891f1f',
              '800': '#641616',
              '900': '#3f0e0e',
              foreground: '#fff',
              DEFAULT: '#d32f2f'
            },
            background: '#222222',
            foreground: '#b0b0b0',
            content1: {
              DEFAULT: '#2a2a2a',
              foreground: '#fff'
            },
            content2: {
              DEFAULT: '#3b3b3b',
              foreground: '#fff'
            },
            content3: {
              DEFAULT: '#4c4c4c',
              foreground: '#fff'
            },
            content4: {
              DEFAULT: '#5d5d5d',
              foreground: '#fff'
            },
            focus: '#000000',
            overlay: '#ffffff'
          }
        }
      },
      layout: {
        disabledOpacity: '0.4'
      }
    })
  ]
} satisfies Config
