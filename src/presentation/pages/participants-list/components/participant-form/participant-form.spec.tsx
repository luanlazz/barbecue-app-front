import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { ParticipantForm } from '@/presentation/pages/participants-list/components'
import { ValidationStub, SaveParticipantSpy, Helper } from '@/presentation/test'
import { ApiContext } from '@/presentation/contexts'
import { InvalidCredentialsError } from '@/domain/errors'
import { mockBarbecueModel } from '@/domain/test'
import faker from 'faker'

type SutTypes = {
  saveParticipantSpy: SaveParticipantSpy
  handleModalMock: Function
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/barbecue'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const saveParticipantSpy = new SaveParticipantSpy()
  const callBackMock = jest.fn()
  const handleModalMock = jest.fn()

  render(
    <ApiContext.Provider value={{}}>
      <Router history={history}>
        <ParticipantForm
          saveParticipant={saveParticipantSpy}
          validation={validationStub}
          callBack={callBackMock}
          barbecue={mockBarbecueModel()}
          handleModal={handleModalMock}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    saveParticipantSpy,
    handleModalMock
  }
}

const simulateValidSubmitParticipant = async (
  name = faker.name.findName(),
  pay = faker.random.boolean(),
  value = faker.random.number()
): Promise<void> => {
  Helper.populateField('name', name)
  Helper.populateField('value', value.toString())
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('ParticipantsForm Component', () => {
  test('Should show name error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('name')
    Helper.testStatusForField('name-status', validationError, '🟡')
  })

  test('Should not call SaveParticipant if form is invalid', async () => {
    const validationError = faker.random.words()
    const { saveParticipantSpy } = makeSut({ validationError })
    await simulateValidSubmitParticipant()
    expect(saveParticipantSpy.callsCount).toBe(0)
  })

  test('Should call handleModal on reset button', async () => {
    const { handleModalMock } = makeSut()
    fireEvent.click(screen.getByTestId('reset'))
    expect(handleModalMock).toHaveBeenCalled()
  })

  test('Should enable submit button if form is valid', async () => {
    makeSut()
    Helper.populateField('name')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should call SaveParticipant with correct values', async () => {
    const { saveParticipantSpy } = makeSut()
    const name = faker.name.findName()
    const pay = faker.random.boolean()
    const value = faker.random.number()
    await simulateValidSubmitParticipant(name, pay, value)
    expect(saveParticipantSpy.params.name).toEqual(name)
    expect(saveParticipantSpy.params.value).toEqual(value)
  })

  test('Should present error if SaveParticipant fails', async () => {
    const { saveParticipantSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveParticipantSpy, 'save').mockRejectedValueOnce(error)
    await simulateValidSubmitParticipant()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })
})
