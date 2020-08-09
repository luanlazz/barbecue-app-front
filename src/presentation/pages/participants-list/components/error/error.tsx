import React, { useContext } from 'react'
import Styles from './error-styles.scss'
import { ParticipantsContext } from '@/presentation/pages/participants-list/components'

const Error: React.FC = () => {
  const { state } = useContext(ParticipantsContext)

  return (
    <div className={Styles.errorWrap}>
      <span data-testid='error'>{state.error}</span>
    </div>
  )
}

export default Error
