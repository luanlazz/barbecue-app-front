import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import Styles from './secondary-button-styles.scss'

type Props = React.PropsWithoutRef<LinkProps> & React.RefAttributes<HTMLAnchorElement>

const SecondaryButton: React.FC<Props> = (props: Props) => {
  return (
    <Link data-testid="signup-link" {...props} className={Styles.link}>
      {props.children}
    </Link>

  )
}

export default SecondaryButton
