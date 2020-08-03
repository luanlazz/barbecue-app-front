import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Spinner } from '@/presentation/components'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/login' exact component={makeLogin} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
