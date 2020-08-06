import React from 'react'
import Styles from './barbecue-list-styles.scss'
import { Header } from '@/presentation/components'
import { BarbecueItem, BarbecueItemEmpty } from './components'

const BarbecueList: React.FC = () => {
  return (
    <div className={Styles.barbecueListWrap}>

      <Header />

      <div className={Styles.contentWrap}>
        <ul>
          <BarbecueItem />
          <BarbecueItemEmpty />
        </ul>
      </div>
    </div>
  )
}

export default BarbecueList
