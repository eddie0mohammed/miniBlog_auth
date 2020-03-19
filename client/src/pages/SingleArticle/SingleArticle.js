

import React from 'react';

import styles from './SingleArticle.module.css';

import {connect} from 'react-redux';

import * as articleActionCreators from '../../Redux/Actions/articleActionCreators';

class SingleArticle extends React.Component{

    state = {
        title: '',
        details: '',
        author: ''
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

    editHandler = () => {
        const articleId = this.props.match.params.article;
        this.props.history.push(`/edit/${articleId}`);

    }

    deleteHandler = async () => {
        const articleId = this.props.match.params.article;
        await this.props.deleteArticle(articleId);

        this.props.history.push('/');

    }

    render(){
        
        return (
            <div className={styles.singleArticle}>

                <div className={styles.block}>
                    <h1 className={styles.title}>{this.state.title}</h1>

                    <p className={styles.paragraph}>{this.state.details}</p>

                    <p className={styles.author}>{this.state.author}</p>

                    <div className={styles.btns}>
                        <div className={`${styles.btn} ${styles.edit}`} onClick={this.editHandler}>Edit</div>
                        <div className={`${styles.btn} ${styles.delete}`} onClick={this.deleteHandler}>Delete</div>
                    </div>
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
        deleteArticle: (id) => dispatch(articleActionCreators.deleteArticle(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);