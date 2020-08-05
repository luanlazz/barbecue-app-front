import React, { memo } from 'react'
import Styles from './header-styles.scss'

const Header: React.FC = () => {
  return (
    <header className={Styles.header}>
      <h2>Agenda de Churras</h2>
    </header>
  )
}

export default memo(Header)
