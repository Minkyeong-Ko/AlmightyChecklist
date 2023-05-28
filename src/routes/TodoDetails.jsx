import { useLocation } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './TodoDetails.module.css';

function TodoDetails() {
  const state = useLocation()

  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.text}>{state.state.todo.body}</p>
        <ul>
          {state.state.todo.list.map((item) => (
            <p key={item}>{item}</p>  // key를 더 낫게 처리하는 법?
          ))}
        </ul>
      </main>
    </Modal>
  );
}

export default TodoDetails;