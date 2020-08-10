import React from 'react'
import Styles from './barbecue-info-styles.scss'
import { LoadBarbecueById } from '@/domain/usecases'
import { IconPeople, IconMoney } from '@/images'

type Props = {
  barbecue: LoadBarbecueById.Model
}

const BarbecueInfo: React.FC<Props> = ({ barbecue }: Props) => {
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
          <span className={Styles.valueTotal}>
            {new Intl.NumberFormat('pt', {
              style: 'currency',
              currency: 'BRL'
            }).format(barbecue.valueTotal).toString()}
            /
            {new Intl.NumberFormat('pt', {
              currency: 'BRL'
            }).format(barbecue.valueCollected).toString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default BarbecueInfo
