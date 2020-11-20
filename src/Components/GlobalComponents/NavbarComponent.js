import React from 'react'
import NavbarLayout from '../../Layout/GlobalLayout/navbar'
import useNavRoutes from './CustomHooks/useNavRoutes'

export default () => {
    const routes = useNavRoutes()
    return <NavbarLayout routes={routes} />
}
