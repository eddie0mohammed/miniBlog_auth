

import React from 'react';

import {connect} from 'react-redux';

import styles from './EditArticle.module.css';

import * as articleActionCreators from '../../Redux/Actions/articleActionCreators';


class EditArticle extends React.Component{

    state = {
        title: '',
        author: '',
        details: ''
    }

    componentDidMount(){
        const articleId = this.props.match.params.article;
        const specificArticle = this.props.articles.filter(elem => {
            return elem._id === articleId
        })[0];

        this.setState({
            title: specificArticle.title,
            details: specificArticle.details,
            author: specificArticle.author
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(this.state);

        const updatedArticle = {
            title: this.state.title,
            details: this.state.details,
            author: this.state.author
        };

        const articleId = this.props.match.params.article;
        await this.props.editArticle(updatedArticle, articleId);

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

                    <h1 className={styles.header}>Edit Article</h1>

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
        articles: state.article.articles,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editArticle: (updatedArticle, id) => dispatch(articleActionCreators.editArticle(updatedArticle, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);