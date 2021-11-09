import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/:imdbID" component={MovieDetails} />
        <Route exact path="/" component={MovieList} />
      </Switch>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);
