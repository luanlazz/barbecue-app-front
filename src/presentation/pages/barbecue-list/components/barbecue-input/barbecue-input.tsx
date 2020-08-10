import React, { useState, useEffect, useContext } from 'react'
import Styles from './barbecue-input-styles.scss'
import { Input, InputNoStatus, FormStatus, TextArea } from '@/presentation/components'
import { BarbecueContext } from '@/presentation/pages/barbecue-list/components'
import { Validation } from '@/presentation/protocols/validation'
import { SaveBarbecue } from '@/domain/usecases'
import { FormContext } from '@/presentation/contexts'

type Props = {
  saveBarbecue: SaveBarbecue
  validation: Validation
}

const BarbecueInput: React.FC<Props> = ({ saveBarbecue,validation }: Props) => {
  const { setBarbecueListState, handleModal } = useContext(BarbecueContext)

  const [state, setState] = useState({
    isLoading: false,
    mainError: '',
    isFormInvalid: true,
    date: null,
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

  useEffect(() => { validate('date') }, [state.date])
  useEffect(() => { validate('description') }, [state.description])

  const validate = (field: string): void => {
    const { date, description } = state
    const formData = { date, description }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.dateError || !!old.descriptionError }))
  }

  const handleNewBarbecue = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (state.isLoading || state.isFormInvalid) return

    setState(old => ({
      ...old,
      isLoading: true,
      mainError: ''
    }))

    saveBarbecue.save({
      date: state.date,
      description: state.description,
      observation: state.observation,
      valueSuggestDrink: parseInt(state.suggestValueDrink),
      valueSuggestFood: parseInt(state.suggestValueFood)
    })
      .then(barbecue => {
        setBarbecueListState(old => ({
          ...old,
          barbecues: [...old.barbecues, barbecue]
        }))
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
      <form data-testid='form' className={Styles.form} onSubmit={handleNewBarbecue}>

        <Input type="date" name='date' className={Styles.date} placeholder="data" />
        <Input type="text" name='description' className={Styles.description} placeholder="descrição" />
        <TextArea name='observation' className={Styles.observation} placeholder="observação" />

        <span>Valores sugeridos</span>
        <div className={Styles.suggest}>
          <InputNoStatus type="number" min={0} name='suggestValueFood' placeholder="comida" />
          <InputNoStatus type="number" min={0} name='suggestValueDrink' placeholder="bebida" />
        </div>

        <div className={Styles.buttonsWrap}>
          <button type='reset' onClick={handleModal}>Cancelar</button>
          <button type='submit' data-testid='submit' disabled={state.isFormInvalid}>Confirmar</button>
        </div>

        <FormStatus />

      </form>
    </FormContext.Provider>
  )
}

export default BarbecueInput
