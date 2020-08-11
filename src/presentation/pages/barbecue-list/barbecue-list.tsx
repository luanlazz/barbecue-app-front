import React, { useEffect, useState } from 'react'
// import Styles from './barbecue-list-styles.scss'
import { Header, MainContainer, ContentContainer, Modal } from '@/presentation/components'
import { BarbecueListItems, BarbecueContext, Error, BarbecueInput } from '@/presentation/pages/barbecue-list/components'
import { Validation } from '@/presentation/protocols/validation'
import { useErrorHandler } from '@/presentation/hooks'
import { LoadBarbecueList, SaveBarbecue } from '@/domain/usecases'

type Props = {
  loadBarbecueList: LoadBarbecueList
  saveBarbecue: SaveBarbecue
  validation: Validation
}

const BarbecueList: React.FC<Props> = ({ loadBarbecueList, saveBarbecue, validation }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setBarbecueListState(old => ({
      ...old,
      isLoading: false,
      error: error.message
    }))
  })

  const [barbecueListState, setBarbecueListState] = useState({
    barbecues: [] as LoadBarbecueList.Model[],
    isLoading: false,
    isModalOpen: false,
    error: ''
  })

  useEffect(() => {
    setBarbecueListState(old => ({
      ...old,
      isLoading: true
    }))

    loadBarbecueList.loadAll()
      .then(barbecues => setBarbecueListState(old => ({
        ...old,
        isLoading: false,
        barbecues
      })))
      .catch(handleError)
  }, [])

  const handleModal = (): void => {
    setBarbecueListState(old => ({ ...old, isModalOpen: !old.isModalOpen }))
  }

  return (
    <MainContainer>

      <Header buttonExit />

      <BarbecueContext.Provider value={{ barbecueListState, setBarbecueListState, handleModal }}>
        <ContentContainer>
          {barbecueListState.error
            ? <Error />
            : <BarbecueListItems />
          }
        </ContentContainer>

        {barbecueListState.isModalOpen &&
          <Modal title='Próximo churas' >
            <BarbecueInput
              saveBarbecue={saveBarbecue}
              validation={validation}
            />
          </Modal>
        }

      </BarbecueContext.Provider>

    </MainContainer>
  )
}

export default BarbecueList
