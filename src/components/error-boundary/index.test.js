/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import ErrorBoundary from '.'

describe('ErrorBoundary', () => {
    const badRoute = '/some/bad/route'

    beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementation(() => {})
        jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    it('Error Boundary bad case', () => {
        const spy = jest.spyOn(console, 'error')

        const Something = () =>
            spy.mockImplementation(() => {
                throw new Error('testing')
            })

        render(
            <MemoryRouter initialEntries={[badRoute]}>
                <ErrorBoundary>
                    <Something />
                    <div>{'Bad Case'}</div>
                </ErrorBoundary>
            </MemoryRouter>
        )

        expect(screen.getByText(/testing/i)).toBeVisible()
        expect(screen.queryByText(/bad case/)).not.toBeInTheDocument()
        spy.mockRestore()
    })

    it('Error Boundary good case', () => {
        render(
            <MemoryRouter initialEntries={[badRoute]}>
                <ErrorBoundary>
                    <div>{'Not Bad Case'}</div>
                </ErrorBoundary>
            </MemoryRouter>
        )

        expect(screen.getByText(/not bad/i)).toBeInTheDocument()
    })

    it('Error Boundary custom props', () => {
        const spy = jest.spyOn(console, 'error')

        const ErrorComponent = () =>
            spy.mockImplementation(() => {
                throw new Error('error')
            })

        render(
            <MemoryRouter initialEntries={[badRoute]}>
                <ErrorBoundary render={() => <div>{'Custom error'}</div>}>
                    <ErrorComponent />
                </ErrorBoundary>
            </MemoryRouter>
        )

        expect(screen.getByText(/custom error/i)).toBeVisible()
        spy.mockRestore()
    })
})
