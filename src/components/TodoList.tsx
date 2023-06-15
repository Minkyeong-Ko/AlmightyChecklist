import { useEffect, useState } from 'react'

import { useLoaderData, useLocation } from 'react-router-dom'
import { Configuration, OpenAIApi } from 'openai'

import Todo from './Todo'
import classes from './TodoList.module.css'
import ForceModal from './ForceModal'

function TodoList() {
    // 현재의 URL을 대표하는 location 객체 정보 가져오기 (다른 경로에서 state 정보를 전달)
    let locationData = useLocation()

    // loader로 localStorage에서 가져온 데이터를 저장하기
    const initialTodos: TodoType[] = (useLoaderData() as TodoType[]) || []

    // 가져온 정보로 todos 업데이트
    const [todos, setTodos] = useState<TodoType[]>(initialTodos)

    // ChatGPT 대답 요청 후 기다리는 중인지 여부
    const [isLoading, setIsLoading] = useState(false)

    const [addedTodo, setAddedTodo] = useState('') // 실제 의도대로 사용되는지 살펴보기

    useEffect(() => {
        // 이 부분을 분리할 수 없을지
        console.log('state has changed')

        // openai(ChatGPT 사용을 위해)
        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        })

        // delete configuration.baseOptions.headers['User-Agent'];

        const openai = new OpenAIApi(configuration)

        async function generateResponse(newQuestion: string) {
            let options = {
                model: 'text-davinci-003',
                temperature: 0,
                max_tokens: 500,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
                stop: ['/'],
            }

            let completeOptions = {
                ...options,
                prompt: `${newQuestion} 체크리스트 만들어 주세요`,
            }

            if (
                !isLoading &&
                todos.filter((todo: TodoType) => {
                    return todo.body === newQuestion
                }).length === 0
            ) {
                console.log('createCompletion start')
                setIsLoading(true)
                const response = await openai.createCompletion(completeOptions)
                setIsLoading(false)
                console.log('createCompletion end')

                const responseText = response.data.choices[0].text || ''
                let responseTextList = responseText
                    .split('\n')
                    .filter((item) => item !== '')
                    .map((item) => item.trim())
                responseTextList = responseTextList.slice(
                    0,
                    responseTextList.length - 1
                )

                let newTodo = {
                    body: locationData.state.chosen,
                    id: Math.random() * 10 + 1,
                    list: responseTextList,
                }

                localStorage.setItem(
                    'todos',
                    JSON.stringify([newTodo, ...todos])
                )

                setTodos((prev) => [newTodo, ...prev] as TodoType[])
            }
        }

        if (
            locationData.state !== undefined &&
            locationData.state !== null &&
            locationData.state !== undefined
        ) {
            if (
                locationData.state.from === 'create-todo' &&
                locationData.state.chosen !== null
            ) {
                if (
                    addedTodo === locationData.state.chosen ||
                    todos.filter(
                        (todo) => todo.body === locationData.state.chosen
                    ).length !== 0
                ) {
                    console.log('같거나 겹치는 투두는 무시합니다.')
                } else {
                    console.log('새로 생성 가능합니다.')
                    generateResponse(locationData.state.chosen)
                }
                setAddedTodo(locationData.state.chosen)
            }
        }
    }, [locationData, addedTodo, todos, isLoading])

    return (
        <>
            {todos.length > 0 && (
                <ul className={classes.todos}>
                    {todos.map((todo) => (
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            body={todo.body}
                            list={todo.list}
                        />
                    ))}
                </ul>
            )}
            {todos.length === 0 && (
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <h2>아직 만들어진 체크리스트가 없네요.</h2>
                    <p>오른쪽 위의 버튼으로 추가해 보세요!</p>
                </div>
            )}
            {isLoading && (
                <ForceModal>
                    <div className={classes.box}>
                        <div className={classes.loading} />
                        <p>체크리스트를 가져오고 있습니다..</p>
                    </div>
                </ForceModal>
            )}
        </>
    )
}

export default TodoList
