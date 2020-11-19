import LoginComponent from '../Components/Login/LoginComponent'
import HomeComponent from '../Components/Home/HomeComponent'

export default [
    {
        component: LoginComponent,
        isProtected: false,
        path: '/login',
        title: 'ورود به حساب کاربری'
    },
    {
        component: HomeComponent,
        isProtected: true,
        path: '/dashboard',
        title: '🏋️‍♀️ باشگاه یار 🏋️‍♀️'
    },
]