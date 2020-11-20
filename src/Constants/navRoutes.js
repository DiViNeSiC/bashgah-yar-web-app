import { SITE_ADMIN_ROLE, GYM_ADMIN_ROLE, GYM_MANAGER_ROLE, GYM_COACH_ROLE, ATHLETE_ROLE } from './roles'

export const authRoutes = [
    {
        role: SITE_ADMIN_ROLE,
        routes: [
            {
                path: '',
                name: ''
            }
        ]
    },
    {
        role: GYM_ADMIN_ROLE,
        routes: [
            {
                path: '',
                name: ''
            }
        ]
    },
    {
        role: GYM_MANAGER_ROLE,
        routes: [
            {
                path: '',
                name: ''
            }
        ]
    },
    {
        role: GYM_COACH_ROLE,
        routes: []
    },
    {
        role: ATHLETE_ROLE,
        routes: []
    }
]

export const notAuthRoutes = [
    {
        path: '/login',
        name: 'ورود'
    }
]