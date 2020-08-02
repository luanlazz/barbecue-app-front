import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { errorMessage } = useContext(Context)

  return (
    <div data-testid='error-wrap' className={Styles.errorWrap}>
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormStatus
