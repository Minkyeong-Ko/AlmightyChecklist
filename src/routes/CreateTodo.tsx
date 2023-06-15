import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Modal from '../components/Modal'
import classes from './CreateTodo.module.css'
import { CategoryStrings } from 'types/Strings'

function CreateTodo() {
    const navigate = useNavigate()

    const [chosenIndex, setChosenIndex] = useState(-1)

    // 바뀌지 않는 배열 (ChatGPT로 확인된 주제들)
    const categories = [
        CategoryStrings.tripAbroad,
        CategoryStrings.roadTrip,
        CategoryStrings.newCar,
        CategoryStrings.newHouse,
        CategoryStrings.marry,
    ]

    function choiceHandler(index: number) {
        if (chosenIndex === index) {
            setChosenIndex(-1)
        } else {
            setChosenIndex(index)
        }
    }

    function navigateHandler() {
        if (chosenIndex == -1) {
            alert('하나를 선택해 주세요!')
        } else {
            navigate('/', {
                state: {
                    from: 'create-todo',
                    chosen: categories[chosenIndex],
                },
            })
        }
    }

    return (
        <Modal>
            <div className={classes.list}>
                <p>어떤 체크리스트를 생성해 드릴까요?</p>
                <div className={classes.categories}>
                    {categories.map((category, index) => {
                        return (
                            <button
                                key={category}
                                className={classes.item}
                                onClick={(e) => choiceHandler(index)}
                                style={{
                                    backgroundColor:
                                        index === chosenIndex
                                            ? 'white'
                                            : '#c2dcf7',
                                }}
                            >
                                {category}
                            </button>
                        )
                    })}
                </div>
                <p className={classes.actions}>
                    <Link to="/">취소</Link>
                    <button onClick={navigateHandler}>선택 완료</button>
                </p>
            </div>
        </Modal>
    )
}

export default CreateTodo
