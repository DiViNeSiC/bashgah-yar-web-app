import React from 'react'
import uuid from 'uuid/v4'
import { appContainer } from './Assets/Styles/mainStyles'
import { GlobalProvider } from './Context/provider'
import { Switch, BrowserRouter as Router } from 'react-router-dom'
import routes from './Routes/routes'
import RenderRoutes from './Routes/render'
import NavbarComponent from './Components/Global/NavbarComponent'
import LoadingComponent from './Components/Global/LoadingComponent'
import ToasterComponent from './Components/Global/ToasterComponent'
import './Assets/Css/main.css'
import 'react-toastify/dist/ReactToastify.css'

export default () => (
    <GlobalProvider>
      <Router>
        <div>
          <NavbarComponent />
          <LoadingComponent />
          <ToasterComponent />
          <div style={appContainer}>
            <Switch>{routes.map(route => <RenderRoutes key={uuid()} {...route} />)}</Switch>
          </div>
        </div>
      </Router>
    </GlobalProvider>
)