import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Contact, parseDate } from '@/lib/apiClient/apiClient'

const schema = z.object({
  name: z.string().min(1),
  avatar: z.string(),
  email: z.string().email(),
  phone: z.string().regex(new RegExp(/[\+][0-9]+$/)),
  birthday: parseDate(),
})

type FormData = z.infer<typeof schema>

type ValidatedContact = Omit<Contact, 'createdAt' | 'id'>

type AddContactProps = {
  contact?: Contact
  onSubmit: (data: ValidatedContact) => Promise<void> | void
}

const ValidationErrorMessage = ({ message }: { message?: string }) => {
  return (
    <FormHelperText color="red.400">
      {message ?? `This field is required`}
    </FormHelperText>
  )
}

const AddContact = ({ contact, onSubmit }: AddContactProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: { ...contact },
    resolver: zodResolver(schema),
  })

  const [isLoading, setIsLoading] = useState(false)

  const styles = useMultiStyleConfig('Button', {
    variant: 'solid',
    colorScheme: 'green',
  })

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return null
    }

    const reader = new FileReader()

    reader.addEventListener(
      'load',
      () => {
        if (typeof reader.result === 'string') {
          setValue('avatar', reader.result)
        }
      },
      false
    )

    const [file] = e.target.files

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const avatar = watch('avatar')

  const onFormSubmit = async (data: ValidatedContact) => {
    setIsLoading(true)

    try {
      await onSubmit(data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Center>
        <Box height="200px" width="200px">
          {avatar ? (
            <Image
              src={avatar}
              objectFit="cover"
              alt="avatar"
              height="180px"
              borderColor="gray.300"
              borderRadius="4"
              borderWidth="1px"
            />
          ) : (
            <Box
              bg="gray.100"
              borderColor="gray.300"
              borderRadius="4"
              borderWidth="1px"
              height="180px"
            />
          )}
        </Box>
      </Center>

      <FormControl>
        <FormLabel htmlFor="avatar">Avatar</FormLabel>
        <Input
          id="avatar"
          type="file"
          border="none"
          padding="0"
          {...(register('avatar'), { onChange: handleImageChange })}
          sx={{
            '::file-selector-button': {
              border: 'none',
              outline: 'none',
              mr: 2,
              ...styles,
            },
          }}
        />

        {errors.avatar && (
          <ValidationErrorMessage message="An image is required" />
        )}
      </FormControl>

      <FormControl mt="10px">
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input type="text" id="name" placeholder="Name" {...register('name')} />

        {errors.name && <ValidationErrorMessage />}
      </FormControl>

      <FormControl mt="10px">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register('email')}
        />

        {errors.email && (
          <ValidationErrorMessage message={errors.email.message} />
        )}
      </FormControl>

      <FormControl mt="10px">
        <FormLabel htmlFor="phone">Phone</FormLabel>
        <Input
          type="text"
          id="phone"
          placeholder="Phone"
          {...register('phone')}
        />

        {errors.phone && (
          <ValidationErrorMessage message="Date must be in +0123456789 format" />
        )}
      </FormControl>

      <FormControl mt="10px">
        <FormLabel htmlFor="birthday">Birthday</FormLabel>
        <Input
          type="text"
          id="birthday"
          placeholder="Birthday"
          {...register('birthday')}
        />

        {errors.birthday && (
          <ValidationErrorMessage message="Date must be in dd/mm/yyyy format" />
        )}
      </FormControl>

      <Button mt={4} type="submit" colorScheme="green" isLoading={isLoading}>
        Save
      </Button>
    </form>
  )
}

export default AddContact
