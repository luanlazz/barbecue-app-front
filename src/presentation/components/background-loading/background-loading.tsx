import React from 'react'
import Styles from './background-loading-styles.scss'

const BackgroundLoading: React.FC = () => {
  return (
    <div data-testid='background-loading' className={Styles.animationWrapper}>
      <div className={Styles.circle}></div>
      <div className={Styles.circle}></div>
      <div className={Styles.circle}></div>
      <div className={Styles.circle}></div>
      <div className={Styles.circle}></div>
      <div className={Styles.circle}></div>
      <div className={Styles.circle}></div>
      <div className={Styles.circle}></div>
    </div>
  )
}

export default BackgroundLoading
