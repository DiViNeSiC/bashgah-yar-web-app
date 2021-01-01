import React from 'react'

export default ({ inputRef, emailForm, handleChangeForm, onForgotPassSubmit }) => {
    return (
        <div>
            <div>
                <h2>بازیابی رمز عبور</h2>
            </div>
            {emailForm ? 
                <form onSubmit={onForgotPassSubmit}>
                    <div>
                        <label>ایمیل خود را وارد نمایید</label>
                        <input
                            required
                            type="email"
                            placeholder="ایمیل"
                            ref={inputRef}
                        />
                    </div>
                    <div>
                        <button type="submit">تایید</button>
                    </div>
                    <div>
                        <button type="button" onClick={handleChangeForm}>بازیابی از طریق شماره تلفن</button>
                    </div>
                </form>:
                <form onSubmit={onForgotPassSubmit}>
                    <div>
                        <label>شماره تلفن خود را وارد نمایید</label>
                        <input
                            required
                            type="text"
                            placeholder="شماره تلفن"
                            ref={inputRef}
                        />
                    </div>
                    <div>
                        <button type="submit">تایید</button>
                    </div>
                    <div>
                        <button type="button" onClick={handleChangeForm}>بازیابی از طریق ایمیل</button>
                    </div>
                </form>
            }
        </div>
    )
}
