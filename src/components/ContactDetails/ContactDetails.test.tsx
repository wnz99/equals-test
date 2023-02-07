import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { ContactDetails } from './index'

const mockOnEdit = jest.fn()
const mockOnDelete = jest.fn()

describe('<ErrorMessage />', () => {
  beforeEach(() => {
    mockOnEdit.mockClear()
    mockOnDelete.mockClear()
  })

  const contact = {
    createdAt: new Date('2023-02-03T03:53:58.977Z'),
    name: 'Sassy Michelle',
    avatar:
      'https://www.meme-arsenal.com/memes/3ee2c16ed2c4be36c7b10c89ed27ad13.jpg',
    email: 'sassy@email.com',
    phone: '23456789',
    birthday: '15/11/1963',
    id: '130',
  }

  it('should render without errors', async () => {
    const { asFragment } = render(
      <ContactDetails
        contact={contact}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    expect(asFragment()).toMatchSnapshot()

    expect(screen.getByText(/Email: sassy@email.com/i)).toBeInTheDocument()
    expect(screen.getByText(/Birthday: 15\/11\/1963/i)).toBeInTheDocument()
  })

  it('should trigger callback when user click Delete button', async () => {
    render(
      <ContactDetails
        contact={contact}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    await waitFor(async () => {
      fireEvent.click(screen.getByText(/Delete/i))

      expect(mockOnDelete).toHaveBeenCalledWith(contact.id)

      expect(mockOnDelete).toHaveBeenCalledTimes(1)
    })
  })

  it('should show edit form when user click Edit button', async () => {
    window.scrollTo = jest.fn()

    render(
      <ContactDetails
        contact={contact}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    expect(screen.getByText(/Avatar/i)).not.toBeVisible()

    fireEvent.click(screen.getByText(/Edit/i))

    await waitFor(async () => {
      expect(screen.getByText(/Avatar/i)).toBeVisible()
    })
  })
})
