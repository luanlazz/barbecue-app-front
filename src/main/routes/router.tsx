import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { Spinner, PrivateRoute } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import BarbecueList from '@/presentation/pages/barbecue-list/barbecue-list'

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
            <PrivateRoute path='/' exact component={BarbecueList} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
