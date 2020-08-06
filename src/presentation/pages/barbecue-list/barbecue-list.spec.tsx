import React from 'react'
import { render, screen } from '@testing-library/react'
import { BarbecueList } from '@/presentation/pages'
import { LoadBarbecueList } from '@/domain/usecases/load-barbecue-list'
import { BarbecueModel } from '@/domain/models'

class LoadBarbecueListSpy implements LoadBarbecueList {
  callsCount: number=0

  async loadAll (): Promise<BarbecueModel[]> {
    this.callsCount++
    return []
  }
}

type SutTypes = {
  loadBarbecueListSpy: LoadBarbecueListSpy
}

const makeSut = (): SutTypes => {
  const loadBarbecueListSpy = new LoadBarbecueListSpy()
  render(
    <BarbecueList loadBarbecueList={loadBarbecueListSpy} />
  )
  return {
    loadBarbecueListSpy
  }
}

describe('BarbecueList Component', () => {
  test('Should present 3 empty items on start', () => {
    makeSut()
    const barbecueList = screen.getByTestId('barbecue-list')
    expect(barbecueList.querySelectorAll('li:empty').length).toBe(3)
  })

  test('Should call LoadBarbecueList', () => {
    const { loadBarbecueListSpy } = makeSut()
    expect(loadBarbecueListSpy.callsCount).toBe(1)
  })
})
