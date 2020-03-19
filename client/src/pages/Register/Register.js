
import React from 'react';

import styles from './Register.module.css';

import {connect} from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/authActions';

import {clearErrors} from '../../Redux/Actions/errorActions';

class Register extends React.Component {

    state = {
        name: '',
        email: '',
        password: '',
        msg: ''
    }

    componentDidUpdate(prevProps){

        if (this.props.error !== prevProps.error){
        //check for register error{
            if (this.props.error.id === 'REGISTER_FAIL'){
                this.setState({
                    msg: this.props.error.msg.error
                });
            }else{
                this.setState({
                    msg: ''
                });
            }
        }

        // redirect if successfully authenticated
        if (this.props.isAuthenticated){
            this.props.clearErrors();
            this.props.history.push('/');
        }
    }
    

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await this.props.register(this.state.name, this.state.email, this.state.password);
    
            // this.setState({
            //     name: '',
            //     email: '',
            //     password: '',
            // });

        
        }catch(err){
            console.log(err);
        }
    }

    render(){

        return (
            <div className={styles.login}>

                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1 className={styles.header}>Register</h1>

                    <input className={styles.input} type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleInputChange}/>
                    <input className={styles.input} type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}/>
                    <input className={styles.input} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>

                    { this.state.msg ? <p style={{color: 'red'}}>{this.state.msg}</p> : null }                   
                    <input className={styles.submit} type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (name, email, password) => dispatch(authActionCreators.register(name, email, password)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);