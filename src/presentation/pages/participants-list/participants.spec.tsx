import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { ParticipantsList } from '@/presentation/pages'
import { LoadParticipantsListSpy, LoadBarbecueByIdSpy } from '@/presentation/test'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  loadParticipantsListSpy: LoadParticipantsListSpy
  loadBarbecueByIdSpy: LoadBarbecueByIdSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (loadParticipantsListSpy = new LoadParticipantsListSpy(),
  loadBarbecueByIdSpy = new LoadBarbecueByIdSpy(),
  params?: SutParams): SutTypes => {
  render(
    <ParticipantsList
      loadParticipantsList={loadParticipantsListSpy}
      loadBarbecueById={loadBarbecueByIdSpy}
    />
  )
  return {
    loadParticipantsListSpy,
    loadBarbecueByIdSpy
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

  test('Should call LoadBarbecueById', async () => {
    const { loadBarbecueByIdSpy } = makeSut()
    expect(loadBarbecueByIdSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('barbecue-info'))
  })
})
