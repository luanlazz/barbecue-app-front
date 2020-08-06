import React, { useEffect } from 'react'
import Styles from './barbecue-list-styles.scss'
import { Header } from '@/presentation/components'
import { BarbecueItemEmpty } from '@/presentation/pages/barbecue-list/components'
import { LoadBarbecueList } from '@/domain/usecases'

type Props = {
  loadBarbecueList: LoadBarbecueList
}

const BarbecueList: React.FC<Props> = ({ loadBarbecueList }: Props) => {
  useEffect(() => {
    (async function () {
      await loadBarbecueList.loadAll()
    })()
  }, [])

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
