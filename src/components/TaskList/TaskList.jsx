import React, {Component} from 'react';
import { db } from '../../fire';
import Input from '@material-ui/core/Input';
import Button from "@material-ui/core/Button/Button";

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTask: '',
            taskList: [],
        };
    };

    componentWillMount() {
        let { taskList } = this.state;
        const { uid } = this.props;
        db.collection('users').doc(`${uid}`).collection('tasks').where('completed', '==', false).get().then(snapshot => {
            snapshot.forEach(doc => {
                taskList.push(doc.data());
            })
            this.setState({ taskList })
        });
    };

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    createNewTask = () => {
        const { newTask } = this.state;
        const { uid } = this.props;
        if(newTask !== '') {
            db.collection('users').doc(`${uid}`).collection('tasks').add({
                completed: false,
                description: newTask,
                dateCreated: Date.now(),
            });
        } else {
            console.log('Error')
        }
    };

    render() {
        const { newTask, taskList } = this.state;
        return (
            <div>
                <div>
                    <Input name='newTask' value={newTask} placeholder='Task' onChange={this.handleInputChange} />
                    <Button onClick={this.createNewTask}>Submit</Button>
                </div>
                <div>
                    <h3>Task List</h3>
                    {taskList.map(task => {
                        return <div>{task.description}</div>
                    })}
                </div>
            </div>
        );
    }
}

export default TaskList;