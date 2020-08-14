import React, { useState, useEffect } from 'react'
import Styles from './participant-form-styles.scss'
import { Input, InputNoStatus, FormStatus } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { SaveParticipant } from '@/domain/usecases'
import { FormContext } from '@/presentation/contexts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger, faBeer } from '@fortawesome/free-solid-svg-icons'
import { BarbecueModel } from '@/domain/test'

type CallBackType = (participant: SaveParticipant.Model) => void

type Props = {
  saveParticipant: SaveParticipant
  validation: Validation
  callBack: CallBackType
  participant?: SaveParticipant.Params
  barbecue: BarbecueModel
  handleModal: Function
}

const ParticipantForm: React.FC<Props> = ({ saveParticipant, validation, callBack, participant, barbecue, handleModal }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    mainError: '',
    isFormInvalid: true,
    name: '',
    nameError: '',
    pay: false,
    payError: '',
    value: '0',
    valueError: ''
  })

  useEffect(() => {
    if (participant) {
      setState(old => ({
        ...old,
        name: participant.name,
        pay: participant.pay,
        value: participant.value.toString()
      }))
    }
  }, [])

  useEffect(() => { validate('name') }, [state.name])
  useEffect(() => { validate('pay') }, [state.pay])
  useEffect(() => { validate('value') }, [state.value])

  const validate = (field: string): void => {
    const { name, pay, value } = state
    const formData = { name, pay, value }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.nameError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (state.isLoading || state.isFormInvalid) return

    setState(old => ({
      ...old,
      isLoading: true,
      mainError: ''
    }))

    saveParticipant.save({
      name: state.name,
      pay: state.pay,
      value: parseFloat(state.value)
    })
      .then(participant => {
        callBack(participant)
        handleModal()
      })
      .catch(error => setState(old => ({
        ...old,
        isLoading: false,
        mainError: error.message
      })))
  }

  return (
    <FormContext.Provider value={{ state, setState }}>
      <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>

        <Input type="text" name='name' className={Styles.name} placeholder="nome" />

        <span>Contribuição</span>

        <div className={Styles.value}>
          <InputNoStatus type="number" step='0.01' min={0} name='value' placeholder="valor" />

          <div className={Styles.suggest}>
            {!!barbecue.valueSuggestFood &&
              <div className={Styles.food}>
                <FontAwesomeIcon icon={faHamburger} className={Styles.icon} size='1x' />
                <span>{barbecue.valueSuggestFood}</span>
              </div>
            }

            {!!barbecue.valueSuggestDrink &&
              <div className={Styles.drink}>
                <FontAwesomeIcon icon={faBeer} className={Styles.icon} size='1x' />
                <span>{barbecue.valueSuggestDrink}</span>
              </div>
            }
          </div>

          <div className={Styles.sumSuggest}>
            {(!!barbecue.valueSuggestFood && !!barbecue.valueSuggestDrink) &&
              <span> = {barbecue.valueSuggestFood + barbecue.valueSuggestDrink}</span>
            }
          </div>
        </div>

        <div className={Styles.buttonsWrap}>
          <button type='reset' data-testid='reset' onClick={() => handleModal()}>Cancelar</button>
          <button type='submit' data-testid='submit' disabled={state.isFormInvalid}>Confirmar</button>
        </div>

        <FormStatus />

      </form>
    </FormContext.Provider>
  )
}

export default ParticipantForm
