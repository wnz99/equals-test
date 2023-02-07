import { parseDateOfBirth } from './parseDateOfBirth'

describe('parseDateOfBirth', () => {
  it('should parse a valid date', () => {
    const date = parseDateOfBirth('15/11/1963')

    expect(date).toBeInstanceOf(Date)
  })

  it('should return null for an invalid date', () => {
    const date = parseDateOfBirth('')

    expect(date).toBe(null)
  })
})
