import React, { useContext } from 'react'
import Styles from './input-no-status-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const InputNoStatus: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        data-testid={`${props.name}-input`}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
        value={state[props.name]}
      />
    </div>
  )
}

export default InputNoStatus
