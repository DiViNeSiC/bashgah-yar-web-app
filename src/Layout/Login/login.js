import React from 'react'

export default ({ formData, onChange, regularLogin }) => {
    return (
        <div>
            <h1>ورود به حساب کاربری</h1>
            <form onSubmit={(e) => {e.preventDefault(); regularLogin(formData)}}>
                <div>
                    <label>نام کاربری یا ایمیل و یا شماره تلفن خود را وارد نمایید</label>
                    <input 
                        name="credential"
                        placeholder="نام کاربری"
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label>رمزعبور خود را وارد نمایید</label>
                    <input 
                        name="password"
                        type="password"
                        placeholder="رمزعبور"
                        onChange={onChange}
                    />
                </div>
                <button type="submit">ورود</button>
            </form>
        </div>
    )
}