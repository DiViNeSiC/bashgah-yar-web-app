import { NA_ROUTE, titles } from '../Constants/routeInfos'

import ForbiddenComponent from '../Components/Global/ForbiddenComponent'

import LoginFormComponent from '../Components/Auth/LoginFormComponent'
import ForgotPassFormComponent from '../Components/Auth/ForgotPassFormComponent'
import ChangePassWithCodeComponent from '../Components/Auth/ChangePassWithCodeComponent'
import ChangePassWithTokenComponent from '../Components/Auth/ChangePassWithTokenComponent'

import HomeComponent from '../Components/MainPages/HomeComponent'
import DashboardComponent from '../Components/MainPages/DashboardComponent'

import AccountActivationComponent from '../Components/RegisterControls/AccountActivationComponent'
import RegistersFormComponent from '../Components/RegisterControls/RegistersFormComponent'

import AllGymAdminsComponent from '../Components/UserControls/UserViews/AllGymAdminsComponent'
import ControlUserProfileComponent from '../Components/UserControls/UserViews/ControlUserProfileComponent'
import GymAthletesComponent from '../Components/UserControls/UserViews/GymAthletesComponent'
import GymCoachesAndAthletesComponent from '../Components/UserControls/UserViews/GymCoachesAndAthletesComponent'
import UserProfileComponent from '../Components/UserControls/UserProfileEdit/UserProfileComponent'
import ChangePassWithProfileComponent from '../Components/UserControls/UserProfileEdit/ChangePassWithProfileComponent'

import GymEditComponent from '../Components/GymControls/GymEdit/GymEditComponent'
import AdminGymsViewComponent from '../Components/GymControls/GymViews/AdminGymsViewComponent'
import GlobalGymsView from '../Components/GymControls/GymViews/GlobalGymsView'
import GymStaffViewComponent from '../Components/GymControls/GymViews/GymStaffViewComponent'
import OneGymViewComponent from '../Components/GymControls/GymViews/OneGymViewComponent'

export default [
    {
        component: ChangePassWithProfileComponent,
        isProtected: true,
        path: '/dashboard/profile/change-pass/:changePasswordToken',
        title: titles.changePass
    },
    {
        component: AccountActivationComponent,
        isProtected: true,
        path: '/dashboard/active-account/:accountActivationToken',
        title: titles.accountActivation
    },
    {
        component: ChangePassWithTokenComponent,
        isProtected: false,
        path: '/forgot-pass/token/:forgotPassToken',
        title: titles.changePass
    },
    {
        component: GymStaffViewComponent,
        isProtected: true,
        path: '/gyms/staff/:gymId',
        title: titles.gymMembers
    },
    {
        component: AdminGymsViewComponent,
        isProtected: true,
        path: '/gyms/admin/:adminId',
        title: titles.adminGyms
    },
    {
        component: GymEditComponent,
        isProtected: true,
        path: '/gyms/edit/:gymId',
        title: titles.gymInformation
    },
    {
        component: GymCoachesAndAthletesComponent,
        isProtected: true,
        path: '/users/gym-members',
        title: titles.gymMembers
    },
    {
        component: GlobalGymsView,
        isProtected: NA_ROUTE,
        path: '/gyms/global',
        title: titles.activeGyms
    },
    {
        component: OneGymViewComponent,
        isProtected: true,
        path: '/gyms/:gymId',
        title: titles.gymInformation
    },
    {
        component: GymAthletesComponent,
        isProtected: true,
        path: '/users/gym-athletes',
        title: titles.gymAthletes
    },
    {
        component: AllGymAdminsComponent,
        isProtected: true,
        path: '/users/gym-admins',
        title: titles.gymAdmins
    },
    {
        component: ControlUserProfileComponent,
        isProtected: true,
        path: '/users/:userId',
        title: titles.userInformation
    },
    {
        component: ChangePassWithCodeComponent,
        isProtected: false,
        path: '/forgot-pass/code',
        title: titles.changePass
    },
    {
        component: UserProfileComponent,
        isProtected: true,
        path: '/dashboard/profile',
        title: titles.myProfile
    },
    {
        component: RegistersFormComponent,
        isProtected: true,
        path: '/registers',
        title: titles.register
    },
    {
        component: DashboardComponent,
        isProtected: true,
        path: '/dashboard',
        title: titles.main
    },
    {
        component: LoginFormComponent,
        isProtected: false,
        path: '/login',
        title: titles.login
    },
    {
        component: ForgotPassFormComponent,
        isProtected: false,
        path: '/forgot-pass',
        title: titles.forgotPass
    },
    {
        component: ForbiddenComponent,
        isProtected: NA_ROUTE,
        path: '/forbidden',
        title: titles.forbidden
    },
    {
        component: HomeComponent,
        isProtected: false,
        path: '/',
        title: titles.main
    },
]