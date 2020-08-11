import React, { useState, useEffect } from 'react'
import Styles from './participants-styles.scss'
import { Header, MainContainer, ContentContainer, Modal } from '@/presentation/components'
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

            </Modal>
          </FormContext.Provider>

        </ContentContainer>
      </ParticipantsContext.Provider>

    </MainContainer>
  )
}

export default ParticipantsList
