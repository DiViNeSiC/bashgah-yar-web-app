import { useContext } from "react"
import { GlobalContext } from '../../../Context/provider'
import { 
    deleteMessageGlobally, deleteMessageForReceiver,
    getSentMessages, getReceivedMessages, setMessageReadMark, 
} from '../../../Context/CommunicationControls/actions'

export default () => {
    const { 
        history, globalDispatch, communicationControlsDispatch, authState: { user }, 
        communicationControlsState: {
            sentMessages,
            receivedMessages,
            getMessagesError,
        }
    } = useContext(GlobalContext)

    const getReceivedMsgs = () => {
        if (!user) return
        handleGetReceivedMessages()
    }

    const handleGetReceivedMessages = async () => {
        await getReceivedMessages(communicationControlsDispatch, globalDispatch, history)
    }

    const getSentMsgs = () => {
        if (!user) return
        handleGetSentMessages()
    }

    const handleGetSentMessages = async () => {
        await getSentMessages(communicationControlsDispatch, globalDispatch, history)
    }

    const handleSetReadMark = async (messageId, readCheck) => {
        if (!user || !messageId) return
        await setMessageReadMark(messageId, readCheck)(globalDispatch, history)
    }

    const handleDeleteForReceiver = async (messageId) => {
        if (!user || !messageId) return
        await deleteMessageForReceiver(messageId)(globalDispatch, history)
    }

    const handleDeleteGlobally = async (messageId) => {
        if (!user || !messageId) return
        await deleteMessageGlobally(messageId)(globalDispatch, history)
    }
    
    return {
        handleDeleteForReceiver, handleDeleteGlobally,
        getReceivedMsgs, getSentMsgs, handleSetReadMark,
        sentMessages, receivedMessages, getMessagesError,
    }
}