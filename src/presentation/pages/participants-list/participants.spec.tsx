import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { ParticipantsList } from '@/presentation/pages'
import { LoadParticipantsListSpy } from '@/presentation/test'
import { UnexpectedError } from '@/domain/errors'

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

  test('Should render error on failure', async () => {
    const loadParticipantsListSpy = new LoadParticipantsListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadParticipantsListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadParticipantsListSpy)
    await waitFor(() => screen.getByTestId('participants-list'))
    expect(screen.queryByTestId('participants-list')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
  })
})
