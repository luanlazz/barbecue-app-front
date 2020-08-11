import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { ParticipantsList } from '@/presentation/pages'
import { LoadParticipantsListSpy, LoadBarbecueByIdSpy, ValidationStub, SaveBarbecueSpy, Helper } from '@/presentation/test'
import { UnexpectedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import faker from 'faker'

type SutTypes = {
  loadParticipantsListSpy: LoadParticipantsListSpy
  loadBarbecueByIdSpy: LoadBarbecueByIdSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/barbecue'] })

const makeSut = (loadParticipantsListSpy = new LoadParticipantsListSpy(),
  loadBarbecueByIdSpy = new LoadBarbecueByIdSpy(),
  params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const saveBarbecueSpy = new SaveBarbecueSpy()
  render(
    <ApiContext.Provider value={{ }}>
      <Router history={history}>
        <ParticipantsList
          loadParticipantsList={loadParticipantsListSpy}
          loadBarbecueById={loadBarbecueByIdSpy}
          saveBarbecue={saveBarbecueSpy}
          validation={validationStub}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadParticipantsListSpy,
    loadBarbecueByIdSpy
  }
}

const openModal = async (): Promise<void> => {
  const barbecueInfo = screen.getByTestId('barbecue-info')
  await waitFor(() => barbecueInfo)
  const editItem = screen.getByTestId('editItem')
  fireEvent.click(editItem)
}

describe('ParticipantsList Component', () => {
  test('Should call LoadParticipantsList', async () => {
    const { loadParticipantsListSpy } = makeSut()
    expect(loadParticipantsListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('participants-list'))
  })

  test('Should render ParticipantsItems on success', async () => {
    makeSut()
    const participantsList = screen.getByTestId('participants-list')
    await waitFor(() => participantsList)
    expect(participantsList.querySelectorAll('tr')).toHaveLength(2)
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

  test('Should render BarbecueItem on success', async () => {
    makeSut()
    const barbecueInfo = screen.getByTestId('barbecue-info')
    await waitFor(() => barbecueInfo)
    expect(barbecueInfo).toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('Should render error on failure', async () => {
    const loadBarbecueById = new LoadBarbecueByIdSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadBarbecueById, 'loadById').mockRejectedValueOnce(error)
    makeSut(undefined, loadBarbecueById)
    await waitFor(() => screen.getByTestId('barbecue-info'))
    expect(screen.queryByTestId('barbecue-info')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
  })

  test('Should open modal if click in edit barbecue', async () => {
    makeSut()
    await openModal()
    expect(screen.queryByTestId('modal')).toBeInTheDocument()
  })

  test('Should show description error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut(undefined, undefined, { validationError })
    await openModal()
    Helper.populateField('description')
    Helper.testStatusForField('description-status', validationError, '🟡')
  })
})
