import React, { memo, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Styles from './header-styles.scss'
import { ApiContext } from '@/presentation/contexts'

type Props = {
  buttonExit?: boolean
}

const Header: React.FC<Props> = ({ buttonExit }: Props) => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  const logout = (): void => {
    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return (
    <header className={Styles.header}>
      <h2>Agenda de Churras</h2>
      {buttonExit && <div data-testid='logout' className={Styles.exit} onClick={logout} />}
    </header>
  )
}

export default memo(Header)
