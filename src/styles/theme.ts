import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: '480px',
}

export const theme = extendTheme({
  breakpoints,
  colors: {
    equalsDarkGrey: {
      100: '#262835',
    },
  },
})
