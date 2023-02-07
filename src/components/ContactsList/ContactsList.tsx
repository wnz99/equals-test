import { Box } from '@chakra-ui/react'
import React from 'react'

import { ContactCard } from '@/components/ContactCard'
import { Contact } from '@/lib/apiClient/apiClient'

type ContactsListProps = {
  contacts: Contact[]
}

const ContactsList = ({ contacts }: ContactsListProps) => {
  return (
    <>
      {contacts.map((contact) => (
        <Box key={contact.id} mb="4">
          <ContactCard contact={contact} />
        </Box>
      ))}
    </>
  )
}

export default React.memo(ContactsList)
