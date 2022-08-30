import logo from './logo.svg';
import './App.css';
import React from 'react';

import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'

import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import axios from 'axios'
import {HashRouter, BrowserRouter, Route, Routes, Navigate, Link} from 'react-router-dom'
import NotFound404 from './components/NotFound';
import ProjectFilterList from './components/OneProject.js'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': ''
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())

    }

    get_token(username, password){
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                console.log(response.data)
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))

    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }

        if (this.is_authenticated())
            {
                headers['Authorization'] = 'Token ' + this.state.token
            }


    return headers

    }


    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
        .then(response => {
            const users = response.data
                this.setState(
                {
                    'users': users
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(response => {
                const projects = response.data.results
                this.setState(
                {
                    'projects': projects
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos/', {headers})
        .then(response => {
                const todos = response.data
                this.setState(
                {
                    'todos': todos
                }
            )
        }).catch(error => console.log(error))

    }

    componentDidMount() {
       this.get_token_from_storage()
    }

    render () {
        return (
            <div>

                <div>
                    {/*<Menu menu={this.state.menu}/>*/}
                </div>

                <BrowserRouter>

                    <nav>

                        <ul>

                            <form className="form-inline">

                                <li><Link to='/'>Main</Link></li>

                                <li><Link to='/todos'>Todos</Link></li>

                                <li><Link to='/projects'>Projects list</Link></li>

                                {/*<li><Link to='/login'>Login</Link></li>*/}

                                <li> {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> :<Link as={Link} to='/login'>Login</Link>}</li>

                            </form>

                        </ul>

                    </nav>

                    <Routes>

                        <Route exact path='/' element={<UserList users={this.state.users}/>}/>

                        <Route exact path='/todos' element={<TodoList todos={this.state.todos}/>}/>

                        <Route path='/projects'>
                            <Route index element={<ProjectList projects={this.state.projects}/>}/>
                            <Route path='project/:id' element={<ProjectFilterList projects={this.state.projects}/>}/>
                        </Route>

                        <Route exact path='/login/' element={<LoginForm get_token={(username, password) => this.get_token(username, password)}/>}/>

                        <Route path='*' exact element={<NotFound404/>}/>

                    </Routes>

                </BrowserRouter>

            </div>
        )
    }
}

export default App;