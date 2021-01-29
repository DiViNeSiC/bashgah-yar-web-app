import { useContext, useEffect } from "react"
import { GlobalContext } from '../../../Context/provider'
import { logout, logoutDisableStates } from "../../../Context/Auth/actions"
import { sendActivationAccountEmail } from '../../../Context/RegisterControls/actions'

export default () => {
    const { history, authDispatch, globalDispatch, registersDispatch,
        authState: { logoutSuccess },
        registersState: { activeAccountEmailPending },
    } = useContext(GlobalContext)

    const onLogout = async () => { await logout(authDispatch, globalDispatch, history) }

    const redirectAfterLogout = () => {
        if (logoutSuccess) { 
            history.push('/')
            logoutDisableStates(authDispatch) 
        } 
    }
    
    const onActiveAccountRequest = async () => {
        if (!activeAccountEmailPending) await sendActivationAccountEmail(registersDispatch, globalDispatch, history)
    }

    useEffect(redirectAfterLogout, [logoutSuccess])
    return { onActiveAccountRequest, onLogout }
}