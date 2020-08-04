import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Spinner } from '@/presentation/components'
import { SignUp } from '@/presentation/pages'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/login' exact component={makeLogin} />
          <Route path='/signup' exact component={SignUp} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
