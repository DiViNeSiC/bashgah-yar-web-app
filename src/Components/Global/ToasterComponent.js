import React, { useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { GlobalContext } from "../../Context/provider"
import ToasterLayout from '../../Layout/Global/toaster'
import { clearStatus } from '../../Context/GlobalStates/actions'

export default () => {
    const { globalDispatch, globalState: { 
        toasterInfo, toasterError,
        waitForRedirect, toasterDefaultMessage,
        toasterSuccess, toasterMessage, toasterWarning, 
    }} = useContext(GlobalContext)
    
    const setToastType = () => {
        if (toasterInfo) return toast.info
        if (toasterError) return toast.error
        if (toasterDefaultMessage) return toast
        if (toasterSuccess) return toast.success
        if (toasterWarning) return toast.warning
        return null
    }

    const clear = () => {
        if (toasterError || toasterSuccess || toasterInfo || toasterWarning || toasterDefaultMessage)
            clearStatus(globalDispatch, waitForRedirect)
    }

    useEffect(clear, [toasterError, toasterSuccess, toasterInfo, toasterWarning, toasterDefaultMessage])
    return <ToasterLayout toast={setToastType()} message={toasterMessage} />
}