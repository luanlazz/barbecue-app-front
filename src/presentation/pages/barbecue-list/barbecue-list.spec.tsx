import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BarbecueList } from '@/presentation/pages'
import { UnexpectedError } from '@/domain/errors'
import { LoadBarbecueListSpy } from '@/presentation/test/mock-barbecue'
import { ValidationStub, Helper } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  loadBarbecueListSpy: LoadBarbecueListSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (loadBarbecueListSpy = new LoadBarbecueListSpy(), params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  render(
    <BarbecueList
      loadBarbecueList={loadBarbecueListSpy}
      validation={validationStub}
    />
  )
  return {
    loadBarbecueListSpy
  }
}

const openModal = async (): Promise<void> => {
  const barbecueList = screen.getByTestId('barbecue-list')
  await waitFor(() => barbecueList)
  const newItem = screen.getByTestId('newItem')
  fireEvent.click(newItem)
}

const populateFieldDate = (fieldName: string, value: Date = faker.date.recent()): void => {
  const input = screen.getByTestId(`${fieldName}-input`)
  fireEvent.input(input, { target: { value } })
}

const simulateValidSubmit = async (date: Date = faker.date.recent(), description: string = faker.random.words()): Promise<void> => {
  await openModal()
  populateFieldDate('date', date)
  Helper.populateField('description', description)
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
    await simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })
})
