import React, { useEffect } from 'react'
import { useContext } from "react"
import { CLEAR_STATUS } from '../../Constants/auth'
import { GlobalContext } from "../../Context/provider"
import ToasterLayout from '../../Layout/GlobalLayout/toaster'

export default () => {
    const { 
        authDispatch,
        authState: {
            error, success, errorMessage, successMessage
        }
    } = useContext(GlobalContext)
    const states = { 
        color: success ? 'green' : 'red', 
        message: success ? successMessage : error ? errorMessage : null
    }

    useEffect(() => {
        if (error || success) { 
            setTimeout(() => authDispatch({ type: CLEAR_STATUS }), 5500)
        }
    }, [error, success, authDispatch])

    return <>{(error || success) && <ToasterLayout {...states} />}</>
}
