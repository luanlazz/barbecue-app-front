import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BarbecueList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { ValidationStub, Helper, LoadBarbecueListSpy, SaveBarbecueSpy } from '@/presentation/test'
import { UnexpectedError, InvalidCredentialsError, AccessDeniedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import faker from 'faker'

type SutTypes = {
  loadBarbecueListSpy: LoadBarbecueListSpy
  saveBarbecueSpy: SaveBarbecueSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (loadBarbecueListSpy = new LoadBarbecueListSpy(), params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const saveBarbecueSpy = new SaveBarbecueSpy()
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <BarbecueList
          loadBarbecueList={loadBarbecueListSpy}
          saveBarbecue={saveBarbecueSpy}
          validation={validationStub}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadBarbecueListSpy,
    saveBarbecueSpy,
    history,
    setCurrentAccountMock
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

  test('Should render error on UnexpectedError', async () => {
    const loadBarbecueListSpy = new LoadBarbecueListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadBarbecueListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadBarbecueListSpy)
    await waitFor(() => screen.getByTestId('barbecue-list'))
    expect(screen.queryByTestId('barbecue-list')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
  })

  test('Should logout on accessDeniedError', async () => {
    const loadBarbecueListSpy = new LoadBarbecueListSpy()
    jest.spyOn(loadBarbecueListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut(loadBarbecueListSpy)
    await waitFor(() => screen.getByTestId('barbecue-list'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
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
    makeSut(undefined,{ validationError })
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

  test('Should not call SaveBarbecue if form is invalid', async () => {
    const validationError = faker.random.words()
    const { saveBarbecueSpy } = makeSut(undefined, { validationError })
    await openModal()
    await simulateValidSubmit()
    expect(saveBarbecueSpy.callsCount).toBe(0)
  })

  test('Should present error if SaveBarbecue fails', async () => {
    const { saveBarbecueSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveBarbecueSpy, 'save').mockRejectedValueOnce(error)
    await openModal()
    await simulateValidSubmit()
    expect(screen.queryByTestId('modal')).toBeInTheDocument()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should close modal after SaveBarbecue success', async () => {
    makeSut()
    const barbecueList = screen.getByTestId('barbecue-list')
    await waitFor(() => barbecueList)
    const countBefore = barbecueList.querySelectorAll('li.barbecueItemWrap').length
    await openModal()
    await simulateValidSubmit()
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
    await waitFor(() => screen.getByTestId('barbecue-list'))
    const barbecueListAfter = screen.getByTestId('barbecue-list')
    await waitFor(() => barbecueListAfter)
    expect(barbecueListAfter.querySelectorAll('li.barbecueItemWrap')).toHaveLength(countBefore + 1)
  })
})
