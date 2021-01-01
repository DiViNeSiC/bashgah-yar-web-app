import React from 'react'

export default ({ 
    backToLoginForm, onSendConfirmationCode, sendConfirmCodeLoading,
    sendConfirmationCodeTimerIsOn, formData, onChange, coolDownTimer, onConfirmCode, 
}) => {
    return (
        <form onSubmit={onConfirmCode}>
            <div>
                <h2>تایید ورود به حساب</h2>
            </div>
            <div>
                <label>کد ارسال شده را وارد نمایید</label>
                <input 
                    required
                    type="text"
                    name="twoStepCode"
                    onChange={onChange}
                    placeholder='کد تایید'
                    value={formData.twoStepCode || ''}
                />
            </div>
            <div>
                <button type="button" onClick={onSendConfirmationCode} disabled={sendConfirmationCodeTimerIsOn || sendConfirmCodeLoading}>
                    {sendConfirmationCodeTimerIsOn ? `تلاش مجدد در: ${coolDownTimer}` : 'ارسال کد مجدد'}
                </button>
                <button type="submit">تایید ورود</button>
            </div>
            <div>
                <button type="button" onClick={backToLoginForm}>بازگشت به صفحه قبل</button>
            </div>
        </form>
    )
}