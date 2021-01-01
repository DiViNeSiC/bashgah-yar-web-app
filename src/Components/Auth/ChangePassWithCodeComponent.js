import React from 'react'
import useForgotPass from './CustomHooks/useForgotPass'
import ChangePasswordForm from '../../Layout/Auth/changePasswordForm'

export default () => <ChangePasswordForm {...useForgotPass('code')} />