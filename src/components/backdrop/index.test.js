import React from 'react'
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import Backdrop from '.'

describe('Backdrop', () => {
    const handleClose = jest.fn()
    it('Standard case', async () => {
        render(<Backdrop open onClose={handleClose} dataTestId="backdrop" />)
        const backdrop = screen.getByTestId('backdrop')
        expect(backdrop).toBeInTheDocument()
        fireEvent.click(backdrop)
        await waitFor(() => expect(handleClose).toBeCalledTimes(1))
    })

    it('Closed case', () => {
        render(<Backdrop open={false} dataTestId="backdrop" onClose={handleClose} />)
        expect(screen.queryByTestId('backdrop')).not.toBeInTheDocument()
    })
})
