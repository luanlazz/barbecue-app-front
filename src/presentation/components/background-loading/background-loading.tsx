import React from 'react'
import Styles from './background-loading-styles.scss'

const BackgroundLoading: React.FC = () => {
  return (
    <div className={Styles.animationWrapper}>
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
