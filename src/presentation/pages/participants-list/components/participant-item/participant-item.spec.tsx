import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen } from '@testing-library/react'
import { ParticipantItem, ParticipantsContext } from '@/presentation/pages/participants-list/components'
import { LoadParticipantsList } from '@/domain/usecases'
import { mockParticipantModel } from '@/domain/test'

type SutTypes = {
  handleMaintenanceMock: Function
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (participant: LoadParticipantsList.Model): SutTypes => {
  const handleMaintenanceMock = jest.fn()
  render(
    <ParticipantsContext.Provider value={{ handleMaintenanceMock }}>
      <Router history={history}>
        <ParticipantItem participant={participant} />
      </Router>
    </ParticipantsContext.Provider>
  )
  return {
    handleMaintenanceMock
  }
}

describe('ParticipantItem Component', () => {
  test('Should render with correct values', () => {
    const participant = mockParticipantModel()
    makeSut(participant)
    expect(screen.getByTestId('name')).toHaveTextContent(participant.name)
    expect(screen.getByTestId('value').textContent).toBe(new Intl.NumberFormat('pt', {
      style: 'currency',
      currency: 'BRL'
    }).format(participant.value).toString())
  })
})
