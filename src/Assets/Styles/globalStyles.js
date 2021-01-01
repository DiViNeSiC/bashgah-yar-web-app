import { makeStyles } from "@material-ui/core"

export const loadingStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        backgroundColor: 'rgba(0, 0, 0, .65)',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    circularComponent: {
        color: '#000000'
    }
}))

export const navbarStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1
    },
    appBar: {
        backgroundColor: '#333'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    header: {
        flexGrow: 1,
        userSelect: "none"
    },
    loginButton: {
        textDecoration: 'none',
        color: 'white',
        '&:hover': {

        }
    }
}))

export const toasterStyles = {
    marginTop: '65px'
}

export const toasterOptions = { 
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    pauseOnFocusLoss: true,
    newestOnTop: true
}