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
  saveBarbecueSpy: SaveBarbecueSpy
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
    loadBarbecueByIdSpy,
    saveBarbecueSpy
  }
}

const openModal = async (): Promise<void> => {
  await waitFor(() => screen.getByTestId('header'))
  const editItem = screen.getByTestId('editItem')
  fireEvent.click(editItem)
}

const simulateValidSubmit = async (
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
    await openModal()
    expect(screen.queryByTestId('modal')).toBeInTheDocument()
  })

  test('Should show date error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut(undefined, undefined, { validationError })
    await openModal()
    Helper.populateField('date')
    Helper.testStatusForField('date-status', validationError, '🟡')
  })

  test('Should show description error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut(undefined, undefined, { validationError })
    await openModal()
    Helper.populateField('description')
    Helper.testStatusForField('description-status', validationError, '🟡')
  })

  test('Should enable submit button if form is valid', async () => {
    makeSut()
    await openModal()
    Helper.populateField('date')
    Helper.populateField('description')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should call SaveBarbecue with correct values', async () => {
    const { saveBarbecueSpy } = makeSut()
    const date = new Date(faker.date.recent()).toISOString().split('T')[0]
    const description = faker.random.words()
    const observation = faker.random.words()
    const valueSuggestFood = faker.random.number()
    const valueSuggestDrink = faker.random.number()
    await openModal()
    await simulateValidSubmit(date, description, observation, valueSuggestFood, valueSuggestDrink)
    expect(saveBarbecueSpy.params.date).toEqual(new Date(date))
    expect(saveBarbecueSpy.params.description).toEqual(description)
    expect(saveBarbecueSpy.params.observation).toEqual(observation)
    expect(saveBarbecueSpy.params.valueSuggestFood).toEqual(valueSuggestFood)
    expect(saveBarbecueSpy.params.valueSuggestDrink).toEqual(valueSuggestDrink)
  })

  test('Should not call SaveBarbecue if form is invalid', async () => {
    const validationError = faker.random.words()
    const { saveBarbecueSpy } = makeSut(undefined, undefined, { validationError })
    await openModal()
    await simulateValidSubmit()
    expect(saveBarbecueSpy.callsCount).toBe(0)
  })

  test('Should close modal after SaveBarbecue success', async () => {
    makeSut()
    await openModal()
    await simulateValidSubmit()
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })
})
