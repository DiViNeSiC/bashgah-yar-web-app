import { useContext, useEffect, useRef, useState } from "react"
import { GlobalContext } from "../../../Context/provider"
import { forgotPassWithEmail, forgotPassWithPhone } from '../../../Context/Auth/actions'

export default () => {
    const emailInputRef = useRef()
    const phoneInputRef = useRef()
    const [inputRef, setInputRef] = useState()
    const [emailForm, setEmailForm] = useState(true)
    const [onForgotPassSubmit, setOnForgotPassSubmit] = useState()
    const { history, authDispatch, globalDispatch, authState: { 
        forgotPassEmailPending, forgotPassPhoneSmsPending 
    }} = useContext(GlobalContext)

    const handleChangeForm = () => { setEmailForm(prevState => !prevState) }

    const onForgotPassWithEmail = async (e) => {
        e.preventDefault()
        const email = emailInputRef.current.value
        await forgotPassWithEmail(email)(authDispatch, globalDispatch, history)
    }

    const onForgotPassWithPhone = async (e) => {
        e.preventDefault()
        const phoneNumber = phoneInputRef.current.value
        await forgotPassWithPhone(phoneNumber)(authDispatch, globalDispatch, history)
    }

    const handleSetSubmit = () => {
        if (emailForm) return setOnForgotPassSubmit(onForgotPassWithEmail)
        if (!emailForm) return setOnForgotPassSubmit(onForgotPassWithPhone)
    }

    const handleSetInputRef = () => {
        if (emailForm) return setInputRef(emailInputRef)
        if (!emailForm) return setInputRef(phoneInputRef)
    }

    const redirectToChangePassForm = () => {
        if (forgotPassEmailPending) return history.push('/login')
        if (forgotPassPhoneSmsPending) return history.push('/forgot-pass/code')
    }

    useEffect(handleSetSubmit, [emailForm])
    useEffect(handleSetInputRef, [emailForm])
    useEffect(redirectToChangePassForm, [forgotPassPhoneSmsPending, forgotPassEmailPending])
    return { emailForm, handleChangeForm, inputRef, onForgotPassSubmit }
}