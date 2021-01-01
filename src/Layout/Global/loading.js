import React from 'react'
import { loadingStyles } from '../../Assets/Styles/globalStyles'
import CircularProgress from '@material-ui/core/CircularProgress'

export default () => {
    const { container, circularComponent } = loadingStyles()
    return (
        <div className={container}><CircularProgress className={circularComponent} size="3.5rem" /></div>
    )
}