import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signin from '../pages/signin/Signin'
import Dashboard from '../pages/dashboard/Dashboard'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Signin} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='*' component={() => <h1> Pagina nao encontrada</h1>} />
    </Switch>
  </BrowserRouter>
)

export default Routes
