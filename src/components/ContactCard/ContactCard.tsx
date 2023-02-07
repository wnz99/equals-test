import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Heading,
  Image,
  Stack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

import { Contact } from '@/lib/apiClient/apiClient'

type ContactItemProps = {
  contact: Contact
}

const ContactCard = ({ contact }: ContactItemProps) => {
  const { name, avatar, id } = contact

  return (
    <Card width="md">
      <CardBody>
        <Center>
          <Image src={avatar} alt={`Avatar of ${name}`} borderRadius="lg" />
        </Center>

        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
        </Stack>
      </CardBody>

      <CardFooter>
        <ButtonGroup spacing="2">
          <NextLink href={`/contacts/${id}`} passHref>
            <Button variant="solid" colorScheme="blue">
              View
            </Button>
          </NextLink>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default ContactCard
