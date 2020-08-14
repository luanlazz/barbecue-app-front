import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Styles from './participants-styles.scss'
import { Error, ParticipantsContext, ParticipantsListItems, BarbecueInfo, BarbecueInfoEmpty, ParticipantForm, ConfirmationAction } from './components'
import { Header, MainContainer, ContentContainer, Modal } from '@/presentation/components'
import { useErrorHandler, useModal } from '@/presentation/hooks'
import { LoadParticipantsList, LoadBarbecueById, SaveBarbecue, SaveParticipant, RemoveParticipant } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols/validation'
import BarbecueForm from '@/presentation/pages/ui/barbecue-form/barbecue-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

type Props = {
  loadParticipantsList: LoadParticipantsList
  loadBarbecueById: LoadBarbecueById
  saveBarbecue: SaveBarbecue
  validationBarbecue: Validation
  saveParticipant: SaveParticipant
  removeParticipant: RemoveParticipant
  validationParticipant: Validation
}

export enum MaintenanceParticipants {
  nothing = 0,
  setBarbecue = 1,
  addParticipant = 2,
  setParticipant = 3,
  setPaymentParticipant = 4,
  removeParticipant = 5
}

const ParticipantsList: React.FC<Props> = ({ loadParticipantsList, loadBarbecueById, saveBarbecue, validationBarbecue, validationParticipant, saveParticipant, removeParticipant }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({
      ...old,
      isLoading: false,
      error: error.message
    }))
  })

  const history = useHistory()

  const { isShowing, handleModal } = useModal()

  const [state, setState] = useState({
    participants: [] as LoadParticipantsList.Model[],
    participantMaintenance: {} as LoadParticipantsList.Model,
    barbecue: {} as LoadBarbecueById.Model,
    isLoadingBarbecue: false,
    isLoadingParticipants: false,
    isLoading: false,
    error: '',
    maintenance: MaintenanceParticipants.nothing,
    updateBarbecue: false
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
        updateBarbecue: false,
        barbecue
      })))
      .catch(handleError)
  }, [state.updateBarbecue])

  const handleMaintenance = (maintenance: MaintenanceParticipants, participantMaintenance?: LoadParticipantsList.Model): void => {
    setState(old => ({
      ...old,
      maintenance,
      participantMaintenance
    }))

    switch (maintenance) {
      case MaintenanceParticipants.addParticipant:
        history.replace(`/barbecue/${state.barbecue.id}/participants/`)
        break
      case MaintenanceParticipants.setParticipant:
        history.replace(`/barbecue/${state.barbecue.id}/participants/${participantMaintenance.id}`)
        break
      case MaintenanceParticipants.removeParticipant:
        history.replace(`/barbecue/${state.barbecue.id}/participants/${participantMaintenance.id}`)
        break
      case MaintenanceParticipants.setPaymentParticipant:
        handlePaymentParticipant(participantMaintenance)
        break
    }

    if (maintenance !== MaintenanceParticipants.setPaymentParticipant) {
      handleModal()
    }
  }

  const getTitleModal = (): string => {
    switch (state.maintenance) {
      case MaintenanceParticipants.setBarbecue: return 'Alterar churas'
      case MaintenanceParticipants.addParticipant: return 'Novo participante'
      case MaintenanceParticipants.setParticipant: return 'Alterar participante'
      case MaintenanceParticipants.removeParticipant: return 'Remover participante'
    }
  }

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

  const handleNewParticipant = async (participant: SaveParticipant.Model): Promise<void> => {
    setState(old => ({
      ...old,
      updateBarbecue: true,
      participants: [...old.participants, { ...participant }]
    }))
  }

  const handleUpdateParticipant = async (participantSave: SaveParticipant.Model): Promise<void> => {
    setState(old => ({
      ...old,
      updateBarbecue: true,
      participants: old.participants.map(participant => {
        if (participant.id === participantSave.id) {
          return {
            ...participant,
            name: participantSave.name,
            pay: participantSave.pay,
            value: participantSave.value
          }
        } else {
          return participant
        }
      })
    }))
  }

  const handlePaymentParticipant = async (participantParam: SaveParticipant.Model): Promise<void> => {
    saveParticipant.save({
      ...participantParam,
      pay: !participantParam.pay
    })
      .then(participantSave => {
        setState(old => ({
          ...old,
          updateBarbecue: true,
          participants: old.participants.map(participant =>
            participant.id === participantSave.id
              ? ({ ...participant, pay: participantSave.pay })
              : participant
          )
        }))
      })
      .catch(error => setState(old => ({
        ...old,
        isLoading: false,
        error
      })))
  }

  const handleRemoveParticipant = async (): Promise<void> => {
    return removeParticipant.remove()
      .then(() => {
        setState(old => ({
          ...old,
          updateBarbecue: true,
          participants: old.participants.filter(participant => participant.id !== state.participantMaintenance.id)
        }))
        handleModal()
      })
  }

  return (
    <MainContainer>

      <Header buttonExit />

      <ParticipantsContext.Provider value={{ state, setState, handleMaintenance }}>
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

                <button data-testid='newParticipant' onClick={() => handleMaintenance(MaintenanceParticipants.addParticipant)}>
                  <div className={Styles.addParticipant}>
                    <FontAwesomeIcon icon={faPlus} color='green' size='lg' />
                  </div>
                </button>
              </div>
            </>
          }

          <Modal isShowing={isShowing} handleModal={handleModal} title={getTitleModal()}>
            {state.maintenance === MaintenanceParticipants.setBarbecue &&
              <BarbecueForm
                saveBarbecue={saveBarbecue}
                validation={validationBarbecue}
                callBack={handleSaveBarbecue}
                handleModal={handleModal}
                barbecue={state.barbecue}
              />
            }

            {state.maintenance === MaintenanceParticipants.addParticipant &&
              <ParticipantForm
                saveParticipant={saveParticipant}
                validation={validationParticipant}
                callBack={handleNewParticipant}
                handleModal={handleModal}
                barbecue={state.barbecue}
              />
            }

            {state.maintenance === MaintenanceParticipants.setParticipant &&
              <ParticipantForm
                saveParticipant={saveParticipant}
                validation={validationParticipant}
                callBack={handleUpdateParticipant}
                handleModal={handleModal}
                participant={state.participantMaintenance}
                barbecue={state.barbecue}
              />
            }

            {state.maintenance === MaintenanceParticipants.removeParticipant &&
              <ConfirmationAction
                callBack={handleRemoveParticipant}
                handleModal={handleModal}
              />
            }
          </Modal>

        </ContentContainer>
      </ParticipantsContext.Provider>

    </MainContainer>
  )
}

export default ParticipantsList
