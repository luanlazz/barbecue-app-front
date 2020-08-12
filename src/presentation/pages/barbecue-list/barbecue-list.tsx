import React, { useEffect, useState } from 'react'
// import Styles from './barbecue-list-styles.scss'
import { Header, MainContainer, ContentContainer, Modal } from '@/presentation/components'
import { BarbecueListItems, BarbecueContext, Error } from '@/presentation/pages/barbecue-list/components'
import { Validation } from '@/presentation/protocols/validation'
import { useErrorHandler, useModal } from '@/presentation/hooks'
import { LoadBarbecueList, SaveBarbecue } from '@/domain/usecases'
import BarbecueForm from '@/presentation/pages/ui/barbecue-form'

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
  const { isShowing, handleModal } = useModal()

  const [barbecueListState, setBarbecueListState] = useState({
    barbecues: [] as LoadBarbecueList.Model[],
    isLoading: false,
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

  const handleNewBarbecue = (barbecue: SaveBarbecue.Model): void => {
    setBarbecueListState(old => ({
      ...old,
      barbecues: [...old.barbecues, barbecue]
    }))
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

        <Modal isShowing={isShowing} handleModal={handleModal} title='Próximo churas' >
          <BarbecueForm
            saveBarbecue={saveBarbecue}
            validation={validation}
            callBack={handleNewBarbecue}
            handleModal={handleModal}
          />
        </Modal>

      </BarbecueContext.Provider>

    </MainContainer>
  )
}

export default BarbecueList
