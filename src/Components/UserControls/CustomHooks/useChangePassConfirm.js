import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from '../../../Context/provider'
import { toasterError } from "../../../Context/GlobalStates/actions"
import { EMPTY_CHANGE_PASS_TOKEN } from "../../../Constants/responseMessages"
import { changePasswordConfirm, changePassConfirmSuccessDisable } from '../../../Context/UserControls/actions'

export default () => {
    const { changePasswordToken } = useParams()
    const [newPassword, setNewPassword] = useState()
    const { history, globalDispatch, userControlsDispatch, userControlsState: { changePassConfirmSuccess } } = useContext(GlobalContext)

    const newPasswordOnChange = (e) => { setNewPassword(e.target.value) }
    
    const onChangePassConfirm = async (e) => { 
        e.preventDefault()
        if (!changePasswordToken) return toasterError(EMPTY_CHANGE_PASS_TOKEN)(globalDispatch)
        await changePasswordConfirm(changePasswordToken, newPassword)(userControlsDispatch, globalDispatch, history)
    }

    const disableSuccess = () => {
        if (!changePassConfirmSuccess) return
        changePassConfirmSuccessDisable(userControlsDispatch)
        localStorage.removeItem('BASHGAH_YAR_ENTRY_TOKEN')
        localStorage.removeItem('BASHGAH_YAR_REFRESH_TOKEN')
        history.push('/login')
    }

    useEffect(disableSuccess, [changePassConfirmSuccess])
    return { onChangePassConfirm, newPasswordOnChange }
}