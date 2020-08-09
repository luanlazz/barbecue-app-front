import React, { useState, useEffect } from 'react'
import Styles from './participants-styles.scss'
import { Header, MainContainer, ContentContainer } from '@/presentation/components'
import { LoadParticipantsList } from '@/domain/usecases'
import { Error, ParticipantsContext } from './components'

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
            : <div className={Styles.wrapParticipants}>
              <div className={Styles.participantsList}>
                <table data-testid='participants-list'>
                  <tbody>
                    {state.participants.map(participant => (
                      <tr key={participant.id} className={participant.pay ? Styles.paid : ''}>
                        <td className={Styles.f}>
                          <span className={Styles.dot} />
                        </td>
                        <td className={Styles.name}>{participant.name}</td>
                        <td className={Styles.value}>{participant.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          }
        </ContentContainer>
      </ParticipantsContext.Provider>

    </MainContainer>
  )
}

export default ParticipantsList
