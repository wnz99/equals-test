import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios'
import type { NextPage } from 'next'
import { useMemo, useState } from 'react'
import useSWR from 'swr'

import { AddContact } from '@/components/AddContact'
import { ContactsList } from '@/components/ContactsList'
import { ErrorMessage } from '@/components/ErrorMessage'
import { apiClient, Contact } from '@/lib/apiClient/apiClient'

const Contacts: NextPage = () => {
  const { data, error, mutate, isLoading, isValidating } = useSWR(
    `/api/contacts/`,
    () => apiClient.getContacts()
  )

  const { isOpen, onToggle } = useDisclosure()

  const [errorMessage, setErrorMessage] = useState<string>()

  // This is just to show that the list can be memoized to cache calcualtions between renders
  // Given the short lenght of the array, it would not really be necessary here.
  const orderedListByDate = useMemo(
    () =>
      data
        ? data.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
              return -1
            }

            if (a.createdAt < b.createdAt) {
              return 1
            }

            return 0
          })
        : [],
    [data]
  )

  const onSubmit = async (data: Omit<Contact, 'createdAt' | 'id'>) => {
    try {
      await apiClient.createContact(data)

      onToggle()

      mutate()
    } catch (error) {
      const message =
        axios.isAxiosError(error) || error instanceof Error
          ? error.message
          : 'Unknown error'

      setErrorMessage(message)
    }
  }

  if (error || errorMessage) {
    return <ErrorMessage onRetry={mutate} message={errorMessage} />
  }

  if (!data || isLoading || isValidating) {
    return (
      <Center width={'full'} justifyContent="center">
        <Spinner />
      </Center>
    )
  }

  return (
    <Flex flexDirection={{ base: 'column', sm: 'column' }} mt="4">
      <Flex width="full">
        <Button
          colorScheme={isOpen ? 'gray' : 'green'}
          onClick={onToggle}
          width="full"
        >
          {isOpen ? 'Cancel' : 'New Contact'}
        </Button>
      </Flex>

      <Flex>
        <Collapse in={isOpen} animateOpacity>
          <Box p="40px" mt="4" rounded="md" shadow="md">
            <AddContact onSubmit={onSubmit} />
          </Box>
        </Collapse>
      </Flex>

      <Text as="h2" align="center" margin={5} fontSize={20} fontWeight="bold">
        Contacts
      </Text>

      <Center flexDirection="column">
        <ContactsList contacts={orderedListByDate} />
      </Center>
    </Flex>
  )
}

export default Contacts
