import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { ContactCard } from './index'

describe('<ContactCard />', () => {
  it('should render without errors', async () => {
    const contact = {
      createdAt: '2023-02-03T03:53:58.977Z',
      name: 'Sassy Michelle',
      avatar:
        'https://www.meme-arsenal.com/memes/3ee2c16ed2c4be36c7b10c89ed27ad13.jpg',
      email: 'sassy@email.com',
      phone: '23456789',
      birthday: '15/11/1963',
      id: '130',
    }

    const { asFragment } = render(<ContactCard contact={contact} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should show View button', async () => {
    const contact = {
      createdAt: '2023-02-03T03:53:58.977Z',
      name: 'Sassy Michelle',
      avatar:
        'https://www.meme-arsenal.com/memes/3ee2c16ed2c4be36c7b10c89ed27ad13.jpg',
      email: 'sassy@email.com',
      phone: '23456789',
      birthday: '15/11/1963',
      id: '130',
    }

    render(<ContactCard contact={contact} />)

    await waitFor(async () => {
      const viewButton = screen.getByText(/View/i)

      expect(viewButton).toBeInTheDocument()

      expect(viewButton.closest('a')).toHaveAttribute('href', '/contacts/130')
    })
  })
})
