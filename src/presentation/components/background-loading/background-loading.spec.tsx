import React from 'react'
import { render, screen } from '@testing-library/react'
import BackgroundLoading from './background-loading'

const makeSut = (): void => {
  render(
    <BackgroundLoading />
  )
}

describe('BackgroundLoading Component', () => {
  test('Should show BackgroundLoading', () => {
    makeSut()
    expect(screen.queryByTestId('background-loading')).toBeInTheDocument()
  })
})
