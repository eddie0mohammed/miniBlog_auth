
import React from 'react';

import styles from './Header.module.css';

import {Link } from 'react-router-dom';

import {connect} from 'react-redux';

import {logout } from '../../Redux/Actions/authActions';

class Header extends React.Component{

    render(){

        return(
            <div className={styles.header}>

                <Link to='/' className={styles.logo}>BLOG</Link>

                <div className={styles.nav}>
                    {!this.props.isAuthenticated ? 
                        <>
                            <Link to="/auth/login" className={styles.btn}>Login</Link>
                            <Link to='/auth/register' className={styles.btn}>Register</Link>
                        </>
                        :
                        
                        <>
                            <div className={styles.btn} onClick={this.props.logout}>Logout</div>
                            <div className={styles.btn}>{this.props.user.name}</div>
                        </>
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);