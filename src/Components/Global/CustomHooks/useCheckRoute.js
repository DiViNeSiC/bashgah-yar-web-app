import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../../../Context/provider'
import { roleRoutes, globalRoutes } from '../../../Constants/roleRoutes'

export default (path) => {
    const history = useHistory()
    const { authState: { user } } = useContext(GlobalContext)

    useEffect(() => {
        const isGlobalRoute = globalRoutes.find(route => route.path === path)
        if (isGlobalRoute) return

        if (!user) return

        const { routes } = roleRoutes.find(routes => routes.role === user.role)
        const isInUserRoutes = routes.find(route => route.path === path)
        if (!isInUserRoutes) return history.push('/forbidden')
    }, [user, path, history])
}