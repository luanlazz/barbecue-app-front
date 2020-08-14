import React from 'react'
import Styles from './modal-styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

type Props = {
  isShowing: boolean
  handleModal: Function
  title: string
  children: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
}

const Modal: React.FC<Props> = ({ isShowing, handleModal, title, children }: Props) => isShowing ? (
  <div data-testid='modal' className={(Styles.modal)}>
    <div className={Styles.inputWrap}>
      <div data-testid='handle-modal' className={Styles.close} onClick={() => handleModal()}>
        <FontAwesomeIcon icon={faTimes} size='2x' />
      </div>
      <span className={Styles.title}>
        {title}
      </span>
      {children}
    </div>
  </div>
) : null

export default Modal
