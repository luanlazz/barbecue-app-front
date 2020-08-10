import React, { useState, useEffect } from 'react'
import Styles from './participants-styles.scss'
import { Header, MainContainer, ContentContainer } from '@/presentation/components'
import { LoadParticipantsList } from '@/domain/usecases'
import { Error, ParticipantsContext, ParticipantsListItems, BarbecueInfo } from './components'

type Props = {
  loadParticipantsList: LoadParticipantsList
}

const ParticipantsList: React.FC<Props> = ({ loadParticipantsList }: Props) => {
  const [state, setState] = useState({
    participants: [] as LoadParticipantsList.Model[],
    isLoading: false,
    error: ''
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
      .catch(error => setState(old => ({
        ...old,
        isLoading: false,
        error: error.message
      })))
  }, [])

  return (
    <MainContainer>

      <Header />

      <ParticipantsContext.Provider value={{ state }}>
        <ContentContainer>
          {state.error
            ? <Error />
            : <>
              <div className={Styles.wrapParticipants}>
                <BarbecueInfo barbecue={null} />
                <ParticipantsListItems />
              </div>
            </>
          }
        </ContentContainer>
      </ParticipantsContext.Provider>

    </MainContainer>
  )
}

export default ParticipantsList
