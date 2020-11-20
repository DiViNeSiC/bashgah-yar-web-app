import { useContext, useEffect } from "react"
import { GlobalContext } from "../../../Context/provider"
import { regularLogin, sendCode, confirmCode } from '../../../Context/AuthReducer/actions'
import { useHistory } from "react-router-dom"

export default () => {
    const { 
        authDispatch,
        authState: { regularLoginToken }
    } = useContext(GlobalContext)
    const history = useHistory()

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

    const redirect = () => {
        const entryToken = localStorage.BASHGAH_YAR_ENTRY_TOKEN
        if (entryToken) history.push('/dashboard')
    }

    useEffect(autoSendCode, [regularLoginToken])
    useEffect(redirect, [regularLoginToken])
    return { regularLoginRequest, sendCodeRequest, confirmCodeRequest }
}