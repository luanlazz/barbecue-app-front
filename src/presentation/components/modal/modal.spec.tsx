import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Modal from './modal'

type SuytTypes = {
  handleSubmitSpy: Function
}

const makeSut = (isShowing: boolean): SuytTypes => {
  const handleSubmitSpy = jest.fn()

  render(
    <Modal isShowing={isShowing} handleModal={handleSubmitSpy} title='test'>
    </Modal>
  )
  return {
    handleSubmitSpy
  }
}

describe('Modal Component', () => {
  test('Should show modal if isShowing true', () => {
    makeSut(true)
    expect(screen.queryByTestId('modal')).toBeInTheDocument()
  })

  test('Should not show modal if isShowing false', () => {
    makeSut(false)
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  test('Should not show modal if isShowing false', () => {
    const { handleSubmitSpy } = makeSut(true)
    fireEvent.click(screen.getByTestId('handle-modal'))
    expect(handleSubmitSpy).toHaveBeenCalled()
  })
})
