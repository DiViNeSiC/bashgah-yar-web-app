import { useContext, useEffect } from "react"
import { GlobalContext } from "../../../Context/provider"
import { regularLogin, sendCode, confirmCode } from '../../../Context/AuthReducer/actions'

export default () => {
    const { 
        authDispatch,
        authState: { regularLoginToken }
    } = useContext(GlobalContext)

    const handleRegularLogin = async (formData) => {
        await regularLogin(formData)(authDispatch)
    }

    const regularLoginRequest = (formData) => {
        handleRegularLogin(formData)
    }

    const handleSendCode = async () => {
        await sendCode(regularLoginToken)(authDispatch)
    }

    const sendCodeRequest = () => {
        handleSendCode()
    }

    const handleConfirmCode = async (formData) => {
        await confirmCode(formData)(authDispatch)
    }

    const confirmCodeRequest = (formData) => {
        handleConfirmCode(formData)
    }

    const autoSendCode = () => {
        if (regularLoginToken) sendCodeRequest()
    }

    useEffect(autoSendCode, [regularLoginToken])
    return { regularLoginRequest, sendCodeRequest, confirmCodeRequest }
}