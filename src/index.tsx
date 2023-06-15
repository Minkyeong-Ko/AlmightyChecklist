import React from 'react'
import ReactDOM from 'react-dom'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'
import RootLayout from './routes/RootLayout'
import Todos, { loader as todosLoader } from './routes/Todos'
import NewTodo from './routes/CreateTodo'
import TodoDetails from './routes/TodoDetails'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <Todos />,
                loader: todosLoader,
                children: [
                    { path: '/create-todo', element: <NewTodo /> },
                    { path: '/:title', element: <TodoDetails /> },
                ],
            },
        ],
    },
])

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
