import React from 'react'
import { useContext } from "react"
import { GlobalContext } from "../../Context/provider"
import useForm from './CustomHooks/useForm'
import useFormChange from './CustomHooks/useFormChange'
import useRequest from './CustomHooks/useRequest'
import useTimer from './CustomHooks/useTimer'
import LoginLayout from '../../Layout/Login/login'
import ConfirmCodeLayout from '../../Layout/Login/confirmCode'

export default () => {
    const {
        authState: { codeFormShow, sendTimer } 
    } = useContext(GlobalContext)
    const {
        regularLoginRequest, sendCodeRequest, confirmCodeRequest 
    } = useRequest()
    const { formData, onChange } = useForm()
    const backToLoginForm = useFormChange()
    const timer = useTimer()

    return (
        <div>
            {codeFormShow ? 
                <ConfirmCodeLayout 
                    sendTimer={sendTimer}
                    formData={formData}
                    onChange={onChange}
                    sendCode={sendCodeRequest}
                    confirmCode={confirmCodeRequest}
                    timer={timer}
                    backToLoginForm={backToLoginForm}
                /> :
                <LoginLayout
                    formData={formData}
                    onChange={onChange}
                    regularLogin={regularLoginRequest}
                />
            }
        </div>
    )
}
