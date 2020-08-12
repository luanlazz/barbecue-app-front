import React, { memo } from 'react'
import Styles from './header-styles.scss'
import { useLogout } from '@/presentation/hooks'

type Props = {
  buttonExit?: boolean
}

const Header: React.FC<Props> = ({ buttonExit }: Props) => {
  const logout = useLogout()

  return (
    <header data-testid='header' className={Styles.header}>
      <h2>Agenda de Churras</h2>
      {buttonExit && <div data-testid='logout' className={Styles.exit} onClick={logout} />}
    </header>
  )
}

export default memo(Header)
