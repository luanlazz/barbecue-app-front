import React, { useEffect, useState } from 'react'
import Styles from './barbecue-list-styles.scss'
import { Header } from '@/presentation/components'
import { BarbecueListItems, BarbecueContext, Error } from '@/presentation/pages/barbecue-list/components'
import { LoadBarbecueList } from '@/domain/usecases'

type Props = {
  loadBarbecueList: LoadBarbecueList
}

const BarbecueList: React.FC<Props> = ({ loadBarbecueList }: Props) => {
  const [state, setState] = useState({
    barbecues: [] as LoadBarbecueList.Model[],
    isLoading: false,
    error: ''
  })

  useEffect(() => {
    setState({
      ...state,
      isLoading: true
    })

    loadBarbecueList.loadAll()
      .then(barbecues => setState({
        ...state,
        isLoading: false,
        barbecues
      }))
      .catch(error => setState({
        ...state,
        isLoading: false,
        error: error.message
      }))
  }, [])

  return (
    <div className={Styles.barbecueListWrap}>

      <Header />

      <BarbecueContext.Provider value={{ state, setState }}>
        <div className={Styles.contentWrap}>
          {state.error
            ? <Error />
            : <BarbecueListItems />
          }
        </div>
      </BarbecueContext.Provider>

    </div>
  )
}

export default BarbecueList
