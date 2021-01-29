import { 
    GET_SENT_MESSAGES, GET_SENT_MESSAGES_ERROR, 
    GET_RECEIVED_MESSAGES, GET_RECEIVED_MESSAGES_ERROR,
} from '../../Constants/Actions/CommunicationControls'

export default (state, { payload, type }) => {
    switch(type) {
        case GET_SENT_MESSAGES: return { sentMessages: payload, getMessagesError: null }
        case GET_SENT_MESSAGES_ERROR: return { sentMessages: null, getMessagesError: payload }

        case GET_RECEIVED_MESSAGES: return { receivedMessages: payload, getMessagesError: null }
        case GET_RECEIVED_MESSAGES_ERROR: return { receivedMessages: null, getMessagesError: payload }

        default: return state
    }
}