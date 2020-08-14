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
  const { handleMaintenance } = useContext(ParticipantsContext)

  const setMaintenanceEdit = (): void => {
    handleMaintenance(MaintenanceParticipants.setParticipant, participant)
  }

  const setMaintenanceRemove = (): void => {
    handleMaintenance(MaintenanceParticipants.removeParticipant, participant)
  }

  const setMaintenancePayment = (): void => {
    handleMaintenance(MaintenanceParticipants.setPaymentParticipant, participant)
  }

  return (
    <tr className={participant.pay ? Styles.paid : ''}>
      <td
        data-testid='payment'
        className={Styles.statusPayment}
        onClick={setMaintenancePayment}
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
        onClick={setMaintenanceEdit}
      >
        <FontAwesomeIcon icon={faPen} />
      </td>

      <td
        className={Styles.removeAction}
        onClick={setMaintenanceRemove}
      >
        <FontAwesomeIcon icon={faMinus} />
      </td>
    </tr>
  )
}

export default ParticipantItem
