import React from 'react'
import Styles from './content-container-styles.scss'

type Props = {
  children: React.FC
}

const ContainerContent: React.FC = ({ children }: Props) => {
  return (
    <div className={Styles.contentContainer}>
      {children}
    </div>
  )
}

export default ContainerContent
