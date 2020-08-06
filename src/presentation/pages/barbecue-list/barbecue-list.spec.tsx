import React from 'react'
import { render, screen } from '@testing-library/react'
import { BarbecueList } from '@/presentation/pages'

const makeSut = (): void => {
  render(<BarbecueList />)
}

describe('BarbecueList Component', () => {
  test('Should present 3 empty items on start', () => {
    makeSut()
    const barbecueList = screen.getByTestId('barbecue-list')
    expect(barbecueList.querySelectorAll('li:empty').length).toBe(3)
  })
})
