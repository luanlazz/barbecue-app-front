import React, { useContext } from 'react'
import Styles from './textarea-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)

  const enableInput = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={Styles.inputWrap}>
      <textarea
        {...props}
        readOnly
        rows={2}
        data-testid={`${props.name}-input`}
        onChange={handleChange}
        onFocus={enableInput}
      />
    </div>
  )
}

export default Input
