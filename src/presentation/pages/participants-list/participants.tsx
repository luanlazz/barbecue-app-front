import React, { useState, useEffect } from 'react'
import Styles from './participants-styles.scss'
import { Header, MainContainer, ContentContainer, Modal } from '@/presentation/components'
import { Error, ParticipantsContext, ParticipantsListItems, BarbecueInfo, BarbecueInfoEmpty } from './components'
import { useErrorHandler, useModal } from '@/presentation/hooks'
import { LoadParticipantsList, LoadBarbecueById, SaveBarbecue } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols/validation'
import BarbecueForm from '@/presentation/pages/ui/barbecue-form'

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
    error: ''
  })

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
        barbecue
      })))
      .catch(handleError)
  }, [])

  const handleSaveBarbecue = async (barbecue: SaveBarbecue.Model): Promise<void> => {
    setState(old => ({
      ...old,
      barbecue: {
        ...old.barbecue,
        date: barbecue.date,
        description: barbecue.description,
        observation: barbecue.observation,
        valueSuggestDrink: barbecue.valueSuggestDrink,
        valueSuggestFood: barbecue.valueSuggestFood
      }
    }))
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

          <Modal isShowing={isShowing} handleModal={handleModal} title='Alteração'>
            <BarbecueForm
              saveBarbecue={saveBarbecue}
              validation={validation}
              callBack={handleSaveBarbecue}
              handleModal={handleModal}
              barbecue={state.barbecue}
            />
          </Modal>

        </ContentContainer>
      </ParticipantsContext.Provider>

    </MainContainer>
  )
}

export default ParticipantsList
