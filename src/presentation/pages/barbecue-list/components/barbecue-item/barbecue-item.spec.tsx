import React from 'react'
import { render, screen } from '@testing-library/react'
import { BarbecueItem } from '@/presentation/pages/barbecue-list/components'
import { mockBarbecueModel } from '@/domain/test'

describe('BarbecueItem Component', () => {
  test('Should render with correct values', () => {
    const barbecue = mockBarbecueModel()
    render(<BarbecueItem barbecue={barbecue} />)
    expect(screen.getByTestId('date')).toHaveTextContent(Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'numeric'
    }).format(barbecue.date))
    expect(screen.getByTestId('description')).toHaveTextContent(barbecue.description)
    expect(screen.getByTestId('numParticipants')).toHaveTextContent(barbecue.numParticipants.toString())
    expect(screen.getByTestId('valueTotal').textContent).toBe(new Intl.NumberFormat('pt', {
      style: 'currency',
      currency: 'BRL'
    }).format(barbecue.valueTotal).toString())
  })
})
