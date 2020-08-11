import React from 'react'
import Styles from './modal-styles.scss'

type Props = {
  isShowing: boolean
  handleModal: Function
  title: string
  children: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
}

const Modal: React.FC<Props> = ({ isShowing, handleModal, title, children }: Props) => isShowing ? (
  <div data-testid='modal' className={(Styles.modal)}>
    <div className={Styles.inputWrap}>
      <div className={Styles.close} onClick={() => handleModal()} />
      <span className={Styles.title}>
        {title}
      </span>
      {children}
    </div>
  </div>
) : null

export default Modal
