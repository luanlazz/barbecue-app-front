import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Spinner } from '@/presentation/components'

const Login = lazy(async () => import('@/presentation/pages/login/login'))

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/login' exact component={Login} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
