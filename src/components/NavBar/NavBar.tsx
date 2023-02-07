import { Center, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <Flex
      backgroundColor="equalsDarkGrey.100"
      as="nav"
      alignItems="center"
      cursor="pointer"
    >
      <Link href="/">
        <Center justifyContent="center" margin={2} height="25px">
          <Text
            fontWeight="bold"
            color="white"
            display={{ base: 'none', sm: 'unset' }}
          >
            EQUALS TEST
          </Text>

          <Flex display={{ base: 'unset', sm: 'none' }}>
            <Image src="/img/logo.svg" height="20" width="20" alt="logo" />
          </Flex>
        </Center>
      </Link>
    </Flex>
  )
}

export default Navbar
