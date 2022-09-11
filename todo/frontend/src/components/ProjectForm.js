import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', user: []}
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
        this.props.createProject(this.state.name, this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={ (event)=> this.handleSubmit(event)}>

                <div className='form-group'>
                    <label for='login'>Название книги: </label>
                        <input type="text" className="form-control" name="name"
                            value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label htmlFor="user">Список пользователей: </label>
                    <select name="user" multiple onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((user) => <option value={user.id}> {user.username}</option>)}
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ProjectForm