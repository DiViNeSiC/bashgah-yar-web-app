import { FEEDBACK, MEDIC, SUPPORT, TO_A_USER } from '../Constants/messageTypes'

const PREFIX = '/communication'

export default (receiverType, userId) => {
    switch(receiverType) {
        case MEDIC: return `${PREFIX}/medic`
        case SUPPORT: return `${PREFIX}/support`
        case FEEDBACK: return `${PREFIX}/feedback`
        case TO_A_USER: return `${PREFIX}/${userId}`
        default: return null
    }
}