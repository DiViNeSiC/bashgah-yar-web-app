import React from 'react'
import useForm from './CustomHooks/useForm'
import LoginForm from '../../Layout/Auth/loginForm'
import ConfirmCodeForm from '../../Layout/Auth/confirmCodeForm'

export default () => {
    const { 
        onCheckBoxChange, timer, formData, onChange, onConfirmCode, onRegularLogin, backToLoginForm,
        onSendConfirmationCode, sendConfirmCodeLoading, confirmationCodeFormShow, sendConfirmationCodeTimer,
    } = useForm()

    return (
        <>
            {confirmationCodeFormShow ? 
                <ConfirmCodeForm
                    backToLoginForm={backToLoginForm} onSendConfirmationCode={onSendConfirmationCode}
                    sendConfirmCodeLoading={sendConfirmCodeLoading} formData={formData} onChange={onChange}
                    coolDownTimer={timer} onConfirmCode={onConfirmCode} sendConfirmationCodeTimerIsOn={sendConfirmationCodeTimer}
                /> :
                <LoginForm
                    onChange={onChange} formData={formData}
                    onLogin={onRegularLogin} onRememberUserCheckBoxChange={onCheckBoxChange}
                />
            }
        </>
    )
}