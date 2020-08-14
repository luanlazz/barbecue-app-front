import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen } from '@testing-library/react'
import { BarbecueInfo, ParticipantsContext } from '@/presentation/pages/participants-list/components'
import { mockBarbecueModel } from '@/domain/test'

type SutTypes = {
  handleMaintenanceMock: Function
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (barbecue = mockBarbecueModel()): SutTypes => {
  const handleMaintenanceMock = jest.fn()
  render(
    <ParticipantsContext.Provider value={{ handleMaintenanceMock }}>
      <Router history={history}>
        <BarbecueInfo barbecue={barbecue} />
      </Router>
    </ParticipantsContext.Provider>
  )
  return {
    handleMaintenanceMock
  }
}

describe('BarbecueInfo Component', () => {
  test('Should render with correct values', () => {
    const barbecue = mockBarbecueModel()
    makeSut(barbecue)
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
    expect(screen.getByTestId('valueCollected').textContent).toBe(new Intl.NumberFormat('pt', {
      currency: 'BRL'
    }).format(barbecue.valueCollected).toString())
  })
})
