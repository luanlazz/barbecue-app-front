import React, { useContext } from 'react'
import Styles from './barbecue-info-styles.scss'
import { LoadBarbecueById } from '@/domain/usecases'
import { ParticipantsContext } from '@/presentation/pages/participants-list/components'
import { IconPeople, IconMoney } from '@/images'

type Props = {
  barbecue: LoadBarbecueById.Model
}

const BarbecueInfo: React.FC<Props> = ({ barbecue }: Props) => {
  const { handleEditBarbecue } = useContext(ParticipantsContext)

  return (
    <div data-testid='barbecue-info' className={Styles.barbecue}>
      <div className={Styles.info}>
        <span className={Styles.date}>
          {Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'numeric'
          }).format(barbecue.date)}
        </span>
        <span className={Styles.description}>
          {barbecue.description}
        </span>
      </div>

      <div className={Styles.totals}>
        <div className={Styles.peoples}>
          <IconPeople />
          <span className={Styles.count}>{barbecue.numParticipants}</span>
        </div>
        <div className={Styles.money}>
          <IconMoney />
          <span className={Styles.wrapMoney}>
            <span className={Styles.valueTotal}>
              {new Intl.NumberFormat('pt', {
                style: 'currency',
                currency: 'BRL'
              }).format(barbecue.valueTotal).toString()}
            </span>
            <span className={Styles.separate}>/</span>
            <span className={Styles.valueCollected}>
              {new Intl.NumberFormat('pt', {
                currency: 'BRL'
              }).format(barbecue.valueCollected).toString()}
            </span>
          </span>
        </div>
      </div>

      <div className={Styles.editButton} onClick={handleEditBarbecue}/>
    </div>
  )
}

export default BarbecueInfo
