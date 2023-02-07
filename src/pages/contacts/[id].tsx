import { Center, Flex, Spinner } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { ContactDetails } from '@/components/ContactDetails'
import { ErrorMessage } from '@/components/ErrorMessage'
import { apiClient, Contact as ContactType } from '@/lib/apiClient/apiClient'

const Contact: NextPage = () => {
  const router = useRouter()

  const { id } = router.query as { id: string }

  const { data, error, mutate, isLoading } = useSWR(`/api/contacts/${id}`, () =>
    apiClient.getContact(id)
  )

  const onEdit = async (
    id: string,
    data: Omit<ContactType, 'createdAt' | 'id'>
  ) => {
    await apiClient.updateContact(id, data)

    mutate()
  }

  const onDelete = async (id: string) => {
    await apiClient.deleteContact(id)

    router.back()
  }

  if (error) {
    return <ErrorMessage onRetry={mutate} />
  }

  if (!data || isLoading) {
    return (
      <Center width={'full'} justifyContent="center">
        <Spinner />
      </Center>
    )
  }

  return (
    <Flex flexDirection={{ base: 'column', sm: 'column' }}>
      <Flex align="center" mt="4">
        <ContactDetails contact={data} onEdit={onEdit} onDelete={onDelete} />
      </Flex>
    </Flex>
  )
}

export default Contact
