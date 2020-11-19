import React, { useContext } from 'react'
import { GlobalContext } from '../../Context/provider'

export default () => {
    const { authState } = useContext(GlobalContext)
    console.log(authState);
    return (
        <div>
            HOME
        </div>
    )
}
