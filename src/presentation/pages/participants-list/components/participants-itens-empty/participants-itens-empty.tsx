import React from 'react'
import Styles from './participants-itens-empty-styles.scss'

const ParticipantsItensEmpty: React.FC = () => {
  return (
    <>
      <li className={Styles.emptyParticipant} />
      <li className={Styles.emptyParticipant} />
      <li className={Styles.emptyParticipant} />
      <li className={Styles.emptyParticipant} />
    </>
  )
}

export default ParticipantsItensEmpty
