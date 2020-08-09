import React, { useEffect, useState } from 'react'
import Styles from './barbecue-list-styles.scss'
import { Header, Input, FormStatus, MainContainer, ContentContainer } from '@/presentation/components'
import { BarbecueListItems, BarbecueContext, Error } from '@/presentation/pages/barbecue-list/components'
import { LoadBarbecueList, SaveBarbecue } from '@/domain/usecases'
import { FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  loadBarbecueList: LoadBarbecueList
  saveBarbecue: SaveBarbecue
  validation: Validation
}

const BarbecueList: React.FC<Props> = ({ loadBarbecueList, saveBarbecue, validation }: Props) => {
  const [state, setState] = useState({
    barbecues: [] as LoadBarbecueList.Model[],
    isLoading: false,
    isModalOpen: false,
    isFormInvalid: true,
    error: '',
    mainError: '',
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

  useEffect(() => {
    setState(old => ({
      ...old,
      isLoading: true
    }))

    loadBarbecueList.loadAll()
      .then(barbecues => setState(old => ({
        ...old,
        isLoading: false,
        barbecues
      })))
      .catch(error => setState(old => ({
        ...old,
        isLoading: false,
        error: error.message
      })))
  }, [])

  useEffect(() => { validate('date') }, [state.date, state.isModalOpen])
  useEffect(() => { validate('description') }, [state.description, state.isModalOpen])

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
      ...state,
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
      .then(barbecue => setState(old => ({
        ...old,
        date: null,
        description: '',
        observation: '',
        suggestValueDrink: '0',
        suggestValueFood: '0',
        isLoading: false,
        barbecues: [...old.barbecues, barbecue]
      })))
      .catch(error => setState({
        ...state,
        isLoading: false,
        mainError: error.message
      }))

    handleModal()
  }

  const handleModal = (): void => {
    setState({ ...state, isModalOpen: !state.isModalOpen })
  }

  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <MainContainer>

      <Header />

      <BarbecueContext.Provider value={{ state, setState, handleModal }}>
        <ContentContainer>
          {state.error
            ? <Error />
            : <BarbecueListItems />
          }
        </ContentContainer>

        {state.isModalOpen && <div data-testid='modal' className={(Styles.modal)}>
          <div className={Styles.inputWrap}>
            <span className={Styles.title}>
              Próximo churas
            </span>

            <FormContext.Provider value={{ state, setState }}>
              <form data-testid='form' className={Styles.form} onSubmit={handleNewBarbecue}>

                <Input type="date" name='date' className={Styles.date} placeholder="data" />
                <Input type="text" name='description' className={Styles.description} placeholder="descrição" />
                <textarea
                  data-testid='observation-input'
                  name='observation'
                  rows={2}
                  className={Styles.observation}
                  placeholder="observação"
                  onChange={handleChangeTextArea}
                />
                <span>Valores sugeridos</span>
                <div className={Styles.suggest}>
                  <Input type="number" min={0} name='suggestValueFood' placeholder="comida" />
                  <Input type="number" min={0} name='suggestValueDrink' placeholder="bebida" />
                </div>

                <div className={Styles.buttonsWrap}>
                  <button type='reset' onClick={handleModal}>Cancelar</button>
                  <button type='submit' data-testid='submit' disabled={state.isFormInvalid} >Confirmar</button>
                </div>

                <FormStatus />

              </form>
            </FormContext.Provider>

          </div>
        </div>}

      </BarbecueContext.Provider>

    </MainContainer>
  )
}

export default BarbecueList
