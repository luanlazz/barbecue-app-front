import React from 'react'
import Styles from './participant-item-styles.scss'
import { LoadParticipantsList } from '@/domain/usecases'

type Prop = {
  participant: LoadParticipantsList.Model
}

const ParticipantItem: React.FC<Prop> = ({ participant }: Prop) => {
  return (
    <tr className={participant.pay ? Styles.paid : ''}>
      <td className={Styles.f}>
        <span className={Styles.dot} />
      </td>
      <td className={Styles.name}>{participant.name}</td>
      <td className={Styles.value}>
        {new Intl.NumberFormat('pt', {
          style: 'currency',
          currency: 'BRL'
        }).format(participant.value).toString()}
      </td>
    </tr>
  )
}

export default ParticipantItem
