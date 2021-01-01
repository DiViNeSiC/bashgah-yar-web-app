import React from 'react'
import AvatarInput from '../Partials/avatarInput'

export default ({ onChange, formValue, adminGyms, avatarHandler, onSubmit }) => {
    return (
        <>
            {adminGyms && adminGyms?.length > 0 && 
                <form onSubmit={onSubmit}>
                    <div>
                        <h2>ثبت نام کاربر جدید</h2>
                    </div>
                    <div>
                        <div>
                            <AvatarInput {...avatarHandler} />
                        </div>
                        <div>
                            <label>نام</label>
                            <input 
                                required 
                                name="name"
                                type="text"
                                onChange={onChange}
                                value={formValue.name || ''}
                            />
                        </div>
                        <div>
                            <label>نام خانوادگی</label>
                            <input 
                                required 
                                name="lastname"
                                type="text"
                                onChange={onChange}
                                value={formValue.lastname || ''}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>نام کاربری</label>
                            <input 
                                required 
                                type="text"
                                name="username"
                                onChange={onChange}
                                value={formValue.username || ''}
                            />
                        </div>
                        <div>
                            <label>ایمیل</label>
                            <input 
                                required 
                                name="email"
                                type="email"
                                onChange={onChange}
                                value={formValue.email || ''}
                            />
                        </div>
                        <div>
                            <label>شماره تلفن</label>
                            <input 
                                required 
                                type="text"
                                name="phoneNumber"
                                onChange={onChange}
                                value={formValue.phoneNumber || ''}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <select onChange={onChange} name="gymId">
                                {adminGyms.map(gym => (
                                    <option key={gym._id} value={gym._id}>{gym.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>رمز عبور</label>
                            <input 
                                required
                                name="password"
                                type="password"
                                onChange={onChange}
                                value={formValue.password || ''}
                            />
                        </div>
                        <div>
                            <label>تکرار رمز عبور</label>
                            <input 
                                required 
                                name="confirmPassword"
                                type="password"
                                onChange={onChange}
                                value={formValue.confirmPassword || ''}
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit">ثبت</button>
                    </div>
                </form>
            }
            {!adminGyms && !adminGyms?.length && 
                <div>
                    شما نمیتوانید حساب منیجر ایجاد کنید
                </div>
            }
        </>
    )
}
