import React, {useState} from 'react'
import {signup} from '../../actions/auth'
import {Alert} from 'reactstrap'

const SignupComponenet = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: false,
        message: '',
        showForm: true
    });

    const {email, password, error, loading, message, showForm} = values;

    const handleSubmit = e => {
        e.preventDefault()
        setValues({...values, loading:true, error:false})
        const user = {email, password}
        signup(user).then(data => {
            if (data.error) {
                setValues({...values,
                    error: data.error,
                    loading: false
                })
            } else {
                setValues({...values,
                    email: '',
                    password: '',
                    error: false,
                    loading: false,
                    message: data.message,
                    showForm: false
                })
            }
        })
    };

    const handleChange = changedField => e => {
        setValues({ ...values, error:false, [changedField]: e.target.value});
    };

    const signupForm = () => {
        return(
            showForm ?
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        value={email}
                        onChange={handleChange('email')}
                        type="email" className="form-control"
                        placeholder="Type your Email"/>
                </div>
                <div className="form-group">
                    <input
                        value={password}
                        onChange={handleChange('password')}
                        type="password"
                        className="form-control"
                        placeholder="Type your password"/>
                </div>
                <div>
                    <button className="btn btn-primary">Signup</button>
                </div>
            </form> : '')
    };

    const showLoading = (props) => {
        return (
            loading ?
        <div>
            <Alert color="info">
                Loading...
            </Alert>
            </div>
                : '')
    };

    const showError = (props) => {
        return (
            error ?
                <div>
                    <Alert color="danger">
                        {error}
                    </Alert>
                </div>
                : '')
    };

    const showMessage = (props) => {
        return (
            message ?
                <div>
                    <Alert color="success">
                        {message}
                    </Alert>
                </div>
                : '')
    };

    return (
        <React.Fragment>
            {showLoading()}
            {showError()}
            {showMessage()}
            {signupForm()}
        </React.Fragment>
    )
};

export default SignupComponenet;
