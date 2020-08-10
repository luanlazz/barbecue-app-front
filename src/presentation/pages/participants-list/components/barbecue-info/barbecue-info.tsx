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
        <span className={Styles.date}>01/12</span>
        <span className={Styles.description}>Niver do Gui</span>
      </div>

      <div className={Styles.totals}>
        <div className={Styles.peoples}>
          <IconPeople />
          <span className={Styles.count}>15</span>
        </div>
        <div className={Styles.money}>
          <IconMoney />
          <span className={Styles.valueTotal}>R$ 280/100</span>
        </div>
      </div>
    </div>
  )
}

export default BarbecueInfo
