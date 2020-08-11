import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Header } from '@/presentation/components'
import { render, fireEvent, screen } from '@testing-library/react'
import { ApiContext } from '@/presentation/contexts'

describe('Header Components', () => {
  test('Should call setCurrentAccount with null', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router history={history}>
          <Header buttonExit />
        </Router>
      </ApiContext.Provider>
    )
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
