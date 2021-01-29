import { useContext, useEffect, useRef, useState } from "react"
import { GlobalContext } from "../../../Context/provider"
import { registerTypes } from '../../../Constants/registerMethods'
import { setGymPicFiles } from '../../../Context/RegisterControls/actions'
import { toasterError, toasterInfo, toasterWarning } from "../../../Context/GlobalStates/actions"
import { ALL_GYM_PICS_DELETED, GYM_PICS_ARE_EMPTY, GYM_PIC_ADDED, GYM_PIC_DELETED } from '../../../Constants/responseMessages'

export default () => {
    const gymPicsInputRef = useRef()
    const [displayFiles, setDisplayFiles] = useState([])
    const { globalDispatch, registersDispatch, registersState: { gymPics, selectedMethod } } = useContext(GlobalContext)

    const onClickGymPicsInput = () => gymPicsInputRef.current.click()

    const onPickFile = ({ target: { files } }) => {
        const tempFiles = gymPics ? gymPics : []
        if (!files[0] || !files.length) return setGymPicFiles(tempFiles, false, null, null)(registersDispatch, globalDispatch)
        const newFiles = [...tempFiles, { file: files[0], objUrl: URL.createObjectURL(files[0]) }]
        setGymPicFiles(newFiles, true, GYM_PIC_ADDED, toasterInfo)(registersDispatch, globalDispatch)
    }

    const onDeleteFile = (fileBlob) => () => {
        const newFiles = gymPics.filter(file => file.objUrl !== fileBlob)
        setGymPicFiles(newFiles, true, GYM_PIC_DELETED, toasterError)(registersDispatch, globalDispatch)
    }

    const deleteAllFiles = (sendMessage = true) => () => {
        if (!selectedMethod || selectedMethod.value !== registerTypes.gym) return
        if (sendMessage && (!gymPics || !gymPics.length)) return toasterWarning(GYM_PICS_ARE_EMPTY)(globalDispatch)
        setGymPicFiles([], sendMessage, ALL_GYM_PICS_DELETED, toasterError)(registersDispatch, globalDispatch)
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