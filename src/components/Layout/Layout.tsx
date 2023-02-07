import { Flex } from '@chakra-ui/react'
import Head from 'next/head'

import { Footer } from '../Footer'
import { NavBar } from '../NavBar'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Equals Tech Test</title>
        <meta name="description" content="Equals Full-Stack Test" />
        <link rel="icon" href="/img/logo.svg" />
      </Head>

      <NavBar />

      <Flex as="main" height="full" width="full" justifyContent="center">
        {children}
      </Flex>

      <Footer />
    </>
  )
}

export default Layout
