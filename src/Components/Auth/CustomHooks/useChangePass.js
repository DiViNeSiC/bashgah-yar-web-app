import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../../Context/provider"
import { TOKEN, CODE } from '../../../Constants/changePassFormTypes'
import { changePassWithCode, changePassWithToken } from '../../../Context/Auth/actions'

export default (changePassType = null) => {
    const newPasswordInputRef = useRef()
    const resetPassCodeInputRef = useRef()
    const { forgotPassToken } = useParams()
    const [onChangePassSubmit, setOnChangePassSubmit] = useState()
    const { authDispatch, history, globalDispatch, authState: { changePassSuccess }} = useContext(GlobalContext)

    const onChangePassWithToken = async (e) => {
        e.preventDefault()
        const newPassword = newPasswordInputRef.current.value
        await changePassWithToken(newPassword, forgotPassToken)(authDispatch, globalDispatch, history)
    }

    const onChangePassWithCode = async (e) => {
        e.preventDefault()
        const newPassword = newPasswordInputRef.current.value
        const resetPassCode = resetPassCodeInputRef.current.value
        await changePassWithCode(newPassword, resetPassCode)(authDispatch, globalDispatch, history)
    }

    const handleSetSubmit = () => {
        if (!changePassType) return setOnChangePassSubmit(null)
        if (changePassType === CODE) return setOnChangePassSubmit(onChangePassWithCode)
        if (changePassType === TOKEN) return setOnChangePassSubmit(onChangePassWithToken)
    }

    const redirectToLogin = () => { if (changePassSuccess) history.push('/login') }

    useEffect(handleSetSubmit, [changePassType])
    useEffect(redirectToLogin, [changePassSuccess])
    return { newPasswordInputRef, resetPassCodeInputRef, onChangePassSubmit }
}