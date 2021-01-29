import { useContext, useState } from "react"
import { GlobalContext } from '../../../Context/provider'
import { sendMessage, editMessage } from '../../../Context/CommunicationControls/actions'

export default () => {
    const [messageText, setMessageText] = useState()
    const [messageFile, setMessageFile] = useState()
    const { history, globalDispatch, authState: { user } } = useContext(GlobalContext)

    const textOnChange = ({ target: { value } }) => { setMessageText(value) }
    const fileOnChange = ({ target: { files } }) => { setMessageFile(files[0]) }
    const clearMessageData = () => { setMessageText(null); setMessageFile(null) }

    const handleSendMessage = async (receiverType, userId = null) => {
        if (!user || (!messageText && !messageFile)) return
        const formData = new FormData()
        if (messageText) {
            formData.append('text', messageText)
        }
        if (messageFile) {
            formData.append('messageFile', messageFile)
        }
        await sendMessage(formData, receiverType, userId, clearMessageData)(globalDispatch, history)
    }

    const handleEditMessage = async (messageId) => {
        if (!user || !messageText) return
        await editMessage(messageText, messageId, clearMessageData)(globalDispatch, history)
    }
    
    return { textOnChange, fileOnChange, handleSendMessage, handleEditMessage }
}