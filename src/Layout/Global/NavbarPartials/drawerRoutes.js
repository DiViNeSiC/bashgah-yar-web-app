import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Divider, List, ListItem } from '@material-ui/core'

export default ({ 
    userIsGymManager, userIsGymCoach,userIsAthlete, loggedUser, onLogout,
    logoutLoading, isAuth, pathname, onSideBarClick, userIsSiteAdmin, userIsGymAdmin,
}) => {
    return (
        <List>
            {!isAuth && 
                <ListItem disabled={pathname === '/'}>
                    <Link onClick={onSideBarClick} to="/">صفحه اصلی</Link>
                </ListItem>
            }
            {isAuth && 
                <ListItem disabled={pathname === '/dashboard'}>
                    <Link onClick={onSideBarClick} to="/dashboard">داشبورد</Link>
                </ListItem>
            }
            {isAuth && 
                <ListItem disabled={pathname === '/dashboard/profile'}>
                    <Link onClick={onSideBarClick} to="/dashboard/profile">پروفایل من</Link>
                </ListItem>
            }
            {!isAuth && 
                <ListItem disabled={pathname === '/login'}>
                    <Link onClick={onSideBarClick} to="/login">ورود به حساب کاربری</Link>
                </ListItem>
            }

            <Divider />

            <ListItem disabled={pathname === '/gyms/global'}>
                <Link onClick={onSideBarClick} to="/gyms/global">باشگاه های فعال</Link>
            </ListItem>

            {isAuth && (userIsSiteAdmin || userIsGymAdmin || userIsGymManager) && 
                <ListItem disabled={pathname === '/registers'}>
                    <Link onClick={onSideBarClick} to="/registers">ثبت حساب جدید</Link>
                </ListItem>
            }

            <Divider />

            {isAuth && userIsSiteAdmin && 
                <ListItem disabled={pathname === '/users/gym-admins'}>
                    <Link onClick={onSideBarClick} to="/users/gym-admins">مدیران باشگاه ها</Link>
                </ListItem>
            }
            {isAuth && userIsGymAdmin && 
                <ListItem disabled={pathname === `/gyms/admin/${loggedUser?._id}`}>
                    <Link onClick={onSideBarClick} to={`/gyms/admin/${loggedUser?._id}`}>باشگاه های من</Link>
                </ListItem>
            }
            {isAuth && (userIsGymManager || userIsGymCoach || userIsAthlete) && 
                <ListItem disabled={pathname === `/gyms/${loggedUser?.gym?._id}`}>
                    <Link onClick={onSideBarClick} to={`/gyms/${loggedUser?.gym?._id}`}>باشگاه من</Link>
                </ListItem>
            }
            {isAuth && userIsGymManager && 
                <ListItem disabled={pathname === '/users/gym-members'}>
                    <Link onClick={onSideBarClick} to="/users/gym-members">اعضای باشگاه من</Link>
                </ListItem>
            }
            {isAuth && userIsGymCoach &&
                <ListItem disabled={pathname === '/users/gym-athletes'}>
                    <Link onClick={onSideBarClick} to="/users/gym-athletes">ورزشکاران باشگاه</Link>
                </ListItem>
            }

            <Divider />

            {isAuth && <ListItem disabled={logoutLoading}>
                <Button onClick={() => {onLogout(); onSideBarClick()}} disabled={logoutLoading}>خروج از حساب</Button>
            </ListItem>}
        </List>
    )
}