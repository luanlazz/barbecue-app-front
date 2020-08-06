import React from 'react'
import { render, screen } from '@testing-library/react'
import { BarbecueList } from '@/presentation/pages'

describe('BarbecueList Component', () => {
  test('Should present 3 empty items on start', () => {
    render(<BarbecueList />)
    const barbecueList = screen.getByTestId('barbecue-list')
    expect(barbecueList.querySelectorAll('li:empty').length).toBe(3)
  })
})
