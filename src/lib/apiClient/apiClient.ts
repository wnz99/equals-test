import axios from 'axios'
import format from 'date-fns/format'
import * as z from 'zod'

import { parseDateOfBirth } from '../utils/parseDateOfBirth'

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
})

export const parseDate = () =>
  z
    .preprocess((val) => parseDateOfBirth(String(val)), z.date())
    .transform((val) => format(val, 'dd/mm/yyyy'))

const contactResponseSchema = z.object({
  createdAt: z.coerce.date(),
  name: z.string(),
  avatar: z.string(),
  email: z
    .string()
    .email()
    .catch(() => {
      return ''
    }),
  phone: z.string(),
  birthday: parseDate().catch(() => {
    return null
  }),
  id: z.string(),
})

const contactsResponseSchema = z.array(contactResponseSchema)

export type Contact = z.infer<typeof contactResponseSchema>

// I've noticed that the API is returning inconsistent data for the birthday field. This could break the app if we don't handle it properly.
// Therefore I've add validation to the birthday field to make sure it's a valid date. If it's not, I'm returning null.
// Validation is done using zod.

export const apiClient = {
  getContacts: async () => {
    const response = await instance.get('/contacts')

    return contactsResponseSchema.parse(response.data)
  },
  getContact: async (id: string) => {
    const response = await instance.get<Contact>(`/contacts/${id}`)

    return contactResponseSchema.parse(response.data)
  },
  createContact: async (contact: Omit<Contact, 'createdAt' | 'id'>) => {
    const response = await instance.post('/contacts', contact)

    return response.data
  },
  updateContact: async (
    id: string,
    contact: Omit<Contact, 'createdAt' | 'id'>
  ) => {
    const response = await instance.put(`/contacts/${id}`, contact)

    return response.data
  },
  deleteContact: async (id: string) => {
    const response = await instance.delete(`/contacts/${id}`)

    return contactResponseSchema.parse(response.data)
  },
}
