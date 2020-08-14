import React, { useState, useEffect } from 'react'
import Styles from './confirmation-action-styles.scss'
import { SaveParticipant } from '@/domain/usecases'

type CallBackType = (participant: SaveParticipant.Model) => void

type Props = {
  saveParticipant: SaveParticipant
  callBack: CallBackType
  participant?: SaveParticipant.Params
  handleModal: Function
}

const ConfirmationAction: React.FC<Props> = ({ saveParticipant, callBack, participant, handleModal }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    mainError: ''
  })

  useEffect(() => {
    if (participant) {
      setState(old => ({
        ...old,
        name: participant.name,
        pay: participant.pay,
        value: participant.value.toString()
      }))
    }
  }, [])

  const handleSubmit = async (): Promise<void> => {
    event.preventDefault()
    if (state.isLoading) return

    setState(old => ({
      ...old,
      isLoading: true
    }))

    saveParticipant.save({
      name: participant.name,
      pay: !participant.pay,
      value: participant.value
    })
      .then(participant => {
        callBack(participant)
        handleModal()
      })
      .catch(() => setState(old => ({
        ...old,
        isLoading: false
      })))
  }

  return (
    <div className={Styles.wrap}>
      <div>
        <span>Confirmar operação</span>

        <div className={Styles.buttonsWrap}>
          <button className={Styles.cancel} onClick={() => handleModal()}>Cancelar</button>
          <button
            data-testid='submit'
            className={Styles.confirmation}
            onClick={handleSubmit}
          >
            Confirmar
          </button>
        </div>

      </div>
    </div>
  )
}

export default ConfirmationAction
