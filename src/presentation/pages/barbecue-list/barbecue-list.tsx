import React from 'react'
import Styles from './barbecue-list-styles.scss'
import { Header } from '@/presentation/components'
import { BarbecueItemEmpty } from '@/presentation/pages/barbecue-list/components'

const BarbecueList: React.FC = () => {
  return (
    <div className={Styles.barbecueListWrap}>

      <Header />

      <div className={Styles.contentWrap}>
        <ul data-testid='barbecue-list'>
          <BarbecueItemEmpty />
        </ul>
      </div>
    </div>
  )
}

export default BarbecueList
