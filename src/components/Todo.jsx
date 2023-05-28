import { Link } from 'react-router-dom';

import classes from './Todo.module.css';

function Todo({id, body, list}) {
    return (
    <li className={classes.todo}>
        <Link to={body} state={{from: 'todo', todo: {id: id, body: body, list: list}}}>
            <p className={classes.text}>{body}</p>
        </Link>
    </li>
    );
}

export default Todo;