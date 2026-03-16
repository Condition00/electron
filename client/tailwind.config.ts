import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        color1: '#06141b',
        color2: '#11212d',
        color3: '#253745',
        color4: '#4a5c6a',
        color5: '#9ba8ab',
        color6: '#ccd0cf',
      },
        backgroundColor: {
          background: 'white',
          card: 'white',
            'input': '#f3f4f6',
            'primary': '#06141b',
        },
        textColor: {
          foreground: '#06141b',
          'card-foreground': '#06141b',
          'muted-foreground': '#4a5c6a',
            'primary-foreground': 'white',
          'primary': '#06141b',
        },
        borderColor: {
          'input': '#e5e7eb',
          'border': '#e5e7eb',
        },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      spacing: {
        '17': '68px',
        '78': '312px',
        '84': '336px',
        '90': '360px',
        '100': '400px',
        '105': '420px',
        '108': '432px',
        '160': '640px',
        '180': '720px',
      },
      width: {
        '9/10': '90%',
        '30/31': '96.77%',
      },
      height: {
        '84': '336px',
        '100': '400px',
        '180': '720px',
      },
      zIndex: {
        '5': '5',
        '100': '100',
      },
    },
  },
  plugins: [],
}

export default config
