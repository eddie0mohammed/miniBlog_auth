

import React from 'react';

import styles from './NewArticle.module.css';

import {connect } from 'react-redux';

import * as articleActionCreators from '../../Redux/Actions/articleActionCreators';


class NewArticle extends React.Component{

    state = {
        title: '',
        author: '',
        details: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(this.state);
        await this.props.addArticle(this.state.title, this.state.author, this.state.details);

        this.setState({
            title: '',
            author: '',
            details: ''   
        });

        this.props.history.push('/');
    }

    render(){

        return (
            <div className={styles.newArticle}>

                <div className={styles.block}>

                    <h1 className={styles.header}>New Article</h1>

                    <form className={styles.form} onSubmit={this.handleSubmit}>

                        <input type="text" className={styles.input} name="title" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} />
                        <input type="text" className={styles.input} name="author" placeholder="Author" value={this.state.author} onChange={this.handleInputChange}/>

                        <textarea name="details" className={styles.textarea} placeholder="Article" value={this.state.details} onChange={this.handleInputChange}/>

                        <input className={styles.submit} type="submit" value="Submit"/>
                    </form>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addArticle: (title, author, details) => dispatch(articleActionCreators.addArticle(title, author, details)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);