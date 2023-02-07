import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { ErrorMessage } from './index'

const mockOnRetry = jest.fn()

describe('<ErrorMessage />', () => {
  beforeEach(() => {
    mockOnRetry.mockClear()
  })

  it('should render without errors', async () => {
    const { asFragment } = render(<ErrorMessage />)

    expect(asFragment()).toMatchSnapshot()

    expect(screen.getByText(/There has been an error./i)).toBeInTheDocument()
  })

  it('should show a custom error message', async () => {
    render(<ErrorMessage message="custom message" />)

    expect(screen.getByText(/custom message/i)).toBeInTheDocument()
  })

  it('should trigger callback when user click Add button', async () => {
    render(<ErrorMessage onRetry={mockOnRetry} />)

    await waitFor(async () => {
      fireEvent.click(screen.getByText(/Retry/i))

      expect(mockOnRetry).toHaveBeenCalledTimes(1)
    })
  })
})
