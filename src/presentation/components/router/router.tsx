import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Spinner } from '@/presentation/components'

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
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
