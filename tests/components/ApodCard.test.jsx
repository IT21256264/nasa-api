import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import ApodCardData from '../../src/components/ApodCard'
import '@testing-library/jest-dom/vitest'
import React from 'react'

describe('Apod', () => {


    
    it('should render the component', () => {
        render(<ApodCardData />)
    })

    it('should render the heading', () => {
        const heading = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(/Astronomy Picture of the Day/i)
    })

    it('should render the start date picker', () => {
        const startDate = screen.getByLabelText(/Start Date/i)
        expect(startDate).toBeInTheDocument()
    })

    it('should render the end date picker', () => {
        const endDate = screen.getByLabelText(/End Date/i)
        expect(endDate).toBeInTheDocument()
    })

    it('should render the search button', () => {
        const searchButton = screen.getByRole('button', { name: /Search/i })
        expect(searchButton).toBeInTheDocument()
    })

    it('should render the search input', () => {
        const searchInput = screen.getByLabelText(/Filter by name/i)
        expect(searchInput).toBeInTheDocument()
    })

    it('should render the loading spinner', () => {
        const loadingSpinner = screen.getByRole('progressbar')
        expect(loadingSpinner).toBeInTheDocument()
    })


})