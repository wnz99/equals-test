import { isValid, parse } from 'date-fns'

export const parseDateOfBirth = (dateOfBirth: string) => {
  const date = parse(dateOfBirth, 'dd/mm/yyyy', new Date())

  if (!isValid(date)) {
    return null
  }

  return date
}
