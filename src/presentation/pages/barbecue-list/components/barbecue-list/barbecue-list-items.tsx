import React, { useContext } from 'react'
import Styles from './barbecue-list-items-styles.scss'
import { LoadBarbecueList } from '@/domain/usecases'
import { BarbecueItemEmpty, BarbecueItem, BarbecueContext } from '@/presentation/pages/barbecue-list/components'

const BarbecueListItems: React.FC = () => {
  const { state } = useContext(BarbecueContext)

  return (
    <ul data-testid='barbecue-list' className={Styles.listWrap}>
      {state.barbecues.length
        ? state.barbecues.map((barbecue: LoadBarbecueList.Model) => <BarbecueItem key={barbecue.id} barbecue={barbecue} />)
        : <BarbecueItemEmpty />
      }
    </ul>
  )
}

export default BarbecueListItems
