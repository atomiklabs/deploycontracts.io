const progressBarPallet = [
  '#FD0F9E',
  '#671BC9',
  '#FD810F',
  '#00D0FE',
  '#FD3A0F',
  '#BCFE00',
  '#FDBA0F',
  '#0CE2AF',
  '#FE6B00',
  '#BD01DC',
  '#0084FE',
  '#7EE42D',
  '#4F14F9',
  '#0DB427',
  '#0EADAD',
]

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
  safelist: [...progressBarPallet.map((_, idx) => `bg-progress-bar-${idx}`)],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat'],
        'space-grotesk': ['Space Grotesk'],
      },
      fontSize: {
        xs: ['0.875rem', '2rem'], // 14px 32px
        sm: ['1rem', '2rem'], // 16px 32px
        base: ['1.125rem', '2rem'], // 18px 32px
        lg: ['1.5rem', '1.914rem'], // 24px 30.62px
        xl: ['3rem', '3.828rem'], // 48px 61.25px
        h1: ['3.6rem', '4rem'], //64px 81.68px
        h2: ['2.5rem', '3rem'], // 40px 48px
        'h2-md': ['3.5rem', '4rem'], // 56px 64px
        h3: ['2.25rem', '2.875rem'], // 36px 46px
        'h3-md': ['3rem', '3.812rem'], // 48px 61px
      },
      weight: {
        normal: 400,
        medium: 500,
        bold: 700,
      },
      colors: {
        gray: {
          100: '#DCE2F2',
          200: '#6075AA',
          300: '#7A8297',
        },
        'error-red': '#FC0E47',
        'progress-bar': progressBarPallet,
      },
    },
  },
}
