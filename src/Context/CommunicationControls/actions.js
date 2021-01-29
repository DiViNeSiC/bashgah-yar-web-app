import axios from '../../Helpers/axiosInstance'
import setUrlForSendMessage from '../../Utils/setUrlForSendMessage'
import { toasterError, enableLoading, toasterSuccess, disableLoading } from '../GlobalStates/actions'
import { 
    GET_SENT_MESSAGES, GET_SENT_MESSAGES_ERROR, 
    GET_RECEIVED_MESSAGES, GET_RECEIVED_MESSAGES_ERROR,
} from '../../Constants/Actions/CommunicationControls'

export const getSentMessages = async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get('/communication/sends')
        dispatch({ type: GET_SENT_MESSAGES, payload: response.data.messages })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        dispatch({ type: GET_SENT_MESSAGES_ERROR, payload: errorMessage })
        disableLoading(globalDispatch)
    }
}

export const getReceivedMessages = async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get('/communication/received')
        dispatch({ type: GET_RECEIVED_MESSAGES, payload: response.data.messages })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        dispatch({ type: GET_RECEIVED_MESSAGES_ERROR, payload: errorMessage })
        disableLoading(globalDispatch)
    }
}

export const sendMessage = (formData, receiverType, userId = null, clearMessageData) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const url = setUrlForSendMessage(receiverType, userId)
        const response = await axios(history).post(url, formData)
        clearMessageData(); toasterSuccess(response.data.message)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const editMessage = (newText, messageId, clearMessageData) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).put(`/communication/edit/${messageId}`, { newText })
        clearMessageData(); toasterSuccess(response.data.message)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const setMessageReadMark = (messageId, readCheck = true) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const url = readCheck ? `/communication/mark/read/${messageId}` : `/communication/mark/unread/${messageId}`
        const response = await axios(history).put(url)
        toasterSuccess(response.data.message)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const deleteMessageForReceiver = (messageId) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).delete(`/communication/for-receiver/${messageId}`)
        toasterSuccess(response.data.message)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const deleteMessageGlobally = (messageId) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).delete(`/communication/global/${messageId}`)
        toasterSuccess(response.data.message)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}