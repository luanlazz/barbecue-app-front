import React from 'react'
import Styles from './barbecue-info-styles.scss'
import { LoadBarbecueList } from '@/domain/usecases'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faDollarSign } from '@fortawesome/free-solid-svg-icons'

type Prop = {
  barbecue: LoadBarbecueList.Model
}

const BarbecueInfo: React.FC<Prop> = ({ barbecue }: Prop) => {
  return (
    <div className={Styles.barbecueContent}>
      <div className={Styles.details}>
        <time>
          <span data-testid='date' className={Styles.date}>
            {Intl.DateTimeFormat('pt-BR', {
              day: 'numeric',
              month: 'numeric'
            }).format(barbecue.date)}
          </span>
        </time>
        <span data-testid='description' className={Styles.description}>
          {barbecue.description}
        </span>
      </div>

      <div className={Styles.totals}>
        <div className={Styles.people}>
          <FontAwesomeIcon icon={faUserFriends} className={Styles.icon} />
          <span data-testid='numParticipants' className={Styles.numParticipants}>
            {barbecue.numParticipants}
          </span>
        </div>
        <div className={Styles.money}>
          <FontAwesomeIcon icon={faDollarSign} className={Styles.icon} />
          <span data-testid='valueTotal' className={Styles.valueTotal}>
            {new Intl.NumberFormat('pt', {
              style: 'currency',
              currency: 'BRL'
            }).format(barbecue.valueTotal)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default BarbecueInfo
