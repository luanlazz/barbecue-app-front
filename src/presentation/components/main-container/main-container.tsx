import React from 'react'
import Styles from './main-container-styles.scss'

type Props = {
  children: React.FC
}

const ContainerMain: React.FC = ({ children }: Props) => {
  return (
    <div className={Styles.mainContainer}>
      {children}
    </div>
  )
}

export default ContainerMain
