import React from 'react';
import {useParams} from 'react-router-dom';

const ProjectItem = ({project}) => {

    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.name}
            </td>
            <td>
                {project.link}
            </td>

            <td>
                {project.users}
            </td>
        </tr>
    )

}


const ProjectFilterList = ({projects}) => {
    let {id} = useParams()
    let filter_projects = projects.filter((project => project.name.includes(parseInt(id))))
    return (
        <table>
            <th>
                Id
            </th>
            <th>
                Name
            </th>
            <th>
                Link
            </th>
            <th>
                Users
            </th>

            {filter_projects.map((project) => <ProjectItem project={project}/>)}
        </table>

    )
}
export default ProjectFilterList