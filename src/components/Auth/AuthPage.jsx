import React, {Component} from 'react';
import { auth, db } from '../../fire';
import SignupForm from './AuthForms/SignupForm';
import LoginForm from './AuthForms/LoginForm';

class AuthPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            view: 'login',
            email: '',
            password: '',
        };
    };

    handleCreateUser = () => {
        const { email, password } = this.state;
        auth.createUserWithEmailAndPassword(email, password).then(newUserData =>{
            const { uid } = newUserData.user;
            db.collection(`users`).doc(`${uid}`).set({ tasks: [] });
        }).catch(error => {
            const { code, message } = error;
            console.log(`Code: ${code}, Message: ${message}`);
        })
    };

    handleLogin = () => {
        const { email, password } = this.state;
        auth.signInWithEmailAndPassword(email, password).catch(error => {
            const { code, message } = error;
            console.log(`Code: ${code}, Message: ${message}`);
        })
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    };

    handleChangeView = () => {
        let { view } = this.state;
        if (view === 'login') {
            view = 'signup';
        } else {
            view = 'login';
        }
        this.setState({ view })
    }

    render() {
        const { view } = this.state;
        return (
            <div>
                {view === 'login' ? <LoginForm handleLogin={this.handleLogin} handleInputChange={this.handleInputChange} handleChangeView={this.handleChangeView}/> : <SignupForm handleCreateUser={this.handleCreateUser} handleInputChange={this.handleInputChange} handleChangeView={this.handleChangeView} />}
            </div>
        );
    }
}

export default AuthPage;