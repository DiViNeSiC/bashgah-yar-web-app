import React from 'react'
import { useContext } from "react"
import { GlobalContext } from "../../Context/provider"
import LoadingLayout from '../../Layout/Global/loading'

export default () => <>{useContext(GlobalContext).globalState.loading && <LoadingLayout />}</>