import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from '../../../Context/provider'
import { 
    changeMoveTaskCompleteSection, deleteSchedule, deleteSportMove,
    getAthleteSchedules, getScheduleById, getSportMoves, getSportMoveById,
} from '../../../Context/ScheduleControls/actions'

export default () => {
    const { athleteId, scheduleId, moveId } = useParams()
    const [scheduleMovesList, setScheduleMovesList] = useState()
    const {
        history, globalDispatch, scheduleControlsDispatch, authState: { user }, 
        scheduleControlsState: {
            schedule, sportMove, sportMoves,
            athleteSchedules, scheduleControlsError,
        }
    } = useContext(GlobalContext)

    const movesListOnChange = (moveId) => ({ target: { value } }) => {
        if (!scheduleMovesList || !scheduleMovesList.length) return
        const newMovesList = scheduleMovesList.map(({ move, checked }) => {
            if (moveId === move) return { move, checked: value }
            return { move, checked }
        })
        setScheduleMovesList(newMovesList)
    }

    const setMoveListValue = () => {
        if (!schedule) return
        setScheduleMovesList(schedule.movesList)
    }

    const onGetSportMoves = () => {
        handleGetSportMoves()
    }

    const handleGetSportMoves = async () => {
        await getSportMoves(scheduleControlsDispatch, globalDispatch, history)
    }

    const onGetSportMoveById = () => {
        if (!moveId) return
        handleGetSportMoveById()
    }

    const handleGetSportMoveById = async () => {
        await getSportMoveById(moveId)(scheduleControlsDispatch, globalDispatch, history)
    }

    const onGetAthleteSchedules = () => {
        if (!user || !athleteId) return
        handleGetAthleteSchedules()
    }

    const handleGetAthleteSchedules = async () => {
        await getAthleteSchedules(athleteId)(scheduleControlsDispatch, globalDispatch, history)
    }

    const onGetOneSchedule = () => {
        if (!user || !scheduleId) return
        handleGetOneSchedule()
    }

    const handleGetOneSchedule = async () => {
        await getScheduleById(scheduleId)(scheduleControlsDispatch, globalDispatch, history)
    }

    const handleMovesListChangeCheck = async () => {
        if (!user || !scheduleId || !schedule || !scheduleMovesList || !scheduleMovesList.length) return
        await changeMoveTaskCompleteSection(scheduleMovesList, scheduleId)(globalDispatch, history)
    }

    const handleDeleteMove = async (moveId) => {
        if (!user || moveId) return
        await deleteSportMove(moveId)(globalDispatch, history)
    }

    const handleDeleteSchedule = async (scheduleId) => {
        if (!user || scheduleId) return
        await deleteSchedule(scheduleId)(globalDispatch, history)
    }
    
    return {
        schedule, sportMove, athleteSchedules, scheduleControlsError, onGetSportMoves,
        movesListOnChange, setMoveListValue, onGetSportMoveById, onGetAthleteSchedules,
        onGetOneSchedule, handleMovesListChangeCheck, handleDeleteMove, handleDeleteSchedule, sportMoves,
    }
}