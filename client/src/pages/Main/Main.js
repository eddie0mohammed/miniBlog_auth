
import React from 'react';

import styles from './Main.module.css';

import {Link } from 'react-router-dom';
import {connect} from 'react-redux';

import * as articlesActionCreators from '../../Redux/Actions/articleActionCreators';

class Main extends React.Component {

    componentDidMount(){

        this.props.getAllArticles();
    }


    newClick = () => {

        this.props.history.push('/new');
    }


    renderAllArticles = () => {
        return this.props.articles.map((article) => {

            return (
            <div className={styles.block} key={article._id}>

                <h2 ><Link className={styles.title} to={`/${article._id}`}>{article.title}</Link></h2>

                <p className={styles.desc}>{article.details.slice(0, 200)}</p>

                <p className={styles.author}>{article.author}</p>
  
            </div>
            )

        })
    }


    render(){

        return (
            <div className={styles.main}>

                {this.props.isAuthenticated ? <div className={styles.new} onClick={this.newClick}>New</div> : null }
                 
                {!this.props.loading ? 
                
                this.renderAllArticles() 
                : 
                <h1>Loading...</h1>
                
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.article.articles,
        loading: state.article.loading,
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllArticles: () => dispatch(articlesActionCreators.getAllArticles()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);