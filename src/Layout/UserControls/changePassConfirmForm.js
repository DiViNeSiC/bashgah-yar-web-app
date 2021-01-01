import React from 'react'

export default ({ newPasswordOnChange, onChangePassConfirm }) => {
    return (
        <form onSubmit={onChangePassConfirm}>
            <div>
                <label>رمز عبور جدید را وارد نمایید</label>
                <input
                    required
                    type="password"
                    placeholder="رمز عبور"
                    onChange={newPasswordOnChange}
                />
            </div>
            <div>
                <button type="submit">تغییر رمز عبور</button>
            </div>
        </form>
    )
}