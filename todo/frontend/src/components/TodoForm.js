import React from 'react'

class TodoForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {text: '', project: '', user: ''}
    }


    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event)
    {
        this.props.createTodo(this.state.text, this.state.project, this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div className="form-group">
                    <label htmlFor="text">Содержание заметки</label>
                    <input type="text" className="form-control" name="text"
                           value={this.state.text} onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="text">Проект</label>
                    <input type="text" className="form-control" name="project"
                           value={this.state.project} onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="person">Введите id создателя</label>
                    <input type="number" className="form-control" name="user"
                           value={this.state.user} onChange={(event) => this.handleChange(event)}/>
                </div>

                <input type="submit" className="btn btn-primary btn-lg btn-block" value="Save"/>
            </form>
        );
    }
}

export default TodoForm