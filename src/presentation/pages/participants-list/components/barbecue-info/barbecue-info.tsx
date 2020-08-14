import React, { useContext } from 'react'
import Styles from './barbecue-info-styles.scss'
import { LoadBarbecueById } from '@/domain/usecases'
import { ParticipantsContext } from '@/presentation/pages/participants-list/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faDollarSign, faPen } from '@fortawesome/free-solid-svg-icons'
import { MaintenanceParticipants } from '../../participants'

type Props = {
  barbecue: LoadBarbecueById.Model
}

const BarbecueInfo: React.FC<Props> = ({ barbecue }: Props) => {
  const { handleMaintenance } = useContext(ParticipantsContext)

  const setMaintenance = (): void => {
    handleMaintenance(MaintenanceParticipants.setBarbecue)
  }

  return (
    <div data-testid='barbecue-info' className={Styles.barbecue}>
      <div className={Styles.info}>
        <span data-testid='date' className={Styles.date}>
          {Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'numeric'
          }).format(barbecue.date)}
        </span>

        <span data-testid='description' className={Styles.description}>
          {barbecue.description}
        </span>
      </div>

      <div className={Styles.totals}>
        <div className={Styles.peoples}>
          <FontAwesomeIcon icon={faUserFriends} className={Styles.icon} size='lg' />
          <span data-testid='numParticipants' className={Styles.count}>{barbecue.numParticipants}</span>
        </div>

        <div className={Styles.money}>
          <FontAwesomeIcon icon={faDollarSign} className={Styles.icon} size='lg' />
          <span className={Styles.wrapMoney}>
            <span data-testid='valueTotal' className={Styles.valueTotal}>
              {new Intl.NumberFormat('pt', {
                style: 'currency',
                currency: 'BRL'
              }).format(barbecue.valueTotal).toString()}
            </span>

            <span className={Styles.separate}>/</span>

            <span data-testid='valueCollected' className={Styles.valueCollected}>
              {new Intl.NumberFormat('pt', {
                currency: 'BRL'
              }).format(barbecue.valueCollected).toString()}
            </span>
          </span>
        </div>
      </div>

      <div
        data-testid='editItem'
        className={Styles.editButton}
        onClick={setMaintenance}
      >
        <FontAwesomeIcon icon={faPen} className={Styles.icon} size='lg' />
      </div>
    </div>
  )
}

export default BarbecueInfo
