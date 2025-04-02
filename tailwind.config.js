module.exports = {
    content: [
      './src/**/*.{html,js,jsx,ts,tsx}',  
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
      fontSize: {
        us: [
          '8px',
          {
            lineHeight: '10px',
          },
        ],
        xxs: [
          '10px',
          {
            lineHeight: '12px',
          },
        ],
        xs: [
          '12px',
          {
            lineHeight: '15px',
          },
        ],
        sm: [
          '14px',
          {
            lineHeight: '21px',
          },
        ],
        base: [
          '16px',
          {
            lineHeight: '24px',
          },
        ],
        /* md: [
          '18px',
          {
            lineHeight: '2rem',
            fontWeight: '500',
          },
        ], */
        lg: [
          '20px',
          {
            lineHeight: '2rem',
            fontWeight: '500',
          },
        ],
        xl: [
          '26px',
          {
            lineHeight: '22px',
            fontWeight: '600',
          },
        ],
  
        //Titles font size
        't-xs': [
          '21px',
          {
            lineHeight: '25.2px',
          },
        ],
        't-sm': [
          '24px',
          {
            lineHeight: '28.8px',
          },
        ],
        't-md': [
          '28px',
          {
            lineHeight: '33.6px',
          },
        ],
        't-lg': [
          '34px',
          {
            lineHeight: '40.8px',
          },
        ],
        //Paragraphs font size
        'p-xs': [
          '10px',
          {
            lineHeight: '14px',
          },
        ],
        'p-sm': [
          '12px',
          {
            lineHeight: '16.8px',
          },
        ],
        'p-md': [
          '14px',
          {
            lineHeight: '19.6px',
          },
        ],
        'p-lg': [
          '16px',
          {
            lineHeight: '22.4px',
          },
        ],
        'p-xlg': [
          '21px',
          {
            lineHeight: '29.4px',
          },
        ],
      },
      fontFamily: {
        sans: ['Inter'],
        serif: ['Inter', 'sans-serif'],
        awesome: ['Font Awesome 5 Pro'],
        title: ['Montserrat','sans-serif'],
        paragraph: ['Inter'],
      },
      extend: {
        colors: {
          rose: {
            100: 'var(--rose-100)',
            500: 'var(--rose-500)',
            600: 'var(--rose-600)',
            700: 'var(--rose-700)',
            800: 'var(--rose-800)',
            900: 'var(--rose-900)',
          },
  
          blue: {
            100: 'var(--blue-100)',
            500: 'var(--blue-500)',
            600: 'var(--blue-600)',
            700: 'var(--blue-700)',
            800: 'var(--blue-800)',
            900: 'var(--blue-900)',
          },
  
          'dark-blue': {
            300: 'var(--dark-blue-300)',
            400: 'var(--dark-blue-400)',
            500: 'var(--dark-blue-500)',
            600: 'var(--dark-blue-600)',
            700: 'var(--dark-blue-700)',
          },
  
          'light-gray': {
            50: 'var(--light-50)',
            100: 'var(--light-100)',
            200: 'var(--light-200)',
          },
  
          success: {
            100: 'var(--success-100)',
            700: 'var(--success-700)',
            800: 'var(--success-800)',
          },
  
          warning: {
            100: 'var(--warning-100)',
            700: 'var(--warning-700)',
            800: 'var(--warning-800)',
          },
  
          dangerous: {
            100: 'var(--dangerous-100)',
            700: 'var(--dangerous-700)',
            800: 'var(--dangerous-800)',
          },
  
          purple: {
            100: 'var(--purple-100)',
            700: 'var(--purple-700)',
            800: 'var(--purple-800)',
          },
  
          yellow: {
            100: 'var(--yellow-100)',
            700: 'var(--yellow-700)',
            800: 'var(--yellow-800)',
          },
  
          //text colors
          'button-label': 'var(--button-label)',
          input: 'var(--input)',
          disabled: 'var(--disabled)',
          label: 'var(--label)',
          paragraph: 'var(--paragraph)',
          title: 'var(--title)',
          'button-shadow': 'var(--button-shadow)',
  
          //gradient colors
          //rose gradient
          'rose-start': 'var(--grad-rose-start)',
          'rose-end': 'var(--grad-rose-end)',
          //blue-gradient
          'blue-start': 'var(--grad-blue-start)',
          'blue-end': 'var(--grad-blue-end)',
          //dark blue gradient
          'dark-blue-start': 'var(--grad-dark-blue-start)',
          'dark-blue-end': 'var(--grad-dark-blue-end)',
  
          'success-start': 'var(--grad-success-start)',
          'success-end': 'var(--grad-success-end)',
  
          'danger-start': 'var(--grad-danger-start)',
          'danger-end': 'var(--grad-danger-end)',
  
          'warning-start': 'var(--grad-warning-start)',
          'warning-end': 'var(--grad-warning-end)',
        },
        fontFamily: {
          sans: ['Inter'],
          title: ['Montserrat'],
          paragraph: ['Inter'],
        },
        boxShadow: {
          dropdown: '2px 4px 8px rgba(57, 60, 77, 0.1)',
          input: '0px 1px 3px rgba(0, 0, 0, 0.1)',
          button: '0px 2px 6px rgba(57, 60, 77, 0.15)',
          menu: '4px 0px 16px rgba(57, 60, 77, 0.1)',
          tabs: '0px -1px 2px rgba(57, 60, 77, 0.1)',
          tabDisabled:
            'inset 0px -2px 3px rgba(57, 60, 77, 0.15)',
          blue: '0px 2px 6px 0px rgba(0, 158, 219, 0.25)',
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }