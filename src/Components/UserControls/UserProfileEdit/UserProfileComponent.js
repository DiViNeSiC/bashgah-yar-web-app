import React from 'react'
import useEditProfile from '../CustomHooks/useEditProfile'
import EditProfileForm from '../../../Layout/UserControls/editProfileForm'

export default () => <EditProfileForm {...useEditProfile()} />