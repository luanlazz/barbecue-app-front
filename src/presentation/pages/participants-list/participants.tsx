import React, { useState, useEffect } from 'react'
import Styles from './participants-styles.scss'
import { Header, MainContainer, ContentContainer, Modal , Input, InputNoStatus, FormStatus, TextArea } from '@/presentation/components'
import { Error, ParticipantsContext, ParticipantsListItems, BarbecueInfo, BarbecueInfoEmpty } from './components'
import { FormContext } from '@/presentation/contexts'
import { useErrorHandler, useModal } from '@/presentation/hooks'
import { LoadParticipantsList, LoadBarbecueById, SaveBarbecue } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  loadParticipantsList: LoadParticipantsList
  loadBarbecueById: LoadBarbecueById
  saveBarbecue: SaveBarbecue
  validation: Validation
}

const ParticipantsList: React.FC<Props> = ({ loadParticipantsList, loadBarbecueById, saveBarbecue, validation }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({
      ...old,
      isLoading: false,
      error: error.message
    }))
  })

  const { isShowing, handleModal } = useModal()

  const [state, setState] = useState({
    participants: [] as LoadParticipantsList.Model[],
    barbecue: {} as LoadBarbecueById.Model,
    isLoadingBarbecue: false,
    isLoadingParticipants: false,
    isLoading: false,
    isFormInvalid: false,
    error: '',
    mainError: '',
    date: '',
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

  useEffect(() => {
    setState(old => ({
      ...old,
      isLoadingParticipants: true
    }))

    loadParticipantsList.loadAll()
      .then(participants => setState(old => ({
        ...old,
        isLoadingParticipants: false,
        participants
      })))
      .catch(handleError)
  }, [])

  useEffect(() => {
    setState(old => ({
      ...old,
      isLoadingBarbecue: true
    }))

    loadBarbecueById.loadById()
      .then(barbecue => setState(old => ({
        ...old,
        isLoadingBarbecue: false,
        barbecue,
        date: new Date(barbecue.date).toISOString().split('T')[0],
        description: barbecue.description,
        observation: barbecue.observation,
        suggestValueDrink: barbecue.valueSuggestDrink.toString(),
        suggestValueFood: barbecue.valueSuggestFood.toString()
      })))
      .catch(handleError)
  }, [])

  const handleSaveBarbecue = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (state.isLoading || state.isFormInvalid) return

    setState(old => ({
      ...old,
      isLoading: true,
      mainError: ''
    }))

    saveBarbecue.save({
      date: new Date(state.date),
      description: state.description,
      observation: state.observation,
      valueSuggestDrink: parseInt(state.suggestValueDrink),
      valueSuggestFood: parseInt(state.suggestValueFood)
    })
      .then(barbecue => {
        setState(old => ({
          ...old,
          isLoading: false,
          barbecue: {
            ...old.barbecue,
            date: barbecue.date,
            description: barbecue.description,
            observation: barbecue.observation,
            valueSuggestDrink: barbecue.valueSuggestDrink,
            valueSuggestFood: barbecue.valueSuggestFood
          }
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
    <MainContainer>

      <Header buttonExit />

      <ParticipantsContext.Provider value={{ state, handleModal }}>
        <ContentContainer>
          {state.error
            ? <Error />
            : <>
              <div className={Styles.wrapParticipants}>
                {state.isLoadingBarbecue
                  ? <BarbecueInfoEmpty />
                  : <BarbecueInfo barbecue={state.barbecue} />
                }
                <ParticipantsListItems />
              </div>
            </>
          }

          <FormContext.Provider value={{ state, setState }}>
            <Modal isShowing={isShowing} handleModal={handleModal} title='Alteração'>
              <FormContext.Provider value={{ state, setState }}>
                <form data-testid='form' className={Styles.form} onSubmit={handleSaveBarbecue}>

                  <Input id='date' type="date" name='date' className={Styles.date} placeholder="data" />
                  <Input type="text" name='description' className={Styles.description} placeholder="descrição" />
                  <TextArea name='observation' className={Styles.observation} placeholder="observação" />

                  <span>Valores sugeridos</span>
                  <div className={Styles.suggest}>
                    <InputNoStatus type="number" min={0} name='suggestValueFood' placeholder="comida" />
                    <InputNoStatus type="number" min={0} name='suggestValueDrink' placeholder="bebida" />
                  </div>

                  <div className={Styles.buttonsWrap}>
                    <button type='reset' onClick={() => handleModal()}>Cancelar</button>
                    <button type='submit' data-testid='submit' disabled={state.isFormInvalid}>Confirmar</button>
                  </div>

                  <FormStatus />

                </form>
              </FormContext.Provider>
            </Modal>
          </FormContext.Provider>

        </ContentContainer>
      </ParticipantsContext.Provider>

    </MainContainer>
  )
}

export default ParticipantsList
