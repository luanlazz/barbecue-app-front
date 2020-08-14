import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import BarbecueInput from './barbecue-form'
import { ApiContext } from '@/presentation/contexts'
import { ValidationStub, Helper, SaveBarbecueSpy } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import faker from 'faker'

type SutTypes = {
  saveBarbecueSpy: SaveBarbecueSpy
  handleModalMock: Function
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const saveBarbecueSpy = new SaveBarbecueSpy()
  const setCurrentAccountMock = jest.fn()
  const callBackMock = jest.fn()
  const handleModalMock = jest.fn()

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <BarbecueInput
          saveBarbecue={saveBarbecueSpy}
          validation={validationStub}
          callBack={callBackMock}
          handleModal={handleModalMock}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    saveBarbecueSpy,
    handleModalMock
  }
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

describe('BarbecueForm component', () => {
  test('Should show date error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('date')
    Helper.testStatusForField('date-status', validationError, '🟡')
  })

  test('Should show description error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('description')
    Helper.testStatusForField('description-status', validationError, '🟡')
  })

  test('Should call handleModal on reset button', async () => {
    const { handleModalMock } = makeSut()
    fireEvent.click(screen.getByTestId('reset'))
    expect(handleModalMock).toHaveBeenCalled()
  })

  test('Should enable submit button if form is valid', async () => {
    makeSut()
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
    await simulateValidSubmit(date, description, observation, valueSuggestFood, valueSuggestDrink)
    expect(saveBarbecueSpy.params.date).toEqual(new Date(`${date}T00:00:00`))
    expect(saveBarbecueSpy.params.description).toEqual(description)
    expect(saveBarbecueSpy.params.observation).toEqual(observation)
    expect(saveBarbecueSpy.params.valueSuggestFood).toEqual(valueSuggestFood)
    expect(saveBarbecueSpy.params.valueSuggestDrink).toEqual(valueSuggestDrink)
  })

  test('Should not call SaveBarbecue if form is invalid', async () => {
    const validationError = faker.random.words()
    const { saveBarbecueSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(saveBarbecueSpy.callsCount).toBe(0)
  })

  test('Should present error if SaveBarbecue fails', async () => {
    const { saveBarbecueSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveBarbecueSpy, 'save').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })
})
