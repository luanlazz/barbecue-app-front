import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import { makeBarbecueList, makeLogin, makeSignUp, makeParticipantsList } from '@/main/factories/pages'
import { PrivateRoute , BackgroundLoading } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Suspense fallback={<BackgroundLoading />}>
          <Switch>
            <Route path='/login' exact component={makeLogin} />
            <Route path='/signup' exact component={makeSignUp} />
            <PrivateRoute path='/barbecue/:barbecueId/participants' component={makeParticipantsList} />
            <PrivateRoute path='/' exact component={makeBarbecueList} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
