import React from 'react'
import { render, screen } from '@testing-library/react'
import Modal from './modal'

describe('Modal Component', () => {
  test('Should show modal if isShowing true', () => {
    render(
      <Modal isShowing handleModal={() => null } title='test'>
      </Modal>
    )
    expect(screen.queryByTestId('modal')).toBeInTheDocument()
  })
})
