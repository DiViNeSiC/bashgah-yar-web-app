import React from 'react'
import DrawerRoutes from './NavbarPartials/drawerRoutes'
import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'
import { navbarStyles } from '../../Assets/Styles/globalStyles'

export default ({ 
    loggedUser, logoutLoading, onSideBarClick, userIsGymAdmin, userIsGymCoach, userIsSiteAdmin,
    onActiveAccountRequest, userIsAthlete,isAuth, onLogout, pathname, sideBarShow, userIsGymManager,
}) => {
    const { container, appBar, menuButton, header, loginButton } = navbarStyles()
    return (
        <div className={container}>
            <AppBar className={appBar} position="fixed">
                <Drawer open={sideBarShow} onClose={onSideBarClick}>
                    <DrawerRoutes 
                        pathname={pathname} loggedUser={loggedUser}
                        onLogout={onLogout} onSideBarClick={onSideBarClick}
                        userIsAthlete={userIsAthlete} userIsGymAdmin={userIsGymAdmin}
                        userIsGymCoach={userIsGymCoach} userIsSiteAdmin={userIsSiteAdmin}
                        isAuth={isAuth} logoutLoading={logoutLoading} userIsGymManager={userIsGymManager}
                    />
                </Drawer>
                <Toolbar>
                    <IconButton onClick={onSideBarClick} edge="start" className={menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography className={header} variant="h5">
                        باشگاه یار
                    </Typography>
                    {!isAuth && pathname !== '/login' && 
                        <Link className={loginButton} to="/login"><Button color="inherit">ورود به حساب</Button></Link>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}