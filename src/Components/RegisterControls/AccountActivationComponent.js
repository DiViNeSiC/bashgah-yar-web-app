import React from 'react'
import useActiveAccount from './CustomHooks/useActiveAccount'
import ActiveAccountForm from '../../Layout/RegisterControls/activeAccountForm'

export default () => <ActiveAccountForm {...useActiveAccount()} />