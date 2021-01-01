import React from 'react'
import baseURL from '../../Constants/backendUrl'
import avatarDefaultImage from '../../Assets/Images/default-profile-Image.png'

export default ({ 
    onUpdateCredentials, onUpdateEmail, emailOnChange, credentialsOnChange,
    currentPasswordOnChange, onInputShow, onInputType, onSendChangePassEmail,
    emailInputType, onDeleteAvatar, newAvatarImage, avatarInputRef, setUserRoleText,
    currentPassInputType, onUpdateAvatar, user, email, credentials, inputType, inputShow,
    credentialsInputType, newAvatarOnChange, onClickAvatarInput, onDeleteNewAvatar, onActiveAccountRequest, 
}) => {
    return (
        <div>
            <div>
                <div>
                    {user?.role && <span>{setUserRoleText(user.role)}</span>}
                </div>
                <div>
                    <span>وضعیت تایید ایمیل:</span>
                    {user && 
                        <span>
                            {
                                user.verifiedEmail ? 
                                'تایید شده' :
                                'تایید نشده'
                            }
                        </span>
                    }
                    {user && 
                        <span>
                            {
                                !user.verifiedEmail && 
                                <button type="button" onClick={onActiveAccountRequest}>فعال سازی ایمیل</button>
                            }
                        </span>
                    }
                </div>
            </div>
            <div>
                <input ref={avatarInputRef} type="file" hidden onChange={newAvatarOnChange} />
                <img alt="" style={{ height: 100, width: 100 }} src={
                    newAvatarImage ? newAvatarImage : (user && user.avatarImagePath) ? 
                    `${baseURL}/${user.avatarImagePath}` :
                    avatarDefaultImage
                } />
                {newAvatarImage ?
                    <div>
                        <button type="button" onClick={onUpdateAvatar}>افزودن آواتار جدید</button>
                        <button type="button" onClick={onDeleteNewAvatar}>انصراف</button>
                    </div>:
                    <div>
                        <button type="button" onClick={onClickAvatarInput}>انتخاب آواتار جدید</button>
                    </div>
                }
                {user && user.avatarImagePath &&
                    <div>
                        <button type="button" onClick={onDeleteAvatar}>پاک کردن آواتار</button>
                    </div>
                }
            </div>
            <div>
                <div>
                    <label>نام کاربری</label>
                    <input 
                        type="text"
                        name="username"
                        placeholder="نام کاربری"
                        value={credentials.username || ''}
                        onChange={credentialsOnChange}
                        disabled={!inputShow || inputType !== credentialsInputType}
                    />
                </div>
                <div>
                    <label>نام</label>
                    <input 
                        type="text"
                        name="name"
                        placeholder="نام"
                        value={credentials.name || ''}
                        onChange={credentialsOnChange}
                        disabled={!inputShow || inputType !== credentialsInputType}
                    />
                </div>
                <div>
                    <label>نام خانوادگی</label>
                    <input 
                        type="text"
                        name="lastname"
                        placeholder="نام خانوادگی"
                        value={credentials.lastname || ''}
                        onChange={credentialsOnChange}
                        disabled={!inputShow || inputType !== credentialsInputType}
                    />
                </div>
                <div>
                    <label>شماره تلفن</label>
                    <input 
                        type="text"
                        name="phoneNumber"
                        placeholder="شماره تلفن"
                        value={credentials.phoneNumber || ''}
                        onChange={credentialsOnChange}
                        disabled={!inputShow || inputType !== credentialsInputType}
                    />
                </div>
                <div>
                    <button 
                        type="button" 
                        onClick={(inputShow && inputType === credentialsInputType) ? onUpdateCredentials : () => {
                            onInputShow()
                            onInputType(credentialsInputType)
                        }}
                        disabled={
                            credentials.username.length < 6 ||
                            credentials.name.length < 2 ||
                            credentials.lastname.length < 2 ||
                            credentials.phoneNumber.length < 4
                        }
                    >
                        {(inputShow && inputType === credentialsInputType) ? 
                            'ثبت' : 
                            'ویرایش'
                        }
                    </button>
                    {inputShow && inputType === credentialsInputType &&
                        <button type="button" onClick={() => onInputShow(false)}>انصراف</button>
                    }
                </div>
            </div>
            <div>
                <div>
                    <label>ایمیل</label>
                    <input 
                        type="email"
                        name="email"
                        placeholder="ایمیل"
                        value={email}
                        onChange={emailOnChange}
                        disabled={!inputShow || inputType !== emailInputType}
                    />
                </div>
                <div>
                    <button 
                        type="button" 
                        onClick={(inputShow && inputType === emailInputType) ? onUpdateEmail : () => {
                            onInputShow()
                            onInputType(emailInputType)
                        }}
                        disabled={email?.length < 6}
                    >
                        {(inputShow && inputType === emailInputType) ? 
                            'ثبت' : 
                            'ویرایش'
                        }
                    </button>
                    {inputShow && inputType === emailInputType &&
                        <button type="button" onClick={() => onInputShow(false)}>انصراف</button>
                    }
                </div>
            </div>
            <div>
                {inputShow && inputType === currentPassInputType &&
                    <div>
                        <label>رمز عبور فعلی خود را وارد نمایید</label>
                        <input 
                            type="password"
                            name="currentPassword"
                            placeholder="رمز عبور"
                            onChange={currentPasswordOnChange}
                        />
                    </div>
                }
                <div>
                    <button 
                        type="button" 
                        onClick={(inputShow && inputType === currentPassInputType) ? onSendChangePassEmail : () => {
                            onInputShow()
                            onInputType(currentPassInputType)
                        }}
                    >
                        {(inputShow && inputType === currentPassInputType) ? 
                            'تایید' : 
                            'تغییر رمز عبور'
                        }
                    </button>
                    {inputShow && inputType === currentPassInputType &&
                        <button type="button" onClick={() => onInputShow(false)}>انصراف</button>
                    }
                </div>
            </div>
        </div>
    )
}