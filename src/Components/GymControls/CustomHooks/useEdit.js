import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import weekDays from "../../../Constants/weekDays"
import { GlobalContext } from "../../../Context/provider"
import { 
    deleteAllPictures, getGymByIdForEdit, deleteGymDisableSuccess, 
    changeGymHolidays, addPicture, editGymInfo, deleteOnePicture, deleteGymAccount,
} from "../../../Context/GymControls/actions"

export default () => {
    const { gymId } = useParams()
    const gymPicInputRef = useRef()
    const [gymInfo, setGymInfo] = useState({})
    const [gymHolidays, setGymHolidays] = useState()
    const [gymPic, setGymPic] = useState({ file: null, displayImage: null })
    const { history, globalDispatch, gymControlsDispatch, gymControlsState: {
        gymForEdit, deleteGymSuccess, gymControlsErr
    }} = useContext(GlobalContext)

    const onClickGymPicInput = () => gymPicInputRef.current.click()
    const gymInfoOnChange = ({ target: { name, value } }) => { setGymInfo({ ...gymInfo, [name]: value }) }

    const gymHolidaysOnChange = (dayValue) => ({ target }) => {
        const newDays = gymHolidays.map(({ day, value, checked }) => {
            if (value === dayValue) return { day, value, checked: target.checked }
            return { day, value, checked }
        })
        setGymHolidays(newDays)
    }
    
    const gymPicOnChange = ({ target: { files }}) => {
        if (!files[0]) return
        setGymPic({ file: files[0], displayImage: URL.createObjectURL(files[0]) })
    }

    const onClearNewPic = () => {
        gymPicInputRef.current.value = null
        setGymPic({ file: null, displayImage: null })
    }

    const onGetGym = () => {
        if (!gymId) return
        handleGetOneGym()
    }

    const handleGetOneGym = async () => {
        await getGymByIdForEdit(gymId)(gymControlsDispatch, globalDispatch, history)
    }

    const onSetGymInfo = () => {
        if (!gymForEdit) return
        const { name, city, capacity, address, phoneNumber, holidays } = gymForEdit
        const gymHolidays = weekDays.map(({ day, value }) => {
            const dayExist = holidays.find(d => d === day.value)
            if (dayExist) return { day, value, checked: true }
            return { day, value, checked: false }
        })
        setGymHolidays(gymHolidays)
        setGymInfo({ name, city, capacity, address, phoneNumber })
    }
    
    const onEditInfo = async (e) => {
        e.preventDefault()
        if (!gymId || !gymForEdit) return
        await editGymInfo(gymInfo, gymId, onGetGym)(globalDispatch, history)
    }
    
    const onAddPicture = async () => {
        if (!gymId || !gymForEdit || !gymPic.file) return
        const formData = new FormData()
        formData.append('gymPic', gymPic.file)
        await addPicture(formData, gymId, onClearNewPic, onGetGym)(globalDispatch, history)
    }

    const onDeleteOnePicture = async (filePath) => {
        if (!gymId || !gymForEdit || !filePath) return
        const filename = filePath.split('\\')[3]
        await deleteOnePicture(gymId, filename, onGetGym)(globalDispatch, history)
    }

    const onDeleteAllPictures = async () => {
        if (!gymId || !gymForEdit) return
        await deleteAllPictures(gymId, onGetGym)(globalDispatch, history)
    }

    const onDeleteGymAccount = async () => {
        if (!gymId || !gymForEdit || deleteGymSuccess) return
        await deleteGymAccount(gymId)(gymControlsDispatch, globalDispatch, history)
    }

    const handleChangeHolidays = async () => {
        if (!gymId || !gymForEdit || !gymHolidays || !gymHolidays.length) return
        const newHolidays = gymHolidays.map(day => {
            if (!day.checked) return null
            return day.value
        })
        await changeGymHolidays(gymId, newHolidays, onGetGym)(globalDispatch, history)
    }

    const handleDisableSuccess = () => {
        if (!deleteGymSuccess) return 
        deleteGymDisableSuccess(gymControlsDispatch)
        history.push('/dashboard')
    }

    useEffect(onSetGymInfo, [gymForEdit])
    useEffect(onGetGym, [gymId, gymControlsDispatch])
    useEffect(handleDisableSuccess, [deleteGymSuccess])
    return {
        gymInfo, onEditInfo, onAddPicture, onClearNewPic, gymHolidays,
        gym: gymForEdit, onClickGymPicInput, onDeleteGymAccount, gymHolidaysOnChange,
        uploadingImage: gymPic.displayImage, onDeleteOnePicture, onDeleteAllPictures,
        gymPicInputRef, gymControlsErr, gymPicOnChange, gymInfoOnChange, handleChangeHolidays,
    }
}