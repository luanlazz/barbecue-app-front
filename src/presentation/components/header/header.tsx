import React, { memo } from 'react'
import Styles from './header-styles.scss'

type Props = {
  buttonExit?: boolean
}

const Header: React.FC<Props> = ({ buttonExit }: Props) => {
  return (
    <header className={Styles.header}>
      <h2>Agenda de Churras</h2>
      {buttonExit && <div className={Styles.exit} />}
    </header>
  )
}

export default memo(Header)
