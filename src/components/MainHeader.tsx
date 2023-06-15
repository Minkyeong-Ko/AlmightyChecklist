import { MdLibraryAddCheck, MdAddTask } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { HeaderStrings } from 'types/Strings'
import classes from './MainHeader.module.css'

function MainHeader() {
    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                <MdLibraryAddCheck />
                {HeaderStrings.title}
            </h1>
            <p>
                <Link to="/create-todo" className={classes.button}>
                    <MdAddTask size={18} />
                    {HeaderStrings.createButton}
                </Link>
            </p>
        </header>
    )
}

export default MainHeader
