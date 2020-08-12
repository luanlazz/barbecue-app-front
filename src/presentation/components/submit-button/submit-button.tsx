import React, { useContext } from 'react'
import Styles from './submit-button-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = {
  text: string
  icon?: JSX.Element
}

const SubmitButton: React.FC<Props> = ({ text, icon }: Props) => {
  const { state } = useContext(Context)

  return (
    <button
      data-testid='submit'
      className={Styles.submit}
      disabled={state.isFormInvalid}
      type='submit'
    >
      {text}  {icon}
    </button>
  )
}

export default SubmitButton
