import React from 'react'
import useForgotPass from './CustomHooks/useForgotPass'
import { TOKEN } from '../../Constants/changePassFormTypes'
import ChangePasswordForm from '../../Layout/Auth/changePasswordForm'

export default () => <ChangePasswordForm {...useForgotPass(TOKEN)} />