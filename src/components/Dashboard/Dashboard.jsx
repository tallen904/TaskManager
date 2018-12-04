import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TaskList from '../TaskList/TaskList.jsx';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    };

    render() {
        const { handleSignout, uid } = this.props;
        return (
            <div>
                DASHBOAAAAARD!!!!
                <Button onClick={handleSignout}>SIGN OUT</Button>
                <TaskList uid={uid} />
            </div>
        );
    }
}

export default Dashboard;