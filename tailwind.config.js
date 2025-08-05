/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B47E0',
          light: '#8B7FE8',
          dark: '#4338CA'
        },
        accent: {
          DEFAULT: '#F97316',
          light: '#FB923C',
          dark: '#EA580C'
        },
        surface: '#FFFFFF',
        background: '#F8FAFC',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      animation: {
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-subtle': 'bounceSubtle 0.4s ease-out',
        'pulse-success': 'pulseSuccess 0.6s ease-out'
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        pulseSuccess: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)', backgroundColor: '#10B981' },
          '100%': { transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}