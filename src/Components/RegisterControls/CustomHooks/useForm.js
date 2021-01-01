import { useContext, useEffect, useState } from "react"
import useAvatar from './useAvatar'
import useGymPicField from './useGymPicField'
import { GlobalContext } from "../../../Context/provider"
import { registerTypes } from '../../../Constants/registerMethods'
import { toasterError } from "../../../Context/GlobalStates/actions"
import { registerNewUser, registerUserSuccessDisable, setAvatarFile, setGymPicFiles } from '../../../Context/RegisterControls/actions'

export default () => {
    const avatarHandler = useAvatar()
    const gymPicsHandler = useGymPicField()
    const [formValue, setFormValue] = useState({})
    const { globalDispatch, registersDispatch, authState: { user }, registersState: { 
        selectedMethod, registerSuccess, avatarFile, gymPics 
    }} = useContext(GlobalContext)

    const onChange = ({ target: { name, value }}) => { setFormValue({ ...formValue, [name]: value }) }

    const setDefaultFormValues = () => {
        if (!user || !selectedMethod || selectedMethod.value !== registerTypes.manager || !user.adminGyms.length) return 
        setFormValue({ ...formValue, gymId: user.adminGyms[0]._id })
    }

    const onRegisterNewAccount = (e) => {
        e.preventDefault()
        if (!formValue) return
        if (!selectedMethod) return
        if (selectedMethod.value !== registerTypes.gym) {
            const { error, errorMessage } = checkConfirmPassword()
            if (error) return toasterError(errorMessage)(globalDispatch)
        }

        const formData = new FormData()
        Object.entries(formValue).forEach(([key, value]) => { formData.append(key, value) })
        if (avatarFile) formData.append('avatar', avatarFile.file)
        if (gymPics) {
            const gymPicFiles = gymPics.map(picture => picture.file)
            gymPicFiles.forEach(file => { formData.append('gymPics[]', file) })
        }

        handleRegister(formData)
    }

    const checkConfirmPassword = () => {
        if (!formValue.password && !formValue.confirmPassword) 
            return { error: true, errorMessage: 'رمز عبور را وارد نکرده اید' }
        if (formValue.password !== formValue.confirmPassword) 
            return { error: true, errorMessage: 'رمز عبور شما منطبق نیست' }

        return { error: false, errorMessage: null }
    }

    const handleRegister = async (formData) => {
        await registerNewUser(selectedMethod.value, formData)(registersDispatch, globalDispatch)
    }

    const handleClearForm = () => {
        if (!registerSuccess) return
        setFormValue({})
        registerUserSuccessDisable(registersDispatch)
        setAvatarFile(null, false, null, null)(registersDispatch, globalDispatch)
        setGymPicFiles([], false, null, null)(registersDispatch, globalDispatch)
    }
    
    useEffect(handleClearForm, [registerSuccess])
    useEffect(setDefaultFormValues, [selectedMethod])
    return { 
        adminGyms: user?.adminGyms.length ? user.adminGyms : null,
        onChange, formValue, avatarHandler, gymPicsHandler, onRegisterNewAccount,
    }
}