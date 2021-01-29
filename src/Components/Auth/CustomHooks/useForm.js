import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../Context/provider"
import { sendCode, confirmCode, regularLogin, confirmCodeFormHide, sendConfirmCodeTimeDisable } from '../../../Context/Auth/actions'

const SEND_CODE_CONFIRMATION_TIME = 60

export default () => {
    const [timer, setTimer] = useState()
    const [timeInterval, setTimeInterval] = useState()
    const [formData, setFormData] = useState({ remember: false })
    const { history, authDispatch, globalDispatch, authState: { 
        regularLoginToken, confirmationCodeFormShow, sendConfirmationCodeTimer, sendConfirmCodeLoading 
    }} = useContext(GlobalContext)

    const clearFormData = () => { setFormData({ remember: formData.remember }) }
    const onCheckBoxChange = () => { setFormData({ ...formData, remember: !formData.remember }) }
    const onChange = ({ target: { name, value }}) => { setFormData({ ...formData, [name]: value }) }

    const onRegularLogin = async (e) => {
        e.preventDefault() 
        const data = { 
            expiresIn: formData.remember ? '2d' : '12h',
            credential: formData.credential, password: formData.password, 
            confirmationToken: localStorage.BASHGAH_YAR_CONFIRMATION_TOKEN,
        }
        await regularLogin(data, clearFormData)(authDispatch, globalDispatch)
    }

    const onSendConfirmationCode = async () => { await sendCode(regularLoginToken)(authDispatch, globalDispatch) }

    const onConfirmCode = async (e) => {
        e.preventDefault()
        const data = { twoStepCode: formData.twoStepCode, expiresIn: formData.remember ? '2d' : '12h' }
        await confirmCode(data, clearFormData)(authDispatch, globalDispatch)
    }

    const autoSendConfirmationCode = () => { if (regularLoginToken) onSendConfirmationCode() }
    
    const backToLoginForm = () => { if (confirmationCodeFormShow) confirmCodeFormHide(authDispatch) }

    const redirectToDashboard = () => { if (localStorage.BASHGAH_YAR_ENTRY_TOKEN) history.push('/dashboard') }

    const intervalTimer = () => {
        if (!sendConfirmationCodeTimer) return clearInterval(timeInterval)
        if (!confirmationCodeFormShow) return
        setTimer(SEND_CODE_CONFIRMATION_TIME)
        const interval = setInterval(countDownTimer, 1000)
        setTimeInterval(interval)
    }

    const countDownTimer = () => {
        if (sendConfirmationCodeTimer && confirmationCodeFormShow) setTimer(prevTime => prevTime - 1)
    }

    const checkTime = () => {
        if (!sendConfirmationCodeTimer) return clearInterval(timeInterval)
        if (timer === 0 || !confirmationCodeFormShow) sendConfirmCodeTimeDisable(authDispatch)
    }
    
    useEffect(checkTime, [timer])
    useEffect(redirectToDashboard, [regularLoginToken])
    useEffect(intervalTimer, [sendConfirmationCodeTimer])
    useEffect(autoSendConfirmationCode, [regularLoginToken])
    return { 
        timer, formData, onChange, onConfirmCode,
        onRegularLogin, backToLoginForm, onCheckBoxChange, onSendConfirmationCode,
        sendConfirmCodeLoading, confirmationCodeFormShow, sendConfirmationCodeTimer,
    }
}