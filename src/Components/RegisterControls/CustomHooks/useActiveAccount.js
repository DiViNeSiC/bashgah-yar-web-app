import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from '../../../Context/provider'
import { activeAccount } from '../../../Context/RegisterControls/actions'

export default () => {
    const { accountActivationToken } = useParams()
    const { globalDispatch, registersDispatch, 
        registersState: { activeAccountSuccess, activeAccountError } 
    } = useContext(GlobalContext)

    const handleActivationEmail = () => { activationEmailRequest() }

    const activationEmailRequest = async () => {
        if (accountActivationToken) await activeAccount(accountActivationToken)(registersDispatch, globalDispatch)
    }

    useEffect(handleActivationEmail, [])
    return { activeAccountSuccess, activeAccountError }
}