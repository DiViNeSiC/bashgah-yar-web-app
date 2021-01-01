import { useContext, useEffect, useRef, useState } from "react"
import { GlobalContext } from "../../../Context/provider"
import { registerTypes } from '../../../Constants/registerMethods'
import { setAvatarFile } from '../../../Context/RegisterControls/actions'
import defaultImage from '../../../Assets/Images/default-profile-Image.png'
import { toasterError, toasterInfo, toasterWarning } from "../../../Context/GlobalStates/actions"

export default () => {
    const avatarInputRef = useRef()
    const [displayFile, setDisplayFile] = useState(defaultImage)
    const { globalDispatch, registersDispatch, registersState: { avatarFile, selectedMethod } } = useContext(GlobalContext)

    const onClickAvatarInput = () => avatarInputRef.current.click()

    const onPickFile = ({ target: { files }}) => {
        const msg = 'آواتار شما بروز گردید'
        if (!files[0] || !files.length) return setAvatarFile(avatarFile, false, null, null)(registersDispatch, globalDispatch)
        const newFile = { file: files[0], objUrl: URL.createObjectURL(files[0]) }
        setAvatarFile(newFile, true, msg, toasterInfo)(registersDispatch, globalDispatch)
    }
    
    const onDeleteFile = (sendMessage = true) => () => {
        const warnMsg = 'فایل آواتار خالی است'
        const mainMsg = 'آواتار شما پاک گردید'
        if (!selectedMethod || selectedMethod.value === registerTypes.gym) return
        if (sendMessage && (!avatarFile || avatarFile === defaultImage)) return toasterWarning(warnMsg)(globalDispatch)
        setAvatarFile(null, sendMessage, mainMsg, toasterError)(registersDispatch, globalDispatch)
    }

    const setDisplayImage = () => {
        if (!selectedMethod || selectedMethod.value === registerTypes.gym) return
        if (!avatarFile || avatarFile === defaultImage) {
            setDisplayFile(defaultImage)
            return setAvatarFile(null, false, '', null)(registersDispatch, globalDispatch)
        }
    
        setDisplayFile(avatarFile.objUrl)
        return () => URL.revokeObjectURL(avatarFile.objUrl)
    }

    useEffect(onDeleteFile(false), [selectedMethod])
    useEffect(setDisplayImage, [avatarFile, selectedMethod])
    return { avatarInputRef, displayFile, onClickAvatarInput, onPickFile, onDeleteFile }
}