import { ChakraProvider, Flex } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import { Layout } from '@/components/Layout'
import { theme } from '@/styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Flex
        height="100vh"
        justifyContent="space-between"
        flexDirection="column"
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Flex>
    </ChakraProvider>
  )
}

export default MyApp
