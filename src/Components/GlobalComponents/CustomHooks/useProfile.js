import { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../Context/provider'
import { getUser } from '../../../Context/AuthReducer/actions'
import isAuth from '../../../Utils/isAuth'

export default () => {
    const { authDispatch, authState: { user } } = useContext(GlobalContext)
    const handleUserProfileRequest = async () => {
        if (isAuth() && !user) await getUser(authDispatch)
    }

    const sendRequestForProfile = () => {
        handleUserProfileRequest()
    }

    useEffect(sendRequestForProfile, [])
}