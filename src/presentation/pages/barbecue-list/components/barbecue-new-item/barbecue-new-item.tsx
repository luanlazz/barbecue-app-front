import React, { useContext } from 'react'
import Styles from './barbecue-new-item-styles.scss'
import { BarbecueContext } from '@/presentation/pages/barbecue-list/components'
import { IconBbq } from '@/images'

const BarbecueNewItem: React.FC = () => {
  const { newBarbecue } = useContext(BarbecueContext)

  return (
    <li data-testid="newItem" className={Styles.newItemWrap} onClick={newBarbecue}>
      <div className={Styles.content}>
        <div className={Styles.circle}>
          <IconBbq />
        </div>
        <span className={Styles.text}>
          Adicionar churas
        </span>
      </div>
    </li>
  )
}

export default BarbecueNewItem
