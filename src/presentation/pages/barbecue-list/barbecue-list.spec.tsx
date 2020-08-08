import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BarbecueList } from '@/presentation/pages'
import { UnexpectedError } from '@/domain/errors'
import { LoadBarbecueListSpy, SaveBarbecueSpy } from '@/presentation/test/mock-barbecue'
import { ValidationStub, Helper } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  loadBarbecueListSpy: LoadBarbecueListSpy
  saveBarbecueSpy: SaveBarbecueSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (loadBarbecueListSpy = new LoadBarbecueListSpy(), params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const saveBarbecueSpy = new SaveBarbecueSpy()
  render(
    <BarbecueList
      loadBarbecueList={loadBarbecueListSpy}
      saveBarbecue={saveBarbecueSpy}
      validation={validationStub}
    />
  )
  return {
    loadBarbecueListSpy,
    saveBarbecueSpy
  }
}

const openModal = async (): Promise<void> => {
  const barbecueList = screen.getByTestId('barbecue-list')
  await waitFor(() => barbecueList)
  const newItem = screen.getByTestId('newItem')
  fireEvent.click(newItem)
}

const simulateValidSubmit = async (
  description: string = faker.random.words(),
  observation: string = faker.random.words(),
  suggestValueFood: number = faker.random.number(),
  suggestValueDrink: number = faker.random.number()
): Promise<void> => {
  Helper.populateField('description', description)
  Helper.populateField('observation', observation)
  Helper.populateField('suggestValueFood', suggestValueFood.toString())
  Helper.populateField('suggestValueDrink', suggestValueDrink.toString())
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('BarbecueList Component', () => {
  test('Should present 3 empty items on start', async () => {
    makeSut()
    const barbecueList = screen.getByTestId('barbecue-list')
    expect(barbecueList.querySelectorAll('li:empty')).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => barbecueList)
  })

  test('Should call LoadBarbecueList', async () => {
    const { loadBarbecueListSpy } = makeSut()
    expect(loadBarbecueListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('barbecue-list'))
  })

  test('Should render BarbecueItems on success', async () => {
    makeSut()
    const barbecueList = screen.getByTestId('barbecue-list')
    await waitFor(() => barbecueList)
    expect(barbecueList.querySelectorAll('li.barbecueItemWrap')).toHaveLength(2)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('Should render error on failure', async () => {
    const loadBarbecueListSpy = new LoadBarbecueListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadBarbecueListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadBarbecueListSpy)
    await waitFor(() => screen.getByTestId('barbecue-list'))
    expect(screen.queryByTestId('barbecue-list')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
  })

  test('Should show new item after loading', async () => {
    makeSut()
    const barbecueList = screen.getByTestId('barbecue-list')
    await waitFor(() => barbecueList)
    expect(screen.queryByTestId('newItem')).toBeInTheDocument()
  })

  test('Should open modal on click in new barbecue', async () => {
    makeSut()
    await openModal()
    expect(screen.queryByTestId('modal')).toBeInTheDocument()
  })

  test('Should show description error if Validation fails', async () => {
    const validationError = faker.random.words()
    const loadBarbecueListSpy = new LoadBarbecueListSpy()
    makeSut(loadBarbecueListSpy,{ validationError })
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

  test('Should show spinner on submit', async () => {
    makeSut()
    await openModal()
    await simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call SaveBarbecue with correct values', async () => {
    const { saveBarbecueSpy } = makeSut()
    const description = faker.random.words()
    const observation = faker.random.words()
    const valueSuggestFood = faker.random.number()
    const valueSuggestDrink = faker.random.number()
    await openModal()
    await simulateValidSubmit(description, observation, valueSuggestFood, valueSuggestDrink)
    expect(saveBarbecueSpy.params.description).toEqual(description)
    expect(saveBarbecueSpy.params.observation).toEqual(observation)
    expect(saveBarbecueSpy.params.valueSuggestFood).toEqual(valueSuggestFood)
    expect(saveBarbecueSpy.params.valueSuggestDrink).toEqual(valueSuggestDrink)
  })

  test('Should call SaveBarbecue only once', async () => {
    const { saveBarbecueSpy } = makeSut()
    await openModal()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(saveBarbecueSpy.callsCount).toBe(1)
  })
})
