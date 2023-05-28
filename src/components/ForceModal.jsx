import classes from "./Modal.module.css";

function ForceModal({ children }) {

    return (
        <>
            <div className={classes.backdrop}/>
            <dialog open className={classes.modal}>
                {children}
            </dialog>
        </>
    )
}

export default ForceModal;