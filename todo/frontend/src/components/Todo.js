import React from 'react'

const TodoItem = ({todo}) => {
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
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
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

            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
   )
}

export default TodoList
