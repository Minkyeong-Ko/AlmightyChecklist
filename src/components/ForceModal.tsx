import { ReactNode } from 'react'

import classes from './Modal.module.css'
import Props from '../types/Props'

function ForceModal({ children }: Props) {
    return (
        <>
            <div className={classes.backdrop} />
            <dialog open className={classes.modal}>
                {children}
            </dialog>
        </>
    )
}

export default ForceModal
