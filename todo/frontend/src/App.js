import logo from './logo.svg';
import './App.css';
import React from 'react';

import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'

import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import axios from 'axios'
import {HashRouter, Route, Routes, BrowserRouter} from 'react-router-dom'
import NotFound404 from './components/NotFound';
import ProjectFilterList from './components/OneProject.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/users/")
        .then(response => {
            const users = response.data
                this.setState(
                {
                    'users': users
                }
            )
        }).catch(error => console.log(error))

        axios.get("http://127.0.0.1:8000/api/projects/")
        .then(response => {
                const projects = response.data.results
                this.setState(
                {
                    'projects': projects
                }
            )
        }).catch(error => console.log(error))

        axios.get("http://127.0.0.1:8000/api/todos/")
        .then(response => {
                const todos = response.data
                this.setState(
                {
                    'todos': todos
                }
            )
        }).catch(error => console.log(error))

    }

    render () {
        return (

            <div>
                <BrowserRouter>

                    <maincontent>

                        <Routes>

                            <Route path='/' exact element={ <UserList users={this.state.users}/> } />
                            <Route path='/projects' exact element={ <ProjectList projects={this.state.projects}/> } />
                            <Route path='/todos' exact element={ <TodoList todos={this.state.todos}/> } />
                            <Route path='/project/:id' exact element={ <ProjectFilterList projects={this.state.projects}/> } />
                            <Route path='*' exact element={<NotFound404/>}/>

                        </Routes>

                    </maincontent>

                </BrowserRouter>
            </div>
        )
    }
}

export default App;