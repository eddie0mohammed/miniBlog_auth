import React from 'react';
import './App.css';

import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import SingleArticle from './pages/SingleArticle/SingleArticle';
import NewArticle from './pages/NewArticle/NewArticle';
import EditArticle from './pages/EditArticle/EditArticle';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import {loadUser} from './Redux/Actions/authActions';

class App extends React.Component {

  componentDidMount(){

    this.props.loadUser();
    
  }

  render(){
    
    
    return (
      <div className="App">

        <Header />

        <Switch>
          <Route path='/' exact component={Main} />
          <Route path='/new' exact component={NewArticle} />
          <Route path='/edit/:article' exact component={EditArticle} />
          <Route path='/:article' exact component={SingleArticle} />
          <Route path="/auth/login" exact component={Login}/>
          <Route path="/auth/register" exact component={Register}/>
          
        </Switch>

        
        
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: () => dispatch(loadUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
