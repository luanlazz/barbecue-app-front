import React from 'react'
import Styles from './barbecue-item-styles.scss'
import { LoadBarbecueList } from '@/domain/usecases'
import { BarbecueInfo } from '@/presentation/pages/barbecue-list/components'
import { Link } from 'react-router-dom'

type Prop = {
  barbecue: LoadBarbecueList.Model
}

const BarbecueItem: React.FC<Prop> = ({ barbecue }: Prop) => {
  return (
    <li className={Styles.barbecueItemWrap}>
      <Link to={`/barbecue/${barbecue.id}/participants/`} className={Styles.link}>
        <BarbecueInfo barbecue={barbecue} />
      </Link>
    </li>
  )
}

export default BarbecueItem
