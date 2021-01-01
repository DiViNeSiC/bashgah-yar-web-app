import { Link } from '@material-ui/core'
import React from 'react'

export default ({ activeAccountSuccess, activeAccountError }) => {
    return (
        <div>
            {activeAccountSuccess && 
                <div>{activeAccountSuccess}</div>
            }
            {activeAccountError && 
                <div>{activeAccountError}</div>
            }
            <Link to="/dashboard/profile">بازگشت</Link>
        </div>
    )
}