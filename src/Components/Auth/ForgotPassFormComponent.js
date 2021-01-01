import React from 'react'
import useForgotPass from './CustomHooks/useForgotPass'
import ForgotPassForm from '../../Layout/Auth/forgotPassForm'

export default () => <ForgotPassForm {...useForgotPass()} />