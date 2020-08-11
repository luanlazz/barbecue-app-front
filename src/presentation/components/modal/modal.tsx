import React from 'react'
import Styles from './modal-styles.scss'

type Props = {
  title: string
  children: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
}

const Modal: React.FC<Props> = ({ title, children }: Props) => {
  return (
    <div data-testid='modal' className={(Styles.modal)}>
      <div className={Styles.inputWrap}>
        <div className={Styles.close} />
        <span className={Styles.title}>
          {title}
        </span>
        {children}
      </div>
    </div>
  )
}

export default Modal
