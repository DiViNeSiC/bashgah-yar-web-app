import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
    return (
        <div>
            <div>شما به این بخش دسترسی ندارید</div>
            <Link to="/dashboard">بازگشت به صفحه اصلی</Link>
        </div>
    )
}