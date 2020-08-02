import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('', () => {
  test('Should not render spinner and error on start ', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const buttonSubmit = getByTestId('btn-submit')
    expect(buttonSubmit.textContent).toBe('Entrar')
    expect(buttonSubmit.childNodes.length).toBe(1)
  })
})
