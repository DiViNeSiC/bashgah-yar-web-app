import { SITE_ADMIN_ROLE, GYM_ADMIN_ROLE, GYM_MANAGER_ROLE } from './roles'

export const registerTypes = { support: 'support', medic: 'medic', gym: 'gym', admin: 'admin', coach: 'coach', manager: 'manager', athlete: 'athlete' }
export const methods = [
    {
        userRole: SITE_ADMIN_ROLE,
        registerMethods: [
            { name: 'مدیر باشگاه', value: registerTypes.admin },
            { name: 'پشتیبان', value: registerTypes.support },
            { name: 'پزشک', value: registerTypes.medic },
        ]
    },
    {
        userRole: GYM_ADMIN_ROLE,
        registerMethods: [
            { name: 'باشگاه', value: registerTypes.gym },
            { name: 'کارفرما باشگاه', value: registerTypes.manager }
        ]
    },
    {
        userRole: GYM_MANAGER_ROLE,
        registerMethods: [
            { name: 'مربی باشگاه', value: registerTypes.coach },
            { name: 'ورزشکار', value: registerTypes.athlete }
        ]
    }
]