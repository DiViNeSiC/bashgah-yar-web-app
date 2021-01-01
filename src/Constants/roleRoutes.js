import { SITE_ADMIN_ROLE, GYM_ADMIN_ROLE, GYM_MANAGER_ROLE, GYM_COACH_ROLE, ATHLETE_ROLE } from './roles'

export const roleRoutes = [
    {
        role: SITE_ADMIN_ROLE,
        routes: [
            { path: '/registers' },
            { path: '/users/gym-admins' },
            { path: '/gyms/admin/:adminId' },
        ]
    },
    {
        role: GYM_ADMIN_ROLE,
        routes: [
            { path: '/registers' },
            { path: '/gyms/edit/:gymId' },
            { path: '/gyms/admin/:adminId' },
        ]
    },
    {
        role: GYM_MANAGER_ROLE,
        routes: [
            { path: '/registers' },
            { path: '/users/gym-members' },
        ]
    },
    {
        role: GYM_COACH_ROLE,
        routes: [
            { path: '/users/gym-athletes' },
        ]
    },
    {
        role: ATHLETE_ROLE,
        routes: []
    }
]

export const globalRoutes = [
    { path: '/' },
    { path: '/login' },
    { path: '/dashboard' },
    { path: '/gyms/global' },
    { path: '/gyms/:gymId' },
    { path: '/forgot-pass' },
    { path: '/users/:userId' },
    { path: '/forgot-pass/code' },
    { path: '/dashboard/profile' },
    { path: '/gyms/staff/:gymId' },
    { path: '/forgot-pass/token/:forgotPassToken' },
    { path: '/dashboard/active-account/:accountActivationToken' },
    { path: '/dashboard/profile/change-pass/:changePasswordToken' },
]