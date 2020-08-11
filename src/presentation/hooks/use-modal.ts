import { useState } from 'react'

type UseModalReturn = {
  isShowing: boolean
  handleModal: Function
}

export const useModal = (): UseModalReturn => {
  const [isShowing, setIsShowing] = useState(false)

  const handleModal = (): void => {
    setIsShowing(old => !old)
  }

  return {
    isShowing,
    handleModal
  }
}
