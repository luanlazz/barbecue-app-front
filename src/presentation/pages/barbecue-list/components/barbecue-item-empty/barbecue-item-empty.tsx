import React from 'react'
import Styles from './barbecue-item-empty-styles.scss'

const BarbecueItemEmpty: React.FC = () => {
  return (
    <>
      <li className={Styles.barbecueItemEmpty} />
      <li className={Styles.barbecueItemEmpty} />
      <li className={Styles.barbecueItemEmpty} />
    </>
  )
}

export default BarbecueItemEmpty
