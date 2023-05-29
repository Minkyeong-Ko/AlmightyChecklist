import { MdLibraryAddCheck, MdAddTask } from 'react-icons/md'

import { Link } from 'react-router-dom'

import classes from './MainHeader.module.css'

function MainHeader() {
    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                <MdLibraryAddCheck />
                ChatGPT가 만들어주는 체크리스트
            </h1>
            <p>
                <Link to="/create-todo" className={classes.button}>
                    <MdAddTask size={18} />
                    새로 만들기
                </Link>
            </p>
        </header>
    )
}

export default MainHeader
