import React from 'react'
import { useContext } from "react"
import { GlobalContext } from "../../Context/provider"
import LoadingLayout from '../../Layout/GlobalLayout/loading'

export default () => {
    const { authState: { loading } } = useContext(GlobalContext)
    return <>{loading && <LoadingLayout />}</>
}
