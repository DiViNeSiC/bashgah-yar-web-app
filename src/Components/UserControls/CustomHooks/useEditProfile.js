import { useContext, useEffect, useRef, useState } from "react"
import { getUser } from "../../../Context/Auth/actions"
import { GlobalContext } from '../../../Context/provider'
import setUserRoleText from '../../../Utils/setUserRoleText'
import { toasterError } from "../../../Context/GlobalStates/actions"
import { AVATAR_FILE_CANT_BE_EMPTY } from "../../../Constants/responseMessages"
import { sendActivationAccountEmail } from '../../../Context/RegisterControls/actions'
import { EMAIL_TYPE, CREDENTIALS_TYPE, CURRENT_PASS_TYPE } from '../../../Constants/Actions/userControls'
import { 
    changePassConfirmSuccessDisable,sendChangePasswordEmail, setInputShow,
    updateEmail, setInputType, updateAvatar, deleteAvatar, updateCredentials,
} from '../../../Context/UserControls/actions'

export default () => {
    const avatarInputRef = useRef()
    const [email, setEmail] = useState()
    const [newAvatar, setNewAvatar] = useState()
    const [newAvatarImage, setNewAvatarImage] = useState()
    const [currentPassword, setCurrentPassword] = useState()
    const [credentials, setCredentials] = useState({ username: '', name: '', lastname: '', phoneNumber: '' })
    const { history, authDispatch, registersDispatch, globalDispatch, userControlsDispatch, authState: { user }, registersState: { activeAccountEmailPending }, 
        userControlsState: { inputShow, inputType, changePassConfirmSuccess } 
    } = useContext(GlobalContext)
    
    const emailOnChange = (e) => { setEmail(e.target.value) }
    const onClickAvatarInput = () => avatarInputRef.current.click()

    const newAvatarOnChange = (e) => { setNewAvatar(e.target.files[0]) }
    const onInputType = (type) => { setInputType(type)(userControlsDispatch) }

    const currentPasswordOnChange = (e) => { setCurrentPassword(e.target.value) }

    const credentialsOnChange = ({ target: { name, value }}) => {
        setCredentials({ ...credentials, [name]: value })
    }

    const onDeleteNewAvatar = () => {
        avatarInputRef.current.value = null
        setNewAvatar(null); setNewAvatarImage(null)
    }

    const setStateValues = () => {
        if (!user) return
        setEmail(user.email)
        const { username, name, lastname, phoneNumber } = user
        setCredentials({ username, name, lastname, phoneNumber })
    }

    const getUserProfile = async () => { await getUser(authDispatch, globalDispatch, history) }
    
    const onInputShow = (state = true) => {
        setInputShow(state)(userControlsDispatch)
        if (!state) setStateValues()
    }

    const onUpdateCredentials = async () => {
        await updateCredentials(credentials, getUserProfile, onInputShow)(globalDispatch, history)
    }

    const onUpdateEmail = async () => { 
        await updateEmail(email, getUserProfile, onInputShow)(globalDispatch, history)
    }
    
    const onUpdateAvatar = async () => { 
        if (!newAvatar) return toasterError(AVATAR_FILE_CANT_BE_EMPTY)(globalDispatch)
        const formData = new FormData()
        formData.append('avatar', newAvatar)
        await updateAvatar(formData, getUserProfile, onDeleteNewAvatar)(globalDispatch, history)
    }

    const onDeleteAvatar = async () => { 
        await deleteAvatar(getUserProfile)(globalDispatch, history)
    }
    
    const onSendChangePassEmail = async () => { 
        await sendChangePasswordEmail(currentPassword, onInputShow)(userControlsDispatch, globalDispatch, history)
    }

    const disableSuccess = () => {
        if (!changePassConfirmSuccess) return
        changePassConfirmSuccessDisable(userControlsDispatch)
        localStorage.removeItem('BASHGAH_YAR_ENTRY_TOKEN')
        localStorage.removeItem('BASHGAH_YAR_REFRESH_TOKEN')
        history.push('/login')
    }

    const setAvatarDisplayImage = () => {
        if (!newAvatar) return onDeleteNewAvatar()
        const objUrl = URL.createObjectURL(newAvatar)
        setNewAvatarImage(objUrl)
        return () => URL.revokeObjectURL(objUrl)
    }

    const onActiveAccountRequest = async () => {
        if (!activeAccountEmailPending) 
            await sendActivationAccountEmail(registersDispatch, globalDispatch, history)
    }

    useEffect(setStateValues, [user])
    useEffect(setAvatarDisplayImage, [newAvatar])
    useEffect(disableSuccess, [changePassConfirmSuccess])
    return {
        onUpdateAvatar, user, email, credentials, inputType, inputShow,
        onDeleteAvatar, newAvatarImage, avatarInputRef, setUserRoleText,
        onUpdateCredentials, onUpdateEmail, emailOnChange, credentialsOnChange,
        currentPasswordOnChange, onInputShow, onInputType, onSendChangePassEmail,
        newAvatarOnChange, onClickAvatarInput, onDeleteNewAvatar, onActiveAccountRequest,
        emailInputType: EMAIL_TYPE, credentialsInputType: CREDENTIALS_TYPE, currentPassInputType: CURRENT_PASS_TYPE,
    }
}