import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ConfirmAction from './confirm-action'

type SutTypes = {
  callbackMock: Function
  handleModalMock: Function
}

const makeSut = (): SutTypes => {
  const callbackMock = jest.fn()
  const handleModalMock = jest.fn()
  render(
    <ConfirmAction
      isShowing
      callBack={callbackMock}
      handleModal={handleModalMock}
      title={'test'}
    />
  )
  return {
    callbackMock,
    handleModalMock
  }
}

const simulateSubmit = async (): Promise<void> => {
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('ConfirmAction Component', () => {
  test('Should call callback on submit', async () => {
    const { callbackMock } = makeSut()
    await simulateSubmit()
    expect(callbackMock).toHaveBeenCalled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call handleModal on cancel', async () => {
    const { handleModalMock } = makeSut()
    const cancel = screen.getByTestId('reset')
    fireEvent.click(cancel)
    expect(handleModalMock).toHaveBeenCalled()
  })

  test('Should not call callback if in loading', async () => {
    const { callbackMock } = makeSut()
    await simulateSubmit()
    await simulateSubmit()
    expect(callbackMock).toBeCalledTimes(1)
  })
})
