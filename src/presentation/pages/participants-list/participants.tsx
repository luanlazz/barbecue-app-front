import React, { useState, useEffect } from 'react'
import Styles from './participants-styles.scss'
import { Header, MainContainer, ContentContainer, Modal, Input, InputNoStatus, FormStatus } from '@/presentation/components'
import { LoadParticipantsList, LoadBarbecueById } from '@/domain/usecases'
import { Error, ParticipantsContext, ParticipantsListItems, BarbecueInfo } from './components'
import { FormContext } from '@/presentation/contexts'
import { useErrorHandler, useModal } from '@/presentation/hooks'

type Props = {
  loadParticipantsList: LoadParticipantsList
  loadBarbecueById: LoadBarbecueById
}

const ParticipantsList: React.FC<Props> = ({ loadParticipantsList, loadBarbecueById }: Props) => {
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
    isLoading: false,
    isFormInvalid: false,
    error: ''
  })

  const [barbecueState, setBarbecueState] = useState({
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

    loadParticipantsList.loadAll()
      .then(participants => setState(old => ({
        ...old,
        isLoading: false,
        participants
      })))
      .catch(handleError)
  }, [])

  useEffect(() => {
    setState(old => ({
      ...old,
      isLoading: true
    }))

    loadBarbecueById.loadById()
      .then(barbecue => setState(old => ({
        ...old,
        isLoading: false,
        barbecue
      })))
      .catch(handleError)
  }, [])

  const handleEditBarbecue = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
  }

  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <MainContainer>

      <Header buttonExit />

      <ParticipantsContext.Provider value={{ state, handleEditBarbecue }}>
        <ContentContainer>
          {state.error
            ? <Error />
            : <>
              <div className={Styles.wrapParticipants}>
                <BarbecueInfo barbecue={state.barbecue} />
                <ParticipantsListItems />
              </div>
            </>
          }

          <FormContext.Provider value={{ state, setState, barbecueState, setBarbecueState }}>
            <Modal isShowing={isShowing} handleModal={handleModal} title='Próximo churas'>
              <form data-testid='form' className={Styles.form}>

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
                  <InputNoStatus type="number" min={0} name='suggestValueFood' placeholder="comida" />
                  <InputNoStatus type="number" min={0} name='suggestValueDrink' placeholder="bebida" />
                </div>

                <div className={Styles.buttonsWrap}>
                  <button type='reset'>Cancelar</button>
                  <button type='submit' data-testid='submit' disabled={state.isFormInvalid} >Confirmar</button>
                </div>

                <FormStatus />

              </form>
            </Modal>
          </FormContext.Provider>

        </ContentContainer>
      </ParticipantsContext.Provider>

    </MainContainer>
  )
}

export default ParticipantsList
