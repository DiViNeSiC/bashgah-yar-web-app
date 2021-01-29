import { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../Context/provider'
import { getUser } from '../../../Context/Auth/actions'
import isAuth from '../../../Utils/isAuth'

export default () => {
    const { history, globalDispatch, authDispatch, authState: { user } } = useContext(GlobalContext)
    const handleUserProfileRequest = async () => {
        if (isAuth() && !user) await getUser(authDispatch, globalDispatch, history)
    }

    const sendRequestForProfile = () => { handleUserProfileRequest() }
    useEffect(sendRequestForProfile, [])
}