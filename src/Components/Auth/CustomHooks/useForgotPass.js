import { useContext, useEffect, useRef, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { GlobalContext } from "../../../Context/provider"
import { changePassWithCode, forgotPassWithEmail, forgotPassWithPhone, changePassWithToken } from '../../../Context/Auth/actions'

export default (changePassType = null) => {
    const history = useHistory()
    const emailInputRef = useRef()
    const phoneInputRef = useRef()
    const newPasswordInputRef = useRef()
    const resetPassCodeInputRef = useRef()
    const { forgotPassToken } = useParams()
    const [emailForm, setEmailForm] = useState(true)
    const { authDispatch, globalDispatch, authState: { 
        changePassSuccess, forgotPassEmailPending, forgotPassPhoneSmsPending 
    }} = useContext(GlobalContext)

    const handleChangeForm = () => { setEmailForm(prevState => !prevState) }

    const onForgotPassWithEmail = async (e) => {
        e.preventDefault()
        const email = emailInputRef.current.value
        await forgotPassWithEmail(email)(authDispatch, globalDispatch)
    }

    const onForgotPassWithPhone = async (e) => {
        e.preventDefault()
        const phoneNumber = phoneInputRef.current.value
        await forgotPassWithPhone(phoneNumber)(authDispatch, globalDispatch)
    }

    const onChangePassWithToken = async (e) => {
        e.preventDefault()
        const newPassword = newPasswordInputRef.current.value
        await changePassWithToken(newPassword, forgotPassToken)(authDispatch, globalDispatch)
    }

    const onChangePassWithCode = async (e) => {
        e.preventDefault()
        const newPassword = newPasswordInputRef.current.value
        const resetPassCode = resetPassCodeInputRef.current.value
        await changePassWithCode(newPassword, resetPassCode)(authDispatch, globalDispatch)
    }

    const redirectToLogin = () => { if (changePassSuccess) history.push('/login') }

    const redirectToChangePassForm = () => {
        if (forgotPassEmailPending) return history.push('/login')
        if (forgotPassPhoneSmsPending) return history.push('/forgot-pass/code')
    }

    useEffect(redirectToLogin, [changePassSuccess])
    useEffect(redirectToChangePassForm, [forgotPassPhoneSmsPending, forgotPassEmailPending])
    return { 
        emailForm, handleChangeForm,
        inputRef: emailForm ? emailInputRef : phoneInputRef,
        newPassInputRef: changePassType ? newPasswordInputRef : null,
        changePassConfirmCodeInputRef: changePassType === 'code' ? resetPassCodeInputRef : null,
        onForgotPassSubmit: !changePassType ? emailForm ? onForgotPassWithEmail : onForgotPassWithPhone : null,
        onChangePassSubmit: changePassType ? changePassType === 'code' ? onChangePassWithCode : onChangePassWithToken : null
    }
}