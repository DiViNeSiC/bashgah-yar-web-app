import { ATHLETE_ROLE, GYM_ADMIN_ROLE, GYM_COACH_ROLE, GYM_MANAGER_ROLE, SITE_ADMIN_ROLE } from "../Constants/roles"

export default (userRole) => {
    if (!userRole) return
    switch(userRole) {
        case SITE_ADMIN_ROLE: return 'مدیر سایت'
        case GYM_ADMIN_ROLE: return 'مدیر کل باشگاه'
        case GYM_MANAGER_ROLE: return 'منیجر باشگاه'
        case GYM_COACH_ROLE: return 'مربی باشگاه'
        case ATHLETE_ROLE: return 'ورزشکار'
        default: return
    }
}