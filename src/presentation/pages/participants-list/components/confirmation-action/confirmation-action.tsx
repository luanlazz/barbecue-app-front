import React, { useState } from 'react'
import Styles from './confirmation-action-styles.scss'

type CallBackType = () => Promise<void>

type Props = {
  callBack: CallBackType
  handleModal: Function
}

const ConfirmationAction: React.FC<Props> = ({ callBack, handleModal }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    mainError: ''
  })

  const handleSubmit = async (): Promise<void> => {
    event.preventDefault()
    if (state.isLoading) return

    setState(old => ({
      ...old,
      isLoading: true
    }))

    callBack()
      .catch(() => setState(old => ({
        ...old,
        isLoading: false
      })))
  }

  const handleModalIntern = (): void => {
    handleModal()
  }

  return (
    <div className={Styles.wrap}>
      <div>
        <span>Confirmar operação</span>

        <div className={Styles.buttonsWrap}>
          <button className={Styles.cancel} onClick={handleModalIntern}>Cancelar</button>
          <button
            data-testid='submit'
            className={Styles.confirmation}
            onClick={handleSubmit}
          >
            Confirmar
          </button>
        </div>

      </div>
    </div>
  )
}

export default ConfirmationAction
