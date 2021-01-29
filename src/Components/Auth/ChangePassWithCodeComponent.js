import React from 'react'
import useForgotPass from './CustomHooks/useChangePass'
import { CODE } from '../../Constants/changePassFormTypes'
import ChangePasswordForm from '../../Layout/Auth/changePasswordForm'

export default () => <ChangePasswordForm {...useForgotPass(CODE)} />