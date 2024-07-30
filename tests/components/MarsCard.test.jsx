import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import MarsCardData from '../../src/components/MarsCard'
import '@testing-library/jest-dom/vitest'
import React from 'react'

describe('Mars', () => {
    it('should render the component', () => {
        render(<MarsCardData />)
    })

    it('should render the heading', () => {
        const heading = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(/Mars Rover Images/i)
    })

    it('Should render the date picker', () => {
        const date = screen.getByLabelText(/Earth Date/i)
        expect(date).toBeInTheDocument()
    })

    it('Should render the search button', () => {
        const searchButton = screen.getByRole('button', { name: /Search/i })
        expect(searchButton).toBeInTheDocument()
    })

    it('Should render the loading spinner', () => {
        const loadingSpinner = screen.getByRole('progressbar')
        expect(loadingSpinner).toBeInTheDocument()
    })

    
})

