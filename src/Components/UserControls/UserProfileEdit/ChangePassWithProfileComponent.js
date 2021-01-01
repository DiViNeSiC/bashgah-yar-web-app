import React from 'react'
import useChangePassConfirm from '../CustomHooks/useChangePassConfirm'
import ChangePassConfirmForm from '../../../Layout/UserControls/changePassConfirmForm'

export default () => <ChangePassConfirmForm {...useChangePassConfirm()} />