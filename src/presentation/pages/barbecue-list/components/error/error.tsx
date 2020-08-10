import React, { useContext } from 'react'
import Styles from './error-styles.scss'
import { BarbecueContext } from '@/presentation/pages/barbecue-list/components'

const Error: React.FC = () => {
  const { barbecueListState } = useContext(BarbecueContext)

  return (
    <div className={Styles.errorWrap}>
      <span data-testid='error'>{barbecueListState.error}</span>
    </div>
  )
}

export default Error
