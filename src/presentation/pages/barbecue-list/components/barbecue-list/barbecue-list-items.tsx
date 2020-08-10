import React, { useContext } from 'react'
import Styles from './barbecue-list-items-styles.scss'
import { LoadBarbecueList } from '@/domain/usecases'
import { BarbecueItemEmpty, BarbecueItem, BarbecueNewItem, BarbecueContext } from '@/presentation/pages/barbecue-list/components'

const BarbecueListItems: React.FC = () => {
  const { barbecueListState } = useContext(BarbecueContext)

  return (
    <ul data-testid='barbecue-list' className={Styles.listWrap}>
      {barbecueListState.isLoading
        ? <BarbecueItemEmpty />
        : barbecueListState.barbecues.map((barbecue: LoadBarbecueList.Model) => <BarbecueItem key={barbecue.id} barbecue={barbecue} />)
      }
      {!barbecueListState.isLoading && <BarbecueNewItem /> }
    </ul>
  )
}

export default BarbecueListItems
