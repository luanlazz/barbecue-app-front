import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { Spinner } from '@/presentation/components'
import BarbecueList from '@/presentation/pages/barbecue-list/barbecue-list'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/login' exact component={makeLogin} />
          <Route path='/signup' exact component={makeSignUp} />
          <Route path='/' exact component={BarbecueList} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
