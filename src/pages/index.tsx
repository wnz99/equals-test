import { Center, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import NextLink from 'next/link'

const Home: NextPage = () => {
  return (
    <Center flexDirection="column">
      <Link as={NextLink} marginBottom={4} href="/contacts">
        Go to Contacts
      </Link>

      <Link as={NextLink} marginBottom={4} href="/contacts/contacts-ssr">
        Go to Contacts SSR
      </Link>
    </Center>
  )
}

export default Home
