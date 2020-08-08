import React, { useEffect, useState } from 'react'
import Styles from './barbecue-list-styles.scss'
import { Header, Input } from '@/presentation/components'
import { BarbecueListItems, BarbecueContext, Error } from '@/presentation/pages/barbecue-list/components'
import { LoadBarbecueList } from '@/domain/usecases'
import { FormContext } from '@/presentation/contexts'

type Props = {
  loadBarbecueList: LoadBarbecueList
}

const BarbecueList: React.FC<Props> = ({ loadBarbecueList }: Props) => {
  const [state, setState] = useState({
    barbecues: [] as LoadBarbecueList.Model[],
    isLoading: false,
    isModalOpen: false,
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
  }, [])

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

        {state.isModalOpen && <div className={(Styles.modal)}>
          <div className={Styles.inputWrap}>
            <span className={Styles.title}>
              Próximo churas
            </span>

            <FormContext.Provider value={{ state, setState }}>
              <form className={Styles.form}>
                <Input type="date" className={Styles.date} name='date' placeholder="data" />
                <Input type="text" className={Styles.description} name='description' placeholder="descrição" />
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
