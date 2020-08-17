import React, { useContext } from 'react'
import Styles from './participant-item-styles.scss'
import { LoadParticipantsList } from '@/domain/usecases'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faMinus } from '@fortawesome/free-solid-svg-icons'
import { ParticipantsContext } from '@/presentation/pages/participants-list/components'
import { MaintenanceParticipants } from '../../participants'

type Prop = {
  participant: LoadParticipantsList.Model
}

const ParticipantItem: React.FC<Prop> = ({ participant }: Prop) => {
  const { handleMaintenance, handlePaymentParticipant } = useContext(ParticipantsContext)

  const handleSet = (): void => {
    handleMaintenance(MaintenanceParticipants.setParticipant, participant)
  }

  const handleRemove = (): void => {
    handleMaintenance(MaintenanceParticipants.removeParticipant, participant)
  }

  return (
    <tr className={participant.pay ? Styles.paid : ''}>
      <td className={Styles.statusPayment} >
        <button data-testid='payment' onClick={() => handlePaymentParticipant(participant)}>
          <span className={Styles.dot} />
        </button>
      </td>

      <td data-testid='name' className={Styles.name}>{participant.name}</td>

      <td data-testid='value' className={Styles.value}>
        {new Intl.NumberFormat('pt', {
          style: 'currency',
          currency: 'BRL'
        }).format(participant.value).toString()}
      </td>

      <td data-testid='edit-participant' className={Styles.editAction} >
        <button data-testid='payment' onClick={handleSet}>
          <FontAwesomeIcon icon={faPen} color='black' />
        </button>
      </td>

      <td data-testid='remove-participant' className={Styles.removeAction} >
        <button data-testid='payment' onClick={handleRemove}>
          <FontAwesomeIcon icon={faMinus} color='black' />
        </button>
      </td>
    </tr>
  )
}

export default ParticipantItem
