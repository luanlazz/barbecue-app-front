import React from 'react'
import Styles from './barbecue-list-styles.scss'
import { IconMoney, IconPeople } from '@/images/index'
import { Header } from '@/presentation/components'

const BarbecueList: React.FC = () => {
  return (
    <div className={Styles.barbecueListWrap}>

      <Header />

      <div className={Styles.contentWrap}>

        <ul>

          <li>
            <div className={Styles.barbecueContent}>
              <time>
                <span className={Styles.date}>01/12</span>
              </time>
              <span className={Styles.description}>Niver do Gui</span>

              <div className={Styles.totals}>
                <div className={Styles.people}>
                  <IconPeople />
                  <span className={Styles.num}>15</span>
                </div>
                <div className={Styles.money}>
                  <IconMoney />
                  <span className={Styles.valueTotal}>R$ 280</span>
                </div>
              </div>
            </div>
          </li>

        </ul>

      </div>
    </div>
  )
}

export default BarbecueList
