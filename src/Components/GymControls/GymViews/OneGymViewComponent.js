import React, { useEffect } from 'react'
import useView from '../CustomHooks/useView'
import OneGymView from '../../../Layout/GymControls/oneGymView'

export default () => {
    const { oneGym, gymControlsErr, onGetGymById } = useView() 
    useEffect(onGetGymById, [])
    return <OneGymView gym={oneGym} error={gymControlsErr} />
}