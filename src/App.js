import React from 'react'
import uuid from 'uuid/v4'
import routes from './Routes/routes'
import RenderRoutes from './Routes/render'
import { GlobalProvider } from './Context/provider'
import { Switch, BrowserRouter as Router } from 'react-router-dom'
import LoadingComponent from './Components/GlobalComponents/LoadingComponent'
import ToasterComponent from './Components/GlobalComponents/ToasterComponent'
import NavbarComponent from './Components/GlobalComponents/NavbarComponent'

export default () => (
    <GlobalProvider>
      <Router>
        <div>
          <NavbarComponent />
          <LoadingComponent />
          <ToasterComponent />
          <div>
            <Switch>
              {routes.map(route => <RenderRoutes key={uuid()} {...route} />)}
            </Switch>
          </div>
        </div>
      </Router>
    </GlobalProvider>
)

