import React, { useEffect, useState } from 'react'
import Styles from './barbecue-list-styles.scss'
import { Header, Input } from '@/presentation/components'
import { BarbecueListItems, BarbecueContext, Error } from '@/presentation/pages/barbecue-list/components'
import { LoadBarbecueList } from '@/domain/usecases'
import { FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  loadBarbecueList: LoadBarbecueList
  validation: Validation
}

const BarbecueList: React.FC<Props> = ({ loadBarbecueList, validation }: Props) => {
  const [state, setState] = useState({
    barbecues: [] as LoadBarbecueList.Model[],
    isLoading: false,
    isModalOpen: false,
    isFormInvalid: true,
    error: '',
    date: '',
    dateError: '',
    description: '',
    descriptionError: '',
    observation: '',
    observationError: '',
    suggestValueDrink: '',
    suggestValueDrinkError: '',
    suggestValueFood: '',
    suggestValueFoodError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      isLoading: true
    })

    loadBarbecueList.loadAll()
      .then(barbecues => setState({
        ...state,
        isLoading: false,
        barbecues
      }))
      .catch(error => setState({
        ...state,
        isLoading: false,
        error: error.message
      }))
    console.log('load')
  }, [])

  useEffect(() => { validate('description') }, [state.description])

  const validate = (field: string): void => {
    const { date, description } = state
    const formData = { date, description }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.dateError }))
    console.log('validate')
  }

  console.log('state', state.dateError)

  const newBarbecue = (): void => {
    openModal()
  }

  const openModal = (): void => {
    setState({ ...state, isModalOpen: true })
  }

  const closeModal = (): void => {
    setState({ ...state, isModalOpen: false })
  }

  return (
    <div className={Styles.barbecueListWrap}>

      <Header />

      <BarbecueContext.Provider value={{ state, setState, newBarbecue }}>
        <div className={Styles.contentWrap}>
          {state.error
            ? <Error />
            : <BarbecueListItems />
          }
        </div>

        {state.isModalOpen && <div data-testid='modal' className={(Styles.modal)}>
          <div className={Styles.inputWrap}>
            <span className={Styles.title}>
              Próximo churas
            </span>

            <FormContext.Provider value={{ state, setState }}>
              <form data-testid='form' className={Styles.form}>
                <Input type="date" name='date' className={Styles.date} placeholder="data" />
                <Input type="text" name='description' className={Styles.description} placeholder="descrição" />
                <textarea name='observation' rows={2} className={Styles.observation} placeholder="observação" />
                <span>Valores sugeridos</span>
                <div className={Styles.suggest}>
                  <Input type="number" name='suggestValueFood' placeholder="comida" />
                  <Input type="number" name='suggestValueDrink' placeholder="bebida" />
                </div>
                <div className={Styles.buttonsWrap}>
                  <button type='reset' onClick={closeModal}>Cancelar</button>
                  <button type='submit'>Confirmar</button>
                </div>
              </form>
            </FormContext.Provider>

          </div>
        </div>}

      </BarbecueContext.Provider>

    </div>
  )
}

export default BarbecueList
