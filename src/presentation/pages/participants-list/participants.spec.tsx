import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { ParticipantsList } from '@/presentation/pages'
import { LoadParticipantsListSpy, LoadBarbecueByIdSpy, ValidationStub, SaveBarbecueSpy, SaveParticipantSpy, Helper, RemoveParticipantSpy } from '@/presentation/test'
import { UnexpectedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import faker from 'faker'

type SutTypes = {
  loadParticipantsListSpy: LoadParticipantsListSpy
  loadBarbecueByIdSpy: LoadBarbecueByIdSpy
  saveBarbecueSpy: SaveBarbecueSpy
  saveParticipantSpy: SaveParticipantSpy
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
  const saveParticipantSpy = new SaveParticipantSpy()
  const removeParticipantSpy = new RemoveParticipantSpy()

  render(
    <ApiContext.Provider value={{ }}>
      <Router history={history}>
        <ParticipantsList
          loadParticipantsList={loadParticipantsListSpy}
          loadBarbecueById={loadBarbecueByIdSpy}
          saveBarbecue={saveBarbecueSpy}
          validationBarbecue={validationStub}
          saveParticipant={saveParticipantSpy}
          validationParticipant={validationStub}
          removeParticipant={removeParticipantSpy}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadParticipantsListSpy,
    loadBarbecueByIdSpy,
    saveBarbecueSpy,
    saveParticipantSpy
  }
}

const openModalBarbecue = async (): Promise<void> => {
  await waitFor(() => screen.getByTestId('header'))
  const editItem = screen.getByTestId('editItem')
  fireEvent.click(editItem)
}

const openModalParticipant = async (): Promise<void> => {
  await waitFor(() => screen.getByTestId('header'))
  const newParticipant = screen.getByTestId('newParticipant')
  fireEvent.click(newParticipant)
}

const simulateValidSubmitBarbecue = async (
  date: string = new Date(faker.date.recent()).toISOString().split('T')[0],
  description: string = faker.random.words(),
  observation: string = faker.random.words(),
  suggestValueFood: number = faker.random.number(),
  suggestValueDrink: number = faker.random.number()
): Promise<void> => {
  Helper.populateField('date', date)
  Helper.populateField('description', description)
  Helper.populateField('observation', observation)
  Helper.populateField('suggestValueFood', suggestValueFood.toString())
  Helper.populateField('suggestValueDrink', suggestValueDrink.toString())
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const simulateValidSubmitParticipant = async (
  name = faker.name.findName(),
  pay = faker.random.boolean(),
  value = faker.random.number()
): Promise<void> => {
  Helper.populateField('name', name)
  Helper.populateField('value', value.toString())
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('ParticipantsList Component', () => {
  test('Should call LoadParticipantsList', async () => {
    const { loadParticipantsListSpy } = makeSut()
    expect(loadParticipantsListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('participants-list'))
  })

  test('Should render ParticipantsItems on success', async () => {
    makeSut()
    await waitFor(() => screen.getByTestId('header'))
    const participantsList = screen.getByTestId('participants-list')
    expect(participantsList.querySelectorAll('tr')).toHaveLength(2)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('Should render error on failure', async () => {
    const loadParticipantsListSpy = new LoadParticipantsListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadParticipantsListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadParticipantsListSpy)
    await waitFor(() => screen.getByTestId('header'))
    expect(screen.queryByTestId('participants-list')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
  })

  test('Should call LoadBarbecueById', async () => {
    const { loadBarbecueByIdSpy } = makeSut()
    expect(loadBarbecueByIdSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('header'))
  })

  test('Should render BarbecueItem on success', async () => {
    makeSut()
    await waitFor(() => screen.getByTestId('header'))
    const barbecueInfo = screen.getByTestId('barbecue-info')
    expect(barbecueInfo).toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('Should render error on failure', async () => {
    const loadBarbecueById = new LoadBarbecueByIdSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadBarbecueById, 'loadById').mockRejectedValueOnce(error)
    makeSut(undefined, loadBarbecueById)
    await waitFor(() => screen.getByTestId('header'))
    expect(screen.queryByTestId('barbecue-info')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
  })

  test('Should open modal if click in edit barbecue', async () => {
    makeSut()
    await openModalBarbecue()
    expect(screen.queryByTestId('modal')).toBeInTheDocument()
  })

  test('Should close modal after SaveBarbecue success', async () => {
    makeSut()
    await openModalBarbecue()
    await simulateValidSubmitBarbecue()
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  test('Should open modal if click in new participant', async () => {
    makeSut()
    await openModalParticipant()
    expect(screen.queryByTestId('modal')).toBeInTheDocument()
  })

  test('Should close modal after SaveParticipant on success', async () => {
    makeSut()
    await openModalParticipant()
    await simulateValidSubmitParticipant()
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })
})
