import React from 'react'
import { ToastContainer } from 'react-toastify'
import { toasterStyles, toasterOptions } from '../../Assets/Styles/globalStyles'

export default ({ message, toast }) => {
    if (message && toast) toast(message, toasterOptions)
    return <ToastContainer position="top-right" style={toasterStyles} autoClose={5000} newestOnTop={true} rtl={true} />
}