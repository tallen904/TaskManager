import React from 'react';
import signupFormStyles from '../../../styles/jss/signupFormStyles.jsx';
import withStyles from "@material-ui/core/styles/withStyles";
import Input from '@material-ui/core/Input';
import Button from "@material-ui/core/Button/Button";

const SignupForm = props => {
    const { email, password, handleCreateUser, handleInputChange, handleChangeView, classes } = props;
    return (
        <div className={classes.formDiv}>
            <Input onChange={handleInputChange} placeholder='Email' name='email' value={email} label='Email' type='email' />
            <Input onChange={handleInputChange} placeholder='Password' name='password' value={password} label='Password' type='password' />
            <Button onClick={handleCreateUser} variant="contained" color="primary" className={classes.button}>
                Signup
            </Button>
            <Button onClick={handleChangeView}>Already a user? Login here!</Button>
        </div>
    );
};

export default withStyles(signupFormStyles)(SignupForm);
