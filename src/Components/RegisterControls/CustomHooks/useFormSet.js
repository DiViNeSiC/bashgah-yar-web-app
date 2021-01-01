import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../Context/provider"
import { methods, registerTypes } from '../../../Constants/registerMethods'
import GymForm from '../../../Layout/RegisterControls/Forms/gymForm'
import GymAdminForm from '../../../Layout/RegisterControls/Forms/gymAdminForm'
import GymManagerForm from '../../../Layout/RegisterControls/Forms/gymManagerForm'
import CoachAndAthleteForm from '../../../Layout/RegisterControls/Forms/coachAndAthleteForm'
import { setRegisterMethods, setRegisterMethodOption } from '../../../Context/RegisterControls/actions'

export default () => {
    const [Form, setForm] = useState()
    const { registersDispatch, authState: { user }, registersState: { 
        selectedMethod, registersMethods 
    }} = useContext(GlobalContext)
    
    const handleRegisterMethods = () => {
        if (!user) return 
        const { registerMethods } = methods.find(method => method.userRole === user.role)
        setRegisterMethods(registerMethods)(registersDispatch)
    }

    const setMethod = () => { if (registersMethods) handleChangeForm(registersMethods[0]) }
    
    const onSelectForm = ({ target: { value }}) => {
        if (!registersMethods) return
        const method = registersMethods.find(method => method.value === value)
        handleChangeForm(method)
    }

    const handleChangeForm = (option) => { setRegisterMethodOption(option)(registersDispatch) }

    const handleFindForm = () => {
        if (!selectedMethod) return
        switch(selectedMethod.value) {
            case registerTypes.gym: return GymForm
            case registerTypes.admin: return GymAdminForm
            case registerTypes.manager: return GymManagerForm
            case registerTypes.coach: return CoachAndAthleteForm
            case registerTypes.athlete: return CoachAndAthleteForm
            default: return null
        }
    }

    const handleSetForm = () => { if (selectedMethod) setForm(handleFindForm) }
    
    useEffect(handleRegisterMethods, [user])
    useEffect(setMethod, [registersMethods])
    useEffect(handleSetForm, [selectedMethod])
    return { onSelectForm, Form }
}