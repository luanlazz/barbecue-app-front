import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ConfirmAction from './confirm-action'

type SutTypes = {
  callbackMock: Function
  handleModalMock: Function
}

const makeSut = (): SutTypes => {
  const callbackMock = jest.fn().mockImplementationOnce(async () => Promise.resolve({ data: {} }))
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

  test('Should call handleModal on cancel', async () => {
    const { handleModalMock } = makeSut()
    const cancel = screen.getByTestId('reset')
    fireEvent.click(cancel)
    expect(handleModalMock).toHaveBeenCalled()
  })
})
