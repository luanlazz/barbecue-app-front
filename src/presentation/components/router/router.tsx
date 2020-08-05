import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Spinner } from '@/presentation/components'
import BarbecueList from '@/presentation/pages/barbecue-list/barbecue-list'

type Factory = {
  makeLogin: React.FC
  makeSignUp: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/login' exact component={factory.makeLogin} />
          <Route path='/signup' exact component={factory.makeSignUp} />
          <Route path='/barbecues' exact component={BarbecueList} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
