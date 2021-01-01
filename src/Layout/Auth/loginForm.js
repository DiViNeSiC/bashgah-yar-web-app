import React from 'react'
import { Link } from 'react-router-dom'

export default ({ onChange, onLogin, formData, onRememberUserCheckBoxChange }) => {
    return (
        <form onSubmit={onLogin}>
            <div>
                <h2>ورود به حساب کاربری</h2>
            </div>
            <div>
                <div>
                    <label>نام کاربری یا ایمیل یا شماره تلفن</label>
                    <input
                        required
                        type="text"
                        name="credential"
                        onChange={onChange}
                        placeholder="نام کاربری"
                        value={formData.credential || ''}
                    />
                </div>
                <div>
                    <label>رمز عبور</label>
                    <input
                        required
                        type="password"
                        name="password"
                        onChange={onChange}
                        placeholder="رمز عبور"
                        value={formData.password || ''}
                    />
                </div>
            </div>
            <div>
                <label>من را بخاطر بسپار</label>
                <input type="checkbox" onChange={onRememberUserCheckBoxChange} />
            </div>
            <div>
                <button type="submit">ورود</button>
                <Link to="/forgot-pass">رمز عبور خود را فراموش کرده اید؟</Link>
            </div>
        </form>
    )
}