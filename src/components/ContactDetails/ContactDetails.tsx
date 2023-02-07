import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Collapse,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios'
import format from 'date-fns/format'
import React, { useState } from 'react'

import { AddContact } from '@/components/AddContact'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Contact } from '@/lib/apiClient/apiClient'

type ContactItemProps = {
  contact: Contact
  onEdit: (id: string, data: Omit<Contact, 'createdAt' | 'id'>) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

const ContactDetails = ({ contact, onDelete, onEdit }: ContactItemProps) => {
  const { name, avatar, createdAt, birthday, email, id } = contact

  const [isLoading, setIsLoading] = useState(false)

  const { isOpen, onToggle } = useDisclosure()

  const [errorMessage, setErrorMessage] = useState<string>()

  const onContactEdit = async (data: Omit<Contact, 'createdAt' | 'id'>) => {
    setIsLoading(true)

    try {
      await onEdit(contact.id, data)

      onToggle()
    } catch (error) {
      const message =
        axios.isAxiosError(error) || error instanceof Error
          ? error.message
          : 'Unknown error'

      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  const onContactDelete = async (id: string) => {
    setIsLoading(true)

    try {
      await onDelete(id)
    } catch (error) {
      const message =
        axios.isAxiosError(error) || error instanceof Error
          ? error.message
          : 'Unknown error'

      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card maxW="md" flexDirection="column">
      <CardBody>
        <Flex flexDirection={{ base: 'column', sm: 'row' }}>
          <Center>
            <Image
              src={avatar}
              alt={`Avatar of ${name}`}
              borderRadius="lg"
              maxWidth="200px"
            />
          </Center>

          <Stack
            spacing="3"
            ml={{ base: 'none', sm: '4' }}
            mt={{ base: '4', sm: '0' }}
          >
            <Heading size="md">
              #{id} {name}
            </Heading>

            <Text>Email: {email}</Text>
            <Text>Birthday: {birthday}</Text>
            <Text>Created: {format(createdAt, 'MM/dd/yyyy HH:mm:ss')}</Text>
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Box p="40px" mt="4" rounded="md" shadow="md">
            <AddContact contact={contact} onSubmit={onContactEdit} />
          </Box>

          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Collapse>
      </CardBody>

      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            isLoading={isLoading}
            variant="solid"
            colorScheme="red"
            onClick={() => onContactDelete(contact.id)}
          >
            Delete
          </Button>
          <Button colorScheme={isOpen ? 'gray' : 'yellow'} onClick={onToggle}>
            {isOpen ? 'Cancel' : 'Edit'}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default ContactDetails
