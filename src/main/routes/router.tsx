import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import { makeBarbecueList, makeLogin, makeSignUp } from '@/main/factories/pages'
import { Spinner, PrivateRoute } from '@/presentation/components'
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
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path='/login' exact component={makeLogin} />
            <Route path='/signup' exact component={makeSignUp} />
            <PrivateRoute path='/' exact component={makeBarbecueList} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
