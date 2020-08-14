import React, { useState, useEffect } from 'react'
import Styles from './barbecue-form-styles.scss'
import { Input, InputNoStatus, FormStatus, TextArea } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { SaveBarbecue } from '@/domain/usecases'
import { FormContext } from '@/presentation/contexts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger, faBeer } from '@fortawesome/free-solid-svg-icons'

type CallBackType = (barbecue: SaveBarbecue.Params) => void

type Props = {
  saveBarbecue: SaveBarbecue
  validation: Validation
  callBack: CallBackType
  barbecue?: SaveBarbecue.Params
  handleModal: Function
}

const BarbecueInput: React.FC<Props> = ({ saveBarbecue, validation, callBack, barbecue, handleModal }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    mainError: '',
    isFormInvalid: true,
    date: new Date().toISOString().split('T')[0],
    dateError: '',
    description: '',
    descriptionError: '',
    observation: '',
    observationError: '',
    suggestValueDrink: '0',
    suggestValueDrinkError: '',
    suggestValueFood: '0',
    suggestValueFoodError: ''
  })

  useEffect(() => {
    if (barbecue) {
      setState(old => ({
        ...old,
        date: new Date(barbecue.date).toISOString().split('T')[0],
        description: barbecue.description,
        observation: barbecue.observation,
        suggestValueDrink: barbecue.valueSuggestDrink.toString(),
        suggestValueFood: barbecue.valueSuggestFood.toString()
      }))
    }
  }, [])

  useEffect(() => { validate('date') }, [state.date])
  useEffect(() => { validate('description') }, [state.description])
  useEffect(() => { validate('observation') }, [state.observation])
  useEffect(() => { validate('suggestValueDrink') }, [state.suggestValueDrink])
  useEffect(() => { validate('suggestValueFood') }, [state.suggestValueFood])

  const validate = (field: string): void => {
    const { date, description } = state
    const formData = { date, description }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.dateError || !!old.descriptionError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (state.isLoading || state.isFormInvalid) return

    setState(old => ({
      ...old,
      isLoading: true,
      mainError: ''
    }))

    saveBarbecue.save({
      date: new Date(`${state.date}T00:00:00`),
      description: state.description,
      observation: state.observation,
      valueSuggestDrink: parseInt(state.suggestValueDrink),
      valueSuggestFood: parseInt(state.suggestValueFood)
    })
      .then(barbecue => {
        callBack(barbecue)
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

        <Input type="date" name='date' className={Styles.date} placeholder="data" />
        <Input type="text" name='description' className={Styles.description} placeholder="descrição" />
        <TextArea name='observation' className={Styles.observation} placeholder="observação" />

        <span className={Styles.textSuggest}>Valores sugeridos</span>

        <div className={Styles.suggest}>
          <FontAwesomeIcon icon={faHamburger} size='2x' />
          <InputNoStatus type="number" step='0.01' min={0} name='suggestValueFood' placeholder="comida" />
          <FontAwesomeIcon icon={faBeer} size='2x'/>
          <InputNoStatus type="number" step='0.01' min={0} name='suggestValueDrink' placeholder="bebida" />
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

export default BarbecueInput
