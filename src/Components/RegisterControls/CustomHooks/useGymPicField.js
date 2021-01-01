import { useContext, useEffect, useRef, useState } from "react"
import { GlobalContext } from "../../../Context/provider"
import { registerTypes } from '../../../Constants/registerMethods'
import { setGymPicFiles } from '../../../Context/RegisterControls/actions'
import { toasterError, toasterInfo, toasterWarning } from "../../../Context/GlobalStates/actions"

export default () => {
    const gymPicsInputRef = useRef()
    const [displayFiles, setDisplayFiles] = useState([])
    const { globalDispatch, registersDispatch, registersState: { gymPics, selectedMethod } } = useContext(GlobalContext)

    const onClickGymPicsInput = () => gymPicsInputRef.current.click()

    const onPickFile = ({ target: { files }}) => {
        const msg = 'تصویر جدید اضافه گردید'
        const tempFiles = gymPics ? gymPics : []
        if (!files[0] || !files.length) return setGymPicFiles(tempFiles, false, null, null)(registersDispatch, globalDispatch)
        const newFiles = [...tempFiles, { file: files[0], objUrl: URL.createObjectURL(files[0]) }]
        setGymPicFiles(newFiles, true, msg, toasterInfo)(registersDispatch, globalDispatch)
    }

    const onDeleteFile = (fileBlob) => () => {
        const msg = 'تصویر مورد نظر پاک گردید'
        const newFiles = gymPics.filter(file => file.objUrl !== fileBlob)
        setGymPicFiles(newFiles, true, msg, toasterError)(registersDispatch, globalDispatch)
    }

    const deleteAllFiles = (sendMessage = true) => () => {
        const warnMsg = 'تصاویر خالی هستند'
        const mainMsg = 'تمامی تصاویر پاک شدند'
        if (!selectedMethod || selectedMethod.value !== registerTypes.gym) return
        if (sendMessage && (!gymPics || !gymPics.length)) return toasterWarning(warnMsg)(globalDispatch)
        setGymPicFiles([], sendMessage, mainMsg, toasterError)(registersDispatch, globalDispatch)
    }

    const setDisplayImages = () => {
        if (!selectedMethod || selectedMethod.value !== registerTypes.gym) return
        if (!gymPics || !gymPics.length) {
            setDisplayFiles([])
            return setGymPicFiles(null, false, null, null)(registersDispatch, globalDispatch)
        }

        const displayFilesArray = []
        gymPics.forEach(file => { displayFilesArray.push(file.objUrl) })
        setDisplayFiles(displayFilesArray)
        return () => displayFilesArray.forEach(objUrl => URL.revokeObjectURL(objUrl))
    }

    useEffect(deleteAllFiles(false), [selectedMethod])
    useEffect(setDisplayImages, [gymPics, selectedMethod])
    return { displayFiles, gymPicsInputRef, onClickGymPicsInput, onPickFile, onDeleteFile, deleteAllFiles }
}