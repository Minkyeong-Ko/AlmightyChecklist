import { Outlet } from 'react-router-dom';

import TodoList from '../components/TodoList';

function Todos() {

  return (
    <>
      <Outlet />
      <main>
        <TodoList />
      </main>
    </>
  );
}

export default Todos;

// loader - 컴포넌트가 로드될 때 투두리스트 목록 가져오기 (localStorage 사용)
export function loader() {
  let savedTodos = localStorage.getItem('todos');
  let parsed = JSON.parse(savedTodos);

  console.log(`parsed: ${parsed}`)

  return parsed
}