import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BarbecueList } from '@/presentation/pages'
import { LoadBarbecueList } from '@/domain/usecases/load-barbecue-list'
import { BarbecueModel } from '@/domain/models'
import { mockBarbecuesModel } from '@/domain/test'
import { UnexpectedError } from '@/domain/errors'

class LoadBarbecueListSpy implements LoadBarbecueList {
  callsCount: number = 0
  barbecues = mockBarbecuesModel()

  async loadAll (): Promise<BarbecueModel[]> {
    this.callsCount++
    return this.barbecues
  }
}

type SutTypes = {
  loadBarbecueListSpy: LoadBarbecueListSpy
}

const makeSut = (loadBarbecueListSpy = new LoadBarbecueListSpy()): SutTypes => {
  render(
    <BarbecueList loadBarbecueList={loadBarbecueListSpy} />
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
})
