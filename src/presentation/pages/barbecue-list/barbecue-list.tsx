import React, { useEffect, useState } from 'react'
import Styles from './barbecue-list-styles.scss'
import { Header } from '@/presentation/components'
import { BarbecueItemEmpty, BarbecueItem } from '@/presentation/pages/barbecue-list/components'
import { LoadBarbecueList } from '@/domain/usecases'
import { BarbecueModel } from '@/domain/models'

type Props = {
  loadBarbecueList: LoadBarbecueList
}

const BarbecueList: React.FC<Props> = ({ loadBarbecueList }: Props) => {
  const [state, setState] = useState({
    barbecues: [] as BarbecueModel[],
    error: ''
  })

  useEffect(() => {
    loadBarbecueList.loadAll()
      .then(barbecues => setState({
        ...state,
        barbecues
      }))
      .catch(error => setState({
        ...state,
        error: error.message
      }))
  }, [])

  return (
    <div className={Styles.barbecueListWrap}>

      <Header />

      <div className={Styles.contentWrap}>
        {state.error
          ? <div>
            <span data-testid='error'>{state.error}</span>
            <button>Recarregar</button>
          </div>
          : <ul data-testid='barbecue-list'>
            {state.barbecues.length
              ? state.barbecues.map(barbecue => (
                <BarbecueItem key={barbecue.id} barbecue={barbecue} />
              ))
              : <BarbecueItemEmpty />
            }
          </ul>
        }
      </div>

    </div>
  )
}

export default BarbecueList
