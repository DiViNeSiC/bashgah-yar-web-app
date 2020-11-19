import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../Context/provider"
import { SENDING_TIMER_HIDE } from '../../../Constants/auth'

export default () => {
    const { 
        authDispatch,
        authState: { sendTimer, codeFormShow }
    } = useContext(GlobalContext)
    const [timer, setTimer] = useState()
    const [timeInterval, setTimeInterval] = useState()

    const countDownTimer = () => {
        if (!sendTimer || !codeFormShow) return
        setTimer(prevTime => prevTime - 1)
    }

    const intervalTimer = () => {
        if (!codeFormShow || !sendTimer) return
        setTimer(50)
        const interval = setInterval(countDownTimer, 1000)
        setTimeInterval(interval)
    }

    const checkTime = () => {
        if (!sendTimer) return clearInterval(timeInterval)
        if (timer === 0 || !codeFormShow)
            return authDispatch({ type: SENDING_TIMER_HIDE })
    }

    useEffect(intervalTimer, [sendTimer])
    useEffect(checkTime, [timer])
    return timer
}