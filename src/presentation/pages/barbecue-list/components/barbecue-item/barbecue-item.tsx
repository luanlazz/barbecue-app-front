import React from 'react'
import Styles from './barbecue-item-styles.scss'
import { IconMoney, IconPeople } from '@/images/index'
import { LoadBarbecueList } from '@/domain/usecases'
import { Link } from 'react-router-dom'

type Prop = {
  barbecue: LoadBarbecueList.Model
}

const BarbecueItem: React.FC<Prop> = ({ barbecue }: Prop) => {
  return (
    <li className={Styles.barbecueItemWrap}>
      <Link to={`/barbecue/${barbecue.id}/participants`} className={Styles.barbecueContent}>
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
            <IconPeople />
            <span data-testid='numParticipants' className={Styles.numParticipants}>
              {barbecue.numParticipants}
            </span>
          </div>
          <div className={Styles.money}>
            <IconMoney />
            <span data-testid='valueTotal' className={Styles.valueTotal}>
              {new Intl.NumberFormat('pt', {
                style: 'currency',
                currency: 'BRL'
              }).format(barbecue.valueTotal)}
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default BarbecueItem
