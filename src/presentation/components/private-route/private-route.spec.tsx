import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import PrivateRoute from './private-route'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account: AccountModel = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </ApiContext.Provider>
  )
  return {
    history
  }
}

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should render current component if token is not empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/')
  })
})
