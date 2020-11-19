import { useContext } from "react"
import { GlobalContext } from "../../../Context/provider"
import { CODE_FORM_HIDE } from '../../../Constants/auth'

export default () => {
    const { 
        authState: { codeFormShow }, authDispatch 
    } = useContext(GlobalContext)

    const backToLoginForm = () => {
        if (!codeFormShow) return
        authDispatch({ type: CODE_FORM_HIDE })
    }

    return backToLoginForm
}