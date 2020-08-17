import React, { useState } from 'react'
import Styles from './confirm-action-styles.scss'
import { Modal, FormStatus } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'

type CallBackType = () => Promise<void>

type Props = {
  isShowing: boolean
  handleModal: Function
  callBack: CallBackType
  title: string
}

const ConfirmAction: React.FC<Props> = ({ isShowing, handleModal, callBack, title }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    mainError: ''
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (state.isLoading) return

    setState(old => ({
      ...old,
      isLoading: true
    }))

    callBack()
  }

  return (
    <Modal isShowing={isShowing} handleModal={handleModal} title={title}>
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid='form' className={Styles.wrap} onSubmit={handleSubmit}>

          <div className={Styles.buttonsWrap}>
            <button type='reset' data-testid='reset' className={Styles.cancel} onClick={() => handleModal()}>Cancelar</button>
            <button type='submit' data-testid='submit' className={Styles.confirmation}>Confirmar</button>
          </div>

          <FormStatus />

        </form>
      </FormContext.Provider>
    </Modal>
  )
}

export default ConfirmAction
