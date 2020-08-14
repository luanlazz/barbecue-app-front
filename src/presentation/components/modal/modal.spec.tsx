import React from 'react'
import { render, screen } from '@testing-library/react'
import Modal from './modal'

const makeSut = (isShowing: boolean): void => {
  render(
    <Modal isShowing={isShowing} handleModal={() => null } title='test'>
    </Modal>
  )
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
})
