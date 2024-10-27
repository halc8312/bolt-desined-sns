export const lightTheme = {
  colors: {
    primary: '#2D2D2D',
    secondary: '#FF3366',
    accent: '#00C2FF',
    background: {
      primary: '#FFFFFF',
      secondary: '#F8F9FA',
      tertiary: '#F0F2F5'
    },
    text: {
      primary: '#2D2D2D',
      secondary: '#6E7A8A',
      inverse: '#FFFFFF'
    },
    status: {
      success: '#00C48C',
      warning: '#FFB800',
      error: '#FF3366'
    },
    gradient: {
      primary: 'linear-gradient(135deg, #FF3366 0%, #FF6B3D 100%)',
      secondary: 'linear-gradient(135deg, #00C2FF 0%, #01E4FF 100%)'
    }
  },
  typography: {
    fontFamily: {
      sans: "'Noto Sans JP', sans-serif",
      serif: "'Noto Serif JP', serif"
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.05)'
  },
  animations: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)'
    },
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '450ms'
    }
  }
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#FFFFFF',
    background: {
      primary: '#1A1A1A',
      secondary: '#2D2D2D',
      tertiary: '#3D3D3D'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0A0A0',
      inverse: '#2D2D2D'
    }
  }
};
