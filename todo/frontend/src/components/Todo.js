import React from 'react'
import {Link} from 'react-router-dom'

const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.created_at}
            </td>
            <td>
                {todo.updated_at}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                <button onClick={()=>deleteTodo(todo.id)}type='button'>Delete</button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {
    return (
        <div>
            <table>
                <th>
                    Text
                </th>

                <th>
                    Created_at
                </th>

                <th>
                    Updated_at
                </th>

                <th>
                    Project
                </th>

                <th>
                    User
                </th>

                <th>
                </th>
                {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo} />)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}

export default TodoList
