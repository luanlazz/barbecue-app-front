import React, { useContext } from 'react'
import Styles from './participant-item-styles.scss'
import { LoadParticipantsList } from '@/domain/usecases'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { ParticipantsContext } from '@/presentation/pages/participants-list/components'
import { MaintenanceParticipants } from '../../participants'

type Prop = {
  participant: LoadParticipantsList.Model
}

const ParticipantItem: React.FC<Prop> = ({ participant }: Prop) => {
  const { handleMaintenance } = useContext(ParticipantsContext)

  return (
    <tr className={participant.pay ? Styles.paid : ''}>
      <td
        className={Styles.statusPayment}
        onClick={() => handleMaintenance(MaintenanceParticipants.setPaymentParticipant, participant)}
      >
        <span className={Styles.dot} />
      </td>

      <td data-testid='name' className={Styles.name}>{participant.name}</td>

      <td data-testid='value' className={Styles.value}>
        {new Intl.NumberFormat('pt', {
          style: 'currency',
          currency: 'BRL'
        }).format(participant.value).toString()}
      </td>

      <td
        className={Styles.editAction}
        onClick={() => handleMaintenance(MaintenanceParticipants.setParticipant, participant)}
      >
        <FontAwesomeIcon icon={faPen} />
      </td>
    </tr>
  )
}

export default ParticipantItem
