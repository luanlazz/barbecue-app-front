import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { ParticipantsList } from '@/presentation/pages'
import { LoadParticipantsListSpy } from '@/presentation/test'

type SutTypes = {
  loadParticipantsListSpy: LoadParticipantsListSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (loadParticipantsListSpy = new LoadParticipantsListSpy(), params?: SutParams): SutTypes => {
  render(
    <ParticipantsList
      loadParticipantsList={loadParticipantsListSpy}
    />
  )
  return {
    loadParticipantsListSpy
  }
}

describe('ParticipantsList Component', () => {
  test('Should call LoadParticipantsList', async () => {
    const { loadParticipantsListSpy } = makeSut()
    expect(loadParticipantsListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('participants-list'))
  })

  test('Should render ParticipantsItems on success', async () => {
    makeSut()
    const barbecueList = screen.getByTestId('participants-list')
    await waitFor(() => barbecueList)
    expect(barbecueList.querySelectorAll('tr')).toHaveLength(2)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })
})
