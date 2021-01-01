import { useContext, useEffect, useRef, useState } from "react"
import { GlobalContext } from "../../../Context/provider"
import { useHistory, useParams } from "react-router-dom"
import { 
    addPicture, editGymInfo, deleteOnePicture, deleteGymAccount,
    deleteAllPictures, getGymByIdForEdit, deleteGymDisableSuccess
} from "../../../Context/GymControls/actions"

export default () => {
    const history = useHistory()
    const { gymId } = useParams()
    const gymPicInputRef = useRef()
    const [gymInfo, setGymInfo] = useState({})
    const [gymPic, setGymPic] = useState({ file: null, displayImage: null })
    const { globalDispatch, gymControlsDispatch, gymControlsState: {
        gymForEdit, deleteGymSuccess, gymControlsErr
    }} = useContext(GlobalContext)

    const onClickGymPicInput = () => gymPicInputRef.current.click()
    const gymInfoOnChange = ({ target: { name, value }}) => { setGymInfo({ ...gymInfo, [name]: value }) }
    
    const gymPicOnChange = ({ target: { files }}) => {
        if (!files[0]) return
        setGymPic({ file: files[0], displayImage: URL.createObjectURL(files[0]) })
    }

    const onClearNewPic = () => { gymPicInputRef.current.value = null; setGymPic({ file: null, displayImage: null }) }

    const onGetGym = () => { if (!gymId) return; handleGetOneGym() }
    const handleGetOneGym = async () => { await getGymByIdForEdit(gymId)(gymControlsDispatch, globalDispatch) }

    const onSetGymInfo = () => {
        if (!gymForEdit) return
        const { name, city, capacity, address, phoneNumber } = gymForEdit
        setGymInfo({ name, city, capacity, address, phoneNumber })
    }
    
    const onEditInfo = async (e) => {
        e.preventDefault()
        if (!gymId || !gymForEdit) return
        await editGymInfo(gymInfo, gymId, onGetGym)(globalDispatch)
    }
    
    const onAddPicture = async () => {
        if (!gymId || !gymForEdit || !gymPic.file) return
        const formData = new FormData()
        formData.append('gymPic', gymPic.file)
        await addPicture(formData, gymId, onClearNewPic, onGetGym)(globalDispatch)
    }

    const onDeleteOnePicture = async (filePath) => {
        if (!gymId || !gymForEdit || !filePath) return
        const filename = filePath.split('\\')[3]
        await deleteOnePicture(gymId, filename, onGetGym)(globalDispatch)
    }

    const onDeleteAllPictures = async () => {
        if (!gymId || !gymForEdit) return
        await deleteAllPictures(gymId, onGetGym)(globalDispatch)
    }

    const onDeleteGymAccount = async () => {
        if (!gymId || !gymForEdit || deleteGymSuccess) return
        await deleteGymAccount(gymId)(gymControlsDispatch, globalDispatch)
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
        gymInfo, onEditInfo, onAddPicture, onClearNewPic,
        gym: gymForEdit, onClickGymPicInput, onDeleteGymAccount,
        gymPicInputRef, gymControlsErr, gymPicOnChange, gymInfoOnChange, 
        uploadingImage: gymPic.displayImage, onDeleteOnePicture, onDeleteAllPictures,
    }
}