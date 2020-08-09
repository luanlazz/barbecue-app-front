import React from 'react'
import Styles from './participants-styles.scss'
import { Header, MainContainer, ContentContainer } from '@/presentation/components'

const ParticipantsList: React.FC = () => {
  return (
    <MainContainer>

      <Header />

      <ContentContainer>
        <div className={Styles.wrapParticipants}>
          <div className={Styles.participants}>
            <table>
              <tbody>
                <tr className={Styles.paid}>
                  <td className={Styles.f}>
                    <span className={Styles.dot} />
                  </td>
                  <td className={Styles.name}>Pedro</td>
                  <td className={Styles.value}>R$ 20,00</td>
                </tr>
                <tr>
                  <td>
                    <span className={Styles.dot} />
                  </td>
                  <td className={Styles.name}>Alice</td>
                  <td className={Styles.value}>R$ 10,00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ContentContainer>

    </MainContainer>
  )
}

export default ParticipantsList
