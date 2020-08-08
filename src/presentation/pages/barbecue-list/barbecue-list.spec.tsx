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

  test('Should show new item', async () => {
    makeSut()
    const barbecueList = screen.getByTestId('barbecue-list')
    await waitFor(() => barbecueList)
    expect(screen.queryByTestId('newItem')).toBeInTheDocument()
  })

  test('Should open modal on click in new barbecue', async () => {
    makeSut()
    const barbecueList = screen.getByTestId('barbecue-list')
    await waitFor(() => barbecueList)
    const newItem = screen.getByTestId('newItem')
    fireEvent.click(newItem)
    expect(screen.queryByTestId('modal')).toBeInTheDocument()
  })

  test.only('Should show description error if Validation fails', async () => {
    const validationError = faker.random.words()
    const loadBarbecueListSpy = new LoadBarbecueListSpy()
    makeSut(loadBarbecueListSpy,{ validationError })
    const barbecueList = screen.getByTestId('barbecue-list')
    await waitFor(() => barbecueList)
    const newItem = screen.getByTestId('newItem')
    fireEvent.click(newItem)
    expect(screen.queryByTestId('modal')).toBeInTheDocument()
    expect(screen.queryByTestId('form')).toBeInTheDocument()
    expect(screen.queryByTestId('date-input')).toBeInTheDocument()
    Helper.populateField('description')
    Helper.testStatusForField('description-status', validationError, '🟡')
  })
})
