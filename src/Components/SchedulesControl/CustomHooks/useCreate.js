import { useContext, useState } from "react"
import { GlobalContext } from '../../../Context/provider'
import { createNewMove, createNewSchedule } from '../../../Context/ScheduleControls/actions'

export default () => {
    const [moveGif, setMoveGif] = useState()
    const [moveName, setMoveName] = useState()
    const [moveNotes, setMoveNotes] = useState()
    const [moveCategories, setMoveCategories] = useState()
    const [scheduleMovesList, setScheduleMovesList] = useState([])
    const { history, globalDispatch, authState: { user } } = useContext(GlobalContext)

    const moveNameOnChange = ({ target: { value } }) => { setMoveName(value) }

    const moveNoteOnChange = ({ target: { value } }) => { setMoveNotes(value) }

    const moveGifOnChange = ({ target: { files } }) => { setMoveGif(files[0]) }

    const moveCategoriesOnChange = ({ target: { value, name } }) => { setMoveCategories({ ...moveCategories, [name]: value }) }

    const handleAddMoveToSchedule = (moveId) => {
        setScheduleMovesList([ ...scheduleMovesList, moveId ])
    }

    const handleDeleteMoveFromSchedule = (moveId) => {
        const newMovesList = scheduleMovesList.filter(move => move.toString() !== moveId.toString())
        setScheduleMovesList(newMovesList)
    }

    const clearMoveData = () => {
        setMoveName(null); setMoveNotes(null); setMoveGif(null); setMoveCategories({})
    }

    const handleCreateNewMove = async () => {
        if (!user || !moveName || !moveCategories || !moveCategories.main) return
        const formData = new FormData()
        formData.append('name', moveName)
        formData.append('category', moveCategories)
        if (moveGif) formData.append('moveGif', moveGif)
        if (moveNotes) formData.append('notes', moveNotes)
        await createNewMove(formData, clearMoveData)(globalDispatch, history)
    }

    const handleCreateNewSchedule = async (athleteId) => {
        if (!user || !athleteId) return
        const formData = { movesId: scheduleMovesList }
        await createNewSchedule(formData, athleteId)(globalDispatch, history)
    }
    
    return { 
        moveNameOnChange, moveNoteOnChange, moveCategoriesOnChange, handleCreateNewSchedule,
        handleAddMoveToSchedule, handleDeleteMoveFromSchedule, moveGifOnChange, handleCreateNewMove,
    }
}