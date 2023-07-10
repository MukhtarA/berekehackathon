/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { NotificationAlert } from '.'

describe('NotificationAlert', () => {
    it('Testing default props', () => {
        render(<NotificationAlert open message="Hello" />)
        expect(screen.getByText(/ok/i)).toBeInTheDocument()
        expect(screen.getByText(/hello/i)).toBeInTheDocument()
    })

    it('Standard case test', async () => {
        const handleClose = jest.fn()
        render(<NotificationAlert open handleClose={handleClose} duration={3000} message="Hello" />)
        expect(screen.getByText(/hello/i)).toBeInTheDocument()

        await waitFor(() => expect(screen.queryByText(/hello/i)).not.toBeInTheDocument(), {
            timeout: 3050
        })
    })

    it('User clicked close', async () => {
        const handleClose = jest.fn()

        render(
            <NotificationAlert
                open
                handleClose={handleClose}
                message="Message"
                acceptText="Accept"
            />
        )

        expect(screen.getByText(/message/i)).toBeInTheDocument()
        fireEvent.click(screen.getByText(/accept/i))
        expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('Check closed Notification', () => {
        render(<NotificationAlert message="Hello" open={false} />)
        expect(screen.queryByText(/hello/i)).toBeNull()
    })
})
