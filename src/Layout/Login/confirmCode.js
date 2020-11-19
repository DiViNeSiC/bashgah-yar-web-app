import React from 'react'
import rememberOps from '../../Constants/rememberUserOptions'

export default ({
    sendTimer,
    formData, onChange, 
    sendCode, confirmCode,
    timer, backToLoginForm
}) => {
    return (
        <div>
            <h1>تایید ورود به حساب</h1>
            <form onSubmit={(e) => {e.preventDefault(); confirmCode(formData)}}>
                <div>
                    <label>کد ارسال شده به شماره خود را وارد نمایید</label>
                    <input 
                        name="twoStepCode"
                        placeholder="کد ورودی"
                        onChange={onChange}
                    />
                </div>
                <div>
                    حساب کاربری شما در چه مدت فعال باشد؟
                    <select name="expiresIn" onChange={onChange}>
                        {rememberOps.map(({ text, value }) => (
                            <option key={value} value={value}>{text}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button 
                        type="button" 
                        onClick={sendCode} 
                        disabled={sendTimer}
                    >
                        { sendTimer ? `تلاش دوباره در: ${timer}` : 'ارسال کد مجدد'}
                    </button>
                </div>
                <div>
                    <button type="submit">تایید</button>
                </div>
                <div>
                    <button type="button" onClick={backToLoginForm}>
                        بازگشت به صفحه قبل
                    </button>
                </div>
            </form>
        </div>
    )
}