import React from 'react'

export default ({ newPassInputRef, changePassConfirmCodeInputRef, onChangePassSubmit }) => {
    return (
        <div>
            <div>
                <h2>تغییر رمز عبور</h2>
            </div>
            {changePassConfirmCodeInputRef ?
                <form onSubmit={onChangePassSubmit}>
                    <div>
                        <label>رمز عبور جدید را وارد نمایید</label>
                        <input
                            required
                            type="password"
                            placeholder="رمز عبور جدید"
                            ref={newPassInputRef}
                        />
                    </div>
                    <div>
                        <label>کد تایید را وارد نمایید</label>
                        <input
                            required
                            type="text"
                            placeholder="کد تایید"
                            ref={changePassConfirmCodeInputRef}
                        />
                    </div>
                    <div>
                        <button type="submit">تغییر رمز عبور</button>
                    </div>
                </form>:
                <form onSubmit={onChangePassSubmit}>
                    <div>
                        <label>رمز عبور جدید را وارد نمایید</label>
                        <input
                            required
                            type="password"
                            placeholder="رمز عبور جدید"
                            ref={newPassInputRef}
                        />
                    </div>
                    <div>
                        <button type="submit">تغییر رمز عبور</button>
                    </div>
                </form>
            }
        </div>
    )
}
